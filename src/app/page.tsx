"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";

interface Clinic {
  id: string;
  name: string;
  location: string;
  rating: number;
  review_count: number;
  image_url: string;
}

export default function HomePage() {
  const [clinics, setClinics] = useState<Clinic[]>([]);

  useEffect(() => {
    api.get<Clinic[]>("/api/v1/clinics?limit=3").then((res) => {
      if (res.success && res.data) {
        setClinics(res.data);
      }
    });
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      {/* 1. Hero Section */}
      <section className="bg-[#fcf6f6] px-6 py-12 md:py-20">
        <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-8">
          <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left">
            <div className="bg-white/60 inline-block p-6 rounded-2xl backdrop-blur-sm">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight mb-4 text-gray-900">
                Find Your Perfect <br className="hidden lg:block" /> Aesthetic
                Treatment with <br className="hidden lg:block" /> AI
              </h1>
              <p className="text-gray-600 text-sm md:text-base max-w-md mx-auto lg:mx-0 mb-8 font-serif leading-relaxed">
                Personalized cosmetic treatment recommendations powered by
                advanced AI technology. Discover the best options for your
                unique skin concerns.
              </p>

              <Link
                href={"/assessment"}
                className="bg-black hover:bg-gray-800 text-white font-serif px-8 py-3.5 rounded-full text-lg transition shadow-lg"
              >
                Start Assessment
              </Link>

              <div className="flex items-center justify-center lg:justify-start gap-8 mt-10">
                <div>
                  <h3 className="text-2xl font-bold font-serif">10k+</h3>
                  <p className="text-xs text-gray-500 mt-1 uppercase tracking-wide">
                    Assessments
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold font-serif">95%</h3>
                  <p className="text-xs text-gray-500 mt-1 uppercase tracking-wide">
                    Satisfaction
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold font-serif">200+</h3>
                  <p className="text-xs text-gray-500 mt-1 uppercase tracking-wide">
                    Treatments
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 relative h-[300px] sm:h-[400px] lg:h-[500px]">
            <Image
              src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1200&auto=format&fit=crop"
              alt="Modern Clinic Interior"
              fill
              className="object-cover rounded-[2rem] shadow-2xl"
              priority
            />
          </div>
        </div>
      </section>

      {/* 2. Clinics Section */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <h2 className="text-4xl font-serif font-bold mb-8">Clinics</h2>

        {/* Clinic Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {clinics.map((clinic) => (
            <div
              key={clinic.id}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden flex flex-col hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-48 w-full">
                {clinic.image_url ? (
                  <Image
                    src={clinic.image_url}
                    alt={clinic.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#fdf4f5] to-[#f1c3c9] flex items-center justify-center">
                    <span className="text-4xl">🏥</span>
                  </div>
                )}
              </div>

              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 rounded-md bg-[#fdf4f5] flex items-center justify-center shrink-0">
                    <span className="text-[#f1c3c9] text-xl">✦</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 leading-tight">
                      {clinic.name}
                    </h3>
                    <div className="flex items-center text-gray-500 text-sm mt-1">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {clinic.location}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-6 text-sm">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="font-bold text-gray-900">
                    {clinic.rating?.toFixed(1) || "0.0"}
                  </span>
                  <span className="text-gray-500">
                    ({clinic.review_count || 0} reviews)
                  </span>
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

          {clinics.length === 0 && (
            <div className="col-span-full text-center py-20 text-gray-400">
              <p className="text-lg font-serif">No clinics available yet.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
