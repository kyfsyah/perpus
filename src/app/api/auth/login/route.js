import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    const [rows] = await pool.query(
      "SELECT * FROM users WHERE email=? AND password=?",
      [email, password]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { error: "Email atau password salah" },
        { status: 401 }
      );
    }

    const user = rows[0];

    return NextResponse.json({
      success: true,
      role: user.role,
      id: user.id,
      nama: user.nama
    });

  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
