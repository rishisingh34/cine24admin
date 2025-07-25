"use client";
import { Toaster } from "sonner";

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Toaster richColors position="top-right" />
      {children}
    </div>
  );
}

export default Providers