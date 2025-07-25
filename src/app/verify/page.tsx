import { Suspense } from "react";
import AdminOTPVerifyPage from "@/components/admin/Verify";
import BackgroundGrid from "@/components/ui/BackgroundGridPattern";

export default function VerifyPage() {
  return (
    <Suspense
      fallback={<div className="text-white bg-black text-center p-8">Loading...</div>}
    >
      <BackgroundGrid />
      <AdminOTPVerifyPage />
    </Suspense>
  );
}