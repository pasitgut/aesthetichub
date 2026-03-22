"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: "📊" },
  { href: "/admin/clinics", label: "Clinics", icon: "🏥" },
  { href: "/admin/treatments", label: "Treatments", icon: "💆" },
  { href: "/admin/tags", label: "Tags", icon: "🏷️" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { isAdmin, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || !isAdmin)) {
      router.push("/");
    }
  }, [isLoading, isAuthenticated, isAdmin, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#fdf6f7] flex items-center justify-center">
        <div className="animate-pulse text-gray-400 font-serif text-lg">Loading Admin...</div>
      </div>
    );
  }

  if (!isAuthenticated || !isAdmin) return null;

  return (
    <div className="min-h-screen bg-[#fdf6f7] flex font-sans">
      {/* Sidebar - Light Premium Theme */}
      <aside className="w-64 bg-white border-r border-pink-100/50 flex flex-col shrink-0 sticky top-0 h-screen shadow-[4px_0_24px_rgba(241,195,201,0.15)] z-20">
        <div className="p-6 md:p-8">
          <Link href="/admin" className="text-2xl font-bold font-serif text-gray-900 tracking-tight flex items-center gap-2">
            AestheticHub
            <span className="text-xs bg-[#fdf4f5] text-[#dcb5b9] px-2 py-1 rounded-md font-sans font-bold tracking-wider uppercase">Admin</span>
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-[#f1c3c9] text-white shadow-md shadow-pink-100/50"
                    : "text-gray-500 hover:text-gray-900 hover:bg-[#fdf4f5]"
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-6 border-t border-pink-50/50">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium text-gray-500 hover:text-gray-900 hover:bg-[#fdf4f5] transition-all"
          >
            <span className="text-xl">🌐</span>
            Back to Site
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-[#f8f7f5]/40 w-full">
        {children}
      </main>
    </div>
  );
}
