import { createHash, createHmac, randomInt, timingSafeEqual } from "node:crypto";
import type { NextRequest } from "next/server";

const ADMIN_LOGIN = "denzabob";
const ADMIN_CHALLENGE_COOKIE = "prismcore_admin_challenge";
const ADMIN_SESSION_COOKIE = "prismcore_admin_session";
const CHALLENGE_TTL_SECONDS = 10 * 60;
const SESSION_TTL_SECONDS = 12 * 60 * 60;

type ChallengePayload = {
  type: "challenge";
  login: string;
  codeHash: string;
  nonce: string;
  exp: number;
};

type SessionPayload = {
  type: "session";
  login: string;
  exp: number;
};

function getSigningSecret(): string {
  const secret = process.env.ADMIN_AUTH_SECRET || process.env.ADMIN_TOKEN;

  if (!secret) {
    throw new Error("ADMIN_AUTH_SECRET or ADMIN_TOKEN must be set");
  }

  return secret;
}

function toBase64Url(value: string): string {
  return Buffer.from(value, "utf8").toString("base64url");
}

function fromBase64Url(value: string): string {
  return Buffer.from(value, "base64url").toString("utf8");
}

function signValue(value: string): string {
  return createHmac("sha256", getSigningSecret()).update(value).digest("base64url");
}

function encodeSignedPayload(payload: ChallengePayload | SessionPayload): string {
  const encodedPayload = toBase64Url(JSON.stringify(payload));
  const signature = signValue(encodedPayload);

  return `${encodedPayload}.${signature}`;
}

function decodeSignedPayload(token: string): ChallengePayload | SessionPayload | null {
  const [encodedPayload, signature] = token.split(".");

  if (!encodedPayload || !signature) {
    return null;
  }

  const expectedSignature = signValue(encodedPayload);
  const received = Buffer.from(signature, "utf8");
  const expected = Buffer.from(expectedSignature, "utf8");

  if (received.length !== expected.length || !timingSafeEqual(received, expected)) {
    return null;
  }

  try {
    return JSON.parse(fromBase64Url(encodedPayload)) as ChallengePayload | SessionPayload;
  } catch {
    return null;
  }
}

function hashCode(code: string, nonce: string): string {
  return createHash("sha256").update(`${code}:${nonce}`).digest("hex");
}

export function getAdminLogin(): string {
  return ADMIN_LOGIN;
}

export function getAdminChallengeCookieName(): string {
  return ADMIN_CHALLENGE_COOKIE;
}

export function getAdminSessionCookieName(): string {
  return ADMIN_SESSION_COOKIE;
}

export function getChallengeTtlSeconds(): number {
  return CHALLENGE_TTL_SECONDS;
}

export function getSessionTtlSeconds(): number {
  return SESSION_TTL_SECONDS;
}

export function isSecureAdminCookie(): boolean {
  return process.env.NODE_ENV === "production";
}

export function generateAdminCode(): string {
  return randomInt(0, 1_000_000).toString().padStart(6, "0");
}

export function createChallengeToken(login: string, code: string): string {
  const nonce = randomInt(100_000, 1_000_000).toString();
  const payload: ChallengePayload = {
    type: "challenge",
    login,
    codeHash: hashCode(code, nonce),
    nonce,
    exp: Date.now() + CHALLENGE_TTL_SECONDS * 1000,
  };

  return encodeSignedPayload(payload);
}

export function verifyChallengeToken(
  token: string,
  login: string,
  code: string
): boolean {
  const payload = decodeSignedPayload(token);

  if (!payload || payload.type !== "challenge") {
    return false;
  }

  if (payload.exp < Date.now() || payload.login !== login) {
    return false;
  }

  return payload.codeHash === hashCode(code, payload.nonce);
}

export function createSessionToken(login: string): string {
  const payload: SessionPayload = {
    type: "session",
    login,
    exp: Date.now() + SESSION_TTL_SECONDS * 1000,
  };

  return encodeSignedPayload(payload);
}

export function hasValidAdminSession(request: NextRequest): boolean {
  const cookieValue = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;

  if (cookieValue) {
    const payload = decodeSignedPayload(cookieValue);

    if (
      payload &&
      payload.type === "session" &&
      payload.login === ADMIN_LOGIN &&
      payload.exp >= Date.now()
    ) {
      return true;
    }
  }

  const legacyToken = process.env.ADMIN_TOKEN;
  if (!legacyToken) {
    return false;
  }

  const url = new URL(request.url);
  const queryToken = url.searchParams.get("token");
  const headerToken = request.headers.get("x-admin-token");

  return queryToken === legacyToken || headerToken === legacyToken;
}
