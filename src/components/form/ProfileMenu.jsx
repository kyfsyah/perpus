"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ProfileMenu() {
  const [role, setRole] = useState("");
  const [name, setName] = useState("User");
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const r = localStorage.getItem("role");
    const n = localStorage.getItem("name");

    setRole(r || "");
    setName(n || "User");
  }, []);

  // Close dropdown if click outside
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
    <div className="relative" ref={menuRef}>
      
      {/* BUTTON (Avatar + Name + Arrow) */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-3 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-full transition"
      >
        <Image
          src="/assets/Tb.jpg"
          alt="profile"
          width={36}
          height={36}
          className="rounded-full border"
        />

        <span className="text-sm font-medium text-gray-700">{name}</span>

        <span className="text-gray-500 text-sm">▾</span>
      </button>

      {/* DROPDOWN */}
      {open && (
        <div className="absolute right-0 mt-3 w-48 bg-white shadow-xl rounded-xl p-2 border">
          
          <button
            onClick={() => router.push("/users/homepage/profile")}
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
