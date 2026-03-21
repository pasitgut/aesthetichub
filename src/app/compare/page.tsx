"use client";
import React, { useState } from "react";

// --- Mock Data ---
const allTreatments = [
  {
    id: "t1",
    name: "Botox + Peel",
    clinic: "Radiant Skin",
    price: "$650",
    duration: "75 min",
    score: 95,
    scoreColor: "bg-[#22c55e]",
    textColor: "text-[#22c55e]",
    rating: 4.9,
    reviews: 156,
    downtime: "1-2 days",
    results: "3-6 months",
    risk: "Low",
    riskClass: "bg-[#dcfce7] text-[#166534]",
    bestFor: "Fine lines, texture",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm0 2.25c.873 0 1.696.222 2.427.618a3.738 3.738 0 00-4.854 0A7.472 7.472 0 0112 4.5zM6.556 7.763a7.485 7.485 0 013.98-2.673 5.253 5.253 0 00-4.82 4.093 7.47 7.47 0 01.84-1.42zM4.697 12a7.464 7.464 0 01.884-3.52 6.75 6.75 0 002.046 6.38A7.476 7.476 0 014.697 12zm1.619 4.331a5.254 5.254 0 005.684 3.013 7.485 7.485 0 01-5.684-3.013zm6.434 3.14a6.75 6.75 0 005.106-4.561 7.483 7.483 0 01-5.106 4.561zm4.782-5.918a5.25 5.25 0 00-1.896-6.195 7.485 7.485 0 011.896 6.195z" />
      </svg>
    ),
  },
  {
    id: "t2",
    name: "Microneedling",
    clinic: "Glow Medical",
    price: "$850",
    duration: "90 min",
    score: 88,
    scoreColor: "bg-[#eab308]",
    textColor: "text-[#eab308]",
    rating: 4.8,
    reviews: 98,
    downtime: "3-5 days",
    results: "6-12 months",
    risk: "Medium",
    riskClass: "bg-[#fef3c7] text-[#b45309]",
    bestFor: "Collagen boost",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
      </svg>
    ),
  },
  {
    id: "t3",
    name: "Laser Resurfacing",
    clinic: "Elite Aesthetics",
    price: "$1,200",
    duration: "60 min",
    score: 82,
    scoreColor: "bg-[#f97316]",
    textColor: "text-[#f97316]",
    rating: 4.7,
    reviews: 73,
    downtime: "7-10 days",
    results: "12-24 months",
    risk: "Medium",
    riskClass: "bg-[#ffedd5] text-[#c2410c]",
    bestFor: "Deep rejuvenation",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.25l-2.074 4.842-5.234.398 4.02 3.42-.422 5.23L12 14.12l4.71 2.02-.422-5.23 4.02-3.42-5.234-.398L12 2.25z" />
      </svg>
    ),
  },
  {
    id: "t4",
    name: "Chemical Peel",
    clinic: "Clear Skin Clinic",
    price: "$350",
    duration: "45 min",
    score: 75,
    scoreColor: "bg-[#3b82f6]",
    textColor: "text-[#3b82f6]",
    rating: 4.5,
    reviews: 210,
    downtime: "2-7 days",
    results: "1-3 months",
    risk: "Low",
    riskClass: "bg-[#dbeafe] text-[#1e40af]",
    bestFor: "Acne, pigmentation",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
        />
      </svg>
    ),
  },
];

export default function ComparePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>(["t1", "t2", "t3"]);

  const treatmentsToCompare = allTreatments.filter((t) =>
    selectedIds.includes(t.id),
  );

  const toggleTreatment = (id: string) => {
    if (selectedIds.includes(id)) {
      if (selectedIds.length > 1) {
        setSelectedIds(selectedIds.filter((itemId) => itemId !== id));
      } else {
        alert("Please select at least one treatment.");
      }
    } else {
      if (selectedIds.length < 4) {
        setSelectedIds([...selectedIds, id]);
      } else {
        alert("You can compare up to 4 treatments at a time.");
      }
    }
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: `180px repeat(${treatmentsToCompare.length}, minmax(200px, 1fr))`,
  };

  return (
    <div className="min-h-screen bg-white py-10 px-4 sm:px-6 lg:px-8 font-sans relative">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold font-serif text-gray-900 mb-1">
              Treatment Comparison
            </h1>
            <p className="text-gray-500 text-sm md:text-base lowercase tracking-wide font-medium">
              compare treatments side by side to make the best decision
            </p>
          </div>
          <button
            onClick={() => setIsEditing(true)}
            className="bg-[#f5ced2] hover:bg-[#ebb8bd] text-gray-900 px-8 py-2.5 rounded-2xl font-serif text-lg transition-colors shadow-sm shadow-pink-100 self-start md:self-auto"
          >
            Edit List
          </button>
        </div>

        {/* Comparison Table Container */}
        <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100/80 overflow-hidden mb-12">
          <div className="overflow-x-auto">
            <div className="min-w-[800px] w-full">
              {/* === Row 1: Header === */}
              <div
                style={gridStyle}
                className="bg-[#faf8f6] border-b border-gray-100"
              >
                <div className="p-6 md:p-8 flex items-center font-bold text-gray-700 font-serif text-lg sticky left-0 bg-[#faf8f6] z-10">
                  Feature
                </div>
                {treatmentsToCompare.map((t) => (
                  <div
                    key={`header-${t.id}`}
                    className="p-6 md:p-8 flex flex-col items-center justify-center text-center relative"
                  >
                    <button
                      onClick={() => toggleTreatment(t.id)}
                      className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
                      title="Remove"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        ></path>
                      </svg>
                    </button>
                    <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-[#dcb5b9] mb-3">
                      {t.icon}
                    </div>
                    <h3 className="font-bold text-gray-900 whitespace-nowrap">
                      {t.name}
                    </h3>
                    <p className="text-sm text-gray-500 font-medium mt-0.5">
                      {t.clinic}
                    </p>
                  </div>
                ))}
              </div>

              {/* === Row 2: Price === */}
              <div
                style={gridStyle}
                className="border-b border-gray-100 bg-white hover:bg-gray-50/50 transition-colors"
              >
                <div className="p-6 flex items-center font-medium text-gray-600 sticky left-0 bg-white">
                  Price
                </div>
                {treatmentsToCompare.map((t) => (
                  <div
                    key={`price-${t.id}`}
                    className="p-6 flex items-center justify-center font-bold text-2xl text-[#1e293b]"
                  >
                    {t.price}
                  </div>
                ))}
              </div>

              {/* === Row 3: Duration === */}
              <div
                style={gridStyle}
                className="border-b border-gray-100 bg-white hover:bg-gray-50/50 transition-colors"
              >
                <div className="p-6 flex items-center font-medium text-gray-600 sticky left-0 bg-white">
                  Duration
                </div>
                {treatmentsToCompare.map((t) => (
                  <div
                    key={`duration-${t.id}`}
                    className="p-6 flex items-center justify-center text-gray-600"
                  >
                    {t.duration}
                  </div>
                ))}
              </div>

              {/* === Row 4: Suitability Score === */}
              <div
                style={gridStyle}
                className="border-b border-gray-100 bg-white hover:bg-gray-50/50 transition-colors"
              >
                <div className="p-6 flex items-center font-medium text-gray-600 sticky left-0 bg-white">
                  Suitability Score
                </div>
                {treatmentsToCompare.map((t) => (
                  <div
                    key={`score-${t.id}`}
                    className="p-6 flex items-center justify-center gap-3"
                  >
                    <div className="w-20 md:w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${t.scoreColor}`}
                        style={{ width: `${t.score}%` }}
                      ></div>
                    </div>
                    <span className={`font-bold ${t.textColor}`}>
                      {t.score}%
                    </span>
                  </div>
                ))}
              </div>

              {/* === Row 5: User Rating === */}
              <div
                style={gridStyle}
                className="border-b border-gray-100 bg-white hover:bg-gray-50/50 transition-colors"
              >
                <div className="p-6 flex items-center font-medium text-gray-600 sticky left-0 bg-white">
                  User Rating
                </div>
                {treatmentsToCompare.map((t) => (
                  <div
                    key={`rating-${t.id}`}
                    className="p-6 flex items-center justify-center gap-1.5"
                  >
                    <svg
                      className="w-4 h-4 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="font-bold text-gray-900">{t.rating}</span>
                    <span className="text-gray-400 text-sm">({t.reviews})</span>
                  </div>
                ))}
              </div>

              {/* === Row 6: Downtime === */}
              <div
                style={gridStyle}
                className="border-b border-gray-100 bg-white hover:bg-gray-50/50 transition-colors"
              >
                <div className="p-6 flex items-center font-medium text-gray-600 sticky left-0 bg-white">
                  Downtime
                </div>
                {treatmentsToCompare.map((t) => (
                  <div
                    key={`downtime-${t.id}`}
                    className="p-6 flex items-center justify-center text-gray-600"
                  >
                    {t.downtime}
                  </div>
                ))}
              </div>

              {/* === Row 7: Results Duration === */}
              <div
                style={gridStyle}
                className="border-b border-gray-100 bg-white hover:bg-gray-50/50 transition-colors"
              >
                <div className="p-6 flex items-center font-medium text-gray-600 sticky left-0 bg-white">
                  Results Duration
                </div>
                {treatmentsToCompare.map((t) => (
                  <div
                    key={`results-${t.id}`}
                    className="p-6 flex items-center justify-center text-gray-600"
                  >
                    {t.results}
                  </div>
                ))}
              </div>

              {/* === Row 8: Risk Level === */}
              <div
                style={gridStyle}
                className="border-b border-gray-100 bg-white hover:bg-gray-50/50 transition-colors"
              >
                <div className="p-6 flex items-center font-medium text-gray-600 sticky left-0 bg-white">
                  Risk Level
                </div>
                {treatmentsToCompare.map((t) => (
                  <div
                    key={`risk-${t.id}`}
                    className="p-6 flex items-center justify-center"
                  >
                    <span
                      className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wide ${t.riskClass}`}
                    >
                      {t.risk}
                    </span>
                  </div>
                ))}
              </div>

              {/* === Row 9: Best For === */}
              <div
                style={gridStyle}
                className="border-b border-gray-100 bg-white hover:bg-gray-50/50 transition-colors"
              >
                <div className="p-6 flex items-center font-medium text-gray-600 sticky left-0 bg-white">
                  Best For
                </div>
                {treatmentsToCompare.map((t) => (
                  <div
                    key={`bestfor-${t.id}`}
                    className="p-6 flex items-center justify-center text-gray-600 text-center"
                  >
                    {t.bestFor}
                  </div>
                ))}
              </div>

              {/* === Row 10: Footer Decorator === */}
              <div className="w-full h-12 bg-[#faf8f6]"></div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= EDIT MODAL ================= */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-xl font-bold font-serif text-gray-900">
                Select Treatments
              </h2>
              <button
                onClick={() => setIsEditing(false)}
                className="text-gray-400 hover:text-gray-600 p-2"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>

            <div className="p-6 max-h-[60vh] overflow-y-auto space-y-3">
              {allTreatments.map((t) => {
                const isSelected = selectedIds.includes(t.id);
                return (
                  // แก้ไขตรงนี้: เปลี่ยนจาก <label> เป็น <div> และเพิ่ม onClick
                  <div
                    key={`modal-${t.id}`}
                    onClick={() => toggleTreatment(t.id)}
                    className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-colors ${
                      isSelected
                        ? "border-[#f1c3c9] bg-[#fdf4f5]"
                        : "border-gray-100 hover:border-gray-200"
                    }`}
                  >
                    <div className="flex items-center gap-4 w-full">
                      <div
                        className={`w-6 h-6 rounded flex items-center justify-center border shrink-0 ${isSelected ? "bg-[#f1c3c9] border-[#f1c3c9]" : "border-gray-300 bg-white"}`}
                      >
                        {isSelected && (
                          <svg
                            className="w-4 h-4 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="3"
                              d="M5 13l4 4L19 7"
                            ></path>
                          </svg>
                        )}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 select-none">
                          {t.name}
                        </p>
                        <p className="text-sm text-gray-500 select-none">
                          {t.clinic} • {t.price}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
              <button
                onClick={() => setIsEditing(false)}
                className="px-6 py-2.5 rounded-xl font-medium bg-black text-white hover:bg-gray-800 transition-colors shadow-sm"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
