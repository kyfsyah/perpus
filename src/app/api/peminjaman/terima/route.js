import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function PATCH(req) {
  const { id_peminjaman } = await req.json();

  if (!id_peminjaman) {
    return NextResponse.json(
      { success: false, msg: "ID peminjaman tidak ada" },
      { status: 400 }
    );
  }

  try {
    const db = await getDb();

    await db.query(
      `
      UPDATE peminjaman
      SET status = 'Diterima'
      WHERE id_peminjaman = ?
    `,
      [id_peminjaman]
    );

    return NextResponse.json({ success: true, msg: "Peminjaman disetujui" });
  } catch (err) {
    console.error("TERIMA ERROR:", err);
    return NextResponse.json(
      { success: false, msg: "Gagal menyetujui peminjaman" },
      { status: 500 }
    );
  }
}
