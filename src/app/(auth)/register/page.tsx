import Image from "next/image";
import Link from "next/link";

export default function RegisterPage() {
  return (
    // Background Gradient คลุมเต็มหน้าจอ สีชมพูอ่อน
    <div className="min-h-screen bg-gradient-to-br from-[#fdf6f7] to-[#fceced] flex items-center justify-center p-4 sm:p-8">
      {/* Main Card Container */}
      <div className="bg-white rounded-xl shadow-2xl shadow-pink-200/40 w-full max-w-4xl flex flex-col md:flex-row overflow-hidden">
        {/* Left Column: Image Area */}
        {/* ปรับความสูงสำหรับ Mobile ให้พอดี และแบ่งครึ่งจอในโหมด Desktop */}
        <div className="relative w-full h-[200px] md:h-auto md:w-1/2">
          <Image
            src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1000&auto=format&fit=crop"
            alt="Luxury Interior Aesthetic"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Right Column: Register Form */}
        <div className="w-full md:w-1/2 p-8 md:p-10 lg:p-12 flex flex-col justify-center">
          {/* Header */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif text-center mb-8 tracking-wide text-black">
            REGISTER
          </h1>

          <form className="space-y-4">
            {/* Field 1: Full Name */}
            <div>
              <input
                type="text"
                placeholder="Full Name"
                className="w-full px-4 py-2.5 rounded-md border border-gray-300/80 focus:outline-none focus:ring-2 focus:ring-[#f1c3c9] focus:border-transparent text-gray-700 shadow-sm transition-all placeholder:font-serif placeholder:text-gray-400"
                required
              />
            </div>

            {/* Field 2: Email */}
            <div>
              <input
                type="email"
                placeholder="Email Address"
                className="w-full px-4 py-2.5 rounded-md border border-gray-300/80 focus:outline-none focus:ring-2 focus:ring-[#f1c3c9] focus:border-transparent text-gray-700 shadow-sm transition-all placeholder:font-serif placeholder:text-gray-400"
                required
              />
            </div>

            {/* Field 3: Phone / Username */}
            <div>
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full px-4 py-2.5 rounded-md border border-gray-300/80 focus:outline-none focus:ring-2 focus:ring-[#f1c3c9] focus:border-transparent text-gray-700 shadow-sm transition-all placeholder:font-serif placeholder:text-gray-400"
              />
            </div>

            {/* Field 4: Password */}
            <div>
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2.5 rounded-md border border-gray-300/80 focus:outline-none focus:ring-2 focus:ring-[#f1c3c9] focus:border-transparent text-gray-700 shadow-sm transition-all placeholder:font-serif placeholder:text-gray-400"
                required
              />
            </div>

            {/* Field 5: Confirm Password */}
            <div>
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full px-4 py-2.5 rounded-md border border-gray-300/80 focus:outline-none focus:ring-2 focus:ring-[#f1c3c9] focus:border-transparent text-gray-700 shadow-sm transition-all placeholder:font-serif placeholder:text-gray-400"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#f1c3c9] hover:bg-[#e4b2b8] text-white text-xl py-3 rounded-md transition-colors shadow-sm font-serif mt-2"
            >
              Register
            </button>
          </form>

          {/* Divider Line (ตรงตามภาพต้นฉบับ) */}
          <div className="mt-6">
            <hr className="border-gray-300 border-t-[1.5px]" />

            {/* เพิ่ม Link กลับไปหน้า Login เป็น Option เสริมเผื่อใช้งานจริง (ลบออกได้ถ้าไม่ต้องการ) */}
            <div className="text-center mt-4">
              <span className="text-sm font-serif text-gray-500">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-black hover:underline transition-all"
                >
                  Sign in
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
