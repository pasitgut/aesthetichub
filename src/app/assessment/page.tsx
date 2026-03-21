"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// --- Mock Data ---
const skinTypes = [
  {
    id: "dry",
    name: "Dry",
    desc: "Flaky, tight, or rough texture",
    icon: "🏜️",
  },
  { id: "oily", name: "Oily", desc: "Shiny, prone to blemishes", icon: "💧" },
  {
    id: "combo",
    name: "Combination",
    desc: "Oily T-zone, dry cheeks",
    icon: "🌗",
  },
  {
    id: "normal",
    name: "Normal",
    desc: "Balanced, clear, not sensitive",
    icon: "✨",
  },
  {
    id: "sensitive",
    name: "Sensitive",
    desc: "Easily irritated or red",
    icon: "🌸",
  },
];

const skinConcerns = [
  "Acne & Blemishes",
  "Fine Lines & Wrinkles",
  "Dark Spots & Pigmentation",
  "Large Pores",
  "Redness & Rosacea",
  "Uneven Texture",
  "Dullness",
  "Loss of Firmness",
  "Under Eye Circles",
];

const recommendedTreatments = [
  {
    id: "t1",
    name: "Advanced Botox Treatment",
    clinic: "Radiant Skin Clinic",
    matchScore: 98,
    price: "$450",
    image:
      "https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=800&auto=format&fit=crop",
    reason:
      "Highly effective for reducing fine lines and preventing new wrinkles from forming.",
  },
  {
    id: "t4",
    name: "Signature HydraFacial",
    clinic: "Lumina Beauty Hub",
    matchScore: 92,
    price: "$199",
    image:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=800&auto=format&fit=crop",
    reason:
      "Perfect for deep cleansing, exfoliating, and hydrating dull or textured skin.",
  },
];

export default function AssessmentPage() {
  const [step, setStep] = useState(1);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Form State
  const [selectedSkinType, setSelectedSkinType] = useState("");
  const [selectedConcerns, setSelectedConcerns] = useState<string[]>([]);

  // Handlers
  const toggleConcern = (concern: string) => {
    setSelectedConcerns((prev) =>
      prev.includes(concern)
        ? prev.filter((c) => c !== concern)
        : [...prev, concern],
    );
  };

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setStep(3); // Go to loading step

    // Simulate AI Processing time (2.5 seconds)
    setTimeout(() => {
      setIsAnalyzing(false);
      setStep(4); // Go to results step
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-[#fdf6f7] py-10 px-4 sm:px-6 lg:px-8 font-sans flex items-center justify-center">
      {/* Main Container */}
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-xl shadow-pink-100/50 overflow-hidden border border-gray-100">
        {/* Progress Bar (Hidden on Results Step) */}
        {step < 4 && (
          <div className="bg-gray-50 px-8 py-4 border-b border-gray-100 flex items-center justify-between">
            <span className="text-sm font-medium text-gray-500 font-serif">
              Step {step} of 2
            </span>
            <div className="flex gap-2">
              <div
                className={`h-1.5 w-12 rounded-full ${step >= 1 ? "bg-[#f1c3c9]" : "bg-gray-200"}`}
              ></div>
              <div
                className={`h-1.5 w-12 rounded-full ${step >= 2 ? "bg-[#f1c3c9]" : "bg-gray-200"}`}
              ></div>
            </div>
          </div>
        )}

        <div className="p-8 md:p-12">
          {/* ================= STEP 1: SKIN TYPE ================= */}
          {step === 1 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h1 className="text-3xl md:text-4xl font-bold font-serif text-gray-900 mb-2">
                What is your skin type?
              </h1>
              <p className="text-gray-500 mb-8">
                Select the one that best describes your skin on a typical day.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                {skinTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedSkinType(type.id)}
                    className={`p-5 rounded-2xl border-2 text-left transition-all duration-200 flex items-start gap-4 ${
                      selectedSkinType === type.id
                        ? "border-[#f1c3c9] bg-[#fdf4f5] shadow-sm"
                        : "border-gray-100 hover:border-gray-200 bg-white"
                    }`}
                  >
                    <div className="text-2xl mt-0.5">{type.icon}</div>
                    <div>
                      <h3
                        className={`font-bold font-serif ${selectedSkinType === type.id ? "text-gray-900" : "text-gray-700"}`}
                      >
                        {type.name}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">{type.desc}</p>
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  disabled={!selectedSkinType}
                  className="bg-[#f1c3c9] hover:bg-[#e4b2b8] disabled:bg-gray-200 disabled:cursor-not-allowed text-white px-8 py-3 rounded-xl font-serif text-lg transition-colors shadow-sm"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* ================= STEP 2: CONCERNS ================= */}
          {step === 2 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h1 className="text-3xl md:text-4xl font-bold font-serif text-gray-900 mb-2">
                What are your main concerns?
              </h1>
              <p className="text-gray-500 mb-8">
                Select all that apply. Our AI will prioritize these in your
                recommendations.
              </p>

              <div className="flex flex-wrap gap-3 mb-10">
                {skinConcerns.map((concern) => {
                  const isSelected = selectedConcerns.includes(concern);
                  return (
                    <button
                      key={concern}
                      onClick={() => toggleConcern(concern)}
                      className={`px-5 py-3 rounded-xl border-2 transition-all duration-200 font-medium text-sm md:text-base ${
                        isSelected
                          ? "border-[#f1c3c9] bg-[#f1c3c9] text-white shadow-sm"
                          : "border-gray-100 text-gray-600 hover:border-gray-200 bg-white"
                      }`}
                    >
                      {concern}
                    </button>
                  );
                })}
              </div>

              <div className="flex justify-between items-center">
                <button
                  onClick={() => setStep(1)}
                  className="text-gray-500 hover:text-gray-800 font-serif transition-colors px-4 py-2"
                >
                  Back
                </button>
                <button
                  onClick={handleAnalyze}
                  disabled={selectedConcerns.length === 0}
                  className="bg-black hover:bg-gray-800 disabled:bg-gray-200 disabled:text-gray-400 text-white px-8 py-3 rounded-xl font-serif text-lg transition-colors shadow-sm flex items-center gap-2"
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
                      strokeWidth={2}
                      d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                    />
                  </svg>
                  Analyze My Skin
                </button>
              </div>
            </div>
          )}

          {/* ================= STEP 3: ANALYZING (LOADING) ================= */}
          {step === 3 && isAnalyzing && (
            <div className="py-20 flex flex-col items-center justify-center text-center animate-in fade-in duration-300">
              <div className="relative w-24 h-24 mb-8">
                {/* Ping Animation */}
                <div className="absolute inset-0 bg-[#f1c3c9] rounded-full animate-ping opacity-20"></div>
                <div className="relative w-full h-full bg-[#fdf4f5] border-4 border-[#f1c3c9] rounded-full flex items-center justify-center">
                  <span className="text-3xl">✨</span>
                </div>
              </div>
              <h2 className="text-2xl font-bold font-serif text-gray-900 mb-2">
                AestheticAI is Analyzing...
              </h2>
              <p className="text-gray-500 max-w-sm">
                Cross-referencing your profile with thousands of clinical
                treatments to find your perfect match.
              </p>
            </div>
          )}

          {/* ================= STEP 4: RESULTS ================= */}
          {step === 4 && (
            <div className="animate-in zoom-in-95 duration-500">
              <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#e6fcf0] text-[#1e884e] rounded-full mb-4">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold font-serif text-gray-900 mb-3">
                  Your Perfect Matches
                </h1>
                <p className="text-gray-500">
                  Based on your {selectedSkinType} skin and selected concerns,
                  here are the treatments AestheticAI highly recommends.
                </p>
              </div>

              {/* Recommended Cards */}
              <div className="space-y-6 mb-10">
                {recommendedTreatments.map((t) => (
                  <div
                    key={t.id}
                    className="border border-gray-100 rounded-2xl p-4 md:p-6 flex flex-col md:flex-row gap-6 hover:shadow-md transition-shadow bg-white"
                  >
                    {/* Image */}
                    <div className="relative w-full md:w-40 h-40 rounded-xl overflow-hidden shrink-0">
                      <Image
                        src={t.image}
                        alt={t.name}
                        fill
                        className="object-cover"
                      />
                      {/* Match Badge */}
                      <div className="absolute top-2 left-2 bg-black/80 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded-md">
                        {t.matchScore}% Match
                      </div>
                    </div>

                    {/* Info */}
                    <div className="flex-1 flex flex-col">
                      <h3 className="text-xl font-bold text-gray-900 font-serif mb-1">
                        {t.name}
                      </h3>
                      <p className="text-[#dcb5b9] text-sm font-medium mb-3">
                        {t.clinic}
                      </p>

                      <div className="bg-[#faf8f6] p-3 rounded-lg text-sm text-gray-600 mb-4 flex-1 border border-gray-100">
                        <span className="font-bold text-gray-800">
                          Why it fits you:{" "}
                        </span>
                        {t.reason}
                      </div>

                      <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-50">
                        <span className="text-xl font-bold text-gray-900">
                          {t.price}
                        </span>
                        <Link
                          href={`/treatment/${t.id}`}
                          className="text-[#f1c3c9] hover:text-[#d89ba0] font-medium transition-colors flex items-center gap-1"
                        >
                          View Details
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => {
                    setStep(1);
                    setSelectedConcerns([]);
                    setSelectedSkinType("");
                  }}
                  className="px-8 py-3 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 font-serif transition-colors"
                >
                  Retake Assessment
                </button>
                <Link
                  href="/profile"
                  className="bg-black hover:bg-gray-800 text-white px-8 py-3 rounded-xl font-serif text-center transition-colors shadow-sm"
                >
                  Save to My Profile
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
