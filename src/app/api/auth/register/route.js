import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { getDb } from "@/lib/db";

export async function POST(req) {
  try {
    const { name, email, password, gender } = await req.json();

    const db = await getDb();

    // Cek apakah email sudah terdaftar
    const [existing] = await db.query(
      "SELECT id_users FROM users WHERE email = ?",
      [email]
    );

    if (existing.length > 0) {
      return NextResponse.json(
        { error: "Email sudah digunakan" },
        { status: 400 }
      );
    }

    // Hash password
    const hashed = await bcrypt.hash(password, 10);

    // Insert user baru
    await db.query(
      "INSERT INTO users (username, email, password, role, jenis_kelamin) VALUES (?, ?, ?, 'siswa', ?)",
      [name, email, hashed, gender]
    );

    return NextResponse.json({ message: "Register berhasil" });

  } catch (err) {
    console.error("REGISTER ERROR:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
