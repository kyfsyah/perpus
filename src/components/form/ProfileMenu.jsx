"use client";

import { useEffect, useState } from "react";

export default function ProfileForm() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // AMBIL DATA USER DARI JWT (/api/auth/me)
  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("/api/auth/me");
        if (!res.ok) {
          setLoading(false);
          return;
        }
        const data = await res.json();

        // /api/auth/me lu sekarang balikin:
        // user: { id, name, email, role }
        // "name" = username
        setForm((prev) => ({
          ...prev,
          username: data.user?.name || "",
          email: data.user?.email || "",
        }));
      } catch (err) {
        console.error("FETCH ME ERROR:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSaving(true);

    try {
      const payload = {
        username: form.username,
        email: form.email,
      };

      // password opsional → kalau kosong, jangan dikirim
      if (form.password.trim() !== "") {
        payload.password = form.password;
      }

      const res = await fetch("/api/user/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Gagal update profile");
        return;
      }

      setSuccess("Profil berhasil diperbarui");

      // reset password (biar field kosong lagi)
      setForm((prev) => ({ ...prev, password: "" }));
    } catch (err) {
      console.error("UPDATE PROFILE ERROR:", err);
      setError("Terjadi kesalahan pada server");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-gray-500 text-sm">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Your Profile</h1>
        <p className="text-gray-500 text-sm">
          Manage your account information
        </p>
      </div>

      {/* HEADER CARD */}
      <div className="bg-gray-50 rounded-2xl p-6 shadow flex gap-6 items-center">
        <div className="w-24 h-24 bg-gray-300 rounded-full" />

        <div className="flex flex-col">
          <h2 className="text-xl font-semibold text-gray-800">
            {form.username || "User"}
          </h2>
          <p className="text-gray-500 text-sm mt-2">
            Email: <span className="font-semibold">{form.email}</span>
          </p>
        </div>
      </div>

      {/* FORM EDIT */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow p-6 flex flex-col gap-4"
      >
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-2 rounded-lg">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-2 rounded-lg">
            {success}
          </div>
        )}

        <div>
          <label className="text-gray-700 font-semibold text-sm">
            Username
          </label>
          <input
            name="username"
            className="w-full mt-1 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
            value={form.username}
            onChange={handleChange}
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

        <button
          type="submit"
          disabled={saving}
          className="bg-teal-500 text-white w-full mt-4 py-3 rounded-xl font-medium hover:bg-teal-600 transition disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>

      {/* OPTIONAL: Danger Zone */}
      {/* Bisa lu sambungin ke API delete user kalau mau */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 mt-4">
        <h3 className="text-red-600 font-semibold mb-2">Danger Zone</h3>
        <p className="text-gray-600 text-sm mb-4">
          Deleting your account will remove all your saved books and reading
          history.
        </p>
        <button className="bg-red-600 text-white w-full py-3 rounded-xl">
          Delete Account
        </button>
      </div>
    </div>
  );
}
