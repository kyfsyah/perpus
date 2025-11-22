"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ProfileSidebar() {
  const [role, setRole] = useState("");
  const [name, setName] = useState("User Name");
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const menuRef = useRef(null);

  useEffect(() => {
    const r = localStorage.getItem("role");
    const n = localStorage.getItem("name");

    setRole(r);
    if (n) setName(n);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const logout = () => {
    localStorage.clear();
    router.push("/");
  };

  return (
    <div className="relative select-none" ref={menuRef}>
      {/* PROFILE BAR */}
      <div
        className="flex items-center gap-3 p-2 bg-gray-100 rounded-xl cursor-pointer hover:bg-gray-200 transition"
        onClick={() => setOpen(!open)}
      >
        {/* FOTO PROFIL */}
        <Image
          src="/profile.jpg"  // ganti sesuai path foto user
          alt="profile"
          width={40}
          height={40}
          className="rounded-full"
        />

        {/* NAMA USER */}
        <div className="flex flex-col">
          <span className="font-medium text-sm">{name}</span>
          <span className="text-xs text-gray-500">{role}</span>
        </div>
      </div>

      {/* DROPDOWN MENU */}
      {open && (
        <div className="absolute bottom-14 left-0 w-48 bg-white shadow-xl rounded-xl p-2">
          <button
            onClick={() => router.push("/profile")}
            className="w-full text-left p-2 hover:bg-gray-100 rounded-lg"
          >
            Profile
          </button>

          <button
            onClick={() => router.push("/settings")}
            className="w-full text-left p-2 hover:bg-gray-100 rounded-lg"
          >
            Settings
          </button>

          {role === "admin" && (
            <button
              onClick={() => router.push("/admin/dashboard")}
              className="w-full text-left p-2 hover:bg-gray-100 rounded-lg text-blue-600 font-medium"
            >
              Admin Dashboard
            </button>
          )}

          <button
            onClick={logout}
            className="w-full text-left p-2 hover:bg-gray-100 rounded-lg text-red-500"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
