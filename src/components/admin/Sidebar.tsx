"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ClipboardList,
  Users,
  MessageSquareMore,
  Settings,
} from "lucide-react";
import Image from "next/image";

const navItems = [
  { name: "Dashboard", icon: <LayoutDashboard size={20} />, href: "/adm" },
  {
    name: "Questions",
    icon: <ClipboardList size={20} />,
    href: "/adm/question",
  },
  { name: "Candidates", icon: <Users size={20} />, href: "/adm/candidate" },
  {
    name: "Feedbacks",
    icon: <MessageSquareMore size={20} />,
    href: "/adm/feedback",
  },
];

export default function Sidebar() {
  const path = usePathname() || "";

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex">
      <aside className="hidden md:flex flex-col justify-between w-64 bg-neutral-900/70 backdrop-blur border-r border-neutral-800 p-4 z-40">
        <div>
          <div className="flex flex-col items-center mb-6">
            <Image src="/csi-logo.webp" alt="CSI Logo" width={90} height={90} />
            <h1 className="text-xl font-bold text-white mt-4">Admin Panel</h1>
            <p className="text-sm text-neutral-400 mt-1">
              CINE&apos;24 Dashboard Access
            </p>
          </div>
          <nav className="space-y-2">
            {navItems.map((item) => {
              const isActive = path === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 w-full text-left px-4 py-2 rounded-md transition ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-neutral-300 hover:bg-neutral-800"
                  }`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <Link
          href="/adm/settings"
          className={`flex items-center gap-3 px-4 py-2 rounded-md transition ${
            path === "/adm/settings"
              ? "bg-blue-600 text-white"
              : "text-neutral-300 hover:bg-neutral-800"
          }`}
        >
          <Settings size={20} />
          <span>Settings</span>
        </Link>
      </aside>

      <nav className="md:hidden fixed bottom-2 left-1/2 -translate-x-1/2 rounded-full w-fit bg-neutral-900 border border-neutral-800 shadow-lg backdrop-blur z-30 px-4 py-3 flex gap-6 items-center justify-center">
        {navItems.map((item) => {
          const isActive = path === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center text-xs transition ${
                isActive ? "text-blue-500" : "text-neutral-400"
              }`}
            >
              {item.icon}
              <span>{item.name.split(" ")[0]}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
