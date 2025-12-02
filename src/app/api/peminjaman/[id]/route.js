import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function GET(req, { params }) {
  const { id } = params;

  try {
    const db = await getDb();

    const [[row]] = await db.query(`
  SELECT 
    p.*,
    p.pangembalian AS pengembalian,
    u.nama AS user_nama,
    b.judul_buku AS buku_judul
    FROM peminjaman p
    JOIN users u ON u.id_users = p.id_users
    JOIN buku b ON b.id_buku = p.id_book
    WHERE p.id_peminjaman = ?`, 
    [id]);

    return NextResponse.json({ success: true, data: row });

  } catch (error) {
    console.error("PEMINJAMAN DETAIL ERROR:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
