import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import jwt from "jsonwebtoken";

export async function DELETE(req) {
  try {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Verifikasi token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const db = await getDb();

    // Hapus favorite user terlebih dahulu (jika ada)
    await db.query("DELETE FROM favorite WHERE id_users = ?", [userId]);

    // Hapus user dari table users
    await db.query("DELETE FROM users WHERE id_users = ?", [userId]);

    // Hapus cookie token
    const res = NextResponse.json({
      success: true,
      message: "Akun berhasil dihapus"
    });

    res.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0), // langsung expire
      path: "/"
    });

    return res;

  } catch (err) {
    console.error("DELETE ACCOUNT ERROR:", err);
    return NextResponse.json(
      { error: "Gagal menghapus akun" },
      { status: 500 }
    );
  }
}
