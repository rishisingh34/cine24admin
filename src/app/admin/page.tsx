"use client";

import React from "react";
import Link from "next/link";
import {
  ClipboardList,
  Users,
  MessageSquareMore,
  Plus,
  BarChart,
} from "lucide-react";
import StatsOverviewCard from "@/components/admin/dashboard/StatsOverviewCard";
import LeaderboardCard from "@/components/admin/dashboard/LeaderboardCard";
import RecentFeedbacksCard from "@/components/admin/dashboard/RecentFeedbacksCard";
import RecentCandidatesCard from "@/components/admin/dashboard/RecentCandidatesCard";
import SystemLogsCard from "@/components/admin/dashboard/SystemLogsCard";

function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
        <Link
          href="/adm/question/create"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
        >
          <Plus size={18} /> Add Question
        </Link>
      </div>

      {/* System Logs (Top Right fixed-sized) */}
      <div className="flex justify-end">
        <SystemLogsCard />
      </div>

      {/* Stats + Leaderboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <StatsOverviewCard />
        <div className="lg:col-span-2">
          <LeaderboardCard />
        </div>
      </div>

      {/* Recent Feedbacks and Candidates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <RecentFeedbacksCard />
        <RecentCandidatesCard />
      </div>

      {/* Mobile Navigation Cards */}
      <div className="md:hidden grid grid-cols-2 gap-4 mt-8">
        {[
          {
            name: "Candidates",
            href: "/admin/candidate",
            icon: <Users size={20} />,
          },
          {
            name: "Questions",
            href: "/admin/question",
            icon: <ClipboardList size={20} />,
          },
          {
            name: "Feedbacks",
            href: "/admin/feedback",
            icon: <MessageSquareMore size={20} />,
          },
          {
            name: "Analytics",
            href: "/admin/analytics",
            icon: <BarChart size={20} />,
          },
        ].map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="flex flex-col items-center justify-center bg-neutral-900 border border-neutral-800 p-4 rounded-xl text-white hover:bg-neutral-800"
          >
            {item.icon}
            <span className="mt-2 text-sm">{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;
