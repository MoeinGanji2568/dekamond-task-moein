import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/utils/auth";

const PUBLIC_FILE = /\.(.*)$/;

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/assets") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/public") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const publicRoutes = [
    "/login",
    "/",
    "/api/auth/step1",
    "/api/auth/step2",
    "/api/profile/getMyProfile",
  ];
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  const authenticated = await isAuthenticated();
  if (!authenticated) {
    return NextResponse.redirect(`${request.nextUrl.origin}/login`);
  }
  return NextResponse.next();
}
