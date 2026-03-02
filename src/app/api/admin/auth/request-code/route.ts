import { NextRequest, NextResponse } from "next/server";
import {
  createChallengeToken,
  generateAdminCode,
  getAdminChallengeCookieName,
  getAdminLogin,
  getChallengeTtlSeconds,
  isSecureAdminCookie,
} from "@/lib/admin-auth";
import { sendAdminCodeToTelegram } from "@/lib/telegram";

export async function POST(request: NextRequest) {
  try {
    if (!process.env.TELEGRAM_BOT_TOKEN || !process.env.TELEGRAM_CHAT_ID) {
      return NextResponse.json(
        { error: "Telegram для входа не настроен" },
        { status: 500 }
      );
    }

    const body = await request.json();
    const login = typeof body?.login === "string" ? body.login.trim() : "";

    if (login !== getAdminLogin()) {
      return NextResponse.json({ error: "Неверный логин" }, { status: 401 });
    }

    const code = generateAdminCode();
    await sendAdminCodeToTelegram(login, code);

    const response = NextResponse.json({ success: true });
    response.cookies.set({
      name: getAdminChallengeCookieName(),
      value: createChallengeToken(login, code),
      httpOnly: true,
      sameSite: "strict",
      secure: isSecureAdminCookie(),
      path: "/api/admin/auth",
      maxAge: getChallengeTtlSeconds(),
    });

    return response;
  } catch (error) {
    console.error("[API /admin/auth/request-code] Error:", error);
    return NextResponse.json(
      { error: "Не удалось отправить код входа" },
      { status: 500 }
    );
  }
}
