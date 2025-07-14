import { fetchRandomUser } from "@/core/services/api/user/loginService";
import { PrismaClient } from "@/generated/prisma";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const prisma = new PrismaClient();

const MAIL_PORT = 465;
const MAIL_HOST = "smtp.c1.liara.email";
const MAIL_USER = "elegant_babbage_5rs9g5";
const MAIL_PASSWORD = "5704b438-0810-4f95-bad1-8874ea5518e6";
const MAIL_FROM = "verification@mohammadbadangiz.ir";
export const transporter = nodemailer.createTransport({
  host: MAIL_HOST,
  port: MAIL_PORT,
  secure: true,
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASSWORD,
  },
});

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
    try {
      const mailOptions = {
        from: MAIL_FROM,
        to: email,
        subject: "Verification Code",
        text: `Your verification code is: ${randomUser.login.password}`,
      };
      await transporter.sendMail(mailOptions);
    } catch (error) {
      console.error("Error sending email:", error);
    }
    return NextResponse.json(
      {
        id: user.id,
        OTPPassword: randomUser.login.password,
        message:
          "Email sent successfully, please check your email for the verification code",
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("API Error:", error);
    let message = "Internal Server Error";
    if (error instanceof Error) message = error.message;
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
