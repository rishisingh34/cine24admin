import { Suspense } from "react";
import AdminOTPVerifyPage from "@/components/admin/Verify";
import LoadingCenter from "@/components/ui/LoadingCenter";

export default function VerifyPage() {
  return (
    <Suspense fallback={<LoadingCenter className="h-screen" />}>
      <AdminOTPVerifyPage />
    </Suspense>
  );
}
