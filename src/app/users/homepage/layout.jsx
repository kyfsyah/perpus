"use client";

import { useEffect, useState } from "react";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import ProfileMenuUser from "@/components/profile/ProfileMenuUser";


export default function Layout({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      const res = await fetch("/api/auth/me");
      const data = await res.json();
      if (res.ok) setUser(data.user);
    }
    fetchUser();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      
      {/* ===== FIXED SIDEBAR ===== */}
      <aside className="fixed left-0 top-0 w-56 h-screen bg-white shadow-md p-5 flex flex-col gap-6 z-30 overflow-y-auto">

        {/* Logo */}
        <div className="flex items-center gap-2 px-2">
          <Image src="/assets/logoTB.jpg" width={32} height={32} alt="logo" />
          <Link href="/users/homepage" className="font-semibold text-sky-600">CENDIKIA</Link>
        </div>

        {/* Menu */}
        <nav className="flex flex-col gap-3 text-gray-600 mt-4">
          <Link href="/users/homepage" className="hover:bg-blue-50 px-3 py-2 rounded-lg">
            Beranda
          </Link>

          <Link href="/users/homepage/kategori" className="hover:bg-blue-50 px-3 py-2 rounded-lg">
            Kategori
          </Link>
          
          <Link href="/users/homepage/book" className="hover:bg-blue-50 px-3 py-2 rounded-lg">
            Buku
          </Link>

          <Link href="/users/homepage/favorite" className="hover:bg-blue-50 px-3 py-2 rounded-lg">
            Favorite
          </Link>

          <Link href="/users/homepage/history" className="hover:bg-blue-50 px-3 py-2 rounded-lg">
            History
          </Link>

        </nav>
      </aside>

      {/* ===== MAIN CONTENT AREA ===== */}
      <div className="ml-56 flex flex-col min-h-screen">

        {/* ===== FIXED NAVBAR ===== */}
        <header className="fixed top-0 left-56 right-0 bg-white px-6 py-4 shadow flex items-center justify-between h-16 z-20">

          {/* Search */}
          <div className="flex items-center w-[350px] bg-gray-100 px-4 py-2 rounded-lg text-gray-500">
            <Search size={24} className="mr-2" />
            <input
              type="text"
              placeholder="Cari buku favoritmu"
              className="bg-transparent outline-none w-full text-gray-700"
            />
          </div>

          {/* Profile */}
          <ProfileMenuUser />
        </header>

        {/* ===== PAGE CONTENT ===== */}
        <main className="p-6 pt-[85px] relative z-0">
          {children}
        </main>

      </div>
    </div>
  );
}
