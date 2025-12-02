"use client";

import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [stats, setStats] = useState({
    users: 0,
    books: 0,
    borrowed: 0,
    favorites: 0,
  });

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/dashboard/stats");
        const data = await res.json();

        setStats({
          users: data.users || 0,
          books: data.books || 0,
          borrowed: data.borrowed || 0,
          favorites: data.favorites || 0,
        });
      } catch (err) {
        console.error("ERROR FETCH STATS:", err);
      }
    }

    fetchStats();
  }, []);

  return (
    <div className="p-2 space-y-8">

      {/* STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        {/* CARD: USERS */}
        <div className="bg-white rounded-2xl shadow p-6 border">
          <h2 className="text-gray-500 text-sm">Total Users</h2>
          <p className="text-4xl font-bold text-gray-800 mt-2">{stats.users}</p>
          <p className="text-gray-400 text-xs mt-1">Pengguna terdaftar</p>
        </div>

        {/* CARD: BOOKS */} 
        <div className="bg-white rounded-2xl shadow p-6 border">
          <h2 className="text-gray-500 text-sm">Total Buku</h2>
          <p className="text-4xl font-bold text-gray-800 mt-2">{stats.books}</p>
          <p className="text-gray-400 text-xs mt-1">Semua koleksi buku</p>
        </div>

        {/* CARD: BORROWED */}
        <div className="bg-white rounded-2xl shadow p-6 border">
          <h2 className="text-gray-500 text-sm">Dipinjam</h2>
          <p className="text-4xl font-bold text-gray-800 mt-2">{stats.borrowed}</p>
          <p className="text-gray-400 text-xs mt-1">Buku yang sedang dipinjam</p>
        </div>

        {/* CARD: FAVORITE */}
        <div className="bg-white rounded-2xl shadow p-6 border">
          <h2 className="text-gray-500 text-sm">Favorit</h2>
          <p className="text-4xl font-bold text-gray-800 mt-2">{stats.favorites}</p>
          <p className="text-gray-400 text-xs mt-1">Total buku favorit user</p>
        </div>

      </div>

    </div>
  );
}
