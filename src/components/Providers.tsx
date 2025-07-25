"use client";
import { Toaster } from "sonner";

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Toaster richColors position="top-right" duration={2000} />
      {children}
    </div>
  );
}

export default Providers