"use client";
import { useEffect, useState } from "react";

export default function HistoryPage() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/peminjaman/history");
      const json = await res.json();
      if (json.success) setRows(json.data);
    }
    load();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">History Peminjaman</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {rows.map((p) => (
          <div key={p.id_peminjaman} className="bg-white border rounded-xl p-4 shadow-sm flex gap-4">

            <img
              src={`/image/cover/${p.cover_buku}`}
              className="w-24 h-32 object-cover rounded"
            />

            <div className="flex-1">
              <h2 className="font-semibold">{p.buku_judul}</h2>
              <p className="text-sm text-gray-500">Pinjam: {p.tanggal_peminjaman}</p>
              <p className="text-sm text-gray-500">Kembali: {p.tanggal_pengembalian}</p>

              <span className={`mt-2 inline-block px-3 py-1 rounded-full text-xs font-medium
                ${p.status === "Menunggu"  ? "bg-yellow-100 text-yellow-700" : ""}
                ${p.status === "Diterima" ? "bg-green-100 text-green-700" : ""}
                ${p.status === "Ditolak"   ? "bg-red-100 text-red-700" : ""}
                ${p.status === "Dikembalikan"     ? "bg-blue-100 text-blue-700" : ""}
              `}>
                {p.status}
              </span>
            </div>

          </div>
        ))}

        {rows.length === 0 && (
          <p className="text-gray-500 text-center">Belum ada riwayat peminjaman.</p>
        )}
      </div>

    </div>
  );
}
