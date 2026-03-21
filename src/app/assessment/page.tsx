"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// ==========================================
// 1. MOCK DATA
// ==========================================
const skinTypes = [
  { id: "dry", name: "Dry", desc: "ผิวแห้ง ขาดน้ำ ลอกเป็นขุย", icon: "🏜️" },
  {
    id: "normal",
    name: "Normal",
    desc: "ผิวปกติ สมดุล ไม่เซนซิทีฟ",
    icon: "✨",
  },
  {
    id: "oily",
    name: "Oily",
    desc: "ผิวมัน รูขุมขนกว้าง เป็นสิวง่าย",
    icon: "💧",
  },
  {
    id: "notsure",
    name: "ไม่แน่ใจ (Not Sure)",
    desc: "AI จะให้น้ำหนักกับสภาพแวดล้อมแทน",
    icon: "🤖",
  },
];

const concernGroups = [
  {
    title: "สิวและรอย (Acne & Marks)",
    items: [
      {
        id: "acne",
        name: "สิวอุดตัน/อักเสบ",
        image:
          "https://images.unsplash.com/photo-1616844868137-0504550e503e?q=80&w=300&auto=format&fit=crop",
      },
      {
        id: "dark_spots",
        name: "รอยดำ/รอยแดง",
        image:
          "https://images.unsplash.com/photo-1512496015851-a1c815ee3d86?q=80&w=300&auto=format&fit=crop",
      },
    ],
  },
  {
    title: "ริ้วรอยและความหย่อนคล้อย (Aging)",
    items: [
      {
        id: "wrinkles",
        name: "ริ้วรอยตื้น/ลึก",
        image:
          "https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=300&auto=format&fit=crop",
      },
      {
        id: "sagging",
        name: "ผิวไม่กระชับ/หย่อนคล้อย",
        image:
          "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?q=80&w=300&auto=format&fit=crop",
      },
    ],
  },
  {
    title: "สภาพสีผิว (Pigmentation)",
    items: [
      {
        id: "dullness",
        name: "ผิวหมองคล้ำ",
        image:
          "https://images.unsplash.com/photo-1618331835717-801e976710b2?q=80&w=300&auto=format&fit=crop",
      },
      {
        id: "melasma",
        name: "ฝ้า / กระ",
        image:
          "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?q=80&w=300&auto=format&fit=crop",
      },
    ],
  },
];

const facialZones = [
  { id: "t-zone", name: "T-Zone", desc: "หน้าผาก จมูก คาง" },
  { id: "u-zone", name: "U-Zone", desc: "แก้ม กรอบหน้า" },
  { id: "eye", name: "รอบดวงตา", desc: "ใต้ตา หางตา" },
  { id: "lip", name: "รอบริมฝีปาก", desc: "ร่องแก้ม ริมฝีปาก" },
];

const recommendedTreatments = [
  {
    id: "t1",
    name: "Advanced Acne & Scar Clear",
    clinic: "Radiant Skin Clinic",
    matchScore: 98,
    price: "฿2,500",
    image:
      "https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=800&auto=format&fit=crop",
    reason:
      "เหมาะกับปัญหาสิวและรอยดำ ผสานกับไลฟ์สไตล์ที่ต้องออกแดดบ่อยของคุณ ช่วยลดการอักเสบโดยไม่ทำให้ผิวบางลง",
  },
  {
    id: "t4",
    name: "Ultra-Lift HIFU & Rejuvenation",
    clinic: "Lumina Beauty Hub",
    matchScore: 92,
    price: "฿9,900",
    image:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=800&auto=format&fit=crop",
    reason:
      "ตอบโจทย์เป้าหมายการยกกระชับ และจัดการริ้วรอยรอบดวงตาตามช่วงอายุของคุณได้อย่างตรงจุด",
  },
];

// ==========================================
// 2. MAIN COMPONENT
// ==========================================
export default function AssessmentPage() {
  const [step, setStep] = useState(1);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // --- Form States ---
  // Step 1: Profile
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [allergies, setAllergies] = useState("");

  // Step 2: Skin Condition
  const [selectedSkinType, setSelectedSkinType] = useState("");
  const [severity, setSeverity] = useState("");
  const [selectedZones, setSelectedZones] = useState<string[]>([]);

  // Step 3: Concerns
  const [selectedConcerns, setSelectedConcerns] = useState<string[]>([]);

  // Step 4: Context
  const [lifestyle, setLifestyle] = useState("");
  const [goal, setGoal] = useState("");
  const [budget, setBudget] = useState("");

  // --- Handlers ---
  const toggleArrayItem = (
    item: string,
    state: string[],
    setState: React.Dispatch<React.SetStateAction<string[]>>,
  ) => {
    // ถ้ากดเลือกปัญหาอื่น ให้เอาคำว่า "not_sure_concerns" ออก (ถ้ามี)
    let newState = state.filter((i) => i !== "not_sure_concerns");
    if (newState.includes(item)) {
      newState = newState.filter((i) => i !== item);
    } else {
      newState = [...newState, item];
    }
    setState(newState);
  };

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setStep(5); // Go to loading step
    setTimeout(() => {
      setIsAnalyzing(false);
      setStep(6); // Go to results step
    }, 3000);
  };

  const isAIAdapted =
    selectedSkinType === "notsure" ||
    selectedConcerns.includes("not_sure_concerns");

  return (
    <div className="min-h-screen bg-[#fdf6f7] py-10 px-4 sm:px-6 lg:px-8 font-sans flex items-center justify-center">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl shadow-pink-100/50 overflow-hidden border border-gray-100">
        {/* ================= HEADER PROGRESS BAR ================= */}
        {step < 5 && (
          <div className="bg-gray-50 px-8 py-4 border-b border-gray-100 flex items-center justify-between">
            <span className="text-sm font-medium text-gray-500">
              ขั้นตอนที่ {step} จาก 4
            </span>
            <div className="flex gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={`h-1.5 w-10 rounded-full transition-colors ${
                    step >= i ? "bg-[#f1c3c9]" : "bg-gray-200"
                  }`}
                ></div>
              ))}
            </div>
          </div>
        )}

        <div className="p-6 md:p-10">
          {/* ================= STEP 1: PROFILE ================= */}
          {step === 1 && (
            <div className="animate-in fade-in duration-500">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                ข้อมูลส่วนตัวพื้นฐาน
              </h1>
              <p className="text-gray-500 mb-8">
                AI จะใช้ข้อมูลนี้ประเมินความเสื่อมสภาพของผิวและระดับฮอร์โมน
              </p>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">
                    ช่วงอายุ (Age)
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {["ต่ำกว่า 20", "20-29", "30-39", "40-49", "50+"].map(
                      (a) => (
                        <button
                          key={a}
                          onClick={() => setAge(a)}
                          className={`px-5 py-2.5 rounded-xl border-2 transition-all ${age === a ? "border-[#f1c3c9] bg-[#fdf4f5] text-gray-900 shadow-sm" : "border-gray-100 text-gray-600 hover:border-gray-200"}`}
                        >
                          {a}
                        </button>
                      ),
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">
                    เพศสภาพ (Gender)
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {["ชาย", "หญิง", "อื่นๆ"].map((g) => (
                      <button
                        key={g}
                        onClick={() => setGender(g)}
                        className={`px-5 py-2.5 rounded-xl border-2 transition-all ${gender === g ? "border-[#f1c3c9] bg-[#fdf4f5] text-gray-900 shadow-sm" : "border-gray-100 text-gray-600 hover:border-gray-200"}`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">
                    ประวัติการแพ้ยา/สารเคมี
                  </label>
                  <div className="flex flex-wrap gap-3 mb-3">
                    <button
                      onClick={() => setAllergies("ไม่มี")}
                      className={`px-5 py-2.5 rounded-xl border-2 transition-all ${allergies === "ไม่มี" ? "border-[#f1c3c9] bg-[#fdf4f5] text-gray-900 shadow-sm" : "border-gray-100 text-gray-600 hover:border-gray-200"}`}
                    >
                      ไม่มีประวัติแพ้
                    </button>
                    <button
                      onClick={() => setAllergies("ไม่แน่ใจ")}
                      className={`px-5 py-2.5 rounded-xl border-2 transition-all ${allergies === "ไม่แน่ใจ" ? "border-gray-800 bg-gray-100 text-gray-900" : "border-gray-100 text-gray-600 hover:border-gray-200"}`}
                    >
                      ไม่แน่ใจ (Not Sure)
                    </button>
                  </div>
                  <input
                    type="text"
                    placeholder="หรือระบุสิ่งที่แพ้ (เช่น แอลกอฮอล์, น้ำหอม, ยาชา)"
                    value={
                      allergies !== "ไม่มี" && allergies !== "ไม่แน่ใจ"
                        ? allergies
                        : ""
                    }
                    onChange={(e) => setAllergies(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-[#f1c3c9] focus:outline-none transition-colors text-gray-600"
                  />
                </div>
              </div>

              <div className="flex justify-end mt-10">
                <button
                  onClick={() => setStep(2)}
                  disabled={!age || !gender || !allergies}
                  className="bg-[#f1c3c9] hover:bg-[#e4b2b8] disabled:bg-gray-200 text-white px-8 py-3 rounded-xl font-medium transition-colors"
                >
                  ถัดไป
                </button>
              </div>
            </div>
          )}

          {/* ================= STEP 2: SKIN BASE ================= */}
          {step === 2 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                สภาพผิวเบื้องต้น
              </h1>
              <p className="text-gray-500 mb-6">
                เลือกสภาพผิวของคุณ หรือให้ AI ประเมินจากข้อมูลอื่นๆ
              </p>

              {/* แจ้งเตือนเมื่อกดไม่แน่ใจ */}
              {selectedSkinType === "notsure" && (
                <div className="mb-6 p-4 bg-blue-50 border border-blue-100 rounded-xl flex items-start gap-3 text-blue-800 animate-in fade-in">
                  <span className="text-xl">💡</span>
                  <p className="text-sm">
                    <strong>ไม่ต้องกังวลครับ:</strong> AI จะลดน้ำหนักในข้อนี้
                    และไปเพิ่มน้ำหนักการวิเคราะห์จาก{" "}
                    <strong>"ปัญหาผิวเฉพาะจุด"</strong> และ{" "}
                    <strong>"ไลฟ์สไตล์การใช้ชีวิต"</strong> ของคุณแทน
                  </p>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {skinTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedSkinType(type.id)}
                    className={`p-4 rounded-2xl border-2 text-left transition-all flex items-start gap-4 ${selectedSkinType === type.id ? (type.id === "notsure" ? "border-blue-300 bg-blue-50 shadow-sm" : "border-[#f1c3c9] bg-[#fdf4f5] shadow-sm") : "border-gray-100 hover:border-gray-200 bg-white"}`}
                  >
                    <div className="text-3xl mt-1">{type.icon}</div>
                    <div>
                      <h3 className="font-bold text-gray-900">{type.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">{type.desc}</p>
                    </div>
                  </button>
                ))}
              </div>

              <div className="mb-8">
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  ระดับความรุนแรงของปัญหาผิว (Severity)
                </label>
                <div className="flex flex-wrap gap-3">
                  {[
                    "เล็กน้อย (เช่น สิวประปราย)",
                    "ปานกลาง",
                    "รุนแรง (ต้องการการรักษาด่วน)",
                  ].map((s) => (
                    <button
                      key={s}
                      onClick={() => setSeverity(s)}
                      className={`px-5 py-2.5 rounded-xl border-2 transition-all ${severity === s ? "border-[#f1c3c9] bg-[#fdf4f5] text-gray-900 shadow-sm" : "border-gray-100 text-gray-600 hover:border-gray-200"}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  โซนใบหน้าที่มีปัญหาหลัก (Facial Zones)
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {facialZones.map((zone) => (
                    <button
                      key={zone.id}
                      onClick={() =>
                        toggleArrayItem(
                          zone.id,
                          selectedZones,
                          setSelectedZones,
                        )
                      }
                      className={`px-4 py-3 rounded-xl border-2 text-left transition-all ${selectedZones.includes(zone.id) ? "border-[#f1c3c9] bg-[#fdf4f5] shadow-sm" : "border-gray-100 hover:border-gray-200"}`}
                    >
                      <span className="font-bold block text-sm text-gray-900">
                        {zone.name}
                      </span>
                      <span className="text-xs text-gray-500">{zone.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-between mt-10">
                <button
                  onClick={() => setStep(1)}
                  className="text-gray-500 px-4 py-2 hover:bg-gray-50 rounded-lg"
                >
                  ย้อนกลับ
                </button>
                <button
                  onClick={() => setStep(3)}
                  disabled={!selectedSkinType || !severity}
                  className="bg-[#f1c3c9] hover:bg-[#e4b2b8] disabled:bg-gray-200 text-white px-8 py-3 rounded-xl font-medium"
                >
                  ถัดไป
                </button>
              </div>
            </div>
          )}

          {/* ================= STEP 3: CONCERNS (พร้อมรูปภาพ) ================= */}
          {step === 3 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex justify-between items-end mb-6">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    ปัญหาผิวที่กังวล
                  </h1>
                  <p className="text-gray-500">
                    เลือกปัญหาที่คุณพบ (สามารถดูภาพประกอบเพื่อเทียบเคียงได้)
                  </p>
                </div>
                {/* ปุ่มไม่แน่ใจ สำหรับ Desktop */}
                <button
                  onClick={() => {
                    setSelectedConcerns(["not_sure_concerns"]);
                    setStep(4);
                  }}
                  className="hidden md:flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm transition-colors font-medium"
                >
                  🤔 ไม่แน่ใจ ข้ามไปก่อน
                </button>
              </div>

              <div className="space-y-8 mb-10">
                {concernGroups.map((group, idx) => (
                  <div key={idx}>
                    <h3 className="font-bold text-gray-800 mb-4 border-b pb-2">
                      {group.title}
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {group.items.map((concern) => {
                        const isSelected = selectedConcerns.includes(
                          concern.id,
                        );
                        return (
                          <button
                            key={concern.id}
                            onClick={() =>
                              toggleArrayItem(
                                concern.id,
                                selectedConcerns,
                                setSelectedConcerns,
                              )
                            }
                            className={`relative flex flex-col items-center rounded-xl border-2 transition-all overflow-hidden ${isSelected ? "border-[#f1c3c9] shadow-md" : "border-gray-100 hover:border-gray-200 bg-white"}`}
                          >
                            <div className="relative w-full h-28 bg-gray-100">
                              <img
                                src={concern.image}
                                alt={concern.name}
                                className="w-full h-full object-cover"
                              />
                              {isSelected && (
                                <div className="absolute inset-0 bg-[#f1c3c9]/20 backdrop-blur-[1px] flex items-center justify-center">
                                  <div className="bg-white rounded-full p-1 shadow-sm">
                                    <svg
                                      className="w-5 h-5 text-[#f1c3c9]"
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
                                </div>
                              )}
                            </div>
                            <div
                              className={`w-full text-center p-3 text-sm font-medium ${isSelected ? "bg-[#fdf4f5] text-gray-900" : "text-gray-600"}`}
                            >
                              {concern.name}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}

                {/* ปุ่มข้ามสำหรับ Mobile */}
                <button
                  onClick={() => {
                    setSelectedConcerns(["not_sure_concerns"]);
                    setStep(4);
                  }}
                  className="w-full md:hidden py-3 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium mt-4 hover:bg-gray-200"
                >
                  🤔 ไม่แน่ใจให้ AI ประเมินจากข้อมูลอื่น
                </button>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => setStep(2)}
                  className="text-gray-500 px-4 py-2 hover:bg-gray-50 rounded-lg"
                >
                  ย้อนกลับ
                </button>
                <button
                  onClick={() => setStep(4)}
                  disabled={selectedConcerns.length === 0}
                  className="bg-[#f1c3c9] hover:bg-[#e4b2b8] disabled:bg-gray-200 text-white px-8 py-3 rounded-xl font-medium"
                >
                  ถัดไป
                </button>
              </div>
            </div>
          )}

          {/* ================= STEP 4: CONTEXT ================= */}
          {step === 4 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                เป้าหมาย & ไลฟ์สไตล์
              </h1>
              <p className="text-gray-500 mb-8">
                ข้อมูลบริบทรอบตัวช่วยให้เราคัดกรองทรีตเมนต์ที่เข้ากับวิถีชีวิตและเงินในกระเป๋าของคุณ
              </p>

              <div className="space-y-6 mb-10">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">
                    ไลฟ์สไตล์ / สภาพแวดล้อม (Lifestyle)
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {[
                      "ทำงานออฟฟิศ (ห้องแอร์)",
                      "ออกแดดบ่อย/กลางแจ้ง",
                      "นอนดึก/พักผ่อนน้อย",
                      "แต่งหน้าเป็นประจำ",
                    ].map((ls) => (
                      <button
                        key={ls}
                        onClick={() => setLifestyle(ls)}
                        className={`px-4 py-2.5 rounded-xl border-2 transition-all ${lifestyle === ls ? "border-[#f1c3c9] bg-[#fdf4f5] text-gray-900 shadow-sm" : "border-gray-100 text-gray-600 hover:border-gray-200"}`}
                      >
                        {ls}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">
                    เป้าหมายในการรักษา (Goal)
                  </label>
                  <div className="flex flex-col gap-3">
                    {[
                      "ต้องการฟื้นฟูผิวแบบองค์รวม (Rejuvenation)",
                      "แก้ไขปัญหาเฉพาะจุดอย่างเร่งด่วน (Targeted Fix)",
                      "ปรับรูปหน้า/เสริมความงาม (Enhancement)",
                    ].map((g) => (
                      <button
                        key={g}
                        onClick={() => setGoal(g)}
                        className={`px-4 py-3 rounded-xl border-2 text-left transition-all ${goal === g ? "border-[#f1c3c9] bg-[#fdf4f5] text-gray-900 shadow-sm" : "border-gray-100 text-gray-600 hover:border-gray-200"}`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">
                    งบประมาณที่คาดหวัง (Budget ต่อครั้ง)
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {[
                      "< 1,000฿",
                      "1,000 - 3,000฿",
                      "3,000 - 5,000฿",
                      "ไม่จำกัดงบ",
                    ].map((b) => (
                      <button
                        key={b}
                        onClick={() => setBudget(b)}
                        className={`px-4 py-2.5 rounded-xl border-2 transition-all ${budget === b ? "border-[#f1c3c9] bg-[#fdf4f5] text-gray-900 shadow-sm" : "border-gray-100 text-gray-600 hover:border-gray-200"}`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center border-t border-gray-100 pt-6">
                <button
                  onClick={() => setStep(3)}
                  className="text-gray-500 px-4 py-2 hover:bg-gray-50 rounded-lg"
                >
                  ย้อนกลับ
                </button>
                <button
                  onClick={handleAnalyze}
                  disabled={!lifestyle || !goal || !budget}
                  className="bg-black hover:bg-gray-800 disabled:bg-gray-200 text-white px-8 py-3 rounded-xl font-medium flex items-center gap-2 transition-all shadow-md"
                >
                  ✨ วิเคราะห์ด้วย AI
                </button>
              </div>
            </div>
          )}

          {/* ================= STEP 5: ANALYZING ================= */}
          {step === 5 && isAnalyzing && (
            <div className="py-20 flex flex-col items-center justify-center text-center animate-in fade-in duration-300">
              <div className="relative w-24 h-24 mb-8">
                <div className="absolute inset-0 bg-[#f1c3c9] rounded-full animate-ping opacity-20"></div>
                <div className="relative w-full h-full bg-[#fdf4f5] border-4 border-[#f1c3c9] rounded-full flex items-center justify-center">
                  <span className="text-4xl">🧠</span>
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                AI กำลังวิเคราะห์โปรไฟล์ของคุณ...
              </h2>
              <p className="text-gray-500 max-w-md">
                ประมวลผลจากอายุ {age}, ไลฟ์สไตล์, โซนใบหน้า
                และเทียบกับฐานข้อมูลคลินิกเฉพาะทาง
              </p>
            </div>
          )}

          {/* ================= STEP 6: RESULTS ================= */}
          {step === 6 && (
            <div className="animate-in zoom-in-95 duration-500">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#e6fcf0] text-[#1e884e] rounded-full mb-4 shadow-sm">
                  <span className="text-3xl">✅</span>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-3">
                  ทรีตเมนต์ที่เหมาะสมที่สุดสำหรับคุณ
                </h1>
                <p className="text-gray-500 mb-4">
                  อ้างอิงจากงบประมาณ {budget} และเป้าหมายของคุณ
                </p>

                {/* แจ้งเตือนในผลลัพธ์ หากมีการกด "ไม่แน่ใจ" มาก่อนหน้านี้ */}
                {isAIAdapted && (
                  <div className="inline-block bg-amber-50 border border-amber-200 text-amber-800 px-4 py-2 rounded-lg text-sm mb-4">
                    💡 <strong>AI Adaptation:</strong>{" "}
                    ระบบได้ประเมินทรีตเมนต์เหล่านี้โดยวิเคราะห์เจาะจงจากไลฟ์สไตล์{" "}
                    <span className="font-semibold underline decoration-amber-300">
                      {lifestyle}
                    </span>{" "}
                    แทนข้อมูลที่คุณไม่แน่ใจ
                  </div>
                )}
              </div>

              <div className="space-y-6 mb-10">
                {recommendedTreatments.map((t) => (
                  <div
                    key={t.id}
                    className="border border-gray-100 rounded-2xl p-4 md:p-6 flex flex-col md:flex-row gap-6 hover:shadow-lg transition-shadow bg-white"
                  >
                    <div className="relative w-full md:w-56 h-48 rounded-xl overflow-hidden shrink-0 shadow-sm">
                      {/* ใช้ next/image สำหรับรูปทรีตเมนต์ (ต้อง config domain ภาพใน next.config.js ถ้านำไปใช้จริง) */}
                      <Image
                        src={t.image}
                        alt={t.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-2 left-2 bg-black/80 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-md">
                        {t.matchScore}% Match
                      </div>
                    </div>

                    <div className="flex-1 flex flex-col">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">
                        {t.name}
                      </h3>
                      <p className="text-[#dcb5b9] text-sm font-medium mb-3">
                        {t.clinic}
                      </p>

                      <div className="bg-[#faf8f6] p-4 rounded-xl text-sm text-gray-600 mb-4 flex-1 border border-gray-100">
                        <span className="font-bold text-gray-800 block mb-1">
                          ✨ ทำไม AI ถึงแนะนำสิ่งนี้:
                        </span>
                        {t.reason}
                      </div>

                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                        <span className="text-2xl font-bold text-gray-900">
                          {t.price}
                        </span>
                        <Link
                          href={`/treatment/${t.id}`}
                          className="text-[#f1c3c9] hover:text-[#d89ba0] font-medium transition-colors flex items-center gap-1"
                        >
                          รายละเอียด <span className="text-xl">&rarr;</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8 pt-8 border-t border-gray-100">
                <button
                  onClick={() => {
                    setStep(1);
                    setSelectedConcerns([]);
                    setSelectedSkinType("");
                    setSelectedZones([]);
                  }}
                  className="px-8 py-3 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors font-medium"
                >
                  ทำแบบประเมินใหม่
                </button>
                <Link
                  href="/profile"
                  className="bg-black hover:bg-gray-800 text-white px-8 py-3 rounded-xl text-center transition-colors shadow-sm font-medium"
                >
                  💾 บันทึกผลลัพธ์ลงโปรไฟล์
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
