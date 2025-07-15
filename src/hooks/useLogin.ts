import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

export function useLogin() {
  const [loadingStep1, setLoadingStep1] = useState(false);
  const [loadingStep2, setLoadingStep2] = useState(false);
  const [errorStep1, setErrorStep1] = useState<string | null>(null);
  const [errorStep2, setErrorStep2] = useState<string | null>(null);

  function getErrorMessage(err: unknown, fallback: string) {
    if (
      typeof err === "object" &&
      err !== null &&
      "response" in err &&
      typeof (err as { response?: unknown }).response === "object" &&
      (err as { response?: { data?: unknown } }).response?.data &&
      typeof (err as { response: { data: unknown } }).response.data ===
        "object" &&
      (err as { response: { data: { error?: unknown } } }).response.data &&
      "error" in
        (err as { response: { data: { error?: unknown } } }).response.data
    ) {
      const errorVal = (err as { response: { data: { error?: unknown } } })
        .response.data.error;
      if (typeof errorVal === "string") return errorVal;
    }
    return fallback;
  }

  // Step 1
  const sendEmail = async (email: string) => {
    setLoadingStep1(true);
    setErrorStep1(null);
    try {
      const res = await axios.post("/api/auth/step1", { email });
      toast.success(res.data.message || "code sent");
      return true;
    } catch (err: unknown) {
      const msg = getErrorMessage(err, "error in sending email");
      setErrorStep1(msg);
      toast.error(msg);
      return false;
    } finally {
      setLoadingStep1(false);
    }
  };

  // Step 2
  const verifyCode = async (email: string, code: string) => {
    setLoadingStep2(true);
    setErrorStep2(null);
    try {
      const res = await axios.post("/api/auth/step2", {
        email,
        OTPPassword: code,
      });
      toast.success(res.data.message || "login successful");
      localStorage.setItem("token", res.data.token);
      document.cookie = `token=${res.data.token}; path=/;`;
      return true;
    } catch (err: unknown) {
      const msg = getErrorMessage(err, "code is not valid");
      setErrorStep2(msg);
      toast.error(msg);
      return false;
    } finally {
      setLoadingStep2(false);
    }
  };

  const reset = () => {
    setErrorStep1(null);
    setErrorStep2(null);
  };

  return {
    sendEmail,
    verifyCode,
    loadingStep1,
    loadingStep2,
    errorStep1,
    errorStep2,
    reset,
  };
}
