"use client";

import React from "react";

export default function RegisterPage() {
  async function handleSubmit(e) {
    e.preventDefault();

    const form = new FormData(e.target);
    const name = form.get("name");
    const email = form.get("email");
    const password = form.get("password");
    const gender = form.get("gender");

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, gender }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || "Pendaftaran gagal!");
      return;
    }

    alert("Pendaftaran berhasil! Silakan login.");
    window.location.href = "/login";
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
            Daftar Akun
          </h1>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sky-800 font-semibold mb-2">
                Nama Lengkap
              </label>
              <input
                type="text"
                name="name"
                placeholder="Masukkan nama lengkap"
                className="w-full px-4 py-2 border border-sky-400/60 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sky-800 font-semibold mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Masukkan email"
                className="w-full px-4 py-2 border border-sky-400/60 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-sm"
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
                placeholder="Buat kata sandi"
                className="w-full px-4 py-2 border border-sky-400/60 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sky-800 font-semibold mb-2">
                Jenis Kelamin
              </label>
              <select
                name="gender"
                className="w-full px-4 py-2 border border-sky-400/60 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-sm"
                required
              >
                <option value="">Pilih jenis kelamin</option>
                <option value="Laki-laki">Laki-laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
            </div>


            <button
              type="submit"
              className="w-full bg-sky-600 text-white py-2 rounded-lg hover:bg-sky-700 transition duration-300 font-semibold shadow-md"
            >
              Daftar Sekarang
            </button>

            <p className="text-center text-sm text-gray-700 mt-3">
              Sudah punya akun?{" "}
              <a href="/login" className="text-sky-600 font-medium hover:underline">
                Masuk di sini
              </a>
            </p>
          </form>
        </div>

        <div
          className="hidden md:block md:w-1/2 relative bg-cover bg-center"
          style={{ backgroundImage: "url('../../assets/LibraryBG.jpg')" }}
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

          <div className="absolute inset-0 flex items-center justify-center text-center px-6">
            <h2 className="text-white text-3xl font-semibold drop-shadow-xl">
              Buat Akun Baru & Mulai Membaca
            </h2>
          </div>
        </div>

      </div>
    </div>
  );
}
