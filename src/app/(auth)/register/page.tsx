"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    const result = await register({
      email,
      password,
      first_name: firstName,
      last_name: lastName,
    });

    if (result.success) {
      router.push("/login");
    } else {
      setError(result.error || "Registration failed");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdf6f7] to-[#fceced] flex items-center justify-center p-4 sm:p-8">
      <div className="bg-white rounded-xl shadow-2xl shadow-pink-200/40 w-full max-w-4xl flex flex-col md:flex-row overflow-hidden">
        <div className="relative w-full h-[200px] md:h-auto md:w-1/2">
          <Image
            src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1000&auto=format&fit=crop"
            alt="Luxury Interior Aesthetic"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="w-full md:w-1/2 p-8 md:p-10 lg:p-12 flex flex-col justify-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif text-center mb-8 tracking-wide text-black">
            REGISTER
          </h1>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm text-center">
              {error}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-md border border-gray-300/80 focus:outline-none focus:ring-2 focus:ring-[#f1c3c9] focus:border-transparent text-gray-700 shadow-sm transition-all placeholder:font-serif placeholder:text-gray-400"
                required
              />
            </div>

            <div>
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-md border border-gray-300/80 focus:outline-none focus:ring-2 focus:ring-[#f1c3c9] focus:border-transparent text-gray-700 shadow-sm transition-all placeholder:font-serif placeholder:text-gray-400"
              />
            </div>

            <div>
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-md border border-gray-300/80 focus:outline-none focus:ring-2 focus:ring-[#f1c3c9] focus:border-transparent text-gray-700 shadow-sm transition-all placeholder:font-serif placeholder:text-gray-400"
                required
              />
            </div>

            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-md border border-gray-300/80 focus:outline-none focus:ring-2 focus:ring-[#f1c3c9] focus:border-transparent text-gray-700 shadow-sm transition-all placeholder:font-serif placeholder:text-gray-400"
                required
              />
            </div>

            <div>
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-md border border-gray-300/80 focus:outline-none focus:ring-2 focus:ring-[#f1c3c9] focus:border-transparent text-gray-700 shadow-sm transition-all placeholder:font-serif placeholder:text-gray-400"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#f1c3c9] hover:bg-[#e4b2b8] disabled:bg-gray-300 text-white text-xl py-3 rounded-md transition-colors shadow-sm font-serif mt-2"
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>

          <div className="mt-6">
            <hr className="border-gray-300 border-t-[1.5px]" />
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
