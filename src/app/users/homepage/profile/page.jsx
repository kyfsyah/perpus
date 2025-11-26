"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [memberSince, setMemberSince] = useState("2024");

  // Ambil data user dari /api/auth/me
  useEffect(() => {
    async function fetchMe() {
      try {
        const res = await fetch("/api/auth/me");
        if (!res.ok) return;

        const data = await res.json();
        const u = data.user;

        setForm({
          username: u?.username || "",
          email: u?.email || "",
          password: "",
        });

        // OPTIONAL: jika kamu nanti menambah kolom created_at
        // setMemberSince(new Date(u.created_at).getFullYear());
      } catch (err) {
        console.error("FETCH ME ERROR:", err);
      }
    }

    fetchMe();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/user/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Update profile gagal");
        return;
      }

      alert("Profile berhasil diupdate 🎉");
      setForm(prev => ({ ...prev, password: "" }));
    } catch (err) {
      console.error("UPDATE PROFILE ERROR:", err);
      alert("Error saat update profile");
    } finally {
      setLoading(false);
    }
  }

  // ===========================
  // DELETE ACCOUNT
  // ===========================
  async function handleDelete() {
    const yakin = confirm(
      "Apakah Anda YAKIN ingin menghapus akun ini? Semua data akan hilang permanen."
    );

    if (!yakin) return;

    try {
      const res = await fetch("/api/user/delete", {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Gagal menghapus akun.");
        return;
      }

      alert("Akun berhasil dihapus. 😢");
      window.location.href = "/register"; // redirect setelah delete
    } catch (err) {
      console.error("DELETE ACCOUNT ERROR:", err);
      alert("Terjadi kesalahan saat menghapus akun.");
    }
  }

  return (
    <div className="w-full h-full flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Profil Anda</h1>
        <p className="text-gray-500 text-sm">Kelola informasi akun Anda</p>
      </div>

      {/* CARD ATAS */}
      <div className="bg-gray-50 rounded-2xl p-6 shadow flex gap-6 items-center">
        <div className="w-24 h-24 bg-gray-300 rounded-full" />

        <div className="flex flex-col">
          <h2 className="text-xl font-semibold text-gray-800">
            {form.username || "User"}
          </h2>
          <p className="text-gray-500 text-sm mt-1">{form.email}</p>
        </div>
      </div>

      {/* FORM PROFILE */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow p-6 flex flex-col gap-4"
      >
        <div>
          <label className="text-gray-700 font-semibold text-sm">
            Username
          </label>
          <input
            name="username"
            className="w-full mt-1 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
            value={form.username}
            onChange={handleChange}
            placeholder="Masukkan nama"
          />
        </div>

        <div>
          <label className="text-gray-700 font-semibold text-sm">Email</label>
          <input
            name="email"
            type="email"
            className="w-full mt-1 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
            value={form.email}
            onChange={handleChange}
            placeholder="Masukkan email"
          />
        </div>

        <div>
          <label className="text-gray-700 font-semibold text-sm">
            Password Baru (opsional)
          </label>
          <input
            name="password"
            type="password"
            className="w-full mt-1 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
            value={form.password}
            onChange={handleChange}
            placeholder="Kosongkan jika tidak ingin ganti password"
          />
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="bg-teal-500 text-white w-full mt-4 hover:bg-teal-600"
        >
          {loading ? "Saving..." : "Simpan Perubahan"}
        </Button>
      </form>

      {/* DANGER ZONE */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 mt-4">
        <h3 className="text-red-600 font-semibold mb-2">PERINGATAN!</h3>
        <p className="text-gray-600 text-sm mb-4">
          Menghapus akun akan menghapus semua data Anda secara permanen.
        </p>

        <Button
          onClick={handleDelete}
          className="bg-red-600 text-white w-full hover:bg-red-700"
        >
          Hapus Akun
        </Button>
      </div>
    </div>
  );
}
