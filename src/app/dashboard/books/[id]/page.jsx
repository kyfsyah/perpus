"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditBuku() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState({
    judul_buku: "",
    penulis_buku: "",
    penerbit_buku: "",
    isbn: "",
    cover_buku: "",
    total_halaman: "",
    stock: "",
    id_rak: "",
    id_kategori: "", // ← FIX PENTING
  });

  // ==================================
  // LOAD DATA BUKU
  // ==================================
  useEffect(() => {
    if (!id) return;

    async function loadBooks() {
      try {
        const res = await fetch(`/api/books/${id}`);
        const data = await res.json();

        if (!data || data.error) {
          console.error("BOOK DETAIL ERROR:", data);
          return;
        }

        setBooks({
          judul_buku: data.judul_buku ?? "",
          penulis_buku: data.penulis_buku ?? "",
          penerbit_buku: data.penerbit_buku ?? "",
          isbn: data.isbn ?? "",
          cover_buku: data.cover_buku ?? "",
          total_halaman: data.total_halaman ?? "",
          stock: data.stock ?? "",
          id_rak: data.id_rak ?? "",
          id_kategori: data.id_kategori ?? "", // ← FIX
        });

        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch books:", err);
      }
    }

    loadBooks();
  }, [id]);

  // ==================================
  // SUBMIT UPDATE BUKU
  // ==================================
  async function updateBooks(e) {
    e.preventDefault();

    const res = await fetch(`/api/books/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(books),
    });

    const result = await res.json();
    console.log("RESULT UPDATE:", result);

    router.push("/dashboard/books");
  }

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <h1 className="text-3xl font-semibold mb-6">Edit Buku</h1>

      <form
        onSubmit={updateBooks}
        className="grid grid-cols-2 gap-6 bg-white p-6 rounded-xl shadow"
      >
        {/* JUDUL */}
        <div>
          <label className="font-medium">Judul Buku *</label>
          <input
            className="border p-3 w-full rounded mt-1"
            value={books.judul_buku}
            onChange={(e) =>
              setBooks({ ...books, judul_buku: e.target.value })
            }
          />
        </div>

        {/* PENULIS */}
        <div>
          <label className="font-medium">Penulis *</label>
          <input
            className="border p-3 w-full rounded mt-1"
            value={books.penulis_buku}
            onChange={(e) =>
              setBooks({ ...books, penulis_buku: e.target.value })
            }
          />
        </div>

        {/* PENERBIT */}
        <div>
          <label className="font-medium">Penerbit *</label>
          <input
            className="border p-3 w-full rounded mt-1"
            value={books.penerbit_buku}
            onChange={(e) =>
              setBooks({ ...books, penerbit_buku: e.target.value })
            }
          />
        </div>

        {/* ISBN */}
        <div>
          <label className="font-medium">ISBN</label>
          <input
            className="border p-3 w-full rounded mt-1"
            value={books.isbn}
            onChange={(e) => setBooks({ ...books, isbn: e.target.value })}
          />
        </div>

        {/* COVER */}
        <div>
          <label className="font-medium">Cover Buku (filename)</label>
          <input
            className="border p-3 w-full rounded mt-1"
            value={books.cover_buku}
            onChange={(e) =>
              setBooks({ ...books, cover_buku: e.target.value })
            }
          />
        </div>

        {/* TOTAL HALAMAN */}
        <div>
          <label className="font-medium">Total Halaman</label>
          <input
            className="border p-3 w-full rounded mt-1"
            value={books.total_halaman}
            onChange={(e) =>
              setBooks({ ...books, total_halaman: e.target.value })
            }
          />
        </div>

        {/* STOCK */}
        <div>
          <label className="font-medium">Stok</label>
          <input
            className="border p-3 w-full rounded mt-1"
            value={books.stock}
            onChange={(e) => setBooks({ ...books, stock: e.target.value })}
          />
        </div>

        {/* RAK */}
        <div>
          <label className="font-medium">ID Rak</label>
          <input
            className="border p-3 w-full rounded mt-1"
            value={books.id_rak}
            onChange={(e) => setBooks({ ...books, id_rak: e.target.value })}
          />
        </div>

        {/* KATEGORI */}
        <div>
          <label className="font-medium">ID Kategori</label>
          <input
            className="border p-3 w-full rounded mt-1"
            value={books.id_kategori}
            onChange={(e) =>
              setBooks({ ...books, id_kategori: e.target.value })
            }
          />
        </div>

        {/* SUBMIT */}
        <div className="col-span-2 flex justify-end">
          <button className="bg-sky-500 text-white px-6 py-3 rounded-lg">
            Simpan Perubahan
          </button>
        </div>
      </form>
    </div>
  );
}
