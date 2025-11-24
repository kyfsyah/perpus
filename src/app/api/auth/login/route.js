import { NextResponse } from "next/server";
import pool from "@/lib/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    // 1. CARI USER BY EMAIL
    const [rows] = await pool.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { error: "Email atau password salah" },
        { status: 401 }
      );
    }

    const user = rows[0];

    // 2. COCOKKAN PASSWORD HASH
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return NextResponse.json(
        { error: "Email atau password salah" },
        { status: 401 }
      );
    }

    // 3. BUAT JWT TOKEN
    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
        nama: user.nama,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // 4. RESPONSE
    const res = NextResponse.json({
      success: true,
      message: "Login berhasil",
      role: user.role,
    });

    // 5. SIMPAN TOKEN DI COOKIE HTTP ONLY
    res.cookies.set("token", token, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24, // 1 hari
    });

    return res;

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
