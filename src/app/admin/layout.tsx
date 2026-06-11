"use client";

import React from "react";
import Sidebar from "@/components/admin/Sidebar";
import BackgroundGridPattern from "@/components/ui/BackgroundGridPattern";

function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-neutral-950">
      <BackgroundGridPattern />
      <Sidebar />
      <main className="z-10 min-h-screen flex-1 px-6 py-6 text-white">
        {children}
      </main>
    </div>
  );
}

export default AdminLayout;
