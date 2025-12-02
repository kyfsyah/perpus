"use client";

import { useEffect, useState } from "react";

export default function KelolaUserPage() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null); // <── role user login

  // LOAD USER LOGIN
  useEffect(() => {
    async function loadCurrent() {
      const res = await fetch("/api/auth/me");
      const json = await res.json();
      setCurrentUser(json.user); // { id, email, role }
    }
    loadCurrent();
  }, []);

  // LOAD SEMUA USER
  useEffect(() => {
    async function load() {
      const res = await fetch("/api/users");
      const json = await res.json();
      if (json.success) setUsers(json.data);
    }
    load();
  }, []);

  // DELETE USER
  async function deleteUser(id_users) {
    if (!confirm("Yakin ingin menghapus user ini?")) return;

    await fetch("/api/users/admin/delete", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_users }),
    });

    location.reload();
  }

  const roleBadge = (role) => {
    switch (role) {
      case "admin":
        return "bg-purple-100 text-purple-700";
      case "petugas":
        return "bg-blue-100 text-blue-700";
      case "siswa":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-semibold">Kelola User</h1>

      <div className="bg-white shadow rounded-xl border">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="p-4">ID</th>
              <th className="p-4">Nama</th>
              <th className="p-4">Email</th>
              <th className="p-4">Role</th>
              <th className="p-4">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u.id_users} className="border-b hover:bg-gray-50">
                <td className="p-4">{u.id_users}</td>
                <td className="p-4">{u.username}</td>
                <td className="p-4">{u.email}</td>

                {/* ROLE BADGE */}
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${roleBadge(
                      u.role
                    )}`}
                  >
                    {u.role}
                  </span>
                </td>

                {/* ACTION BUTTONS */}
                <td className="p-4">
                  {!currentUser ? (
                    <span className="text-gray-400 text-sm italic">
                      Memuat...
                    </span>
                  ) : currentUser.role !== "admin" ? (
                    <span className="text-gray-400 text-sm italic">
                      (Tidak ada aksi)
                    </span>
                  ) : u.role === "admin" ? (
                    <span className="text-gray-400 text-sm italic">
                      (Tidak bisa hapus admin)
                    </span>
                  ) : (
                    <button
                      onClick={() => deleteUser(u.id_users)}
                      className="px-3 py-1 bg-red-600 text-white rounded-md text-sm hover:bg-red-700"
                    >
                      Hapus
                    </button>
                  )}
                </td>
              </tr>
            ))}

            {users.length === 0 && (
              <tr>
                <td colSpan="5" className="p-6 text-center text-gray-500">
                  Tidak ada user.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}
