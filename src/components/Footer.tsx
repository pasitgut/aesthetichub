import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#111827] text-white pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold font-serif tracking-tight">AestheticAI</h2>
          <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
            AI-powered cosmetic treatment recommendations for your perfect beauty journey.
          </p>
        </div>
        {/* Links อื่นๆ คงเดิมตาม Code ที่คุณให้มา */}
        <div>
          <h3 className="font-bold mb-4">Quick Links</h3>
          <ul className="space-y-3 text-sm text-gray-400">
            <li><Link href="/" className="hover:text-white transition">Home</Link></li>
            <li><Link href="#" className="hover:text-white transition">Clinics</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-4">Support</h3>
          <ul className="space-y-3 text-sm text-gray-400">
            <li><Link href="#" className="hover:text-white transition">Privacy Policy</Link></li>
            <li><Link href="#" className="hover:text-white transition">Terms of Service</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-4">Connect</h3>
          <div className="flex space-x-4">
            <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center">FB</div>
            <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center">IG</div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto border-t border-gray-800 pt-8 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} AestheticAI. All rights reserved.
      </div>
    </footer>
  );
}
