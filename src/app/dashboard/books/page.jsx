"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function KelolaBukuPage() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("/api/books")
      .then((r) => r.json())
      .then((json) => {
        if (json.success) setBooks(json.data);
      });
  }, []);

  async function deleteBooks(id_buku) {
    if (!confirm("Yakin ingin menghapus buku ini?")) return;

    await fetch(`/api/books/${id_buku}`, { method: "DELETE" });
    setBooks((prev) => prev.filter((b) => b.id_buku !== id_buku));
  }

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Kelola Buku</h1>
        <Link
          href="/dashboard/books/tambah"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Tambah Buku
        </Link>
      </div>

      <div className="bg-white shadow rounded-xl border overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="p-3">ID</th>
              <th className="p-3">Cover</th>
              <th className="p-3">Judul</th>
              <th className="p-3">Penulis</th>
              <th className="p-3">Penerbit</th>
              <th className="p-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {books.map((b) => (
              <tr key={b.id_buku} className="border-b">
                <td className="p-3 text-sm">{b.id_buku}</td>
                <td className="p-3">
                  <div className="w-12 h-16 bg-gray-100 rounded overflow-hidden">
                    {/* kalau cover pakai path local / URL sesuaikan */}
                    <img
                      src={`/image/cover/${b.cover_buku}`}
                      alt={b.judul_buku}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </td>
                <td className="p-3">{b.judul_buku}</td>
                <td className="p-3 text-sm text-gray-700">
                  {b.penulis_buku}
                </td>
                <td className="p-3 text-sm text-gray-700">
                  {b.penerbit_buku}
                </td>
                <td className="p-3 space-x-2">
                  <Link
                    href={`/dashboard/books/${b.id_buku}`}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteBooks(b.id_buku)}
                    className="text-red-600 hover:underline text-sm"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}

            {books.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="p-6 text-center text-gray-500 text-sm"
                >
                  Belum ada data buku.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
