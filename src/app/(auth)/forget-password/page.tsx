import Image from "next/image";
import Link from "next/link";

export default function ForgetPasswordPage() {
  return (
    // Background Gradient สีชมพูอ่อน คลุมเต็มหน้าจอ
    <div className="min-h-screen bg-gradient-to-br from-[#fdf6f7] to-[#fceced] flex items-center justify-center p-4 sm:p-8">
      {/* Main Card Container */}
      <div className="bg-white rounded-xl shadow-2xl shadow-pink-200/40 w-full max-w-4xl flex flex-col md:flex-row overflow-hidden">
        {/* Left Column: Image Area */}
        <div className="relative w-full h-[250px] md:h-auto md:w-1/2">
          <Image
            src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1000&auto=format&fit=crop"
            alt="Luxury Interior Aesthetic"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Right Column: Forget Password Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
          {/* Header */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif text-center mb-4 tracking-wide text-black uppercase">
            Forget Password
          </h1>

          {/* Subtitle / Instructions */}
          <p className="text-center text-gray-500 font-serif mb-8 text-sm md:text-base px-2">
            Enter your email address and we&apos;ll send you a link to reset
            your password.
          </p>

          <form className="space-y-5">
            {/* Email Input */}
            <div>
              <input
                type="email"
                placeholder="Email Address"
                className="w-full px-4 py-3 rounded-md border border-gray-300/80 focus:outline-none focus:ring-2 focus:ring-[#f1c3c9] focus:border-transparent text-gray-700 shadow-sm transition-all placeholder:font-serif placeholder:text-gray-400"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#f1c3c9] hover:bg-[#e4b2b8] text-white text-xl md:text-2xl py-3 rounded-md transition-colors shadow-sm font-serif mt-4"
            >
              Send Link
            </button>
          </form>

          {/* Divider & Footer Links */}
          <div className="mt-8">
            <hr className="border-gray-300 mb-6 border-t-[1.5px]" />
            <div className="flex justify-center items-center text-sm md:text-base font-serif text-gray-500">
              <Link
                href="/login"
                className="hover:text-black transition-colors flex items-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                  />
                </svg>
                Back to Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
