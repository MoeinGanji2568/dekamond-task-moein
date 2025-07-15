"use client";
import { Button } from "@/ui/Button";
import { Input } from "@/ui/RHFInput";
import { Typography } from "@/ui/Typography";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLogin } from "@/hooks/useLogin";
import { useRouter } from "next/navigation";

export const LoginPage = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const {
    sendEmail,
    verifyCode,
    loadingStep1,
    loadingStep2,
    errorStep1,
    errorStep2,
    reset,
  } = useLogin();
  const router = useRouter();

  // Step 1: Email form
  const {
    handleSubmit: handleEmailSubmit,
    register: registerEmail,
    formState: { errors: emailErrors },
  } = useForm<{ email: string }>({ defaultValues: { email: "" } });

  // Step 2: OTP form
  const {
    handleSubmit: handleOtpSubmit,
    register: registerOtp,
    formState: { errors: otpErrors },
  } = useForm<{ code: string }>({ defaultValues: { code: "" } });

  // Step 1 handler
  const onSubmitEmail = async ({ email }: { email: string }) => {
    reset();
    const ok = await sendEmail(email);
    if (ok) {
      setEmail(email);
      setStep(2);
    }
  };

  // Step 2 handler
  const onSubmitOtp = async ({ code }: { code: string }) => {
    reset();
    const ok = await verifyCode(email, code);
    if (ok) {
      setTimeout(() => {
        router.push("/profile");
      }, 2000);
    }
  };

  return (
    <div className="form">
      <Typography variant="h3">Login</Typography>
      {step === 1 && (
        <form onSubmit={handleEmailSubmit(onSubmitEmail)}>
          <Input
            label="Email"
            placeholder="Enter your email"
            register={registerEmail("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            })}
            error={emailErrors.email}
            type="email"
          />
          {errorStep1 && (
            <Typography variant="p" className="text-red-500">
              {errorStep1}
            </Typography>
          )}
          <Button disabled={loadingStep1}>
            {loadingStep1 ? "Loading..." : "Send Code"}
          </Button>
        </form>
      )}
      {step === 2 && (
        <form onSubmit={handleOtpSubmit(onSubmitOtp)}>
          <Input label="Email" value={email} disabled type="email" />
          <Input
            label="Code"
            placeholder="Enter the code you received"
            register={registerOtp("code", { required: "Code is required" })}
            error={otpErrors.code}
            type="text"
          />
          {errorStep2 && (
            <Typography variant="p" className="text-red-500">
              {errorStep2}
            </Typography>
          )}
          <Button disabled={loadingStep2}>
            {loadingStep2 ? "Loading..." : "Login"}
          </Button>
        </form>
      )}
    </div>
  );
};
