"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import Link from "next/link";
import Image from "next/image";

interface Stats {
  clinics: number;
  treatments: number;
  tags: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ clinics: 0, treatments: 0, tags: 0 });

  useEffect(() => {
    Promise.all([
      api.get<unknown[]>("/api/v1/clinics?limit=1"),
      api.get<unknown[]>("/api/v1/treatments?limit=1"),
      api.get<unknown[]>("/api/v1/tags"),
    ]).then(([c, t, tg]) => {
      setStats({
        clinics: c.meta?.total || (c.data as unknown[])?.length || 0,
        treatments: t.meta?.total || (t.data as unknown[])?.length || 0,
        tags: Array.isArray(tg.data) ? tg.data.length : 0,
      });
    });
  }, []);

  const cards = [
    { label: "Total Clinics", value: stats.clinics, icon: "🏥", href: "/admin/clinics", bg: "bg-white", border: "border-pink-100", textColor: "text-gray-900", iconBg: "bg-[#fdf4f5]", iconColor: "text-[#f1c3c9]" },
    { label: "Active Treatments", value: stats.treatments, icon: "💆", href: "/admin/treatments", bg: "bg-[#f1c3c9]", border: "border-[#f1c3c9]", textColor: "text-white", iconBg: "bg-white/20", iconColor: "text-white" },
    { label: "Total Tags", value: stats.tags, icon: "🏷️", href: "/admin/tags", bg: "bg-white", border: "border-gray-100", textColor: "text-gray-900", iconBg: "bg-gray-50", iconColor: "text-gray-400" },
  ];

  return (
    <div className="p-8 md:p-12 max-w-7xl mx-auto">
      <div className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 font-serif mb-2">Welcome Back, Admin</h1>
          <p className="text-gray-500 font-medium">Here's what's happening in your clinic directory today.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className={`relative overflow-hidden rounded-[2rem] p-8 shadow-sm hover:shadow-md transition-all group border ${card.bg} ${card.border}`}
          >
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl ${card.iconBg}`}>
                  {card.icon}
                </div>
                <svg className={`w-5 h-5 opacity-60 group-hover:translate-x-1 transition-transform ${card.textColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <p className={`text-5xl font-bold font-serif mb-2 ${card.textColor}`}>{card.value}</p>
              <p className={`font-medium ${card.bg.includes('white') ? 'text-gray-500' : 'text-white/90'}`}>{card.label}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="bg-white rounded-[2rem] border border-gray-100 p-8 md:p-10 shadow-sm relative overflow-hidden">
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-[#fdf4f5] rounded-full opacity-50 blur-3xl point-events-none"></div>
        <div className="relative z-10">
          <h2 className="text-2xl font-bold text-gray-900 font-serif mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Link href="/admin/clinics" className="flex items-start gap-4 p-6 border border-gray-100 rounded-2xl hover:border-[#f1c3c9] hover:bg-[#fdf4f5] transition-all group">
              <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center group-hover:bg-white transition-colors shrink-0 shadow-sm">
                <span className="text-2xl">✨</span>
              </div>
              <div>
                <p className="font-bold text-gray-900 mb-1">Add Clinic</p>
                <p className="text-xs text-gray-500 leading-relaxed max-w-[140px]">Create a new clinic listing with highlights and images</p>
              </div>
            </Link>
            <Link href="/admin/treatments" className="flex items-start gap-4 p-6 border border-gray-100 rounded-2xl hover:border-[#f1c3c9] hover:bg-[#fdf4f5] transition-all group">
              <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center group-hover:bg-white transition-colors shrink-0 shadow-sm">
                <span className="text-2xl">💉</span>
              </div>
              <div>
                <p className="font-bold text-gray-900 mb-1">Add Treatment</p>
                <p className="text-xs text-gray-500 leading-relaxed max-w-[140px]">Create a new treatment offering linked to a clinic</p>
              </div>
            </Link>
            <Link href="/admin/tags" className="flex items-start gap-4 p-6 border border-gray-100 rounded-2xl hover:border-[#f1c3c9] hover:bg-[#fdf4f5] transition-all group">
              <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center group-hover:bg-white transition-colors shrink-0 shadow-sm">
                <span className="text-2xl">🔖</span>
              </div>
              <div>
                <p className="font-bold text-gray-900 mb-1">Add Tag</p>
                <p className="text-xs text-gray-500 leading-relaxed max-w-[140px]">Create a new category tag for filtering</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
