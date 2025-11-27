"use client";

import { useEffect, useState } from "react";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import ProfileMenuDashboard from "@/components/profile/ProfileMenuDashboard";

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
    <div className="flex bg-gray-100 min-h-screen">

      {/* ================= SIDEBAR ================= */}
      <aside className="fixed top-0 left-0 w-56 h-screen bg-white shadow-md p-5 z-30 overflow-y-auto">

        {/* Logo */}
        <div className="flex items-center gap-2 px-2 mb-6">
          <Image src="/assets/logoTB.jpg" width={32} height={32} alt="logo" />
          <h2 className="font-semibold text-gray-800">BookBase</h2>
        </div>

        {/* Menu */}
        <nav className="flex flex-col gap-3 text-gray-600">

          <Link href="/dashboard" className="hover:bg-blue-50 px-3 py-2 rounded-lg">
            Dashboard
          </Link>

          <Link href="/dashboard/users" className="hover:bg-blue-50 px-3 py-2 rounded-lg">
            Kelola User
          </Link>

          <Link href="/dashboard/books" className="hover:bg-blue-50 px-3 py-2 rounded-lg">
            Kelola Buku
          </Link>

        </nav>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <div className="ml-56 flex-1 min-h-screen">

        {/* ================= TOPBAR ================= */}
        <header className="fixed top-0 left-56 right-0 h-16 bg-white shadow px-6 flex items-center justify-between z-20">

          {/* Search */}
          <div className="flex items-center w-[350px] bg-gray-100 px-4 py-2 rounded-lg text-gray-500">
            <Search size={24} className="mr-2" />
            <input
              type="text"
              placeholder="Search your favourite books..."
              className="bg-transparent outline-none w-full text-gray-700"
            />
          </div>

          {/* Profile */}
          <ProfileMenuDashboard />
        </header>

        {/* ================= PAGE CONTENT ================= */}
        <main className="pt-20 px-6 pb-10">
          {children}
        </main>

      </div>
    </div>
  );
}
