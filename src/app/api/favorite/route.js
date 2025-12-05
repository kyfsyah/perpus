import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { getDb } from "@/lib/db";

// ======================= JWT CHECK =======================
function getUserFromToken(req) {
  const token = req.cookies.get("token")?.value;
  if (!token) return null;

  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return null;
  }
}

// ==========================================================
//                       GET FAVORITES
// ==========================================================
export async function GET(req) {
  const user = getUserFromToken(req);
  if (!user) {
    return NextResponse.json({ success: false, data: [], error: "Unauthorized" }, { status: 401 });
  }

  try {
    const db = await getDb();

    const [rows] = await db.query(
      `
      SELECT b.*
      FROM favorite f
      JOIN buku b ON b.id_buku = f.id_buku
      WHERE f.id_users = ?
    `,
      [user.id]
    );

    return NextResponse.json({ success: true, data: rows });
  } catch (err) {
    console.error("FAVORITE GET ERROR:", err);
    return NextResponse.json(
      { success: false, error: "Error fetching favorites", data: [] },
      { status: 500 }
    );
  }
}

// ==========================================================
//                       ADD FAVORITE
// ==========================================================
export async function POST(req) {
  const user = getUserFromToken(req);
  if (!user) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const { booksId } = await req.json();
  if (!booksId) {
    return NextResponse.json({ success: false, error: "Missing booksId" }, { status: 400 });
  }

  try {
    const db = await getDb();

    await db.query(
      `
      INSERT IGNORE INTO favorite (id_users, id_buku)
      VALUES (?, ?)
    `,
      [user.id, booksId]
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("FAVORITE POST ERROR:", err);
    return NextResponse.json(
      { success: false, error: "Error adding favorite" },
      { status: 500 }
    );
  }
}

// ==========================================================
//                      DELETE FAVORITE
// ==========================================================
export async function DELETE(req) {
  const user = getUserFromToken(req);
  if (!user) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const { booksId } = await req.json();
  if (!booksId) {
    return NextResponse.json({ success: false, error: "Missing booksId" }, { status: 400 });
  }

  try {
    const db = await getDb();

    await db.query(
      `
      DELETE FROM favorite
      WHERE id_users = ? AND id_buku = ?
    `,
      [user.id, booksId]
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("FAVORITE DELETE ERROR:", err);
    return NextResponse.json(
      { success: false, error: "Error removing favorite" },
      { status: 500 }
    );
  }
}
