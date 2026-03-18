import Image from "next/image";
import Link from "next/link";

// --- Mock Data ---
const assessmentHistory = [
  {
    id: 1,
    title: "Anti-Aging Assessment",
    date: "Jan 15, 2024",
    status: "Completed",
    concerns: "Fine lines, uneven tone",
    skinType: "Combination",
  },
  {
    id: 2,
    title: "Acne Treatment Assessment",
    date: "Dec 8, 2023",
    status: "Completed",
    concerns: "Acne, scarring",
    skinType: "Oily",
  },
];

const savedClinics = [
  {
    id: 1,
    name: "Radiant Skin Clinic",
    location: "Manhattan, NY",
    rating: 4.8,
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 3C7.029 3 3 7.029 3 12s4.029 9 9 9 9-4.029 9-9-4.029-9-9-9zm0 16c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM9.525 9.878A4.978 4.978 0 0112 9c.905 0 1.758.243 2.475.672l-1.05 1.819A2.983 2.983 0 0012 11c-.538 0-1.043.144-1.475.397L9.525 9.878zm4.95 2.153l1.818 1.05A4.978 4.978 0 0115 15.556v-2.1c.42-.511.666-1.164.666-1.868 0-.198-.02-.392-.058-.582l-1.133.535zm-4.95 0l-1.133-.535A2.992 2.992 0 008.334 12c0 .704.246 1.357.666 1.868v2.1a4.978 4.978 0 01-1.293-2.475l1.818-1.05z" />
      </svg>
    ),
  },
  {
    id: 2,
    name: "Glow Medical Spa",
    location: "Beverly Hills, CA",
    rating: 5.0,
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
      </svg>
    ),
  },
];

export default function ProfilePage() {
  return (
    // Background สีครีม/เทาอ่อน เหมือนในภาพต้นฉบับ
    <div className="min-h-screen bg-[#f8f7f5] py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        
        {/* =========================================
            LEFT COLUMN (History & Saved Clinics) 
            บน Mobile จะถูกดันลงไปอยู่ด้านล่าง (order-2)
            ========================================= */}
        <div className="w-full lg:w-2/3 order-2 lg:order-1 space-y-8">
          
          {/* Section: Assessment History */}
          <section className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100/50">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 font-serif tracking-wide">
              Assessment History
            </h2>
            <div className="space-y-6">
              {assessmentHistory.map((item) => (
                <div key={item.id} className="border border-gray-100 rounded-xl p-5 hover:shadow-md transition-shadow bg-white">
                  
                  {/* Title & Badge */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-2">
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">{item.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">Completed on {item.date}</p>
                    </div>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#e6fcf0] text-[#1e884e]">
                      {item.status}
                    </span>
                  </div>

                  {/* Details */}
                  <div className="text-sm text-gray-600 mb-5 mt-4">
                    <span className="font-medium text-gray-700">Primary concerns:</span> {item.concerns}
                    <span className="mx-2 text-gray-300">|</span>
                    <span className="font-medium text-gray-700">Skin type:</span> {item.skinType}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3">
                    <button className="flex-1 bg-[#e8aeb2] hover:bg-[#d89ba0] text-white font-medium py-2.5 rounded-lg transition-colors text-center shadow-sm">
                      View Results
                    </button>
                    <button className="p-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600 transition-colors shadow-sm">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section: Saved Clinics */}
          <section className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100/50">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 font-serif tracking-wide">
              Saved Clinics
            </h2>
            <div className="space-y-4">
              {savedClinics.map((clinic) => (
                <div key={clinic.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border border-gray-100 rounded-xl hover:shadow-md transition-shadow bg-white gap-4">
                  
                  {/* Icon & Info */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#fdf4f5] text-[#f1c3c9] flex items-center justify-center shrink-0">
                      {clinic.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{clinic.name}</h3>
                      <p className="text-sm text-gray-500 mb-1">{clinic.location}</p>
                      <div className="flex items-center text-sm font-medium text-gray-700">
                        <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        {clinic.rating}
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button className="w-full sm:w-auto bg-[#f5ced2] hover:bg-[#ebb8bd] text-white px-8 py-2 rounded-lg font-medium transition-colors shadow-sm">
                    View
                  </button>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* =========================================
            RIGHT COLUMN (Profile & Quick Actions)
            บน Mobile จะถูกดันขึ้นมาอยู่บนสุด (order-1)
            ========================================= */}
        <div className="w-full lg:w-1/3 order-1 lg:order-2 space-y-6">
          
          {/* Profile Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100/50 flex flex-col items-center text-center">
            <div className="relative w-20 h-20 mb-4">
              <Image
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop"
                alt="Sarah Mitchell"
                fill
                className="object-cover rounded-full shadow-sm"
              />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Sarah Mitchell</h2>
            <p className="text-gray-500 text-sm mb-6">sarah.m@email.com</p>
            
            <button className="w-full py-2 px-4 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 font-medium shadow-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              Edit Profile
            </button>
          </div>

          {/* Quick Actions */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4 font-serif">Quick Actions</h3>
            <div className="space-y-3">
              {/* New Assessment Button */}
              <Link href="#" className="flex items-center gap-3 w-full p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all text-left group">
                <div className="text-[#e8aeb2] bg-[#fdf4f5] p-2 rounded-lg group-hover:bg-[#f1c3c9] group-hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <span className="font-medium text-gray-700">New Assessment</span>
              </Link>

              {/* Browse Clinics Button */}
              <Link href="#" className="flex items-center gap-3 w-full p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all text-left group">
                <div className="text-[#e8aeb2] bg-[#fdf4f5] p-2 rounded-lg group-hover:bg-[#f1c3c9] group-hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <span className="font-medium text-gray-700">Browse Clinics</span>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
