import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function PATCH(req) {
  const { id_peminjaman, id_admin } = await req.json();

  try {
    const db = await getDb();

    await db.query(
      `
      UPDATE peminjaman
      SET status = 'Ditolak',
          id_admin = ?
      WHERE id_peminjaman = ?
    `,
      [id_admin || null, id_peminjaman]
    );

    return NextResponse.json({ success: true, msg: "Peminjaman ditolak" });
  } catch (err) {
    console.error("TOLAK ERROR:", err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
