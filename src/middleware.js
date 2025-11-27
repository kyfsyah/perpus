import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req) {
  const token = req.cookies.get("token")?.value;
  const pathname = req.nextUrl.pathname;

  // PUBLIC ROUTES
  const publicPaths = ["/login", "/register",];
  if (publicPaths.includes(pathname)) return NextResponse.next();

  // NO TOKEN → LOGIN
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // VERIFY JWT
  let user;
  try {
    user = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const role = user.role;

  // ============================================================
  // SISWA RULES
  // ============================================================
  if (role === "siswa") {
    // siswa tidak boleh dashboard
    if (pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/forbidden", req.url));
    }

    // siswa hanya boleh berada di /users/homepage/*
    if (!pathname.startsWith("/users/homepage")) {
      return NextResponse.redirect(new URL("/users/homepage", req.url));
    }
  }

  // ============================================================
  // PETUGAS RULES
  // ============================================================
  if (role === "petugas") {

    // 1. Petugas ga boleh manage user
    if (pathname.startsWith("/dashboard/users")) {
      return NextResponse.redirect(new URL("/forbidden", req.url));
    }

    // 2. Petugas ga boleh masuk area siswa
    if (pathname.startsWith("/users")) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // 3. Petugas hanya boleh dashboard + kelola buku
    //    (/dashboard/* dan /dashboard/books/*)
    if (!pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  // ============================================================
  // ADMIN RULES (NO LIMIT)
  // ============================================================

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
