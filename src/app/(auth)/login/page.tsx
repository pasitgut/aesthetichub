import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  return (
    // Background Gradient คลุมเต็มหน้าจอ สีชมพูอ่อนเหมือนในภาพ
    <div className="min-h-screen bg-gradient-to-br from-[#fdf6f7] to-[#fceced] flex items-center justify-center p-4 sm:p-8">
      
      {/* Main Card Container */}
      <div className="bg-white rounded-xl shadow-2xl shadow-pink-200/40 w-full max-w-4xl flex flex-col md:flex-row overflow-hidden">
        
        {/* Left Column: Image Area */}
        {/* บน Mobile จะเป็นภาพแนวนอนความสูง 250px ส่วนบน Tablet/Desktop จะกว้าง 50% และกินพื้นที่เต็มความสูง */}
        <div className="relative w-full h-[250px] md:h-auto md:w-1/2">
          <Image
            src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1000&auto=format&fit=crop"
            alt="Luxury Interior Aesthetic"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Right Column: Login Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
          
          {/* Header */}
          <h1 className="text-4xl md:text-5xl font-serif text-center mb-10 tracking-wide text-black">
            SIGN IN
          </h1>

          <form className="space-y-5">
            {/* Email Input */}
            <div>
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-3 rounded-md border border-gray-300/80 focus:outline-none focus:ring-2 focus:ring-[#f1c3c9] focus:border-transparent text-gray-700 shadow-sm transition-all placeholder:font-serif placeholder:text-gray-400"
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <input
                type="password"
                placeholder="password"
                className="w-full px-4 py-3 rounded-md border border-gray-300/80 focus:outline-none focus:ring-2 focus:ring-[#f1c3c9] focus:border-transparent text-gray-700 shadow-sm transition-all placeholder:font-serif placeholder:text-gray-400"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#f1c3c9] hover:bg-[#e4b2b8] text-white text-xl md:text-2xl py-3 rounded-md transition-colors shadow-sm font-serif mt-4"
            >
              Sign in
            </button>
          </form>

          {/* Divider & Footer Links */}
          <div className="mt-8">
            <hr className="border-gray-300 mb-4 border-t-[1.5px]" />
            <div className="flex justify-between items-center text-sm md:text-base font-serif text-gray-500">
              <Link href="/forget-password" className="hover:text-black transition-colors">
                Forget Password
              </Link>
              <Link href="/register" className="hover:text-black transition-colors">
                Register
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
