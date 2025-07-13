"use client";

import Image from "next/image";
import { useState } from "react";
import BackgroundGridPattern from "@/components/ui/BackgroundGridPattern";
import { redirect } from "next/navigation";

export default function Home() {
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [errors, setErrors] = useState<{
    adminEmail?: string;
    adminPassword?: string;
  }>({});

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};

    if (!adminEmail.trim())
      newErrors.adminEmail = "Email is required.";
    if (!adminPassword.trim())
      newErrors.adminPassword = "Password is required.";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Proceed with login (e.g., API call)
      console.log("Logging in admin:", { adminEmail, adminPassword });

      redirect("/admin");
      // Add success toast / redirect here
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-950 px-4 py-12">
      <BackgroundGridPattern />
      <div className="backdrop-blur-lg border border-neutral-800 bg-neutral-900/70 rounded-2xl w-full max-w-md z-10 shadow-lg p-8">
        <div className="flex flex-col items-center mb-6">
          <Image src="/csi-logo.webp" alt="CSI Logo" width={90} height={90} />
          <h1 className="text-xl font-bold text-white mt-4">Admin Panel</h1>
          <p className="text-sm text-neutral-400 mt-1">
            CINE&apos;24 Dashboard Access
          </p>
        </div>

        <form onSubmit={handleAdminLogin} className="space-y-5">
          {/* Email */}
          <div className="relative">
            <input
              type="text"
              id="adminEmail"
              value={adminEmail}
              onChange={(e) => setAdminEmail(e.target.value)}
              className="peer w-full bg-neutral-800 text-white border border-neutral-700 rounded-md px-4 py-3 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Email"
            />
            <label
              htmlFor="adminEmail"
              className={`absolute left-4 text-sm transition-all ${
                adminEmail
                  ? "top-[-10px] text-xs text-blue-400"
                  : "top-3.5 text-sm text-neutral-400 peer-focus:top-[-10px] peer-focus:text-xs peer-focus:text-blue-400"
              }`}
            >
              Email
            </label>
            {errors.adminEmail && (
              <p className="text-red-400 text-xs mt-1">
                {errors.adminEmail}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type="password"
              id="adminPassword"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              className="peer w-full bg-neutral-800 text-white border border-neutral-700 rounded-md px-4 py-3 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Password"
            />
            <label
              htmlFor="adminPassword"
              className={`absolute left-4 text-sm transition-all ${
                adminPassword
                  ? "top-[-10px] text-xs text-blue-400"
                  : "top-3.5 text-sm text-neutral-400 peer-focus:top-[-10px] peer-focus:text-xs peer-focus:text-blue-400"
              }`}
            >
              Password
            </label>
            {errors.adminPassword && (
              <p className="text-red-400 text-xs mt-1">
                {errors.adminPassword}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-semibold transition duration-200 ease-in-out shadow hover:shadow-lg"
          >
            🔐 Sign In
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-neutral-500">
          © 2024 CSI | CINE&apos;24 Admin Panel
        </p>
      </div>
    </div>
  );
}
