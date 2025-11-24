import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/lib/db"; // Sesuaikan
import { z } from "zod";

const RegisterSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(6),
  role: z.enum(["admin", "petugas", "siswa"]).optional(),
});

export async function POST(req) {
  try {
    const body = await req.json();
    const data = RegisterSchema.parse(body);

    const existing = await prisma.user.findUnique({
      where: { username: data.username },
    });

    if (existing)
      return NextResponse.json(
        { message: "Username sudah dipakai" },
        { status: 400 }
      );

    const hashed = await bcrypt.hash(data.password, 10);

    await prisma.user.create({
      data: {
        username: data.username,
        password: hashed,
        role: data.role ?? "siswa",
      },
    });

    return NextResponse.json({ message: "Register berhasil" });
  } catch (err) {
    return NextResponse.json(
      { message: "Register gagal", error: err.message },
      { status: 500 }
    );
  }
}
