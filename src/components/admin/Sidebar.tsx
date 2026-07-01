"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  ClipboardList,
  Users,
  MessageSquareMore,
  Settings,
  LogOut,
  Menu,
  X,
  Plus,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/admin" },
  { name: "Questions", icon: ClipboardList, href: "/admin/question" },
  { name: "Candidates", icon: Users, href: "/admin/candidate" },
  { name: "Feedbacks", icon: MessageSquareMore, href: "/admin/feedback" },
  { name: "Add Feedback", icon: Plus, href: "/admin/add-feedback" },
  { name: "Settings", icon: Settings, href: "/admin/settings" },
];

export default function Sidebar() {
  const path = usePathname() || "";
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  const handleNavClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className="fixed right-4 top-4 z-50 md:hidden">
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="rounded-lg bg-neutral-800 p-2 text-white hover:bg-neutral-700"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div className="flex h-screen bg-neutral-950 text-white">
        <aside
          className={cn(
            "fixed z-40 flex h-full w-64 flex-col justify-between border-r border-neutral-800 bg-neutral-900/70 p-4 backdrop-blur-xl transition-transform duration-300 ease-out",
            isOpen ? "translate-x-0" : "-translate-x-full",
            "md:static md:flex md:translate-x-0"
          )}
        >
          <div>
            <div className="mb-6 flex flex-col items-center">
              <Image
                src="/csi-logo.webp"
                alt="CSI Logo"
                width={90}
                height={90}
                loading="eager"
                priority
                style={{ width: 90, height: "auto" }}
              />
              <h1 className="mt-4 text-xl font-semibold text-white">
                Admin Panel
              </h1>
              <p className="mt-1 text-sm text-neutral-400">
                CINE&apos;24 Dashboard Access
              </p>
            </div>

            <nav className="space-y-1">
              {navItems.map((item) => {
                let isActive = path === item.href;
                if (item.href !== "/admin") {
                  isActive = path.startsWith(item.href);
                }

                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={handleNavClick}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-left text-sm font-medium transition duration-200 ease-out",
                      isActive
                        ? "bg-blue-600 text-white"
                        : "text-neutral-300 hover:bg-neutral-800"
                    )}
                  >
                    <Icon size={20} strokeWidth={1.5} />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          <button
            onClick={() => {
              handleLogout();
              setIsOpen(false);
            }}
            className="flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-neutral-300 transition duration-200 ease-out hover:bg-neutral-800"
          >
            <LogOut size={20} strokeWidth={1.5} />
            <span>Logout</span>
          </button>
        </aside>
      </div>
    </>
  );
}
