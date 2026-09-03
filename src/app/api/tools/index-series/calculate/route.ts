import { z } from "zod";
import { proxyPublicTools, publicToolsError } from "@/lib/public-tools-server";

const bodySchema = z
  .object({
    family: z.enum(["producer_prices", "consumer_prices"]),
    slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).max(160),
    start_period: z.string().regex(/^\d{4}-\d{2}$/),
    end_period: z.string().regex(/^\d{4}-\d{2}$/),
    amount: z.string().max(18).nullable().optional(),
  })
  .strict();

function periodValue(value: string): number | null {
  const match = /^(\d{4})-(\d{2})$/.exec(value);
  if (!match) {
    return null;
  }
  const month = Number(match[2]);
  return month >= 1 && month <= 12
    ? Number(match[1]) * 12 + month
    : null;
}

function normalizeAmount(value: string | null | undefined): string | null {
  if (value === null || value === undefined) {
    return null;
  }
  const normalized = value
    .trim()
    .replace(/[\s\u00a0\u202f]/g, "")
    .replace(",", ".");
  return /^\d{1,15}(?:\.\d{1,2})?$/.test(normalized) &&
    /[1-9]/.test(normalized.replace(".", ""))
    ? normalized
    : null;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return publicToolsError("VALIDATION_ERROR", 422);
  }

  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) {
    return publicToolsError("VALIDATION_ERROR", 422);
  }

  const start = periodValue(parsed.data.start_period);
  const end = periodValue(parsed.data.end_period);
  if (start === null || end === null) {
    return publicToolsError("VALIDATION_ERROR", 422);
  }
  if (end <= start) {
    return publicToolsError("INVALID_PERIOD", 422);
  }
  if (end - start > 120) {
    return publicToolsError("PERIOD_TOO_LONG", 422);
  }

  const amount =
    parsed.data.amount === undefined
      ? null
      : normalizeAmount(parsed.data.amount);
  if (parsed.data.amount !== undefined && amount === null) {
    return publicToolsError("VALIDATION_ERROR", 422);
  }

  return proxyPublicTools("/index-series/calculate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...parsed.data,
      amount,
    }),
  });
}
