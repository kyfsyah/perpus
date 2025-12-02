import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const runtime = "nodejs";

export function middleware(req) {
  const url = req.nextUrl.clone();
  const pathname = url.pathname;

  const token = req.cookies.get("token")?.value;

  // ============================
  // HANDLE API ROUTES
  // ============================
  if (pathname.startsWith("/api")) {
    if (!token) {
      return NextResponse.json(
        { success: false, msg: "Unauthorized" },
        { status: 401 }
      );
    }

    let user;
    try {
      user = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
      return NextResponse.json(
        { success: false, msg: "Invalid Token" },
        { status: 401 }
      );
    }

    // API PEMINJAMAN → khusus admin & petugas
    if (pathname.startsWith("/api/peminjaman")) {
      if (user.role !== "admin" && user.role !== "petugas") {
        return NextResponse.json(
          { success: false, msg: "Forbidden" },
          { status: 403 }
        );
      }
    }

    // API FAVORITE & BOOK → siswa boleh akses
    return NextResponse.next();
  }

  // ============================
  // PUBLIC ROUTES
  // ============================
  const publicPaths = ["/", "/login", "/register"];
  if (publicPaths.includes(pathname)) return NextResponse.next();

  // ============================
  // TOKEN CHECK FOR UI ROUTES
  // ============================
  if (!token) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  let user;
  try {
    user = jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  const role = user.role;

  // ============================
  // SISWA RULES
  // ============================
  if (role === "siswa") {
    if (pathname.startsWith("/dashboard")) {
      url.pathname = "/forbidden";
      return NextResponse.redirect(url);
    }

    if (!pathname.startsWith("/users/homepage")) {
      url.pathname = "/users/homepage";
      return NextResponse.redirect(url);
    }
  }

  // ============================
  // PETUGAS RULES
  // ============================
  if (role === "petugas") {
    if (pathname.startsWith("/users")) {
      url.pathname = "/dashboard";
      return NextResponse.redirect(url);
    }

    if (!pathname.startsWith("/dashboard")) {
      url.pathname = "/dashboard";
      return NextResponse.redirect(url);
    }
  }

  // ============================
  // ADMIN → full access
  // ============================

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

