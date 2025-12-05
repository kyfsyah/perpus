"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function TambahBukuPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    judul_buku: "",
    penulis_buku: "",
    penerbit_buku: "",
    isbn: "",
    cover_buku: "",
    deskripsi: "",
    tahun_terbit: "",
    total_halaman: "",
    stock: "",
    id_rak: "",
    id_kategori: "",
  });

  const updateField = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  async function submit(e) {
    e.preventDefault();
    setError("");
    setSaving(true);

    const res = await fetch("/api/books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      router.push("/dashboard/books");
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Gagal menambahkan buku");
      setSaving(false);
    }
  }

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <h1 className="text-3xl font-semibold mb-6">Tambah Buku</h1>

      {error && (
        <div className="bg-red-100 text-red-700 px-4 py-2 rounded">{error}</div>
      )}

      <form
        onSubmit={submit}
        className="grid grid-cols-2 gap-6 bg-white p-6 rounded-xl shadow"
      >
        <div>
          <label className="font-medium">Judul Buku *</label>
          <input
            className="border p-3 w-full rounded mt-1"
            value={form.judul_buku}
            onChange={updateField("judul_buku")}
            required
          />
        </div>

        <div>
          <label className="font-medium">Penulis *</label>
          <input
            className="border p-3 w-full rounded mt-1"
            value={form.penulis_buku}
            onChange={updateField("penulis_buku")}
            required
          />
        </div>

        <div>
          <label className="font-medium">Penerbit *</label>
          <input
            className="border p-3 w-full rounded mt-1"
            value={form.penerbit_buku}
            onChange={updateField("penerbit_buku")}
            required
          />
        </div>

        <div>
          <label className="font-medium">ISBN</label>
          <input
            className="border p-3 w-full rounded mt-1"
            value={form.isbn}
            onChange={updateField("isbn")}
          />
        </div>

        <div>
          <label className="font-medium">Cover (filename)</label>
          <input
            className="border p-3 w-full rounded mt-1"
            value={form.cover_buku}
            onChange={updateField("cover_buku")}
          />
        </div>

        <div>
          <label className="font-medium">Deskripsi</label>
          <textarea
            className="border p-3 w-full rounded mt-1"
            rows={3}
            value={form.deskripsi}
            onChange={updateField("deskripsi")}
          />
        </div>

        <div>
          <label className="font-medium">Tahun Terbit</label>
          <input
            className="border p-3 w-full rounded mt-1"
            value={form.tahun_terbit}
            onChange={updateField("tahun_terbit")}
          />
        </div>

        <div>
          <label className="font-medium">Total Halaman</label>
          <input
            className="border p-3 w-full rounded mt-1"
            value={form.total_halaman}
            onChange={updateField("total_halaman")}
          />
        </div>

        <div>
          <label className="font-medium">Stok</label>
          <input
            className="border p-3 w-full rounded mt-1"
            value={form.stock}
            onChange={updateField("stock")}
          />
        </div>

        <div>
          <label className="font-medium">ID Rak</label>
          <input
            className="border p-3 w-full rounded mt-1"
            value={form.id_rak}
            onChange={updateField("id_rak")}
          />
        </div>

        <div>
          <label className="font-medium">ID Kategori</label>
          <input
            className="border p-3 w-full rounded mt-1"
            value={form.id_kategori}
            onChange={updateField("id_kategori")}
          />
        </div>

        <div className="col-span-2 flex justify-end gap-3">
          <button
            type="button"
            onClick={() => router.push("/dashboard/books")}
            className="border px-6 py-3 rounded-lg"
            disabled={saving}
          >
            Batal
          </button>
          <button
            className="bg-blue-600 text-white px-6 py-3 rounded-lg"
            disabled={saving}
          >
            {saving ? "Menyimpan..." : "Tambah Buku"}
          </button>
        </div>
      </form>
    </div>
  );
}
