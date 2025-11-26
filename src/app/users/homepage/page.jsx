"use client";

import { useEffect, useState } from "react";
import React from "react";
import Image from "next/image";
import Link from "next/link";


export default function HomePage() {
  const [books, setBooks] = useState([]);
  const [recommended, setRecommended] = useState([]);

  useEffect(() => {
    async function fetchBooks() {
      try {
        const res = await fetch("/api/book?limit=20");
        if (!res.ok) throw new Error("Gagal fetch buku");
        const data = await res.json();

        setBooks(data);
        setRecommended(data.slice(0, 4)); // 4 buku recommended biar persis kayak contoh
      } catch (err) {
        console.error("FETCH BOOK ERROR:", err);
      }
    }

    fetchBooks();
  }, []);

  return (
    <div className="flex gap-6">
      <div className="flex-1 space-y-8">
        {/* ===== RECOMMENDED ===== */}
        <section className="bg-white rounded-2xl shadow-md border p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              Recommended
            </h2>
              <button className="text-sm font-medium text-sky-600 hover:underline">
                Lainnya →
              </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {recommended.map((book) => (
              <Link
                href={`/users/book/${book.id_buku}`}
                key={book.id_buku}
                className="bg-white rounded-2xl shadow-sm border hover:shadow-md transition flex flex-col"
              >
                {/* WRAPPER COVER – mirip banget sama contoh */}
                <div className="bg-[#e6eff9] rounded-t-2xl px-4 pt-6 pb-4 flex justify-center">
                  <div className="w-full h-64 bg-white rounded-xl shadow flex items-center justify-center">
                    <img
                      src={`/image/cover/${book.cover_buku}`}
                      alt={book.judul_buku}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                </div>

                {/* TEXT AREA */}
                <div className="px-5 py-4">
                  <h3 className="text-base font-semibold text-gray-900 leading-snug line-clamp-2">
                    {book.judul_buku}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {book.penulis_buku}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ===== SEMUA BUKU ===== */}
        <section className="bg-white rounded-2xl shadow-md border p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Buku</h2>
            <Link href="/users/homepage/buku">
              <button className="text-sm font-medium text-sky-600 hover:underline">
                Lainnya →
              </button>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {books.map((book) => (
              <Link
                href={`/users/book/${book.id_buku}`}
                key={book.id_buku}
                className="bg-white rounded-2xl shadow-sm border hover:shadow-md transition flex flex-col"
              >
                <div className="bg-[#f3f5fb] rounded-t-2xl px-3 pt-4 pb-3 flex justify-center">
                  <div className="w-full h-56 bg-white rounded-xl shadow flex items-center justify-center">
                    <img
                      src={`/image/cover/${book.cover_buku}`}
                      alt={book.judul_buku}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                </div>

                <div className="px-4 py-3">
                  <h3 className="text-sm font-semibold text-gray-900 leading-snug line-clamp-2">
                    {book.judul_buku}
                  </h3>
                  <p className="mt-1 text-xs text-gray-500">
                    {book.penulis_buku}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
