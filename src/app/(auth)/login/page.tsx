"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await login(email, password);
    if (result.success) {
      router.push("/");
    } else {
      setError(result.error || "Login failed");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdf6f7] to-[#fceced] flex items-center justify-center p-4 sm:p-8">
      <div className="bg-white rounded-xl shadow-2xl shadow-pink-200/40 w-full max-w-4xl flex flex-col md:flex-row overflow-hidden">
        <div className="relative w-full h-[250px] md:h-auto md:w-1/2">
          <Image
            src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1000&auto=format&fit=crop"
            alt="Luxury Interior Aesthetic"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-serif text-center mb-10 tracking-wide text-black">
            SIGN IN
          </h1>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm text-center">
              {error}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-md border border-gray-300/80 focus:outline-none focus:ring-2 focus:ring-[#f1c3c9] focus:border-transparent text-gray-700 shadow-sm transition-all placeholder:font-serif placeholder:text-gray-400"
                required
              />
            </div>

            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-md border border-gray-300/80 focus:outline-none focus:ring-2 focus:ring-[#f1c3c9] focus:border-transparent text-gray-700 shadow-sm transition-all placeholder:font-serif placeholder:text-gray-400"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#f1c3c9] hover:bg-[#e4b2b8] disabled:bg-gray-300 text-white text-xl md:text-2xl py-3 rounded-md transition-colors shadow-sm font-serif mt-4"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <div className="mt-8">
            <hr className="border-gray-300 mb-4 border-t-[1.5px]" />
            <div className="flex justify-between items-center text-sm md:text-base font-serif text-gray-500">
              <Link
                href="/forget-password"
                className="hover:text-black transition-colors"
              >
                Forget Password
              </Link>
              <Link
                href="/register"
                className="hover:text-black transition-colors"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
