"use client";

import Image from "next/image";
import { useState } from "react";
import BackgroundGridPattern from "@/components/ui/BackgroundGridPattern";
import { useRouter } from "next/navigation";
import { EyeIcon, EyeOffIcon, LogIn } from "lucide-react";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function AdminLoginPage() {
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [errors, setErrors] = useState<{
    adminEmail?: string;
    adminPassword?: string;
    general?: string;
  }>({});
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    const newErrors: typeof errors = {};
    if (!adminEmail.trim()) newErrors.adminEmail = "Email is required.";
    if (!adminPassword.trim())
      newErrors.adminPassword = "Password is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    const otpRes = await fetch("/api/auth/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: adminEmail,
        password: adminPassword,
      }),
    });

    const otpData = await otpRes.json().catch(() => ({}));

    if (!otpRes.ok) {
      setErrors({
        general: otpData.message || "Invalid email or password",
      });
      setLoading(false);
      return;
    }

    router.push(`/verify?email=${encodeURIComponent(adminEmail)}`);

    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-950 px-4 py-12">
      <BackgroundGridPattern />
      <Card className="z-10 w-full max-w-md p-8 shadow-lg">
        <div className="mb-6 flex flex-col items-center">
          <Image src="/csi-logo.webp" alt="CSI Logo" width={90} height={90} />
          <h1 className="mt-4 text-xl font-semibold text-white">Admin Panel</h1>
          <p className="mt-1 text-sm text-neutral-400">
            CINE&apos;24 Dashboard Access
          </p>
        </div>

        <form onSubmit={handleAdminLogin} className="space-y-5">
          <Input
            label="Email"
            type="text"
            id="adminEmail"
            value={adminEmail}
            onChange={(e) => setAdminEmail(e.target.value)}
            error={errors.adminEmail}
          />

          <div className="relative">
            <Input
              label="Password"
              type={showPassword ? "text" : "password"}
              id="adminPassword"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              error={errors.adminPassword}
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-[2.35rem] text-neutral-400 hover:text-white"
              tabIndex={-1}
            >
              {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
            </button>
          </div>

          {errors.general && (
            <p className="text-center text-sm text-red-500">{errors.general}</p>
          )}

          <Button type="submit" loading={loading} className="w-full">
            <LogIn size={16} />
            {loading ? "Verifying..." : "Sign In"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-neutral-500">
          © 2024 CSI | CINE&apos;24 Admin Panel
        </p>
      </Card>
    </div>
  );
}
