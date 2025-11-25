"use client";

import React from "react";
import Image from "next/image";

export default function LoginPage() {
  async function handleSubmit(e) {
    e.preventDefault();

    const form = new FormData(e.target);
    const email = form.get("email");
    const password = form.get("password");

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // ← WAJIB
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || "Login gagal!");
      return;
    }

    // Redirect berdasarkan role
    switch (data.role) {
      case "admin":
        window.location.href = "/dashboard";
        break;

      case "petugas":
        window.location.href = "/dashboard";
        break;

      case "siswa":
        window.location.href = "/users/homepage";
        break;

      default:
        window.location.href = "/";
    }
  }

  return (
    <div
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('../../assets/Tb.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
      <div className="relative bg-white/90 shadow-2xl rounded-2xl flex flex-col md:flex-row w-full max-w-4xl overflow-hidden z-10 backdrop-blur-md">
        <div className="w-full md:w-1/2 p-10">
          <h1 className="text-3xl font-bold text-sky-700 mb-6 text-center">
            Masuk ke Akun
          </h1>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sky-800 font-semibold mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Masukkan email"
                className="w-full px-4 py-2 border border-sky-400/60 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-black placeholder-gray-400 shadow-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sky-800 font-semibold mb-2">
                Kata Sandi
              </label>
              <input
                type="password"
                name="password"
                placeholder="Masukkan kata sandi"
                className="w-full px-4 py-2 border border-sky-400/60 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-black placeholder-gray-400 shadow-sm"
                required
              />
            </div>

            <div className="flex justify-end -mt-3">
              <a href="/forgot-password" className="text-sky-600 text-sm font-medium hover:underline">
                Lupa password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-sky-600 text-white py-2 -mt-3 rounded-lg hover:bg-sky-700 transition duration-300 font-semibold shadow-md"
            >
              Masuk Sekarang
            </button>

            <p className="text-center text-sm text-gray-700 mt-3">
              Belum punya akun?{" "}
              <a href="/register" className="text-sky-600 font-medium hover:underline">
                Daftar di sini
              </a>
            </p>
          </form>
        </div>

        {/* RIGHT SIDE */}
        <div
          className="hidden md:block md:w-1/2 relative bg-cover bg-center"
          style={{ backgroundImage: "url('../../assets/LibraryBG.jpg')" }}
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

          <div className="absolute inset-0 flex items-center justify-center text-center px-8">
            <h2 className="text-white text-3xl font-semibold drop-shadow-xl">
              Selamat Datang di Perpustakaan
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
