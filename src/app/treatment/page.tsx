"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// --- Mock Data ---
const allTreatments = [
  {
    id: "t1",
    name: "Advanced Botox Treatment",
    clinic: "Radiant Skin Clinic",
    price: "$450",
    duration: "30-45 min",
    rating: 4.9,
    reviews: 89,
    tags: ["Anti-Aging", "Face"],
    image:
      "https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "t2",
    name: "Dermal Filler Package",
    clinic: "Glow Medical Spa",
    price: "$650",
    duration: "45-60 min",
    rating: 4.8,
    reviews: 124,
    tags: ["Volume", "Face"],
    image:
      "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "t3",
    name: "Laser Hair Removal",
    clinic: "Elite Aesthetics",
    price: "$150",
    duration: "30 min",
    rating: 4.7,
    reviews: 312,
    tags: ["Laser", "Body"],
    image:
      "https://images.unsplash.com/photo-1534644107580-3a4dbd494a95?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "t4",
    name: "Signature HydraFacial",
    clinic: "Lumina Beauty Hub",
    price: "$199",
    duration: "60 min",
    rating: 5.0,
    reviews: 205,
    tags: ["Skincare", "Glow"],
    image:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "t5",
    name: "Chemical Peel - Glycolic",
    clinic: "DermaCare Center",
    price: "$250",
    duration: "30 min",
    rating: 4.6,
    reviews: 87,
    tags: ["Peel", "Acne"],
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "t6",
    name: "Microneedling Therapy",
    clinic: "Aura Wellness Clinic",
    price: "$350",
    duration: "45 min",
    rating: 4.8,
    reviews: 156,
    tags: ["Texture", "Scars"],
    image:
      "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=800&auto=format&fit=crop",
  },
];

export default function TreatmentsDirectoryPage() {
  const [searchTerm, setSearchTerm] = useState("");

  // ฟังก์ชันกรองทรีตเมนต์ตามคำค้นหา (ค้นหาจากชื่อ หรือ คลินิก)
  const filteredTreatments = allTreatments.filter((t) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      t.name.toLowerCase().includes(searchLower) ||
      t.clinic.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800">
      {/* 1. Page Header / Banner */}
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
        {/* 2. Search & Filter Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
          {/* Search Input */}
          <div className="relative w-full md:w-1/2 lg:w-1/3">
            <input
              type="text"
              placeholder="Search treatments or clinics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f1c3c9] focus:border-transparent font-serif text-gray-700 transition-all bg-gray-50/50"
            />
            <svg
              className="w-5 h-5 absolute left-4 top-3.5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {/* Dropdown Filters (Visual Only) */}
          <div className="flex w-full md:w-auto gap-3">
            <select className="flex-1 md:w-40 px-4 py-3 border border-gray-200 rounded-xl bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-[#f1c3c9] font-serif text-gray-600 appearance-none cursor-pointer">
              <option value="">Category</option>
              <option value="face">Face & Skin</option>
              <option value="body">Body Contouring</option>
              <option value="injectables">Injectables</option>
            </select>
            <select className="flex-1 md:w-40 px-4 py-3 border border-gray-200 rounded-xl bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-[#f1c3c9] font-serif text-gray-600 appearance-none cursor-pointer">
              <option value="">Price Range</option>
              <option value="under500">Under $500</option>
              <option value="500to1000">$500 - $1000</option>
              <option value="over1000">Over $1000</option>
            </select>
          </div>
        </div>

        {/* 3. Results Count */}
        <div className="mb-6 text-gray-500 font-medium text-sm">
          Showing{" "}
          <span className="text-gray-900 font-bold">
            {filteredTreatments.length}
          </span>{" "}
          treatments
        </div>

        {/* 4. Treatments Grid */}
        {filteredTreatments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTreatments.map((treatment) => (
              <div
                key={treatment.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
              >
                {/* Card Image */}
                <div className="relative h-52 w-full overflow-hidden">
                  <Image
                    src={treatment.image}
                    alt={treatment.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Tags Badges overlaid on image */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    {treatment.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-bold px-3 py-1 rounded-full shadow-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  {/* Quick Save Button */}
                  <button className="absolute top-4 right-4 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-400 hover:text-[#f1c3c9] transition-colors shadow-sm">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  </button>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col">
                  {/* Title & Clinic */}
                  <div className="mb-4">
                    <h3 className="font-bold text-xl text-gray-900 font-serif leading-tight mb-1">
                      {treatment.name}
                    </h3>
                    <Link
                      href="#"
                      className="text-[#dcb5b9] text-sm font-medium hover:underline flex items-center"
                    >
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1v1H9V7zm5 0h1v1h-1V7zm-5 4h1v1H9v-1zm5 0h1v1h-1v-1zm-5 4h1v1H9v-1zm5 0h1v1h-1v-1z"
                        />
                      </svg>
                      {treatment.clinic}
                    </Link>
                  </div>

                  {/* Details Row: Price, Duration, Rating */}
                  <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-sm text-gray-600 mb-6">
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-400 mb-0.5">
                        Starting from
                      </span>
                      <span className="font-bold text-xl text-gray-900">
                        {treatment.price}
                      </span>
                    </div>
                    <div className="flex flex-col justify-end">
                      <div className="flex items-center gap-1.5 text-yellow-400">
                        <svg
                          className="w-4 h-4 fill-current"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="font-bold text-gray-900">
                          {treatment.rating}
                        </span>
                        <span className="text-gray-400 text-xs">
                          ({treatment.reviews})
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center col-span-2 text-gray-500 pt-2 border-t border-gray-100">
                      <svg
                        className="w-4 h-4 mr-1.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {treatment.duration}
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="mt-auto flex gap-3">
                    <Link
                      href={`/treatment/${treatment.id}`}
                      className="flex-1 bg-[#fdf4f5] hover:bg-[#f1c3c9] text-[#dcb5b9] hover:text-white border border-[#f1c3c9]/30 text-center py-2.5 rounded-xl font-serif font-medium transition-all duration-300"
                    >
                      Details
                    </Link>
                    <button className="flex-1 bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 py-2.5 rounded-xl font-serif font-medium transition-all duration-300">
                      Compare
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
            <div className="text-4xl mb-4">✨</div>
            <h3 className="text-xl font-bold font-serif text-gray-900 mb-2">
              No treatments found
            </h3>
            <p className="text-gray-500">
              We couldn't find any treatments matching your search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
