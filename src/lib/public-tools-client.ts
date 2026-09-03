import type { PublicToolsErrorResponse } from "@/lib/public-tools-types";

export function publicToolsErrorMessage(
  payload: unknown,
  fallback = "Сервис данных временно недоступен. Попробуйте ещё раз.",
): string {
  if (!payload || typeof payload !== "object") {
    return fallback;
  }

  const error = (payload as PublicToolsErrorResponse).error;
  return typeof error?.message === "string" && error.message.length > 0
    ? error.message
    : fallback;
}

export function monthValue(period: string): number {
  const [year, month] = period.split("-").map(Number);
  return year * 12 + month;
}

export function periodOptions(minPeriod: string, maxPeriod: string): string[] {
  const options: string[] = [];
  let current = monthValue(minPeriod);
  const end = monthValue(maxPeriod);

  while (current <= end && options.length <= 240) {
    const year = Math.floor((current - 1) / 12);
    const month = ((current - 1) % 12) + 1;
    options.push(`${year}-${String(month).padStart(2, "0")}`);
    current += 1;
  }

  return options;
}

export function formatPeriod(period: string): string {
  const [year, month] = period.split("-");
  const months = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ];

  return `${months[Number(month) - 1] ?? month} ${year}`;
}

export function formatDecimal(value: string, fractionDigits: number): string {
  const negative = value.startsWith("-");
  const absolute = negative ? value.slice(1) : value;
  const [integer, fraction = ""] = absolute.split(".");
  const formattedInteger = integer.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  const formattedFraction = (fraction + "0".repeat(fractionDigits)).slice(
    0,
    fractionDigits,
  );

  return `${negative ? "-" : ""}${formattedInteger},${formattedFraction}`;
}

export function formatSignedPercent(value: string): string {
  const sign = value.startsWith("-") ? "" : "+";
  return `${sign}${formatDecimal(value, 2)} %`;
}

export function formatRubles(value: string): string {
  const negative = value.startsWith("-");
  const absolute = negative ? value.slice(1) : value;
  const [integer, fraction = ""] = absolute.split(".");
  const formattedInteger = integer.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  const hasKopecks = /[1-9]/.test(fraction);

  return `${negative ? "-" : ""}${formattedInteger}${
    hasKopecks ? `,${(fraction + "00").slice(0, 2)}` : ""
  } ₽`;
}
