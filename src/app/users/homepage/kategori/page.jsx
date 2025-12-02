"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";

export default function CategorySection() {
  const [kategori, setKategori] = useState([]);

  useEffect(() => {
    async function fetchKategori() {
      try {
        const res = await fetch("/api/kategori");
        if (!res.ok) throw new Error("Gagal fetch kategori");

        const json = await res.json();
        // API return: { success: true, data: [...] }
        setKategori(json.data || []);
      } catch (err) {
        console.error("FETCH CATEGORY ERROR:", err);
      }
    }

    fetchKategori();
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-white p-5 shadow rounded-2xl border">
        <div className="flex gap-[20px] flex-wrap items-stretch">
          {kategori.map((cat) => (
            <Link
              key={cat.id_kategori}
              href={`/users/homepage/kategori/${cat.id_kategori}`}
              className="w-[200px]"
            >
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="flex flex-col items-center p-4">

                  <h3 className="text-lg font-semibold mb-2 text-center">
                    {cat.nama}
                  </h3>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
