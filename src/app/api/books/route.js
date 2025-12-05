import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { getDb } from "@/lib/db";

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

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const limit = parseInt(searchParams.get("limit")) || null;
  const kategori = searchParams.get("kategori"); // ← TAMBAHAN PENTING

  try {
    const db = await getDb();

    // =============================
    // FILTER BUKU PER KATEGORI
    // =============================
    if (kategori) {
      const [rows] = await db.query(`
        SELECT 
          b.id_buku,
          b.isbn,
          b.cover_buku,
          b.judul_buku,
          b.penulis_buku,
          b.penerbit_buku,
          c.nama AS kategori,
          b.deskripsi,
          b.tahun_terbit,
          b.total_halaman,
          b.stock,
          r.id_rak AS id_rak,
          b.dibuat_pada
        FROM buku b
        LEFT JOIN kategori c ON c.id_kategori = b.id_kategori
        LEFT JOIN rak r ON r.id_rak = b.id_rak
        WHERE b.id_kategori = ?
        ORDER BY b.id_buku ASC
      `, [kategori]);

      return NextResponse.json({ success: true, data: rows });
    }

    // =============================
    // AMBIL SEMUA BUKU (DEFAULT)
    // =============================
    const [rows] = await db.query(`
      SELECT 
        b.id_buku,
        b.isbn,
        b.cover_buku,
        b.judul_buku,
        b.penulis_buku,
        b.penerbit_buku,
        c.nama AS kategori,
        b.deskripsi,
        b.tahun_terbit,
        b.total_halaman,
        b.stock,
        r.id_rak AS id_rak,
        b.dibuat_pada
      FROM buku b
      LEFT JOIN kategori c ON c.id_kategori = b.id_kategori
      LEFT JOIN rak r ON r.id_rak = b.id_rak
      ORDER BY b.id_buku ASC
      ${limit ? `LIMIT ${limit}` : ""}
    `);

    return NextResponse.json({ success: true, data: rows });

  } catch (err) {
    console.error("BOOK API ERROR:", err);
    return new NextResponse("Error fetching buku", { status: 500 });
  }
}

export async function POST(req) {
  try {
    const editor = getEditor(req);
    if (!editor) {
      return NextResponse.json(
        { success: false, error: "Unauthorized (Admin/Petugas Only)" },
        { status: 403 }
      );
    }

    const body = await req.json();
    const {
      judul_buku,
      penulis_buku,
      penerbit_buku,
      isbn = "",
      cover_buku = "",
      deskripsi = "",
      tahun_terbit,
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
      INSERT INTO buku (
        judul_buku,
        penulis_buku,
        penerbit_buku,
        isbn,
        cover_buku,
        deskripsi,
        tahun_terbit,
        total_halaman,
        stock,
        id_rak,
        id_kategori
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        judul_buku,
        penulis_buku,
        penerbit_buku,
        isbn,
        cover_buku,
        deskripsi,
        toNumberOrNull(tahun_terbit),
        toNumberOrNull(total_halaman),
        toNumberOrNull(stock),
        toNumberOrNull(id_rak),
        toNumberOrNull(id_kategori),
      ]
    );

    return NextResponse.json({
      success: true,
      id: result.insertId,
      message: "Buku berhasil ditambahkan",
    });

  } catch (err) {
    console.error("BOOK CREATE ERROR:", err);
    return NextResponse.json(
      { success: false, error: "Gagal menambahkan buku" },
      { status: 500 }
    );
  }
}
