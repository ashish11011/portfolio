import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { hasAdminCookie } from "@/lib/admin-token";

export function proxy(request: NextRequest) {
  if (hasAdminCookie((name) => request.cookies.get(name)?.value)) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: ["/admin/:path*"],
};
