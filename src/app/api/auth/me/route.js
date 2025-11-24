import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req) {
  try {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // HANYA kirim data yang boleh dilihat user
    return NextResponse.json({
      user: {
        id: decoded.id,
        nama: decoded.nama,
        email: decoded.email, // kalau di JWT ada
      },
    });

  } catch (err) {
    return NextResponse.json({ user: null }, { status: 401 });
  }
}
