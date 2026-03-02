import { NextRequest, NextResponse } from "next/server";
import {
  createSessionToken,
  getAdminChallengeCookieName,
  getAdminLogin,
  getAdminSessionCookieName,
  getSessionTtlSeconds,
  isSecureAdminCookie,
  verifyChallengeToken,
} from "@/lib/admin-auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const login = typeof body?.login === "string" ? body.login.trim() : "";
    const code = typeof body?.code === "string" ? body.code.trim() : "";
    const challengeToken = request.cookies.get(getAdminChallengeCookieName())?.value;

    if (
      login !== getAdminLogin() ||
      !/^\d{6}$/.test(code) ||
      !challengeToken ||
      !verifyChallengeToken(challengeToken, login, code)
    ) {
      const unauthorizedResponse = NextResponse.json(
        { error: "Неверный или просроченный код" },
        { status: 401 }
      );
      unauthorizedResponse.cookies.set({
        name: getAdminChallengeCookieName(),
        value: "",
        httpOnly: true,
        sameSite: "strict",
        secure: isSecureAdminCookie(),
        path: "/api/admin/auth",
        maxAge: 0,
      });

      return unauthorizedResponse;
    }

    const response = NextResponse.json({ success: true });
    response.cookies.set({
      name: getAdminSessionCookieName(),
      value: createSessionToken(login),
      httpOnly: true,
      sameSite: "strict",
      secure: isSecureAdminCookie(),
      path: "/",
      maxAge: getSessionTtlSeconds(),
    });
    response.cookies.set({
      name: getAdminChallengeCookieName(),
      value: "",
      httpOnly: true,
      sameSite: "strict",
      secure: isSecureAdminCookie(),
      path: "/api/admin/auth",
      maxAge: 0,
    });

    return response;
  } catch (error) {
    console.error("[API /admin/auth/verify] Error:", error);
    return NextResponse.json(
      { error: "Не удалось подтвердить код" },
      { status: 500 }
    );
  }
}
