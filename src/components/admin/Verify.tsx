"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import BackgroundGridPattern from "@/components/ui/BackgroundGridPattern";

export default function AdminOTPVerifyPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const router = useRouter();

  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const updated = [...otp];
    updated[index] = value.slice(-1);
    setOtp(updated);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    if (updated.every((digit) => digit.length === 1)) {
      handleSubmitAuto(updated.join(""));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d{6}$/.test(pasted)) return;

    const digits = pasted.split("");
    setOtp(digits);
    digits.forEach((d, i) => {
      if (inputRefs.current[i]) inputRefs.current[i]!.value = d;
    });

    handleSubmitAuto(pasted);
  };

  const handleSubmitAuto = async (code: string) => {
    if (!email || code.length !== 6) return;

    setLoading(true);
    toast.loading("Verifying OTP..."); // ✅ show loading toast

    const result = await signIn("credentials", {
      email,
      otp: code,
      redirect: false,
    });

    setLoading(false);
    toast.dismiss(); // ✅ dismiss loading

    if (result?.ok && !result.error) {
      toast.success("OTP verified!");
      router.push("/admin");
    } else {
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
      toast.error("Invalid or expired OTP. Please try again.");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join("");
    if (code.length !== 6) {
      toast.error("Please enter the complete 6-digit OTP.");
      return;
    }
    handleSubmitAuto(code);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-950 px-4 py-12">
      <BackgroundGridPattern />
      <div className="w-full max-w-md bg-neutral-900/80 border border-neutral-800 backdrop-blur-md p-8 rounded-2xl shadow-lg z-10">
        <h2 className="text-center text-2xl font-bold text-white mb-2">
          Verify OTP
        </h2>
        <p className="text-sm text-center text-neutral-400 mb-6">
          Enter the 6-digit code sent to{" "}
          <span className="font-medium text-white">{email}</span>
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center gap-2">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <input
                key={i}
                type="text"
                maxLength={1}
                ref={(el) => {
                  inputRefs.current[i] = el;
                }}
                value={otp[i]}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                onPaste={handlePaste}
                className="w-12 h-12 text-center text-lg bg-neutral-800 border border-neutral-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-semibold transition duration-200 ease-in-out shadow hover:shadow-lg"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin w-5 h-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  />
                </svg>
                Verifying...
              </span>
            ) : (
              "Verify & Continue"
            )}
          </button>

          <button
            type="button"
            onClick={() => router.back()}
            className="text-sm text-neutral-400 hover:text-white mt-2 w-full text-center"
          >
            ← Back to Login
          </button>
        </form>
      </div>
    </div>
  );
}
