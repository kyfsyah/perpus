import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req) {
  try {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { user: null },
        { status: 401 }
      );
    }

    // Decode JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    return NextResponse.json({
      user: {
        id: decoded.id,
        username: decoded.username, // nama user dari JWT
        email: decoded.email,
        role: decoded.role,
      }
    });

  } catch (err) {
    console.error("ME ERROR:", err);
    return NextResponse.json(
      { user: null },
      { status: 401 }
    );
  }
}
