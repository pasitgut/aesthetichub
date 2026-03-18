import React from "react";

// --- Mock Data ---
const treatments = [
  {
    id: "t1",
    name: "Botox + Peel",
    clinic: "Radiant Skin",
    price: "$650",
    duration: "75 min",
    score: 95,
    scoreColor: "bg-[#22c55e]", // Green
    textColor: "text-[#22c55e]",
    rating: 4.9,
    reviews: 156,
    downtime: "1-2 days",
    results: "3-6 months",
    risk: "Low",
    riskClass: "bg-[#dcfce7] text-[#166534]", // Green Badge
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
    scoreColor: "bg-[#eab308]", // Yellow
    textColor: "text-[#eab308]",
    rating: 4.8,
    reviews: 98,
    downtime: "3-5 days",
    results: "6-12 months",
    risk: "Medium",
    riskClass: "bg-[#fef3c7] text-[#b45309]", // Yellow Badge
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
    scoreColor: "bg-[#f97316]", // Orange
    textColor: "text-[#f97316]",
    rating: 4.7,
    reviews: 73,
    downtime: "7-10 days",
    results: "12-24 months",
    risk: "Medium",
    riskClass: "bg-[#ffedd5] text-[#c2410c]", // Orange Badge
    bestFor: "Deep rejuvenation",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.25l-2.074 4.842-5.234.398 4.02 3.42-.422 5.23L12 14.12l4.71 2.02-.422-5.23 4.02-3.42-5.234-.398L12 2.25z" />
      </svg>
    ),
  },
];

export default function ComparePage() {
  return (
    <div className="min-h-screen bg-white py-10 px-4 sm:px-6 lg:px-8 font-sans">
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
          <button className="bg-[#f5ced2] hover:bg-[#ebb8bd] text-white px-8 py-2.5 rounded-2xl font-serif text-lg transition-colors shadow-sm shadow-pink-100 self-start md:self-auto">
            Edit
          </button>
        </div>

        {/* Comparison Table Container 
            ใช้ overflow-x-auto คู่กับ min-w-[900px] เพื่อให้เลื่อนซ้ายขวาได้บนมือถือโดยที่สัดส่วนไม่พัง
        */}
        <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100/80 overflow-hidden mb-12">
          <div className="overflow-x-auto">
            <div className="min-w-[900px] grid grid-cols-4 w-full">
              
              {/* === Row 1: Header (Features & Clinic Names) === */}
              <div className="col-span-4 grid grid-cols-4 bg-[#faf8f6] border-b border-gray-100">
                <div className="p-6 md:p-8 flex items-center font-bold text-gray-700 font-serif text-lg">
                  Feature
                </div>
                {treatments.map((t) => (
                  <div key={`header-${t.id}`} className="p-6 md:p-8 flex flex-col items-center justify-center text-center">
                    <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-[#dcb5b9] mb-3">
                      {t.icon}
                    </div>
                    <h3 className="font-bold text-gray-900 whitespace-nowrap">{t.name}</h3>
                    <p className="text-sm text-gray-500 font-medium mt-0.5">{t.clinic}</p>
                  </div>
                ))}
              </div>

              {/* === Row 2: Price === */}
              <div className="col-span-4 grid grid-cols-4 border-b border-gray-100 bg-white">
                <div className="p-6 flex items-center font-medium text-gray-600">Price</div>
                {treatments.map((t) => (
                  <div key={`price-${t.id}`} className="p-6 flex items-center justify-center font-bold text-2xl text-[#1e293b]">
                    {t.price}
                  </div>
                ))}
              </div>

              {/* === Row 3: Duration === */}
              <div className="col-span-4 grid grid-cols-4 border-b border-gray-100 bg-white">
                <div className="p-6 flex items-center font-medium text-gray-600">Duration</div>
                {treatments.map((t) => (
                  <div key={`duration-${t.id}`} className="p-6 flex items-center justify-center text-gray-600">
                    {t.duration}
                  </div>
                ))}
              </div>

              {/* === Row 4: Suitability Score === */}
              <div className="col-span-4 grid grid-cols-4 border-b border-gray-100 bg-white">
                <div className="p-6 flex items-center font-medium text-gray-600">Suitability Score</div>
                {treatments.map((t) => (
                  <div key={`score-${t.id}`} className="p-6 flex items-center justify-center gap-3">
                    {/* Progress Bar Container */}
                    <div className="w-20 md:w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${t.scoreColor}`} style={{ width: `${t.score}%` }}></div>
                    </div>
                    {/* Percentage Text */}
                    <span className={`font-bold ${t.textColor}`}>{t.score}%</span>
                  </div>
                ))}
              </div>

              {/* === Row 5: User Rating === */}
              <div className="col-span-4 grid grid-cols-4 border-b border-gray-100 bg-white">
                <div className="p-6 flex items-center font-medium text-gray-600">User Rating</div>
                {treatments.map((t) => (
                  <div key={`rating-${t.id}`} className="p-6 flex items-center justify-center gap-1.5">
                    <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="font-bold text-gray-900">{t.rating}</span>
                    <span className="text-gray-400 text-sm">({t.reviews})</span>
                  </div>
                ))}
              </div>

              {/* === Row 6: Downtime === */}
              <div className="col-span-4 grid grid-cols-4 border-b border-gray-100 bg-white">
                <div className="p-6 flex items-center font-medium text-gray-600">Downtime</div>
                {treatments.map((t) => (
                  <div key={`downtime-${t.id}`} className="p-6 flex items-center justify-center text-gray-600">
                    {t.downtime}
                  </div>
                ))}
              </div>

              {/* === Row 7: Results Duration === */}
              <div className="col-span-4 grid grid-cols-4 border-b border-gray-100 bg-white">
                <div className="p-6 flex items-center font-medium text-gray-600">Results Duration</div>
                {treatments.map((t) => (
                  <div key={`results-${t.id}`} className="p-6 flex items-center justify-center text-gray-600">
                    {t.results}
                  </div>
                ))}
              </div>

              {/* === Row 8: Risk Level === */}
              <div className="col-span-4 grid grid-cols-4 border-b border-gray-100 bg-white">
                <div className="p-6 flex items-center font-medium text-gray-600">Risk Level</div>
                {treatments.map((t) => (
                  <div key={`risk-${t.id}`} className="p-6 flex items-center justify-center">
                    <span className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wide ${t.riskClass}`}>
                      {t.risk}
                    </span>
                  </div>
                ))}
              </div>

              {/* === Row 9: Best For === */}
              <div className="col-span-4 grid grid-cols-4 border-b border-gray-100 bg-white">
                <div className="p-6 flex items-center font-medium text-gray-600">Best For</div>
                {treatments.map((t) => (
                  <div key={`bestfor-${t.id}`} className="p-6 flex items-center justify-center text-gray-600 text-center">
                    {t.bestFor}
                  </div>
                ))}
              </div>

              {/* === Row 10: Footer Decorator (แถบสีครีมด้านล่างสุด) === */}
              <div className="col-span-4 h-12 bg-[#faf8f6]"></div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
