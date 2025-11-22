"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function TopBarAdmin() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const u = localStorage.getItem("user");
    if (u) setUser(JSON.parse(u));
  }, []);

  return (
    <div className="w-full bg-white p-4 flex justify-between items-center shadow">
      <h1 className="text-xl font-semibold">Dashboard</h1>

      {user && (
        <div className="flex items-center gap-3">
          <Image
            src="/avatar.png"
            width={42}
            height={42}
            alt="profile"
            className="rounded-full border"
          />
          <span>{user.name}</span>
        </div>
      )}
    </div>
  );
}
