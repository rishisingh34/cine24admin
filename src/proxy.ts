import { auth } from "@/auth";
import { NextResponse } from "next/server";

export const proxy = auth((req) => {
  const isLoggedIn = !!req.auth;
  const isAuthPage = req.nextUrl.pathname === "/";

  if (isLoggedIn && isAuthPage) {
    return NextResponse.redirect(new URL("/admin", req.nextUrl));
  }

  if (!isLoggedIn && req.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/", "/admin/:path*"],
};
