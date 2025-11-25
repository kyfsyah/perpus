import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function GET(request, { params }) {
  const { id } = await params; // Ambil id dari URL

  try {
    const db = await getDb();

    const [rows] = await db.query(
      `
      SELECT 
        b.id_buku,
        b.isbn,
        b.cover_buku,
        b.judul_buku,
        b.penulis_buku,
        b.penerbit_buku,
        c.nama AS kategori,
        b.deskripsi,
        b.tahun_terbit,
        b.total_halaman,
        b.stock,
        r.id_rak AS id_rak,
        b.dibuat_pada
      FROM buku b
      LEFT JOIN kategori c 
        ON c.id_kategori = b.id_kategori
      LEFT JOIN rak r
        ON r.id_rak = b.id_rak
      WHERE b.id_buku = ?
      LIMIT 1
      `,
      [id]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { error: "Buku tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json(rows[0]);

  } catch (err) {
    console.error("BOOK DETAIL ERROR:", err);
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}
