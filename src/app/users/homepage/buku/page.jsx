"use client";

import Link from "next/link";
import Image from "next/image";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

export default function FavoritePage() {
  const [books, setBooks] = useState([]);
    const [recommended, setRecommended] = useState([]);
  
    useEffect(() => {
      async function fetchBooks() {
        try {
          const res = await fetch("/api/book?limit=50");
          if (!res.ok) throw new Error("Gagal fetch buku");
          const data = await res.json();
  
          setBooks(data);
        } catch (err) {
          console.error("FETCH BOOKS ERROR:", err);
        }
      }

      fetchBooks();
    }, []);
  return (
    <div className="space-y-6">

        
    {/* ===== SEMUA BUKU ===== */}
        <section className="bg-white rounded-2xl shadow-md border p-6">
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
  );
}
