import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getDb } from "@/lib/db";

export async function PUT(req) {
  try {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    // Ambil body
    const { username, email, password } = await req.json();

    const db = await getDb();

    // Cek email sudah dipakai user lain
    const [emailCheck] = await db.query(
      "SELECT id_users FROM users WHERE email = ? AND id_users != ?",
      [email, userId]
    );

    if (emailCheck.length > 0) {
      return NextResponse.json(
        { error: "Email sudah digunakan user lain" },
        { status: 400 }
      );
    }

    // Query update
    if (password && password.trim() !== "") {
      const hashed = await bcrypt.hash(password, 10);

      await db.query(
        "UPDATE users SET username = ?, email = ?, password = ? WHERE id_users = ?",
        [username, email, hashed, userId]
      );
    } else {
      await db.query(
        "UPDATE users SET username = ?, email = ? WHERE id_users = ?",
        [username, email, userId]
      );
    }

    // Buat token baru setelah update
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

    const res = NextResponse.json({ message: "Profile updated" });

    res.cookies.set("token", newToken, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return res;

  } catch (err) {
    console.error("UPDATE PROFILE ERROR:", err);
    return NextResponse.json({ error: "Update gagal" }, { status: 500 });
  }
}
