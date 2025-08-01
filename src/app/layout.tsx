import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import { UserProvider } from "@/context/user/UserContext";
import { Toaster } from "react-hot-toast";
import Header from "@/components/Header/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Task Test",
  description: "Moein Ganji Task Test",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Toaster />
        <Header />
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  );
}
