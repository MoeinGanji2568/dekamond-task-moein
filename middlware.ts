import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function middleware(request: NextRequest) {
  const publicRoutes = [
    "/login",
    "/",
    "/api/auth/step1",
    "/api/auth/step2",
    "/api/profile/getMyProfile",
  ];
  const isPublicRoute = publicRoutes.includes(request.nextUrl.pathname);
  if (isPublicRoute) {
    return NextResponse.next();
  }
  const token = request.headers.get("Authorization")?.split(" ")[1];
  if (!token) {
    return NextResponse.redirect("/login");
  }
  const decoded = jwt.verify(token, "shhhhh");
  if (!decoded) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.next();
}
