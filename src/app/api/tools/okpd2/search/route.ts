import { z } from "zod";
import { proxyPublicTools, publicToolsError } from "@/lib/public-tools-server";

const querySchema = z.object({
  q: z.string().trim().min(2).max(120),
  limit: z.coerce.number().int().min(1).max(20).default(20),
});

export async function GET(request: Request) {
  const url = new URL(request.url);
  const parsed = querySchema.safeParse({
    q: url.searchParams.get("q") ?? "",
    limit: url.searchParams.get("limit") || undefined,
  });

  if (!parsed.success) {
    return publicToolsError("VALIDATION_ERROR", 422, {
      q: ["Введите минимум два символа."],
    });
  }

  const upstream = new URLSearchParams({
    q: parsed.data.q,
    limit: String(parsed.data.limit),
  });

  return proxyPublicTools(`/okpd2/search?${upstream.toString()}`);
}
