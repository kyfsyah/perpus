import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { getDb } from "@/lib/db";

// Validasi token dan role admin/petugas
function getEditor(req) {
  const token = req.cookies.get("token")?.value;
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.role === "admin" || decoded.role === "petugas" ? decoded : null;
  } catch {
    return null;
  }
}

export async function GET(request, { params }) {
  const { id } = await params;

  try {
    const db = await getDb();

    const [rows] = await db.query(
      `
      SELECT 
        b.id_buku,
        b.isbn,
        b.cover_buku,
        b.judul_buku,
        b.penulis_buku,
        b.penerbit_buku,
        b.id_kategori,      -- FIX PENTING
        c.nama AS kategori,
        b.deskripsi,
        b.tahun_terbit,
        b.total_halaman,
        b.stock,
        r.id_rak AS id_rak,
        b.dibuat_pada
      FROM buku b
      LEFT JOIN kategori c 
        ON c.id_kategori = b.id_kategori
      LEFT JOIN rak r
        ON r.id_rak = b.id_rak
      WHERE b.id_buku = ?
      LIMIT 1
      `,
      [id]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { error: "Buku tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json(rows[0]);

  } catch (err) {
    console.error("BOOK DETAIL ERROR:", err);
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  try {
    const editor = getEditor(req);
    if (!editor) {
      return NextResponse.json(
        { success: false, error: "Unauthorized (Admin/Petugas Only)" },
        { status: 403 }
      );
    }

    const { id } = await params;
    const body = await req.json();

    const {
      judul_buku,
      penulis_buku,
      penerbit_buku,
      isbn = "",
      cover_buku = "",
      total_halaman,
      stock,
      id_rak,
      id_kategori,
    } = body;

    if (!judul_buku || !penulis_buku || !penerbit_buku) {
      return NextResponse.json(
        { success: false, error: "Data wajib diisi belum lengkap" },
        { status: 400 }
      );
    }

    const toNumberOrNull = (val) => {
      if (val === undefined || val === null || val === "") return null;
      const num = Number(val);
      return Number.isNaN(num) ? null : num;
    };

    const db = await getDb();
    const [result] = await db.query(
      `
      UPDATE buku
      SET 
        judul_buku = ?,
        penulis_buku = ?,
        penerbit_buku = ?,
        isbn = ?,
        cover_buku = ?,
        total_halaman = ?,
        stock = ?,
        id_rak = ?,
        id_kategori = ?
      WHERE id_buku = ?
      `,
      [
        judul_buku,
        penulis_buku,
        penerbit_buku,
        isbn,
        cover_buku,
        toNumberOrNull(total_halaman),
        toNumberOrNull(stock),
        toNumberOrNull(id_rak),
        toNumberOrNull(id_kategori),
        id,
      ]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { success: false, error: "Buku tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Buku berhasil diupdate",
    });

  } catch (err) {
    console.error("BOOK UPDATE ERROR:", err);
    return NextResponse.json(
      { success: false, error: "Gagal mengupdate buku" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    const editor = getEditor(req);
    if (!editor) {
      return NextResponse.json(
        { success: false, error: "Unauthorized (Admin/Petugas Only)" },
        { status: 403 }
      );
    }

    const { id } = await params;
    const db = await getDb();

    const [result] = await db.query(
      "DELETE FROM buku WHERE id_buku = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { success: false, error: "Buku tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Buku berhasil dihapus",
    });

  } catch (err) {
    console.error("BOOK DELETE ERROR:", err);
    return NextResponse.json(
      { success: false, error: "Gagal menghapus buku" },
      { status: 500 }
    );
  }
}
