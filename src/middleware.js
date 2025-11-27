import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const runtime = "nodejs";

export function middleware(req) {
  let pathname = req.nextUrl.pathname;
  const token = req.cookies.get("token")?.value;

  // PUBLIC ROUTES
  const publicPaths = ["/", "/login", "/register"];
  if (publicPaths.includes(pathname)) return NextResponse.next();

  // NO TOKEN → LOGIN
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // VERIFY JWT
  let user;
  try {
    user = jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const role = user.role;

  // ============================================================
  // SISWA
  // ============================================================
  if (role === "siswa") {
    // siswa tidak boleh dashboard
    if (pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/forbidden", req.url));
    }

    // siswa hanya boleh /users/homepage/*
    if (!pathname.startsWith("/users/homepage")) {
      return NextResponse.redirect(new URL("/users/homepage", req.url));
    }
  }

  // ============================================================
  // PETUGAS
  // ============================================================
  if (role === "petugas") {
    // petugas tidak boleh area siswa
    if (pathname.startsWith("/users")) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // petugas tidak boleh kelola user/admin area
    if (pathname.startsWith("/dashboard/users")) {
      return NextResponse.redirect(new URL("/forbidden", req.url));
    }

    // petugas hanya boleh area dashboard
    if (!pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  // ============================================================
  // ADMIN → bebas
  // ============================================================

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",  // admin & petugas
    "/users/:path*",      // siswa area
    "/login",
    "/register",
  ],
};
