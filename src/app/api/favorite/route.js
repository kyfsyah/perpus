import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { getDb } from "@/lib/db";

function getUserFromToken(req) {
  const token = req.cookies.get("token")?.value;
  if (!token) return null;
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (e) {
    return null;
  }
}

// ======================= GET FAVORITE =======================
export async function GET(req) {
  const user = getUserFromToken(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const db = await getDb();

    const [rows] = await db.query(`
      SELECT b.*
      FROM favorite f
      JOIN buku b ON b.id_buku = f.id_buku
      WHERE f.id_user = ?
      ORDER BY f.created_at DESC
    `, [user.id]);

    return NextResponse.json(rows);
  } catch (err) {
    console.error("FAVORITE GET ERROR:", err);
    return NextResponse.json("Error fetching favorite", { status: 500 });
  }
}

// ======================= ADD FAVORITE =======================
export async function POST(req) {
  const user = getUserFromToken(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { bookId } = await req.json();

  if (!bookId) {
    return NextResponse.json({ error: "Missing bookId" }, { status: 400 });
  }

  try {
    const db = await getDb();

    await db.query(`
      INSERT IGNORE INTO favorite (id_users, id_buku)
      VALUES (?, ?)
    `, [user.id, bookId]);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("FAVORITE POST ERROR:", err);
    return NextResponse.json("Error adding favorite", { status: 500 });
  }
}

// ======================= REMOVE FAVORITE =======================
export async function DELETE(req) {
  const user = getUserFromToken(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { bookId } = await req.json();

  if (!bookId) {
    return NextResponse.json({ error: "Missing bookId" }, { status: 400 });
  }

  try {
    const db = await getDb();

    await db.query(`
      DELETE FROM favorite
      WHERE id_users = ? AND id_buku = ?
    `, [user.id, bookId]);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("FAVORITE DELETE ERROR:", err);
    return NextResponse.json("Error removing favorite", { status: 500 });
  }
}
