import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getDb } from "@/lib/db";
import { cookies } from "next/headers";

export async function PUT(req) {
  try {
    const token = cookies().get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Decode JWT
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const userId = decoded.id;

    // Ambil body request
    const { username, email, password } = await req.json();

    const db = await getDb();

    // Cek email dipakai user lain
    const [checkEmail] = await db.query(
      "SELECT id_users FROM users WHERE email = ? AND id_users != ?",
      [email, userId]
    );

    if (checkEmail.length > 0) {
      return NextResponse.json(
        { error: "Email sudah digunakan user lain" },
        { status: 400 }
      );
    }

    // Jika ada password baru → hash
    let query;
    let params;

    if (password && password.trim() !== "") {
      const hashed = await bcrypt.hash(password, 10);
      query =
        "UPDATE users SET username = ?, email = ?, password = ? WHERE id_users = ?";
      params = [username, email, hashed, userId];
    } else {
      query =
        "UPDATE users SET username = ?, email = ? WHERE id_users = ?";
      params = [username, email, userId];
    }

    await db.query(query, params);

    // Buat token baru
    const newToken = jwt.sign(
      {
        id: userId,
        username,
        email,
        role: decoded.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    const res = NextResponse.json({
      message: "Profile updated",
      user: {
        id: userId,
        username,
        email,
        role: decoded.role,
      }
    });

    // Simpan cookie baru
    res.cookies.set("token", newToken, {
      httpOnly: true,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return res;

  } catch (err) {
    console.error("UPDATE PROFILE ERROR:", err);
    return NextResponse.json({ error: "Update gagal" }, { status: 500 });
  }
}
