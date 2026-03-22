"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

export default function Navbar() {
  const { user, isAuthenticated, isAdmin, logout, isLoading } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    setShowDropdown(false);
    window.location.href = "/";
  };

  return (
    <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-serif font-bold tracking-tight text-black"
        >
          AestheticHub
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-8 font-serif text-gray-700">
          <Link href="/" className="hover:text-black transition">
            Home
          </Link>
          <Link href="/clinic" className="hover:text-black transition">
            Clinic
          </Link>
          <Link href="/treatment" className="hover:text-black transition">
            Treatment
          </Link>
          <Link href="/compare" className="hover:text-black transition">
            Compare
          </Link>
          <Link href="/assessment" className="hover:text-black transition">
            Assessment
          </Link>

          {isLoading ? (
            <div className="w-20 h-9 bg-gray-100 rounded-full animate-pulse" />
          ) : isAuthenticated && user ? (
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-2 hover:bg-gray-50 px-3 py-1.5 rounded-full transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-[#f1c3c9] flex items-center justify-center text-white font-bold text-sm">
                  {user.first_name?.charAt(0).toUpperCase() || "U"}
                </div>
                <span className="text-sm font-medium text-gray-700 max-w-[100px] truncate">
                  {user.first_name}
                </span>
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {showDropdown && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                  <Link
                    href="/profile"
                    onClick={() => setShowDropdown(false)}
                    className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    My Profile
                  </Link>
                  {isAdmin && (
                    <Link
                      href="/admin"
                      onClick={() => setShowDropdown(false)}
                      className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      ⚙️ Admin Dashboard
                    </Link>
                  )}
                  <hr className="my-1 border-gray-100" />
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="bg-[#f1c3c9] hover:bg-[#e4b2b8] text-white px-6 py-2 rounded-full transition-colors"
            >
              Sign in
            </Link>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-gray-600"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-6 py-4 space-y-3 font-serif">
          <Link href="/" className="block py-2 text-gray-700 hover:text-black" onClick={() => setMobileOpen(false)}>Home</Link>
          <Link href="/clinic" className="block py-2 text-gray-700 hover:text-black" onClick={() => setMobileOpen(false)}>Clinic</Link>
          <Link href="/treatment" className="block py-2 text-gray-700 hover:text-black" onClick={() => setMobileOpen(false)}>Treatment</Link>
          <Link href="/compare" className="block py-2 text-gray-700 hover:text-black" onClick={() => setMobileOpen(false)}>Compare</Link>
          <Link href="/assessment" className="block py-2 text-gray-700 hover:text-black" onClick={() => setMobileOpen(false)}>Assessment</Link>
          <hr className="border-gray-100" />
          {isAuthenticated && user ? (
            <>
              <Link href="/profile" className="block py-2 text-gray-700 hover:text-black" onClick={() => setMobileOpen(false)}>My Profile</Link>
              {isAdmin && (
                <Link href="/admin" className="block py-2 text-gray-700 hover:text-black" onClick={() => setMobileOpen(false)}>⚙️ Admin Dashboard</Link>
              )}
              <button onClick={handleLogout} className="block w-full text-left py-2 text-red-600">Logout</button>
            </>
          ) : (
            <Link href="/login" className="block w-full bg-[#f1c3c9] text-white text-center py-2.5 rounded-full" onClick={() => setMobileOpen(false)}>Sign in</Link>
          )}
        </div>
      )}
    </header>
  );
}
