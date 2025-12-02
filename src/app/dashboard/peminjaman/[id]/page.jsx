"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function DetailPeminjaman() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchDetail() {
      const res = await fetch(`/api/peminjaman/${id}`);
      const json = await res.json();
      if (json.success) setData(json.data);
    }
    fetchDetail();
  }, [id]);

  async function terima() {
    await fetch("/api/peminjaman/terima", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_peminjaman: id }),
    });

    location.reload();
  }

  async function pengembalian() {
    await fetch("/api/peminjaman/pengembalian", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_peminjaman: id }),
    });

    location.reload();
  }

  if (!data) return <p className="p-6">Loading...</p>;

  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-semibold">Detail Peminjaman #{data.id_peminjaman}</h1>

      <div className="bg-white shadow rounded-xl border p-6 space-y-4">

        <p><strong>User:</strong> {data.user_nama}</p>
        <p><strong>Buku:</strong> {data.buku_judul}</p>
        <p><strong>Tanggal Pinjam:</strong> {data.tanggal_peminjaman}</p>
        <p><strong>Tanggal Kembali:</strong> {data.tanggal_pengembalian}</p>

        <p>
          <strong>Status:</strong>{" "}
          <span className="px-3 py-1 rounded-full bg-gray-100">
            {data.status}
          </span>
        </p>

        {data.status === "Menunggu" && (
          <button
            onClick={terima}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Setujui Peminjaman
          </button>
        )}

        {data.status === "Diterima" && (
          <button
            onClick={pengembalian}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Tandai Sudah Dikembalikan
          </button>
        )}

      </div>

    </div>
  );
}
