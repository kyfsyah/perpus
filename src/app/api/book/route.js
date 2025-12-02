import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const limit = parseInt(searchParams.get("limit")) || null;
  const kategori = searchParams.get("kategori"); // ← TAMBAHAN PENTING

  try {
    const db = await getDb();

    // =============================
    // FILTER BUKU PER KATEGORI
    // =============================
    if (kategori) {
      const [rows] = await db.query(`
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
        LEFT JOIN kategori c ON c.id_kategori = b.id_kategori
        LEFT JOIN rak r ON r.id_rak = b.id_rak
        WHERE b.id_kategori = ?
        ORDER BY b.id_buku ASC
      `, [kategori]);

      return NextResponse.json({ success: true, data: rows });
    }

    // =============================
    // AMBIL SEMUA BUKU (DEFAULT)
    // =============================
    const [rows] = await db.query(`
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
      LEFT JOIN kategori c ON c.id_kategori = b.id_kategori
      LEFT JOIN rak r ON r.id_rak = b.id_rak
      ORDER BY b.id_buku ASC
      ${limit ? `LIMIT ${limit}` : ""}
    `);

    return NextResponse.json({ success: true, data: rows });

  } catch (err) {
    console.error("BOOK API ERROR:", err);
    return new NextResponse("Error fetching buku", { status: 500 });
  }
}
