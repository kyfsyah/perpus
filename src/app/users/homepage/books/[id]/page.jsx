"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function BooksDetail() {
  const { id } = useParams();            // id dari URL (string)
  const numericId = Number(id);

  const [books, setBooks] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);

  // ================== LOAD BUKU & STATUS FAVORITE ==================
  useEffect(() => {
    if (!id) return;

    async function loadBooks() {
      try {
        const res = await fetch(`/api/books/${id}`, { cache: "no-store" });
        if (!res.ok) {
          setBooks(null);
          return;
        }
        const data = await res.json();
        setBooks(data);
      } catch (err) {
        console.error("BOOK DETAIL ERROR:", err);
      } finally {
        setLoading(false);
      }
    }

    async function checkFavorite() {
      try {
        const res = await fetch("/api/favorite", { cache: "no-store" });
        if (!res.ok) return;

        const json = await res.json();
        // API kamu: GET /api/favorite -> { success, data: [...] }
        const favs = Array.isArray(json) ? json : json.data || [];

        const exist = favs.some((b) => b.id_buku === numericId);
        setIsFavorite(exist);
      } catch (err) {
        console.error("CHECK FAVORITE ERROR:", err);
      }
    }

    loadBooks();
    checkFavorite();
  }, [id, numericId]);

  // ================== TOGGLE FAVORITE ==================
  async function toggleFavorite() {
    if (!books) return;

    try {
      if (isFavorite) {
        // HAPUS FAVORITE
        await fetch("/api/favorite", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ booksId: books.id_buku }),
        });
        setIsFavorite(false);
      } else {
        // TAMBAH FAVORITE
        await fetch("/api/favorite", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ booksId: books.id_buku }),
        });
        setIsFavorite(true);
      }
    } catch (err) {
      console.error("TOGGLE FAVORITE ERROR:", err);
    }
  }

  // ================== RENDER ==================
  if (loading) {
    return <div className="p-10">Loading...</div>;
  }

  if (!books) {
    return (
      <div className="p-10">
        <h1 className="text-2xl font-bold">Buku tidak ditemukan</h1>
      </div>
    );
  }

  const coverSrc =
    books.cover_buku?.trim()
      ? `/image/cover/${books.cover_buku}`
      : "/default-cover.png";

  return (
    <div className="w-full px-16 py-2">
      {/* WRAPPER BESAR */}
      <div className="bg-white shadow-sm rounded-xl border p-10">
        <div className="flex gap-12">
          {/* COVER */}
          <div className="w-[34%] py-6">
            <div className="rounded-xl overflow-hidden shadow-md bg-[#eef3fb] p-6 flex justify-center">
              <div className="bg-white rounded-xl shadow w-full h-[520px] flex items-center justify-center">
                <img
                  src={coverSrc}
                  alt={books.judul_buku}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            </div>
          </div>

          {/* BAGIAN KANAN */}
          <div className="flex-1">
            {/* JUDUL */}
            <h1 className="text-[28px] font-semibold text-gray-900">
              {books.judul_buku}
            </h1>

            <p className="text-gray-600 mt-1 text-[15px]">
              {books.penulis_buku}
            </p>

            {/* BADGE + RATING */}
            <div className="flex items-center gap-4 mt-4">
              <span className="bg-red-100 text-red-700 px-4 py-1 rounded-full text-sm font-medium">
                {books.kategori}
              </span>

              <span className="flex items-center gap-1 text-yellow-500 font-medium">
                ★{" "}
                <span className="text-gray-700">
                  {books.rating || "4.5"} (2 ulasan)
                </span>
              </span>
            </div>

            {/* DETAIL TABLE */}
            <div className="mt-8 border rounded-xl overflow-hidden">
              {[
                ["Penulis", books.penulis_buku],
                ["Penerbit", books.penerbit_buku],
                ["Deskripsi Fisik", books.deskripsi],
                ["ISBN", books.isbn],
                ["Subjek", books.kategori],
                ["RAK", books.id_rak],
                ["Stock", books.stock],
                ["Call Number", books.call_number || "-"],
              ].map(([label, value], i) => (
                <div
                  key={i}
                  className="grid grid-cols-2 border-b last:border-none"
                >
                  <div className="px-4 py-3 font-medium text-gray-700 bg-gray-50">
                    {label}
                  </div>
                  <div className="px-4 py-3 text-gray-800">{value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER BUTTONS */}
      <div className="mt-6 flex items-center justify-between rounded-xl shadow-sm bg-white border-t py-6 px-4 shadow-sm">
        {/* FAVORIT */}
        <button
          onClick={toggleFavorite}
          className="px-8 py-3 bg-blue-800 text-white rounded-lg font-medium hover:bg-blue-900 transition flex items-center gap-2"
        >
          {isFavorite ? "Hapus dari Favorite" : "Tambahkan ke Favorite"}
        </button>

        {/* PINJAM */}
        <button
          onClick={() => window.location.href = `/users/homepage/books/${books.id_buku}/peminjaman`}
          className="px-8 py-3 bg-blue-800 text-white rounded-lg font-medium hover:bg-blue-900 transition"
        >
          Pinjam buku ini
        </button>

      </div>
    </div>
  );
}
