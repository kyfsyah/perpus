import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function POST(req) {
  try {
    const { username, email, password } = await req.json();

    // Cek email sudah dipakai atau belum
    const [existing] = await pool.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (existing.length > 0) {
      return NextResponse.json(
        { error: "Email sudah digunakan" },
        { status: 400 }
      );
    }

    // Insert user baru dengan role siswa
    await pool.query(
      "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, 'siswa')",
      [username, email, password]
    );

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error("REGISTER ERROR:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
