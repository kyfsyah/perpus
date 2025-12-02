"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function PreviewBook() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    async function loadBooks() {
      try {
        const res = await fetch("/api/newbook?limit=10", { cache: "no-store" });
        const data = await res.json();
        setBooks(data);
      } catch (err) {
        console.error("Gagal load buku:", err);
      }
    }
    loadBooks();
  }, []);

  return (
    <section id="PreviewBook" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6 space-y-10">
        <h2 className="text-3xl font-bold text-gray-800">
          Buku Terbaru
        </h2>

        {books.length === 0 ? (
          <p className="text-gray-500">Memuat buku...</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {books.map((book) => (
              <div
                key={book.id_buku}
                className="relative bg-white rounded-2xl shadow-sm border hover:shadow-md transition flex flex-col"
              >
                <Link href={`/users/homepage/book/${book.id_buku}`}>
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
                    <p className="mt-1 text-xs text-gray-500">{book.kategori}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
