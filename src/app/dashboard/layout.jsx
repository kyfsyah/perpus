"use client";

import { useEffect, useState } from "react";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import ProfileMenu from "@/components/form/ProfileMenu";
import { Search } from "lucide-react";

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
    <div className="flex min-h-screen bg-gray-100">

      {/* ===== SIDEBAR ===== */}
      <aside className="w-56 bg-white shadow-md p-5 flex flex-col gap-6">

        {/* Logo */}
        <div className="flex items-center gap-2 px-2">
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

          <Link href="/users/favorite" className="hover:bg-blue-50 px-3 py-2 rounded-lg">
            Kelola Buku
          </Link>

          <Link href="/users/my-library" className="hover:bg-blue-50 px-3 py-2 rounded-lg">
            
          </Link>

        </nav>
      </aside>

      {/* ===== MAIN CONTENT AREA ===== */}
      <div className="flex-1 flex flex-col">

        {/* ===== TOPBAR ===== */}
        <header className="w-full bg-white px-6 py-4 shadow flex items-center justify-between">

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
          <ProfileMenu />
        </header>

        {/* ===== PAGE CONTENT ===== */}
        <main className="p-6">
          {children}
        </main>

      </div>
    </div>
  );
}
