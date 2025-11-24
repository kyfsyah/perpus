import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req) {
  const token = req.cookies.get("token")?.value;
  const pathname = req.nextUrl.pathname;

  // Halaman & API yang boleh diakses tanpa login
  const publicPaths = ["/login", "/register", "/api/auth/login", "/api/auth/register"];

  if (publicPaths.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  // Jika tidak ada token → redirect login
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Decode JWT
  let user;
  try {
    user = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const role = user.role;

  // ======================================================
  // ROLE-BASED PROTECTION
  // ======================================================

  // 🟡 SISWA
  // Siswa TIDAK boleh masuk dashboard
  if (role === "siswa") {
    if (pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/forbidden", req.url));
    }

    // Siswa hanya boleh akses /users/homepage
    if (!pathname.startsWith("/users/homepage")) {
      // API tetap boleh diakses
      if (!pathname.startsWith("/api")) {
        return NextResponse.redirect(new URL("/users/homepage", req.url));
      }
    }
  }

  // 🟢 PETUGAS
  // Petugas boleh dashboard tapi tidak boleh kelola user penuh
  if (role === "petugas") {
    if (pathname.startsWith("/dashboard/users/manage")) {
      return NextResponse.redirect(new URL("/forbidden", req.url));
    }
  }

  // 🔵 ADMIN
  // Admin full akses → aman

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/users/:path*",
    "/api/:path*",
    "/login",
    "/register",
  ],
};
