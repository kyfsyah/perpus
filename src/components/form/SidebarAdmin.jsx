"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SidebarAdmin() {
  const path = usePathname();

  const menu = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Users", path: "/dashboard/users" },
    { name: "Books", path: "/dashboard/books" },
  ];

  return (
    <aside className="w-60 bg-white text-white min-h-screen p-4">
      <h2 className="text-xl text-black font-bold mb-5">Admin Panel</h2>

      <ul className="space-y-2">
        {menu.map((m) => (
          <li key={m.path}>
            <Link
              href={m.path}
              className={`block px-4 py-2 rounded ${
                path === m.path ? "bg-blue-600 text-black" : "hover:bg-gray-700"
              }`}
            >
              {m.name}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
