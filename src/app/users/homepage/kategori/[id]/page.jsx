"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function CategoryDetail() {
  const { id } = useParams();
  const [category, setCategory] = useState(null);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    async function fetchData() {
      try {
        // Fetch detail kategori
        const resCat = await fetch(`/api/kategori/${id}`);
        const catJson = await resCat.json();

        // Fetch semua buku berdasarkan kategori
        const resBooks = await fetch(`/api/books?kategori=${id}`);
        const booksJson = await resBooks.json();

        if (catJson.success) setCategory(catJson.data);
        if (booksJson.success) setBooks(booksJson.data);
      } catch (err) {
        console.error("CATEGORY PAGE ERROR:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  if (loading) {
    return <div className="p-10">Loading...</div>;
  }

  if (!category) {
    return <div className="p-10">Kategori tidak ditemukan</div>;
  }

  return (
    <div className="p-2 space-y-8">
      <div className="bg-white rounded-2xl shadow-md border p-6">

      {/* TITLE */}
      <div>
        <h1 className="text-3xl font-bold">{category.nama}</h1>
        <p className="text-gray-600 mt-2">{category.deskripsi}</p>
      </div>

      {/* BOOK LIST */}
      <div className="text-xl font-semibold mb-4"></div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {books.length === 0 && (
          <p className="text-gray-500">Tidak ada buku di kategori ini.</p>
        )}

        {books.map((books) => (
          <Link
            key={books.id_buku}
            href={`/users/homepage/book/${books.id_buku}`}
            className="bg-white rounded-2xl shadow-sm border hover:shadow-md transition flex flex-col"
          >
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
              <p className="mt-1 text-xs text-gray-500">
                {books.penulis_buku}
              </p>
            </div>
          </Link>
        ))}
      </div>
      </div>

    </div>
  );
}
