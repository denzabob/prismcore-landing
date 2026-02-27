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
    const isPdfMode = result.data.mode === "pdf";

    const lead = await prisma.lead.create({
      data: {
        name: isPdfMode ? "Не указано" : "Запрос тестового доступа",
        activity: result.data.specialization,
        email: result.data.email,
        phone: isPdfMode ? "" : result.data.phone || "",
        comment: isPdfMode
          ? "Запрос образца экспертной сметы (PDF)"
          : result.data.comment || null,
        userAgent,
        ip,
        source: isPdfMode ? "landing_pdf" : "landing_trial",
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
