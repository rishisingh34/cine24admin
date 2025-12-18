import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

export async function proxy(req: NextRequest) {
  const token = await getToken({ req, secret });

  const isAuth = !!token;
  const isAuthPage = req.nextUrl.pathname === "/";

  if (isAuth && isAuthPage) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  if (!isAuth && req.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/admin/:path*"],
};