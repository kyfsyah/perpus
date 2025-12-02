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

// ======================= GET LIST PEMINJAMAN =======================
export async function GET(req) {
  try {
    const db = await getDb();

    const [rows] = await db.query(`
  SELECT 
    p.id_peminjaman,
    p.tanggal_peminjaman,
    p.tanggal_pengembalian,
    p.pengembalian AS pengembalian,
    p.status,

    u.username AS user_nama,
    b.judul_buku AS buku_judul
    
  FROM peminjaman p
  JOIN users u ON u.id_users = p.id_users
  JOIN buku b ON b.id_buku = p.id_book
  ORDER BY p.id_peminjaman DESC
`);

    return NextResponse.json({ success: true, data: rows });

  } catch (error) {
    console.error("PEMINJAMAN GET ERROR:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

// ======================= CREATE PEMINJAMAN =======================
export async function POST(req) {
  const user = getUser(req);
  if (!user) {
    return NextResponse.json({ success: false, msg: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id_book, tanggal_peminjaman, tanggal_pengembalian } = await req.json();

    if (!id_book || !tanggal_peminjaman || !tanggal_pengembalian) {
      return NextResponse.json({ success: false, msg: "Incomplete data" }, { status: 400 });
    }

    const db = await getDb();

    await db.query(`
    INSERT INTO peminjaman (id_users, id_book, tanggal_peminjaman, tanggal_pengembalian, status)
    VALUES (?, ?, ?, ?, 'Menunggu')`, 
    [user.id, id_book, tanggal_peminjaman, tanggal_pengembalian]);

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("PEMINJAMAN POST ERROR:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
