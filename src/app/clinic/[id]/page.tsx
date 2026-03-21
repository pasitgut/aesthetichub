import Image from "next/image";

// --- Mock Data ---
const clinicData = {
  name: "Radiant Skin Clinic",
  address: "123 Madison Avenue, Manhattan, NY 10016",
  rating: 4.8,
  reviews: 342,
  hours: "Mon-Sat: 9AM - 7PM",
  phone: "(212) 555-0123",
  about: `Radiant Skin Clinic is a premier aesthetic medical facility specializing in advanced skin rejuvenation and anti-aging treatments. With over 15 years of experience, our board-certified dermatologists and aesthetic specialists are dedicated to helping you achieve your beauty goals. \n\nWe combine cutting-edge technology with personalized care to deliver exceptional results in a comfortable, luxurious environment.`,
};

const highlights = [
  { id: 1, icon: "🏵️", text: "Board-Certified Specialists" },
  { id: 2, icon: "🎖️", text: "15+ Years Experience" },
  { id: 3, icon: "🛡️", text: "FDA-Approved Treatments" },
  { id: 4, icon: "👥", text: "5000+ Happy Clients" },
];

const treatments = [
  {
    id: 1,
    name: "Advanced Botox Treatment",
    desc: "Reduce fine lines and wrinkles with our premium botulinum toxin injections",
    tags: ["Anti-Aging", "Wrinkle Reduction"],
    duration: "30-45 min",
    rating: 4.9,
    reviews: 89,
    price: "$450",
  },
  {
    id: 2,
    name: "Dermal Filler Package",
    desc: "Restore volume and contour with hyaluronic acid fillers",
    tags: ["Volume Restoration", "Facial Contouring"],
    duration: "45-60 min",
    rating: 4.8,
    reviews: 124,
    price: "$650",
  },
  {
    id: 3,
    name: "Chemical Peel - Glycolic Acid",
    desc: "Exfoliate and brighten skin with medical-grade chemical peels",
    tags: ["Brightening", "Acne Treatment"],
    duration: "30 min",
    rating: 4.7,
    reviews: 67,
    price: "$250",
  },
];

export default function ClinicDetailsPage() {
  return (
    <div className="min-h-screen bg-white py-10 px-4 sm:px-6 lg:px-8 font-sans text-gray-800">
      <div className="max-w-7xl mx-auto">
        {/* Main Grid Layout: 2/3 Left, 1/3 Right */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* ================= LEFT COLUMN (Content) ================= */}
          <div className="lg:col-span-2 space-y-10">
            {/* 1. Image Gallery */}
            <div className="relative w-full aspect-[16/9] md:aspect-[21/9] lg:aspect-[16/9] rounded-2xl overflow-hidden shadow-sm">
              <Image
                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1200&auto=format&fit=crop"
                alt="Clinic Interior"
                fill
                className="object-cover"
                priority
              />
              {/* Pagination Dots */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                <div className="w-2.5 h-2.5 rounded-full bg-white shadow-sm"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-white/50 backdrop-blur-sm"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-white/50 backdrop-blur-sm"></div>
              </div>
            </div>

            {/* 2. Clinic Header Info */}
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              {/* Logo */}
              <div className="w-20 h-20 rounded-full border border-gray-200 flex items-center justify-center shrink-0 bg-[#faf8f6]">
                <span className="font-serif text-2xl text-[#dcb5b9]">RS</span>
              </div>

              {/* Info */}
              <div className="space-y-3">
                <h1 className="text-3xl font-bold font-serif text-gray-900">
                  {clinicData.name}
                </h1>

                <div className="flex items-center text-sm text-gray-500">
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
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  {clinicData.address}
                </div>

                <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-sm text-gray-600 font-medium">
                  {/* Rating */}
                  <div className="flex items-center">
                    <svg
                      className="w-4 h-4 text-yellow-400 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-gray-900 mr-1">
                      {clinicData.rating}
                    </span>
                    <span className="text-gray-400 font-normal">
                      ({clinicData.reviews} reviews)
                    </span>
                  </div>
                  {/* Hours */}
                  <div className="flex items-center">
                    <svg
                      className="w-4 h-4 mr-1 text-gray-400"
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
                    {clinicData.hours}
                  </div>
                  {/* Phone */}
                  <div className="flex items-center">
                    <svg
                      className="w-4 h-4 mr-1 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    {clinicData.phone}
                  </div>
                </div>
              </div>
            </div>

            {/* 3. About Section */}
            <div>
              <h2 className="text-2xl font-bold font-serif mb-4 text-gray-900">
                About the Clinic
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed text-sm md:text-base">
                <p>
                  Radiant Skin Clinic is a premier aesthetic medical facility
                  specializing in advanced skin rejuvenation and anti-aging
                  treatments. With over 15 years of experience, our
                  board-certified dermatologists and aesthetic specialists are
                  dedicated to helping you achieve your beauty goals.
                </p>
                <p>
                  We combine cutting-edge technology with personalized care to
                  deliver exceptional results in a comfortable, luxurious
                  environment.
                </p>
              </div>
            </div>

            {/* 4. Highlights Section */}
            <div>
              <h2 className="text-2xl font-bold font-serif mb-4 text-gray-900">
                Highlights
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {highlights.map((item) => (
                  <div
                    key={item.id}
                    className="bg-[#faf8f6] px-5 py-4 rounded-xl flex items-center gap-3 border border-gray-100/50"
                  >
                    <span className="text-xl bg-[#f5ced2]/20 p-2 rounded-lg">
                      {item.icon}
                    </span>
                    <span className="font-medium text-gray-700 text-sm md:text-base">
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. Available Treatments Section */}
            <div>
              <h2 className="text-2xl font-bold font-serif mb-6 text-gray-900">
                Available Treatments
              </h2>
              <div className="space-y-5">
                {treatments.map((item) => (
                  <div
                    key={item.id}
                    className="border border-gray-100 rounded-2xl p-6 flex flex-col md:flex-row justify-between gap-6 hover:shadow-md transition-shadow bg-white"
                  >
                    {/* Treatment Info */}
                    <div className="space-y-3 flex-1">
                      <h3 className="text-xl font-bold text-gray-900">
                        {item.name}
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed">
                        {item.desc}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 pt-1">
                        {item.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-[#fdf4f5] text-[#dcb5b9] text-xs font-semibold rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Duration & Rating */}
                      <div className="flex items-center gap-4 text-sm font-medium text-gray-600 pt-2">
                        <div className="flex items-center">
                          <svg
                            className="w-4 h-4 mr-1.5 text-gray-400"
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
                          {item.duration}
                        </div>
                        <div className="flex items-center">
                          <svg
                            className="w-4 h-4 text-yellow-400 mr-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          {item.rating}{" "}
                          <span className="text-gray-400 font-normal ml-1">
                            ({item.reviews} reviews)
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Price & Action */}
                    <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center shrink-0 border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6">
                      <div className="text-2xl font-bold text-gray-900 md:mb-3">
                        {item.price}
                      </div>
                      <button className="bg-[#f5ced2] hover:bg-[#ebb8bd] text-white px-8 py-2.5 rounded-xl font-serif transition-colors shadow-sm">
                        Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ================= RIGHT COLUMN (Sidebar / Contact) ================= */}
          <div className="lg:col-span-1">
            {/* Sticky Container */}
            <div className="sticky top-24 bg-[#faf8f6] rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h3 className="text-xl font-bold font-serif text-gray-900 mb-6">
                Quick Contact
              </h3>

              <div className="space-y-3 mb-8">
                <button className="w-full bg-[#f5ced2] hover:bg-[#ebb8bd] text-white py-3 rounded-xl font-serif transition-colors shadow-sm">
                  Call Clinic
                </button>
                <button className="w-full bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 py-3 rounded-xl font-serif transition-colors shadow-sm">
                  Save Clinic
                </button>
              </div>

              {/* Opening Hours */}
              <div>
                <h4 className="font-bold text-gray-900 mb-4 text-sm">
                  Opening Hours
                </h4>
                <ul className="space-y-3 text-sm">
                  <li className="flex justify-between items-center text-gray-600">
                    <span>Monday - Friday</span>
                    <span className="font-medium text-gray-900">
                      9:00 AM - 7:00 PM
                    </span>
                  </li>
                  <li className="flex justify-between items-center text-gray-600">
                    <span>Saturday</span>
                    <span className="font-medium text-gray-900">
                      10:00 AM - 5:00 PM
                    </span>
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
