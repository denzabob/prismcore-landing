import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { leadSchema } from "@/lib/validators";
import { checkRateLimit } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  try {
    // Get IP for rate limiting
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded?.split(",")[0]?.trim() || "unknown";

    // Rate limit check
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Слишком много запросов. Попробуйте через час." },
        { status: 429 }
      );
    }

    const body = await request.json();

    // Honeypot check
    if (typeof body?.website === "string" && body.website.length > 0) {
      // Silently accept but don't save (bot detected)
      return NextResponse.json({ success: true, id: 0 });
    }

    // Server-side validation
    const result = leadSchema.safeParse(body);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0]?.toString();
        if (field && !fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        }
      }
      return NextResponse.json(
        { error: "Ошибка валидации", fields: fieldErrors },
        { status: 400 }
      );
    }

    const userAgent = request.headers.get("user-agent") || undefined;
    const leadPayload =
      result.data.mode === "pdf"
        ? {
            name: "Не указано",
            activity: result.data.specialization,
            email: result.data.email,
            phone: "",
            comment: "Запрос образца экспертной сметы (PDF)",
            source: "landing_pdf",
          }
        : {
            name: "Запрос тестового доступа",
            activity: result.data.specialization,
            email: result.data.email,
            phone: result.data.phone || "",
            comment: result.data.comment || null,
            source: "landing_trial",
          };

    const lead = await prisma.lead.create({
      data: {
        ...leadPayload,
        userAgent,
        ip,
        status: "new",
      },
    });

    return NextResponse.json({ success: true, id: lead.id });
  } catch (error) {
    console.error("[API /lead] Error:", error);
    return NextResponse.json(
      { error: "Внутренняя ошибка сервера" },
      { status: 500 }
    );
  }
}
