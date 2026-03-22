"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { api, ApiResponse } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

interface Clinic {
  id: string;
  name: string;
  location: string;
  rating: number;
  review_count: number;
  image_url: string;
  tags?: string[];
  highlights: Highlights[];
}

interface Highlights {
  id: string;
  clinic_id: string;
  hightlight_text: string
}

export default function ClinicsDirectoryPage() {
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  const fetchClinics = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (searchTerm) params.set("search", searchTerm);
    params.set("limit", "12");

    const res = await api.get<Clinic[]>(`/api/v1/clinics?${params.toString()}`);
    if (res.success && res.data) {
      setClinics(res.data);
      setTotal(res.meta?.total || res.data.length);
    }
    setLoading(false);
  }, [searchTerm]);

  useEffect(() => {
    const debounce = setTimeout(fetchClinics, 300);
    return () => clearTimeout(debounce);
  }, [fetchClinics]);

  const handleSaveClinic = async (clinicId: string) => {
    if (!isAuthenticated) {
      window.location.href = "/login";
      return;
    }
    await api.post(`/api/v1/saved-clinics/${clinicId}`);
  };

  console.log("Clinic: ", clinics)
  return (
    <div className="min-h-screen bg-white font-sans text-gray-800">
      <div className="bg-[#faf8f6] py-16 px-6 border-b border-gray-100">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-serif text-gray-900 mb-4">
            Find Your Ideal Clinic
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Discover top-rated aesthetic clinics near you. Browse verified
            reviews, compare treatments, and book your next appointment with
            confidence.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
          <div className="relative w-full md:w-1/2 lg:w-1/3">
            <input
              type="text"
              placeholder="Search by clinic name or city..."
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
          Showing <span className="text-gray-900 font-bold">{total}</span> clinics
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
                <div className="h-56 bg-gray-200" />
                <div className="p-6 space-y-3">
                  <div className="h-5 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                  <div className="h-10 bg-gray-200 rounded-xl mt-4" />
                </div>
              </div>
            ))}
          </div>
        ) : clinics.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {clinics.map((clinic) => (
              <div
                key={clinic.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="relative h-56 w-full overflow-hidden">
                  {clinic.image_url ? (
                    <Image src={clinic.image_url} alt={clinic.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#fdf4f5] to-[#f1c3c9] flex items-center justify-center">
                      <span className="text-5xl">🏥</span>
                    </div>
                  )}
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-bold text-xl text-gray-900 font-serif leading-tight">
                      {clinic.name}
                    </h3>
                    <button
                      onClick={() => handleSaveClinic(clinic.id)}
                      className="text-gray-300 hover:text-[#f1c3c9] transition-colors mt-1"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                    </button>
                  </div>

                  <div className="flex items-center text-gray-500 text-sm mb-4">
                    <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {clinic.location}
                  </div>

                  <div className="flex items-center gap-2 mb-6 text-sm">
                    <div className="flex text-yellow-400">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                    <span className="font-bold text-gray-900">{clinic.rating?.toFixed(1) || "0.0"}</span>
                    <span className="text-gray-400">({clinic.review_count || 0} reviews)</span>
                  </div>

                  <Link
                    href={`/clinic/${clinic.id}`}
                    className="mt-auto w-full bg-[#fdf4f5] hover:bg-[#f1c3c9] text-[#dcb5b9] hover:text-white border border-[#f1c3c9]/30 text-center py-2.5 rounded-xl font-serif font-medium transition-all duration-300"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-xl font-bold font-serif text-gray-900 mb-2">No clinics found</h3>
            <p className="text-gray-500">Try adjusting your search terms or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
