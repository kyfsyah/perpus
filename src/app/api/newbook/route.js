import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get("limit")) || 20;
  try {
    const db = await getDb();
    const [rows] = await db.query(`
      SELECT 
        b.id_buku,
        b.cover_buku,
        b.judul_buku,
        c.nama AS kategori
      FROM buku b
      LEFT JOIN kategori c 
        ON c.id_kategori = b.id_kategori
      ORDER BY b.dibuat_pada DESC
      LIMIT ${limit};
    `);

    return NextResponse.json(rows);
  } catch (err) {
    console.error("BOOK API ERROR:", err);
    return new NextResponse("Error fetching books", { status: 500 });
  }
}