import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import jwt from "jsonwebtoken";

// ===============================
// VALIDASI ADMIN
// ===============================
function getAdmin(req) {
  const token = req.cookies.get("token")?.value;
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // hanya admin yang boleh delete user
    if (decoded.role !== "admin") return null;

    return decoded;
  } catch {
    return null;
  }
}

// ===============================
// DELETE USER (ADMIN ONLY)
// ===============================
export async function DELETE(req) {
  try {
    const admin = getAdmin(req);
    if (!admin) {
      return NextResponse.json(
        { success: false, msg: "Unauthorized (Admin Only)" },
        { status: 403 }
      );
    }

    const { id_users } = await req.json();
    if (!id_users) {
      return NextResponse.json(
        { success: false, msg: "ID user diperlukan" },
        { status: 400 }
      );
    }

    const db = await getDb();

    // Bersihkan data terkait user tersebut
    await db.query("DELETE FROM favorite WHERE id_users = ?", [id_users]);
    await db.query("DELETE FROM peminjaman WHERE id_users = ?", [id_users]);
    await db.query("DELETE FROM pengembalian WHERE id_peminjaman IN (SELECT id_peminjaman FROM peminjaman WHERE id_users = ?)", [id_users]);
    await db.query("DELETE FROM logs WHERE id_users = ?", [id_users]);

    // Hapus user
    await db.query("DELETE FROM users WHERE id_users = ?", [id_users]);

    return NextResponse.json({ success: true, msg: "User berhasil dihapus" });

  } catch (err) {
    console.error("ADMIN DELETE USER ERROR:", err);
    return NextResponse.json(
      { success: false, msg: "Gagal menghapus user" },
      { status: 500 }
    );
  }
}
