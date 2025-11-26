import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function GET() {
  try {
    const db = await getDb();
    const [rows] = await db.query(
      "SELECT id_kategori, nama, deskripsi FROM kategori ORDER BY id_kategori ASC"
    );
    return NextResponse.json({
      success: true,
      data: rows,
    });
  } catch (err) {
    console.error("Kategori Error:", err);
    return new NextResponse("Server Error", { status: 500 });
  }
}