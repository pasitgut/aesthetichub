"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    /* 1. ส่วนครอบด้านนอกสุด (Outer Container): ใช้สีพื้นหลังและแผ่เต็มหน้าจอ */
    <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-50">
      
      {/* 2. ส่วนเนื้อหาด้านใน (Inner Content): จำกัดความกว้างและจัดให้อยู่ตรงกลาง */}
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        <Link href="/" className="text-2xl font-serif font-bold tracking-tight text-black">
          AestheticHub
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-8 font-serif text-gray-700">
          <Link href="/" className="hover:text-black transition">Home</Link>
          <Link href="#" className="hover:text-black transition">Clinic</Link>
          <Link href="#" className="hover:text-black transition">Treatment</Link>
          <Link href="#" className="hover:text-black transition">Compare</Link>
          <Link 
            href="/login" 
            className="bg-[#f1c3c9] hover:bg-[#e4b2b8] text-white px-6 py-2 rounded-full transition-colors"
          >
            sign in
          </Link>
        </nav>

        {/* Mobile Menu Button (Hamburger) */}
        <button className="md:hidden p-2 text-gray-600">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

      </div>
    </header>
  );
}
