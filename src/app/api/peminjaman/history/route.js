import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import jwt from "jsonwebtoken";

function getUser(req) {
  const token = req.cookies.get("token")?.value;
  if (!token) return null;

  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return null;
  }
}

export async function GET(req) {
  const user = getUser(req);
  if (!user) {
    return NextResponse.json({ success: false, msg: "Unauthorized" }, { status: 401 });
  }

  try {
    const db = await getDb();
    const [rows] = await db.query(`
      SELECT
        p.id_peminjaman,
        p.tanggal_peminjaman,
        p.tanggal_pengembalian,
        p.status,
        b.judul_buku AS buku_judul,
        b.cover_buku
      FROM peminjaman p
      JOIN buku b ON b.id_buku = p.id_book
      WHERE p.id_users = ?
      ORDER BY p.id_peminjaman DESC
    `, [user.id]);

    return NextResponse.json({ success: true, data: rows });

  } catch (err) {
    console.error("HISTORY ERROR:", err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
