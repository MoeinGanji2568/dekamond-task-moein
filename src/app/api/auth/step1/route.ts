import { fetchRandomUser } from "@/core/services/api/user/loginService";
import { PrismaClient } from "@/generated/prisma";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const randomUser = await fetchRandomUser();
    const { email } = await request.json();

    if (
      !email ||
      !randomUser?.login?.username ||
      !randomUser?.login?.password ||
      !randomUser?.name?.first
    ) {
      return NextResponse.json(
        { error: "Missing required user data" },
        { status: 400 }
      );
    }

    const randomUserData = {
      username: String(randomUser.login.username),
      email: String(email),
      name: String(randomUser.name.first),
      password: String(randomUser.login.password),
      phone: String(randomUser.phone),
      address: String(randomUser.location?.street?.name || ""),
      city: String(randomUser.location?.city || ""),
      state: String(randomUser.location?.state || ""),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const user = await prisma.user.upsert({
      where: { email: randomUserData.email },
      update: randomUserData,
      create: randomUserData,
    });

    if (!user) {
      return NextResponse.json(
        { error: "There is something wrong" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { id: user.id, OTPPassword: randomUser.login.password },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("API Error:", error);
    let message = "Internal Server Error";
    if (error instanceof Error) message = error.message;
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
