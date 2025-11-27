"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function ProfileForm() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("/api/auth/me");
        if (!res.ok) return;

        const data = await res.json();
        const u = data.user;

        setForm({
          username: u?.username || u?.name || "",
          email: u?.email || "",
          password: "",
        });

        setRole(u?.role || "");
      } catch (err) {
        console.error("FETCH ME ERROR:", err);
      }
    }

    fetchUser();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      // otomatis pilih endpoint berdasarkan role
      const endpoint =
        role === "siswa"
          ? "/api/users/update"
          : "/api/users/update";

      const res = await fetch(endpoint, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Gagal update profile");
        return;
      }

      alert("Profil berhasil diperbarui!");
      setForm(prev => ({ ...prev, password: "" }));
    } catch (err) {
      console.error("UPDATE ERROR:", err);
      alert("Error ketika update profil");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    const ok = confirm("YAKIN? Menghapus akun bersifat permanen.");

    if (!ok) return;

    try {
      const res = await fetch("/api/users/delete", { method: "DELETE" });
      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Gagal menghapus akun");
        return;
      }

      alert("Akun berhasil dihapus");
      window.location.href = "/register";
    } catch (err) {
      console.error("DELETE ERROR:", err);
      alert("Gagal delete akun");
    }
  }

  return (
    <div className="w-full h-full flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Profil Anda</h1>
        <p className="text-gray-500 text-sm">Kelola informasi akun Anda</p>
      </div>

      <div className="bg-gray-50 rounded-2xl p-6 shadow flex gap-6 items-center">
        <div className="w-24 h-24 bg-gray-300 rounded-full" />
        <div className="flex flex-col">
          <h2 className="text-xl font-semibold text-gray-800">
            {form.username || "User"}
          </h2>
          <p className="text-gray-500 text-sm mt-1">{form.email}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow p-6 flex flex-col gap-4">
        <div>
          <label className="text-gray-700 font-semibold text-sm">Username</label>
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            className="w-full mt-1 p-3 rounded-xl border"
          />
        </div>

        <div>
          <label className="text-gray-700 font-semibold text-sm">Email</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className="w-full mt-1 p-3 rounded-xl border"
          />
        </div>

        <div>
          <label className="text-gray-700 font-semibold text-sm">Password Baru</label>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            className="w-full mt-1 p-3 rounded-xl border"
            placeholder="Kosongkan jika tidak ingin mengganti"
          />
        </div>

        <Button type="submit" disabled={loading} className="bg-teal-500 text-white w-full">
          {loading ? "Saving..." : "Simpan Perubahan"}
        </Button>
      </form>

      <div className="bg-red-50 border border-red-200 rounded-xl p-6">
        <h3 className="text-red-600 font-semibold mb-2">PERINGATAN!</h3>
        <p className="text-gray-600 text-sm mb-4">
          Menghapus akun akan menghapus seluruh data Anda.
        </p>

        <Button onClick={handleDelete} className="bg-red-600 text-white w-full">
          Hapus Akun
        </Button>
      </div>
    </div>
  );
}
