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
      SET status = 'Dikembalikan',
          pengembalian = NOW()
      WHERE id_peminjaman = ?
    `,
      [id_peminjaman]
    );

    return NextResponse.json({ success: true, msg: "Buku sudah dikembalikan" });
  } catch (err) {
    console.error("PENGEMBALIAN ERROR:", err);
    return NextResponse.json(
      { success: false, msg: "Gagal mengupdate pengembalian" },
      { status: 500 }
    );
  }
}
