"use client";

import { useEffect, useState } from "react";

export default function PeminjamanPage() {
  const [peminjaman, setPeminjaman] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/peminjaman");
      const json = await res.json();
      if (json.success) setPeminjaman(json.data);
    }
    fetchData();
  }, []);

  // TERIMA
  async function handleTerima(id) {
    await fetch("/api/peminjaman/terima", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_peminjaman: id }),
    });
    location.reload();
  }

  // TOLAK
  async function handleTolak(id) {
    await fetch("/api/peminjaman/tolak", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_peminjaman: id }),
    });
    location.reload();
  }

  // KONFIRMASI PENGEMBALIAN
  async function handlePengembalian(id) {
    await fetch("/api/peminjaman/pengembalian", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_peminjaman: id }),
    });
    location.reload();
  }

  const badge = (status) => {
    switch (status) {
      case "Menunggu":
        return "bg-yellow-100 text-yellow-700";
      case "Diterima":
        return "bg-blue-100 text-blue-700";
      case "Ditolak":
        return "bg-red-100 text-red-700";
      case "Pengembalian":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-semibold">Daftar Peminjaman</h1>

      <div className="bg-white shadow rounded-xl border">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="p-4">ID</th>
              <th className="p-4">User</th>
              <th className="p-4">Buku</th>
              <th className="p-4">Peminjaman</th>
              <th className="p-4">Pengembalian</th>
              <th className="p-4">Status</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {peminjaman.map((p) => (
              <tr key={p.id_peminjaman} className="border-b hover:bg-gray-50">
                <td className="p-4">{p.id_peminjaman}</td>
                <td className="p-4">{p.user_nama}</td>
                <td className="p-4">{p.buku_judul}</td>
                <td className="p-4">{p.tanggal_peminjaman}</td>
                <td className="p-4">{p.tanggal_pengembalian}</td>

                {/* STATUS BADGE */}
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${badge(p.status)}`}>
                    {p.status}
                  </span>
                </td>

                {/* ACTION BUTTONS */}
                <td className="p-4">
                  {p.status === "Menunggu" && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleTerima(p.id_peminjaman)}
                        className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700">
                          Terima
                      </button>
                      <button
                        onClick={() => handleTolak(p.id_peminjaman)}
                        className="px-3 py-1 bg-red-600 text-white rounded-md text-sm hover:bg-red-700">
                        Tolak
                      </button>
                    </div>
                  )}

                  {p.status === "Diterima" && (
                    <button
                      onClick={() => handlePengembalian(p.id_peminjaman)}
                      className="px-3 py-1 bg-green-600 text-white rounded-md text-sm hover:bg-green-700">Konfirmasi Pengembalian</button>
                  )}

                  {p.status === "Ditolak" && (
                    <span className="text-gray-500 text-sm">Tidak ada aksi</span>
                  )}

                  {p.status === "Pengembalian" && (
                    <span className="text-green-600 text-sm">Selesai</span>
                  )}
                </td>
              </tr>
            ))}

            {/* NO DATA */}
            {peminjaman.length === 0 && (
              <tr>
                <td colSpan="7" className="p-6 text-center text-gray-500">
                  Tidak ada data.
                </td>
              </tr>
            )}

          </tbody>
        </table>
      </div>

    </div>
  );
}
