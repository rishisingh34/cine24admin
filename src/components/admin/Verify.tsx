"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import BackgroundGridPattern from "@/components/ui/BackgroundGridPattern";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

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
    toast.loading("Verifying OTP...");

    const result = await signIn("credentials", {
      email,
      otp: code,
      redirect: false,
    });

    setLoading(false);
    toast.dismiss();

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
    <div className="flex min-h-screen items-center justify-center bg-neutral-950 px-4 py-12">
      <BackgroundGridPattern />
      <Card className="z-10 w-full max-w-md p-8 shadow-lg">
        <h2 className="mb-2 text-center text-2xl font-semibold text-white">
          Verify OTP
        </h2>
        <p className="mb-6 text-center text-sm text-neutral-400">
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
                className="h-12 w-12 rounded-lg border border-neutral-700 bg-neutral-800 text-center text-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ))}
          </div>

          <Button type="submit" loading={loading} className="w-full">
            {loading ? "Verifying..." : "Verify & Continue"}
          </Button>

          <button
            type="button"
            onClick={() => router.back()}
            className="mt-2 w-full text-center text-sm text-neutral-400 hover:text-white"
          >
            ← Back to Login
          </button>
        </form>
      </Card>
    </div>
  );
}
