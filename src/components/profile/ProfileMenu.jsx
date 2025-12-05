"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";

export default function ProfileMenu() {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const menuRef = useRef(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("/api/auth/me");
        if (!res.ok) {
          setUser(null);
          return;
        }

        const data = await res.json();
        if (data?.user) {
          setUser(data.user);

          const nm = data.user.username || "User";
          localStorage.setItem("username", nm);
          localStorage.setItem("role", data.user.role || "");
        }
      } catch (err) {
        console.error("FETCH ME ERROR:", err);
      }
    }

    fetchUser();
  }, []);

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handleLogout() {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch (err) {
      console.error("LOGOUT ERROR:", err);
    }
    localStorage.clear();
    router.push("/");
  }

  const displayName = user?.username || "User";
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-3 px-3 py-1.5 bg-white border border-gray-200 shadow-sm hover:bg-gray-50 transition"
      >
        <div className="w-9 h-9 rounded-full bg-sky-500 text-white flex items-center justify-center text-sm font-semibold">
          {initial}
        </div>

        <div className="hidden sm:flex flex-col items-start">
          <span className="text-sm font-medium text-gray-800">
            {displayName}
          </span>
          {user?.role && (
            <span className="text-xs text-gray-500 capitalize">
              
            </span>
          )}
        </div>

        <ChevronDown size={18} className="text-gray-500" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-52 bg-white border border-gray-200 rounded-xl shadow-lg py-1 z-30">
          <div className="px-4 py-2 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-800">{displayName}</p>
            {user?.email && (
              <p className="text-xs text-gray-500 truncate">{user.email}</p>
            )}
          </div>

          <button
            type="button"
            onClick={() => {
              setOpen(false);
              router.push("/users/homepage/profile");
            }}
            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
          >
            Profile
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
