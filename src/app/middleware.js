import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req) {
  const token = req.cookies.get("token")?.value;
  const pathname = req.nextUrl.pathname;

  // Halaman publik (tidak butuh login)
  const publicPaths = ["/login", "/register", "/api/auth/login", "/api/auth/register"];

  if (publicPaths.includes(pathname)) {
    return NextResponse.next();
  }

  // Kalau belum login → login page
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Decode token
  let user;
  try {
    user = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const role = user.role;

  // ============================================
  // ROLE SISWA
  // ============================================
  if (role === "siswa") {
    // siswa tidak boleh akses dashboard
    if (pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/forbidden", req.url));
    }

    // siswa hanya boleh akses area users/homepage
    if (!pathname.startsWith("/users/homepage")) {
      return NextResponse.redirect(new URL("/users/homepage", req.url));
    }
  }

  // ============================================
  // ROLE PETUGAS
  // ============================================
  if (role === "petugas") {
    // petugas boleh dashboard tapi tidak boleh manage user penuh
    if (pathname.startsWith("/dashboard/users/manage")) {
      return NextResponse.redirect(new URL("/forbidden", req.url));
    }
  }

  // ============================================
  // ROLE ADMIN
  // (tidak ada pembatas)
  // ============================================

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/users/:path*",
    "/login",
    "/register",
  ],
};
