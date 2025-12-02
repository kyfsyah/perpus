"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [mounted, setMounted] = useState(false);

  // Biar client & server HTML tidak beda
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[90%] md:w-[80%] h-14 bg-white/70 rounded-full" />
    );
  }

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[90%] md:w-[80%] bg-white/70 backdrop-blur-xl border border-white/40 shadow-lg rounded-full z-50 flex items-center justify-between px-8 py-3">
      <div className="flex items-center gap-3">
        <Image src="/assets/logoTB.jpg" alt="logo" width={36} height={36} />
        <div className="flex flex-col leading-tight">
          <span className="text-gray-600 text-sm tracking-wide">Perpustakaan</span>
          <span className="text-sky-900 font-bold text-lg">CENDEKIA</span>
        </div>
      </div>

      <ul className="hidden md:flex gap-8 font-medium text-gray-700">
        <li><Link href="/" className="hover:text-sky-700">Beranda</Link></li>
        <li><Link href="#Kami" className="hover:text-sky-700">Tentang</Link></li>
        <li><Link href="#PreviewBook" className="hover:text-sky-700">Buku</Link></li>
        <li><Link href="#" className="hover:text-sky-700">Kontak</Link></li>
      </ul>

      <div className="hidden md:flex gap-3">
        <Link href="/register">
          <button className="px-5 py-2 rounded-full border border-sky-500 text-sky-500 hover:bg-sky-500 hover:text-white transition font-medium">
            Daftar
          </button>
        </Link>

        <Link href="/login">
          <button className="px-5 py-2 rounded-full bg-sky-500 text-white hover:bg-sky-600 transition font-medium">
            Masuk
          </button>
        </Link>
      </div>
    </nav>
  );
}
