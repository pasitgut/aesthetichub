import Image from "next/image";

// --- Mock Data ---
const treatmentData = {
  title: "Advanced Botox Treatment",
  rating: 4.9,
  reviewsCount: 89,
  duration: "30-45 minutes",
  clinicName: "Radiant Skin Clinic",
  price: "$450",
  overview: `Botox is a purified protein that temporarily relaxes facial muscles responsible for dynamic wrinkles. Our advanced technique ensures natural-looking results while maintaining facial expressiveness.\n\nThis FDA-approved treatment is one of the most popular non-surgical cosmetic procedures worldwide, with millions of satisfied patients achieving smoother, younger-looking skin.`,
};

const suitableFor = [
  "Forehead lines",
  "Crow's feet",
  "Frown lines",
  "All skin types",
];

const treatmentDetailsCard = [
  { label: "Duration", value: "30-45 min" },
  { label: "Downtime", value: "None" },
  { label: "Results Last", value: "3-6 months" },
  { label: "Pain Level", value: "Minimal" },
];

const patientReviews = [
  {
    id: 1,
    name: "Sarah M.",
    date: "2 weeks ago",
    rating: 5,
    text: "Amazing results! My forehead looks so smooth and natural. The staff was professional and made me feel comfortable throughout the entire process.",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Jennifer K.",
    date: "1 month ago",
    rating: 5,
    text: "Best decision I've made! The results are exactly what I wanted - subtle but effective. Highly recommend this clinic!",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100&auto=format&fit=crop",
  },
];

export default function TreatmentDetailsPage() {
  return (
    <div className="min-h-screen bg-white py-10 px-4 sm:px-6 lg:px-8 font-sans text-gray-800">
      <div className="max-w-7xl mx-auto">
        {/* Main Grid Layout: 2/3 Left, 1/3 Right */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* ================= LEFT COLUMN (Content) ================= */}
          <div className="lg:col-span-2 space-y-12">
            {/* 1. Hero Image */}
            <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden shadow-sm">
              <Image
                src="https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=1200&auto=format&fit=crop"
                alt="Advanced Botox Treatment"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* 2. Header Info */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold font-serif text-gray-900 mb-4">
                {treatmentData.title}
              </h1>
              <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-sm text-gray-600 font-medium">
                {/* Rating */}
                <div className="flex items-center">
                  <div className="flex text-yellow-400 mr-1.5">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-4 h-4 fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-gray-900 font-bold mr-1">
                    {treatmentData.rating}
                  </span>
                  <span className="text-gray-400 font-normal">
                    ({treatmentData.reviewsCount} reviews)
                  </span>
                </div>
                {/* Duration */}
                <div className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-1.5 text-gray-500"
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
                  {treatmentData.duration}
                </div>
                {/* Clinic Name */}
                <div className="flex items-center text-[#dcb5b9] font-semibold">
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
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1v1H9V7zm5 0h1v1h-1V7zm-5 4h1v1H9v-1zm5 0h1v1h-1v-1zm-5 4h1v1H9v-1zm5 0h1v1h-1v-1z"
                    />
                  </svg>
                  {treatmentData.clinicName}
                </div>
              </div>
            </div>

            {/* 3. Treatment Overview */}
            <div>
              <h2 className="text-xl font-bold font-serif mb-4 text-gray-900">
                Treatment Overview
              </h2>
              <div className="space-y-4 text-gray-600 text-sm md:text-base leading-relaxed whitespace-pre-line">
                {treatmentData.overview}
              </div>
            </div>

            {/* 4. Suitable For (Grid) */}
            <div>
              <h2 className="text-xl font-bold font-serif mb-4 text-gray-900">
                Suitable For
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {suitableFor.map((item, index) => (
                  <div
                    key={index}
                    className="bg-[#faf8f6] px-5 py-4 rounded-xl flex items-center gap-3 border border-gray-100/50"
                  >
                    <svg
                      className="w-5 h-5 text-green-500 bg-green-100 rounded-full p-0.5"
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
                    <span className="font-medium text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. Expected Results */}
            <div>
              <h2 className="text-xl font-bold font-serif mb-4 text-gray-900">
                Expected Results
              </h2>
              <div className="bg-[#faf8f6] p-6 rounded-2xl border border-gray-100/50 space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-[#dcb5b9] mt-0.5">📅</span>
                  <div>
                    <span className="font-bold text-gray-900">Timeline:</span>{" "}
                    <span className="text-gray-600">
                      Results visible within 3-7 days, full effect at 2 weeks
                    </span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#dcb5b9] mt-0.5">⏳</span>
                  <div>
                    <span className="font-bold text-gray-900">Duration:</span>{" "}
                    <span className="text-gray-600">
                      Results last 3-6 months on average
                    </span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#dcb5b9] mt-0.5">✨</span>
                  <div>
                    <span className="font-bold text-gray-900">Outcome:</span>{" "}
                    <span className="text-gray-600">
                      Smoother, refreshed appearance with reduced wrinkles
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 6. Precautions & Post-Treatment Care */}
            <div>
              <h2 className="text-xl font-bold font-serif mb-4 text-gray-900">
                Precautions & Post-Treatment Care
              </h2>
              <div className="space-y-4">
                {/* Before Treatment */}
                <div className="bg-[#fffbeb] p-6 rounded-2xl border border-yellow-100">
                  <h3 className="font-bold text-gray-900 mb-2">
                    Before Treatment
                  </h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm md:text-base">
                    <li>Avoid blood thinners 1 week prior</li>
                    <li>Inform provider of all medications</li>
                    <li>No alcohol 24 hours before</li>
                  </ul>
                </div>
                {/* After Treatment */}
                <div className="bg-[#eff6ff] p-6 rounded-2xl border border-blue-100">
                  <h3 className="font-bold text-gray-900 mb-2">
                    After Treatment
                  </h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm md:text-base">
                    <li>Stay upright for 4 hours</li>
                    <li>Avoid strenuous exercise for 24 hours</li>
                    <li>No facial massage for 48 hours</li>
                    <li>Avoid extreme heat (sauna, sun) for 24 hours</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 7. Patient Reviews */}
            <div className="pt-4 border-t border-gray-100">
              <h2 className="text-2xl font-bold font-serif mb-6 text-gray-900">
                Patient Reviews
              </h2>

              {/* Review Controls */}
              <div className="flex items-center gap-4 mb-8">
                <button className="bg-[#f5ced2] hover:bg-[#ebb8bd] text-white px-6 py-2 rounded-lg font-serif transition-colors">
                  Write review
                </button>
                <select className="border border-gray-300 rounded-lg px-4 py-2 text-gray-600 text-sm focus:outline-none focus:ring-1 focus:ring-[#f5ced2]">
                  <option>Sort by score</option>
                  <option>Newest</option>
                  <option>Oldest</option>
                </select>
              </div>

              {/* Write Review Form Area */}
              <div className="mb-10">
                <textarea
                  rows={4}
                  placeholder="write your review.............."
                  className="w-full border border-gray-300 rounded-xl p-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#f5ced2] focus:border-transparent resize-none mb-3 font-serif placeholder:italic"
                ></textarea>
                <div className="flex justify-end gap-3">
                  <button className="bg-black hover:bg-gray-800 text-white px-8 py-2.5 rounded-lg font-serif transition-colors">
                    cancel
                  </button>
                  <button className="bg-[#f5ced2] hover:bg-[#ebb8bd] text-white px-8 py-2.5 rounded-lg font-serif transition-colors">
                    Done
                  </button>
                </div>
              </div>

              {/* Review List */}
              <div className="space-y-4">
                {patientReviews.map((review) => (
                  <div
                    key={review.id}
                    className="border border-gray-100 rounded-2xl p-6 bg-white shadow-sm"
                  >
                    <div className="flex items-center gap-4 mb-3">
                      <Image
                        src={review.avatar}
                        alt={review.name}
                        width={48}
                        height={48}
                        className="rounded-full object-cover w-12 h-12"
                      />
                      <div>
                        <h4 className="font-bold text-gray-900">
                          {review.name}
                        </h4>
                        <div className="flex items-center gap-2 mt-0.5">
                          <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                className="w-3.5 h-3.5 fill-current"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          <span className="text-xs text-gray-400">
                            {review.date}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                      {review.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ================= RIGHT COLUMN (Sidebar / Pricing) ================= */}
          <div className="lg:col-span-1">
            {/* Sticky Container */}
            <div className="sticky top-24 bg-[#faf8f6] rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm">
              {/* Pricing Header */}
              <div className="text-center mb-6">
                <p className="text-gray-500 text-sm mb-1">Starting from</p>
                <h3 className="text-4xl font-bold text-gray-900 mb-1">
                  {treatmentData.price}
                </h3>
                <p className="text-gray-400 text-xs">Per treatment area</p>
              </div>

              {/* Action Button */}
              <button className="w-full bg-[#f5ced2] hover:bg-[#ebb8bd] text-white py-3 rounded-xl font-serif text-lg transition-colors shadow-sm mb-8">
                Compare
              </button>

              {/* Details Table */}
              <div>
                <h4 className="font-bold text-gray-900 mb-4 text-sm font-serif">
                  Treatment Details
                </h4>
                <ul className="space-y-4 text-sm">
                  {treatmentDetailsCard.map((detail, idx) => (
                    <li
                      key={idx}
                      className="flex justify-between items-center border-b border-gray-200/60 pb-3 last:border-0 last:pb-0"
                    >
                      <span className="text-gray-500">{detail.label}</span>
                      <span className="font-medium text-gray-900">
                        {detail.value}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
