// src/lib/validation.js
import { z } from "zod";

export const registerSchema = z.object({
  username: z.string().min(3, "Username minimal 3 karakter"),
  email: z.string().email("Email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
  role: z.enum(["siswa", "petugas", "admin"]),
  jenis_kelamin: z.enum(["Laki-Laki", "Perempuan"]),
});
