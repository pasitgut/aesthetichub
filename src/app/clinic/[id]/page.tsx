"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { api } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

interface ClinicDetail {
  id: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  description: string;
  image_url: string;
  rating: number;
  review_count: number;
  operating_hours: string;
  highlights: { id: string; highlight_text: string; }[];
  treatments: {
    id: string;
    name: string;
    description: string;
    price: number;
    duration: string;
    rating: number;
    review_count: number;
    tags: string[];
  }[];
}

export default function ClinicDetailsPage() {
  const params = useParams();
  const { isAuthenticated } = useAuth();
  const [clinic, setClinic] = useState<ClinicDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (params.id) {
      api.get<ClinicDetail>(`/api/v1/clinics/${params.id}`).then((res) => {
        if (res.success && res.data) {
          setClinic(res.data);
        }
        setLoading(false);
      });
    }
  }, [params.id]);

  const handleSave = async () => {
    if (!isAuthenticated) {
      window.location.href = "/login";
      return;
    }
    if (saved) {
      await api.del(`/api/v1/saved-clinics/${params.id}`);
      setSaved(false);
    } else {
      await api.post(`/api/v1/saved-clinics/${params.id}`);
      setSaved(true);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white py-10 px-4 flex items-center justify-center">
        <div className="animate-pulse text-gray-400 font-serif text-lg">Loading clinic...</div>
      </div>
    );
  }

  if (!clinic) {
    return (
      <div className="min-h-screen bg-white py-10 px-4 flex items-center justify-center">
        <div className="text-gray-500 font-serif text-lg">Clinic not found</div>
      </div>
    );
  }

  const defaultHighlights = [
    { id: "1", icon: "🏵️", highlight_text: "Board-Certified Specialists" },
    { id: "2", icon: "🎖️", highlight_text: "15+ Years Experience" },
    { id: "3", icon: "🛡️", highlight_text: "FDA-Approved Treatments" },
    { id: "4", icon: "👥", highlight_text: "5000+ Happy Clients" },
  ];

  const highlights = clinic.highlights?.length > 0 ? clinic.highlights : defaultHighlights;

  return (
    <div className="min-h-screen bg-white py-10 px-4 sm:px-6 lg:px-8 font-sans text-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            {/* Image */}
            <div className="relative w-full aspect-[16/9] md:aspect-[21/9] lg:aspect-[16/9] rounded-2xl overflow-hidden shadow-sm">
              {clinic.image_url ? (
                <Image src={clinic.image_url} alt={clinic.name} fill className="object-cover" priority />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#fdf4f5] to-[#f1c3c9] flex items-center justify-center">
                  <span className="text-6xl">🏥</span>
                </div>
              )}
            </div>

            {/* Header */}
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <div className="w-20 h-20 rounded-full border border-gray-200 flex items-center justify-center shrink-0 bg-[#faf8f6]">
                <span className="font-serif text-2xl text-[#dcb5b9]">{clinic.name?.substring(0, 2).toUpperCase()}</span>
              </div>
              <div className="space-y-3">
                <h1 className="text-3xl font-bold font-serif text-gray-900">{clinic.name}</h1>
                <div className="flex items-center text-sm text-gray-500">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {clinic.address || clinic.city}
                </div>
                <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-sm text-gray-600 font-medium">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-gray-900 mr-1">{clinic.rating?.toFixed(1) || "0.0"}</span>
                    <span className="text-gray-400 font-normal">({clinic.review_count || 0} reviews)</span>
                  </div>
                  {clinic.phone && (
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      {clinic.phone}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* About */}
            {clinic.description && (
              <div>
                <h2 className="text-2xl font-bold font-serif mb-4 text-gray-900">About the Clinic</h2>
                <div className="space-y-4 text-gray-600 leading-relaxed text-sm md:text-base whitespace-pre-line">
                  {clinic.description}
                </div>
              </div>
            )}

            {/* Highlights */}
            <div>
              <h2 className="text-2xl font-bold font-serif mb-4 text-gray-900">Highlights</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {highlights.map((item) => (
                  <div key={item.id} className="bg-[#faf8f6] px-5 py-4 rounded-xl flex items-center gap-3 border border-gray-100/50">
                    <span className="text-xl bg-[#f5ced2] p-2 rounded-lg"></span>
                    <span className="font-medium text-gray-700 text-sm md:text-base">{item.highlight_text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Treatments */}
            {clinic.treatments && clinic.treatments.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold font-serif mb-6 text-gray-900">Available Treatments</h2>
                <div className="space-y-5">
                  {clinic.treatments.map((item) => (
                    <div key={item.id} className="border border-gray-100 rounded-2xl p-6 flex flex-col md:flex-row justify-between gap-6 hover:shadow-md transition-shadow bg-white">
                      <div className="space-y-3 flex-1">
                        <h3 className="text-xl font-bold text-gray-900">{item.name}</h3>
                        <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
                        {item.tags && item.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 pt-1">
                            {item.tags.map((tag, index) => (
                              <span key={index} className="px-3 py-1 bg-[#fdf4f5] text-[#dcb5b9] text-xs font-semibold rounded-full">
                                {typeof tag === 'string' ? tag : (tag as any).name}
                              </span>
                            ))}
                          </div>
                        )}
                        <div className="flex items-center gap-4 text-sm font-medium text-gray-600 pt-2">
                          {item.duration && (
                            <div className="flex items-center">
                              <svg className="w-4 h-4 mr-1.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              {item.duration}
                            </div>
                          )}
                          <div className="flex items-center">
                            <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            {item.rating?.toFixed(1) || "0.0"}{" "}
                            <span className="text-gray-400 font-normal ml-1">({item.review_count || 0} reviews)</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center shrink-0 border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6">
                        <div className="text-2xl font-bold text-gray-900 md:mb-3">฿{item.price?.toLocaleString()}</div>
                        <Link href={`/treatment/${item.id}`} className="bg-[#f5ced2] hover:bg-[#ebb8bd] text-white px-8 py-2.5 rounded-xl font-serif transition-colors shadow-sm">
                          Details
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-[#faf8f6] rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h3 className="text-xl font-bold font-serif text-gray-900 mb-6">Quick Contact</h3>
              <div className="space-y-3 mb-8">
                {clinic.phone && (
                  <a href={`tel:${clinic.phone}`} className="w-full bg-[#f5ced2] hover:bg-[#ebb8bd] text-white py-3 rounded-xl font-serif transition-colors shadow-sm block text-center">
                    Call Clinic
                  </a>
                )}
                <button
                  onClick={handleSave}
                  className={`w-full py-3 rounded-xl font-serif transition-colors shadow-sm ${saved ? "bg-[#f1c3c9] text-white" : "bg-white border border-gray-200 hover:bg-gray-50 text-gray-700"}`}
                >
                  {saved ? "✓ Clinic Saved" : "Save Clinic"}
                </button>
              </div>

              <div>
                <h4 className="font-bold text-gray-900 mb-4 text-sm">Opening Hours</h4>
                <ul className="space-y-3 text-sm">
                  <li className="flex justify-between items-center text-gray-600">
                    <span>Monday - Friday</span>
                    <span className="font-medium text-gray-900">9:00 AM - 7:00 PM</span>
                  </li>
                  <li className="flex justify-between items-center text-gray-600">
                    <span>Saturday</span>
                    <span className="font-medium text-gray-900">10:00 AM - 5:00 PM</span>
                  </li>
                  <li className="flex justify-between items-center text-gray-500">
                    <span>Sunday</span>
                    <span className="font-medium">Closed</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
