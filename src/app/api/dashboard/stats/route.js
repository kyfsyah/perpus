import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function GET() {
  try {
    const db = await getDb();

    // Hitung user
    const [[userRow]] = await db.query("SELECT COUNT(*) AS total FROM users");

    // Hitung buku
    const [[bookRow]] = await db.query("SELECT COUNT(*) AS total FROM buku");

    // Hitung buku dipinjam
    const [[borrowedRow]] = await db.query("SELECT COUNT(*) AS total FROM peminjaman WHERE status = 'dipinjam'");

    // Hitung buku favorit
    const [[favRow]] = await db.query("SELECT COUNT(*) AS total FROM favorite");

    return NextResponse.json({
      users: userRow.total,
      books: bookRow.total,
      borrowed: borrowedRow.total,
      favorites: favRow.total,
    });
  } catch (err) {
    console.error("DASHBOARD STATS ERROR:", err);
    return NextResponse.json({ error: "Failed to load stats" }, { status: 500 });
  }
}
