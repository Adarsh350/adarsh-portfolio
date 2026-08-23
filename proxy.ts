import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { COOKIE_NAME, MOBILE_UA_REGEX } from "@/lib/device";

// ponytail: file is `proxy.ts` not `middleware.ts` — Next.js 16 deprecated and
// renamed the middleware.ts convention to proxy.ts (same behavior, new name/export).
// See node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/proxy.md

type Device = "mobile" | "desktop";

function resolveDevice(request: NextRequest): {
  device: Device;
  fromCookie: boolean;
} {
  const cookieDevice = request.cookies.get(COOKIE_NAME)?.value;
  if (cookieDevice === "mobile" || cookieDevice === "desktop") {
    return { device: cookieDevice, fromCookie: true };
  }

  const clientHint = request.headers.get("Sec-CH-UA-Mobile");
  if (clientHint === "?1") return { device: "mobile", fromCookie: false };
  if (clientHint === "?0") return { device: "desktop", fromCookie: false };

  const ua = request.headers.get("user-agent") ?? "";
  if (MOBILE_UA_REGEX.test(ua)) return { device: "mobile", fromCookie: false };

  return { device: "desktop", fromCookie: false };
}

export function proxy(request: NextRequest) {
  const { device, fromCookie } = resolveDevice(request);
  const { pathname } = request.nextUrl;

  const target =
    pathname === "/" ? `/${device}` : `/${device}${pathname}`;

  const url = request.nextUrl.clone();
  url.pathname = target;

  const response = NextResponse.rewrite(url);

  if (!fromCookie) {
    response.cookies.set(COOKIE_NAME, device, {
      path: "/",
      maxAge: 31536000,
      sameSite: "lax",
      httpOnly: false,
    });
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|api|.*\\..*).*)"],
};
