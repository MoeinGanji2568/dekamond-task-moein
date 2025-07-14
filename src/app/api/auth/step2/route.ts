import { PrismaClient } from "@/generated/prisma";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
const prisma = new PrismaClient();
export async function POST(request: NextRequest) {
  try {
    const { email, OTPPassword } = await request.json();
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    if (user.password !== OTPPassword) {
      return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
    }
    const token = jwt.sign({ sub: user.id }, "shhhhh");
    return NextResponse.json(
      { token, message: "Login successful" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
