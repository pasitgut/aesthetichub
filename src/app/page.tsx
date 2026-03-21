import Image from "next/image";
import Link from "next/link";

// --- Mock Data ---
const clinicsData = [
  {
    id: 1,
    name: "Radiant Skin Clinic",
    location: "Manhattan, NY",
    rating: 4.8,
    reviews: 342,
    image:
      "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Glow Medical Spa",
    location: "Beverly Hills, CA",
    rating: 5.0,
    reviews: 198,
    image:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Elite Aesthetics",
    location: "Chicago, IL",
    rating: 4.6,
    reviews: 267,
    image:
      "https://images.unsplash.com/photo-1560624052-449f5ddf0c31?q=80&w=800&auto=format&fit=crop",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      {/* 1. Hero Section */}
      <section className="bg-[#fcf6f6] px-6 py-12 md:py-20">
        <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-8">
          {/* Hero Content (Left) */}
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

              <button className="bg-black hover:bg-gray-800 text-white font-serif px-8 py-3.5 rounded-full text-lg transition shadow-lg">
                Start Assessment
              </button>

              {/* Stats */}
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

          {/* Hero Image (Right) */}
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

        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-10">
          {/* Search Bar */}
          <div className="relative w-full md:w-1/3">
            <input
              type="text"
              placeholder="Search Clinic..."
              className="w-full pl-4 pr-10 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:border-[#f1c3c9] focus:ring-1 focus:ring-[#f1c3c9] font-serif"
            />
            <svg
              className="w-5 h-5 absolute right-3 top-3 text-gray-400"
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

          {/* Dropdowns */}
          <div className="flex gap-4 w-full md:w-auto">
            <select className="w-full md:w-48 px-4 py-2.5 border border-gray-300 rounded-md bg-white focus:outline-none font-serif text-gray-600 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23666%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:12px_auto] bg-no-repeat bg-[position:right_1rem_center]">
              <option>All Location</option>
              <option>New York</option>
              <option>California</option>
            </select>
            <select className="w-full md:w-48 px-4 py-2.5 border border-gray-300 rounded-md bg-white focus:outline-none font-serif text-gray-600 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23666%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:12px_auto] bg-no-repeat bg-[position:right_1rem_center]">
              <option>Treatment Type</option>
              <option>Laser</option>
              <option>Botox</option>
            </select>
          </div>
        </div>

        {/* Clinic Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {clinicsData.map((clinic) => (
            <div
              key={clinic.id}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden flex flex-col hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={clinic.image}
                  alt={clinic.name}
                  fill
                  className="object-cover"
                />
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
                      {clinic.location}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-6 text-sm">
                  <div className="flex text-yellow-400">
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
                  <span className="font-bold text-gray-900">
                    {clinic.rating}
                  </span>
                  <span className="text-gray-500">
                    ({clinic.reviews} reviews)
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
        </div>
      </section>
    </div>
  );
}
