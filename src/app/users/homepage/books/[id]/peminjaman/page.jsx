"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function PeminjamanPage() {
  const router = useRouter();
  const { id } = useParams(); // <-- Wajib begini di Client Component

  const [books, setBooks] = useState(null);
  const [tanggalPinjam, setTanggalPinjam] = useState("");
  const [tanggalPengembalian, setTanggalPengembalian] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    async function loadBooks() {
      const res = await fetch(`/api/books/${id}`);
      const data = await res.json();
      setBooks(data);
    }
    loadBooks();
  }, [id]);

  async function submitPeminjaman(e) {
    e.preventDefault();

    const t1 = new Date(tanggalPinjam);
    const t2 = new Date(tanggalPengembalian);

    if (!tanggalPinjam || !tanggalPengembalian) {
      setError("Tanggal tidak boleh kosong");
      return;
    }

    if (t2 < t1) {
      setError("Tanggal pengembalian harus setelah tanggal pinjam");
      return;
    }

    const max = new Date(t1);
    max.setMonth(max.getMonth() + 1);

    if (t2 > max) {
      setError("Maksimal peminjaman 1 bulan");
      return;
    }

    const res = await fetch("/api/peminjaman", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id_book: id,
        tanggal_peminjaman: tanggalPinjam,
        tanggal_pengembalian: tanggalPengembalian,
      }),
    });

    if (res.ok) router.push("/users/homepage");
    else setError("Gagal membuat peminjaman");
  }

  if (!books) return <div className="p-6">Loading...</div>;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur flex items-center justify-center p-4 z-[9999]">

      <div className="bg-white w-full max-w-xl p-8 rounded-xl shadow-xl">

        <h1 className="text-2xl font-bold mb-4">Konfirmasi Peminjaman</h1>

        <div className="flex gap-4 mb-6">
          <img
            src={`/image/cover/${books.cover_buku}`}
            className="w-28 h-40 rounded-lg object-cover shadow"
          />
          <div>
            <h2 className="font-semibold text-xl">{books.judul_buku}</h2>
            <p className="text-gray-500">{books.penulis_buku}</p>
          </div>
        </div>

        {error && (
          <div className="bg-red-100 text-red-600 px-4 py-2 rounded mb-3">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={submitPeminjaman}>
          <div>
            <label className="font-medium block">Tanggal Pinjam</label>
            <input
              type="date"
              value={tanggalPinjam}
              onChange={(e) => setTanggalPinjam(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="font-medium block">Tanggal Pengembalian</label>
            <input
              type="date"
              value={tanggalPengembalian}
              onChange={(e) => setTanggalPengembalian(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          <div className="flex gap-4 pt-3">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 border py-3 rounded-lg hover:bg-gray-100"
            >
              Batal
            </button>

            <button
              type="submit"
              className="flex-1 bg-sky-500 text-white py-3 rounded-lg hover:bg-sky-600"
            >
              Konfirmasi
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
