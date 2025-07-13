"use client";

import React from "react";
import Sidebar from "@/components/admin/Sidebar";
import BackgroundGridPattern from "@/components/ui/BackgroundGridPattern";

function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-neutral-950 flex">
      <BackgroundGridPattern />
      <Sidebar />
      <div className="flex-1 min-h-screen text-white z-10">
        {children}
      </div>
    </div>
  );
}

export default AdminLayout;
