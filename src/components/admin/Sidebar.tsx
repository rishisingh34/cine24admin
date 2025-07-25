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
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { signOut } from "next-auth/react";

const navItems = [
  { name: "Dashboard", icon: <LayoutDashboard size={20} />, href: "/admin" },
  {
    name: "Questions",
    icon: <ClipboardList size={20} />,
    href: "/admin/question",
  },
  { name: "Candidates", icon: <Users size={20} />, href: "/admin/candidate" },
  {
    name: "Feedbacks",
    icon: <MessageSquareMore size={20} />,
    href: "/admin/feedback",
  },
  { name: "Settings", icon: <Settings size={20} />, href: "/admin/settings" },
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
      {/* Hamburger icon */}
      <div className="md:hidden fixed top-4 right-4 z-50">
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="bg-neutral-800 p-2 rounded-md text-white hover:bg-neutral-700"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div className="min-h-screen bg-neutral-950 text-white flex font-bold">
        <aside
          className={`
            fixed z-40 w-64 h-full bg-neutral-900/70 backdrop-blur border-r border-neutral-800
            flex flex-col justify-between p-4 transition-transform duration-300 ease-in-out
            ${
              isOpen ? "translate-x-0" : "-translate-x-full"
            } md:translate-x-0 md:static md:flex
          `}
        >
          <div>
            <div className="flex flex-col items-center mb-6">
              <Image
                src="/csi-logo.webp"
                alt="CSI Logo"
                width={90}
                height={90}
              />
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
                    onClick={handleNavClick}
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

          <button
            onClick={() => {
              handleLogout();
              setIsOpen(false);
            }}
            className="flex items-center gap-3 px-4 py-2 rounded-md text-neutral-300 hover:bg-neutral-800 transition w-full"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </aside>

      </div>
    </>
  );
}
