"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { api } from "@/lib/api";

interface Treatment {
  id: string;
  name: string;
  clinic_name: string;
  clinic_id: string;
  price: number;
  duration: string;
  rating: number;
  review_count: number;
  tags: string[];
  image_url: string;
}

export default function TreatmentsDirectoryPage() {
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchTreatments = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (searchTerm) params.set("search", searchTerm);
    params.set("limit", "12");

    const res = await api.get<Treatment[]>(`/api/v1/treatments?${params.toString()}`);
    if (res.success && res.data) {
      setTreatments(res.data);
      setTotal(res.meta?.total || res.data.length);
    }
    setLoading(false);
  }, [searchTerm]);

  useEffect(() => {
    const debounce = setTimeout(fetchTreatments, 300);
    return () => clearTimeout(debounce);
  }, [fetchTreatments]);

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800">
      <div className="bg-[#faf8f6] py-16 px-6 border-b border-gray-100">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-serif text-gray-900 mb-4">
            Explore Treatments
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            From anti-aging solutions to skin rejuvenation, find the perfect
            procedure for your beauty goals. Compare prices and book top-rated
            treatments.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
          <div className="relative w-full md:w-1/2 lg:w-1/3">
            <input
              type="text"
              placeholder="Search treatments or clinics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f1c3c9] focus:border-transparent font-serif text-gray-700 transition-all bg-gray-50/50"
            />
            <svg className="w-5 h-5 absolute left-4 top-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        <div className="mb-6 text-gray-500 font-medium text-sm">
          Showing <span className="text-gray-900 font-bold">{total}</span> treatments
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
                <div className="h-52 bg-gray-200" />
                <div className="p-6 space-y-3">
                  <div className="h-5 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                  <div className="h-10 bg-gray-200 rounded-xl mt-4" />
                </div>
              </div>
            ))}
          </div>
        ) : treatments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {treatments.map((treatment) => (
              <div
                key={treatment.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="relative h-52 w-full overflow-hidden">
                  {treatment.image_url ? (
                    <Image src={treatment.image_url} alt={treatment.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#fdf4f5] to-[#f1c3c9] flex items-center justify-center">
                      <span className="text-5xl">💆</span>
                    </div>
                  )}
                  {treatment.tags && treatment.tags.length > 0 && (
                    <div className="absolute top-4 left-4 flex gap-2">
                      {treatment.tags.slice(0, 2).map((tag, idx) => (
                        <span key={idx} className="bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                          {typeof tag === 'string' ? tag : (tag as any).name}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <div className="mb-4">
                    <h3 className="font-bold text-xl text-gray-900 font-serif leading-tight mb-1">{treatment.name}</h3>
                    {treatment.clinic_name && (
                      <Link href={treatment.clinic_id ? `/clinic/${treatment.clinic_id}` : "#"} className="text-[#dcb5b9] text-sm font-medium hover:underline flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1v1H9V7zm5 0h1v1h-1V7zm-5 4h1v1H9v-1zm5 0h1v1h-1v-1zm-5 4h1v1H9v-1zm5 0h1v1h-1v-1z" />
                        </svg>
                        {treatment.clinic_name}
                      </Link>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-sm text-gray-600 mb-6">
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-400 mb-0.5">Starting from</span>
                      <span className="font-bold text-xl text-gray-900">฿{treatment.price?.toLocaleString()}</span>
                    </div>
                    <div className="flex flex-col justify-end">
                      <div className="flex items-center gap-1.5 text-yellow-400">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="font-bold text-gray-900">{treatment.rating?.toFixed(1) || "0.0"}</span>
                        <span className="text-gray-400 text-xs">({treatment.review_count || 0})</span>
                      </div>
                    </div>
                    {treatment.duration && (
                      <div className="flex items-center col-span-2 text-gray-500 pt-2 border-t border-gray-100">
                        <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {treatment.duration}
                      </div>
                    )}
                  </div>

                  <div className="mt-auto flex gap-3">
                    <Link
                      href={`/treatment/${treatment.id}`}
                      className="flex-1 bg-[#fdf4f5] hover:bg-[#f1c3c9] text-[#dcb5b9] hover:text-white border border-[#f1c3c9]/30 text-center py-2.5 rounded-xl font-serif font-medium transition-all duration-300"
                    >
                      Details
                    </Link>
                    <Link
                      href={`/compare?ids=${treatment.id}`}
                      className="flex-1 bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 py-2.5 rounded-xl font-serif font-medium transition-all duration-300 text-center"
                    >
                      Compare
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
            <div className="text-4xl mb-4">✨</div>
            <h3 className="text-xl font-bold font-serif text-gray-900 mb-2">No treatments found</h3>
            <p className="text-gray-500">We couldn&apos;t find any treatments matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
