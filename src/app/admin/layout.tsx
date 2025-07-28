"use client";

import React from "react";
import Sidebar from "@/components/admin/Sidebar";
import BackgroundGridPattern from "@/components/ui/BackgroundGridPattern";
// import { useEffect } from "react";

function AdminLayout({ children }: { children: React.ReactNode }) {

  // useEffect(() => {
  //   const fetchBackend = async () => {
  //     try {
  //       const response = await fetch("/api/fetch-token");
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch token");
  //       }
  //       const data = await response.json();
  //       console.log("Token fetched successfully:", data.token);
  //       if (!data.token) {
  //         throw new Error("Token not found in response");
  //       }
  //       const res = await fetch("http://localhost:8080/api/exams", {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${data.token}`,
  //         },
  //       })
  //       if (!res.ok) {
  //         throw new Error("Failed to fetch exams");
  //       }
  //       const dataa = await res.json();
  //       console.log("Exams fetched successfully:", dataa);
  //     } catch (error) {
  //       console.error("Error fetching token:", error);
  //     }
  //   }
  //   fetchBackend();
  // }, []);
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
