"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { toggleFavorite } from "@/lib/favorite";

export default function BookPage() {
  const [books, setBooks] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    async function fetchBooks() {
      const res = await fetch("/api/books?limit=80");
      const json = await res.json();
      const list = Array.isArray(json) ? json : json.data || [];

      setBooks(list);
    }

    async function fetchFavorites() {
      const res = await fetch("/api/favorite");
      const json = await res.json();
      setFavorites((json.data || []).map((b) => b.id_buku));
    }

    fetchBooks();
    fetchFavorites();
  }, []);

  const isFavorite = (id) => favorites.includes(id);

  const handleFavorite = async (booksId) => {
    const state = await toggleFavorite(booksId, isFavorite(booksId));

    setFavorites((prev) =>
      state === false
        ? prev.filter((x) => x !== booksId)
        : [...prev, booksId]
    );
  };

  return (
    <div className="space-y-6">

      <section className="bg-white rounded-2xl shadow-md border p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">

          {books.map((books) => (
            <div
              key={books.id_buku}
              className="relative bg-white rounded-2xl shadow-sm border hover:shadow-md transition flex flex-col"
            >
              {/* FAVORITE BUTTON */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleFavorite(books.id_buku);
                }}
                className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-full 
                           bg-white/70 backdrop-blur-md shadow-md hover:bg-white transition z-20"
              >
                <Heart
                  size={20}
                  className={
                    isFavorite(books.id_buku)
                      ? "fill-red-500 text-red-500"
                      : "text-gray-500"
                  }
                />
              </button>

              <Link href={`/users/homepage/books/${books.id_buku}`}>
                <div className="bg-[#f3f5fb] rounded-t-2xl px-3 pt-4 pb-3 flex justify-center">
                  <div className="w-full h-56 bg-white rounded-xl shadow flex items-center justify-center">
                    <img
                      src={`/image/cover/${books.cover_buku}`}
                      alt={books.judul_buku}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                </div>

                <div className="px-4 py-3">
                  <h3 className="text-sm font-semibold text-gray-900 leading-snug line-clamp-2">
                    {books.judul_buku}
                  </h3>
                  <p className="mt-1 text-xs text-gray-500">{books.penulis_buku}</p>
                </div>
              </Link>
            </div>
          ))}

        </div>
      </section>

    </div>
  );
}
