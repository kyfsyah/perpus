"use client";

import { useEffect, useState } from "react";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import ProfileMenu from "@/components/form/ProfileMenu";

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
    <div className="min-h-screen w-full flex bg-[#EEF2F7] font-poppins">
      {/* SIDEBAR */}
      <aside className="w-64 bg-white h-screen shadow-xl p-6 fixed left-0 top-0 border-r rounded-r-3xl flex flex-col justify-between">

        {/* MENU ATAS */}
        <nav className="flex flex-col gap-4 text-gray-700 text-[15px] font-medium">
          <Link href="/users/homepage" className="p-2 rounded-lg hover:bg-blue-100 hover:text-blue-600 transition">
            Beranda
          </Link>

          <Link href="/users/homepage/category" className="p-2 rounded-lg hover:bg-blue-100 hover:text-blue-600 transition">
            Kategori
          </Link>

          <Link href="/users/homepage/buku" className="p-2 rounded-lg hover:bg-blue-100 hover:text-blue-600 transition">
            Buku
          </Link>

          <Link href="/users/homepage/favorite" className="p-2 rounded-lg hover:bg-blue-100 hover:text-blue-600 transition">
            Favorite
          </Link>

          <Link href="/favorite" className="p-2 rounded-lg hover:bg-blue-100 hover:text-blue-600 transition">
            Peminjaman
          </Link>
        </nav>

        {/* PROFILE DI BAGIAN BAWAH */}
        <div className="mt-10">
          <div className="text-gray-600 text-sm mb-3">
            {user ? `Hi, ${user.nama}` : ""}
          </div>
          <ProfileMenu />
        </div>

      </aside>

      {/* CONTENT */}
      <main className="ml-64 flex-1 p-8">{children}</main>
    </div>
  );
}
