import { NextResponse } from "next/server";
import type { PublicToolsErrorResponse } from "@/lib/public-tools-types";

const defaultUpstreamBaseUrl =
  "https://indices.prismcore.ru/api/public/v1";
const timeoutMs = 8_000;

const errorMessages: Record<string, string> = {
  VALIDATION_ERROR: "Проверьте параметры запроса.",
  SERIES_NOT_FOUND: "Выбранный статистический ряд не найден.",
  PERIOD_NOT_AVAILABLE:
    "Для выбранного периода недостаточно опубликованных данных.",
  PERIOD_TOO_LONG: "Период расчёта не может быть длиннее 120 месяцев.",
  INVALID_PERIOD: "Конечный месяц должен быть позже начального.",
  SERIES_NOT_CALCULABLE:
    "Для выбранного ряда расчёт за период недоступен.",
  CLASSIFIER_UNAVAILABLE:
    "Классификатор временно недоступен. Попробуйте ещё раз.",
  RATE_LIMITED: "Слишком много запросов. Попробуйте ещё раз позже.",
  SERVICE_UNAVAILABLE:
    "Сервис данных временно недоступен. Попробуйте ещё раз.",
};

export function publicToolsError(
  code: string,
  status = 422,
  details?: Record<string, string[]>,
) {
  return NextResponse.json(
    {
      error: {
        code,
        message: errorMessages[code] ?? "Сервис данных временно недоступен.",
        ...(details ? { details } : {}),
      },
    },
    { status, headers: { "Cache-Control": "no-store" } },
  );
}

function upstreamBaseUrl(): URL {
  const configured = process.env.PRISM_INDICES_PUBLIC_API_BASE_URL;
  const raw = configured?.trim() || defaultUpstreamBaseUrl;
  const base = new URL(raw);

  if (
    !["http:", "https:"].includes(base.protocol) ||
    base.username ||
    base.password ||
    base.search ||
    base.hash
  ) {
    throw new Error("Invalid PRISM_INDICES_PUBLIC_API_BASE_URL.");
  }

  return base;
}

function upstreamUrl(path: string): URL {
  const base = upstreamBaseUrl();
  const basePath = base.toString().replace(/\/?$/, "/");
  return new URL(path.replace(/^\/+/, ""), basePath);
}

function errorCodeFromPayload(
  payload: PublicToolsErrorResponse,
  status: number,
  path: string,
): string {
  const upstreamCode = payload.error?.code;
  if (upstreamCode && errorMessages[upstreamCode]) {
    return upstreamCode;
  }

  if (status === 404) {
    return path === "/index-series/calculate"
      ? "SERIES_NOT_FOUND"
      : "SERVICE_UNAVAILABLE";
  }
  if (status === 422) {
    return "VALIDATION_ERROR";
  }
  if (status === 429) {
    return "RATE_LIMITED";
  }

  return "SERVICE_UNAVAILABLE";
}

export async function proxyPublicTools(
  path: string,
  init: RequestInit = {},
): Promise<NextResponse> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(upstreamUrl(path), {
      ...init,
      cache: "no-store",
      headers: {
        Accept: "application/json",
        ...(init.headers ?? {}),
      },
      signal: controller.signal,
    });

    const text = await response.text();
    let payload: unknown = null;
    try {
      payload = text ? JSON.parse(text) : null;
    } catch {
      payload = null;
    }

    if (!response.ok) {
      const code = errorCodeFromPayload(
        (payload ?? {}) as PublicToolsErrorResponse,
        response.status,
        path,
      );
      const status = response.status >= 500 ? 503 : response.status;
      return publicToolsError(code, status);
    }

    if (payload === null || typeof payload !== "object") {
      return publicToolsError("SERVICE_UNAVAILABLE", 503);
    }

    return NextResponse.json(payload, {
      status: response.status,
      headers: { "Cache-Control": "no-store" },
    });
  } catch {
    return publicToolsError("SERVICE_UNAVAILABLE", 503);
  } finally {
    clearTimeout(timeout);
  }
}
