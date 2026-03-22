"use client";
import React, { useState, useEffect, Suspense } from "react";
import { api } from "@/lib/api";
import { useSearchParams } from "next/navigation";

interface Treatment {
  id: string;
  name: string;
  clinic_name: string;
  price: number;
  duration: string;
  rating: number;
  review_count: number;
  downtime: string;
  results_duration: string;
  best_for: string;
  risk_level: string;
}

function CompareContent() {
  const searchParams = useSearchParams();
  const [allTreatments, setAllTreatments] = useState<Treatment[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get<Treatment[]>("/api/v1/treatments?limit=50").then((res) => {
      if (res.success && res.data) {
        setAllTreatments(res.data);
        // Pre-select from URL params or first 3
        const idsParam = searchParams.get("ids");
        if (idsParam) {
          setSelectedIds(idsParam.split(","));
        } else if (res.data.length > 0) {
          setSelectedIds(res.data.slice(0, Math.min(3, res.data.length)).map((t) => t.id));
        }
      }
      setLoading(false);
    });
  }, [searchParams]);

  const treatmentsToCompare = allTreatments.filter((t) => selectedIds.includes(t.id));

  const toggleTreatment = (id: string) => {
    if (selectedIds.includes(id)) {
      if (selectedIds.length > 1) {
        setSelectedIds(selectedIds.filter((itemId) => itemId !== id));
      }
    } else {
      if (selectedIds.length < 4) {
        setSelectedIds([...selectedIds, id]);
      }
    }
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: `180px repeat(${treatmentsToCompare.length || 1}, minmax(200px, 1fr))`,
  };

  const getRiskClass = (risk: string) => {
    const r = (risk || "low").toLowerCase();
    if (r === "low") return "bg-[#dcfce7] text-[#166534]";
    if (r === "medium") return "bg-[#fef3c7] text-[#b45309]";
    return "bg-[#fee2e2] text-[#991b1b]";
  };

  if (loading) {
    return <div className="min-h-screen bg-white py-10 flex items-center justify-center"><div className="animate-pulse text-gray-400 font-serif text-lg">Loading treatments...</div></div>;
  }

  return (
    <div className="min-h-screen bg-white py-10 px-4 sm:px-6 lg:px-8 font-sans relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold font-serif text-gray-900 mb-1">Treatment Comparison</h1>
            <p className="text-gray-500 text-sm md:text-base lowercase tracking-wide font-medium">compare treatments side by side to make the best decision</p>
          </div>
          <button onClick={() => setIsEditing(true)} className="bg-[#f5ced2] hover:bg-[#ebb8bd] text-gray-900 px-8 py-2.5 rounded-2xl font-serif text-lg transition-colors shadow-sm shadow-pink-100 self-start md:self-auto">
            Edit List
          </button>
        </div>

        {treatmentsToCompare.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
            <p className="text-gray-500 font-serif">Select treatments to compare</p>
            <button onClick={() => setIsEditing(true)} className="mt-4 bg-[#f5ced2] text-white px-6 py-2 rounded-xl font-serif">Select Treatments</button>
          </div>
        ) : (
          <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100/80 overflow-hidden mb-12">
            <div className="overflow-x-auto">
              <div className="min-w-[800px] w-full">
                {/* Header */}
                <div style={gridStyle} className="bg-[#faf8f6] border-b border-gray-100">
                  <div className="p-6 md:p-8 flex items-center font-bold text-gray-700 font-serif text-lg sticky left-0 bg-[#faf8f6] z-10">Feature</div>
                  {treatmentsToCompare.map((t) => (
                    <div key={`header-${t.id}`} className="p-6 md:p-8 flex flex-col items-center justify-center text-center relative">
                      <button onClick={() => toggleTreatment(t.id)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors" title="Remove">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                      </button>
                      <h3 className="font-bold text-gray-900 whitespace-nowrap">{t.name}</h3>
                      <p className="text-sm text-gray-500 font-medium mt-0.5">{t.clinic_name}</p>
                    </div>
                  ))}
                </div>

                {/* Price */}
                <div style={gridStyle} className="border-b border-gray-100 bg-white hover:bg-gray-50/50 transition-colors">
                  <div className="p-6 flex items-center font-medium text-gray-600 sticky left-0 bg-white">Price</div>
                  {treatmentsToCompare.map((t) => (
                    <div key={`price-${t.id}`} className="p-6 flex items-center justify-center font-bold text-2xl text-[#1e293b]">฿{t.price?.toLocaleString()}</div>
                  ))}
                </div>

                {/* Duration */}
                <div style={gridStyle} className="border-b border-gray-100 bg-white hover:bg-gray-50/50 transition-colors">
                  <div className="p-6 flex items-center font-medium text-gray-600 sticky left-0 bg-white">Duration</div>
                  {treatmentsToCompare.map((t) => (
                    <div key={`dur-${t.id}`} className="p-6 flex items-center justify-center text-gray-600">{t.duration || "N/A"}</div>
                  ))}
                </div>

                {/* Rating */}
                <div style={gridStyle} className="border-b border-gray-100 bg-white hover:bg-gray-50/50 transition-colors">
                  <div className="p-6 flex items-center font-medium text-gray-600 sticky left-0 bg-white">User Rating</div>
                  {treatmentsToCompare.map((t) => (
                    <div key={`rat-${t.id}`} className="p-6 flex items-center justify-center gap-1.5">
                      <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                      <span className="font-bold text-gray-900">{t.rating?.toFixed(1) || "0.0"}</span>
                      <span className="text-gray-400 text-sm">({t.review_count || 0})</span>
                    </div>
                  ))}
                </div>

                {/* Downtime */}
                <div style={gridStyle} className="border-b border-gray-100 bg-white hover:bg-gray-50/50 transition-colors">
                  <div className="p-6 flex items-center font-medium text-gray-600 sticky left-0 bg-white">Downtime</div>
                  {treatmentsToCompare.map((t) => (
                    <div key={`dt-${t.id}`} className="p-6 flex items-center justify-center text-gray-600">{t.downtime || "None"}</div>
                  ))}
                </div>

                {/* Results Duration */}
                <div style={gridStyle} className="border-b border-gray-100 bg-white hover:bg-gray-50/50 transition-colors">
                  <div className="p-6 flex items-center font-medium text-gray-600 sticky left-0 bg-white">Results Duration</div>
                  {treatmentsToCompare.map((t) => (
                    <div key={`res-${t.id}`} className="p-6 flex items-center justify-center text-gray-600">{t.results_duration || "N/A"}</div>
                  ))}
                </div>

                {/* Risk Level */}
                <div style={gridStyle} className="border-b border-gray-100 bg-white hover:bg-gray-50/50 transition-colors">
                  <div className="p-6 flex items-center font-medium text-gray-600 sticky left-0 bg-white">Risk Level</div>
                  {treatmentsToCompare.map((t) => (
                    <div key={`risk-${t.id}`} className="p-6 flex items-center justify-center">
                      <span className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wide ${getRiskClass(t.risk_level)}`}>{t.risk_level || "Low"}</span>
                    </div>
                  ))}
                </div>

                {/* Best For */}
                <div style={gridStyle} className="border-b border-gray-100 bg-white hover:bg-gray-50/50 transition-colors">
                  <div className="p-6 flex items-center font-medium text-gray-600 sticky left-0 bg-white">Best For</div>
                  {treatmentsToCompare.map((t) => (
                    <div key={`bf-${t.id}`} className="p-6 flex items-center justify-center text-gray-600 text-center">{t.best_for || "All skin types"}</div>
                  ))}
                </div>

                <div className="w-full h-12 bg-[#faf8f6]" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-xl font-bold font-serif text-gray-900">Select Treatments</h2>
              <button onClick={() => setIsEditing(false)} className="text-gray-400 hover:text-gray-600 p-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="p-6 max-h-[60vh] overflow-y-auto space-y-3">
              {allTreatments.map((t) => {
                const isSelected = selectedIds.includes(t.id);
                return (
                  <div key={`modal-${t.id}`} onClick={() => toggleTreatment(t.id)} className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-colors ${isSelected ? "border-[#f1c3c9] bg-[#fdf4f5]" : "border-gray-100 hover:border-gray-200"}`}>
                    <div className="flex items-center gap-4 w-full">
                      <div className={`w-6 h-6 rounded flex items-center justify-center border shrink-0 ${isSelected ? "bg-[#f1c3c9] border-[#f1c3c9]" : "border-gray-300 bg-white"}`}>
                        {isSelected && (
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                        )}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 select-none">{t.name}</p>
                        <p className="text-sm text-gray-500 select-none">{t.clinic_name} • ฿{t.price?.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
              <button onClick={() => setIsEditing(false)} className="px-6 py-2.5 rounded-xl font-medium bg-black text-white hover:bg-gray-800 transition-colors shadow-sm">Done</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ComparePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white py-10 flex items-center justify-center"><div className="animate-pulse text-gray-400 font-serif text-lg">Loading...</div></div>}>
      <CompareContent />
    </Suspense>
  );
}
