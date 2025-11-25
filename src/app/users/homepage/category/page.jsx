import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Search } from "lucide-react";

export default function CategorySection() {
  const categories = [
    "Fiksi",
    "Non-Fiksi",
    "Sains",
    "Sejarah",
    "Agama",
    "Psikologi",
    "Bisnis & Ekonomi",
    "Teknologi",
  ];

  return (
    <div className="space-y-6">

      {/* ===== CATEGORY SECTION ===== */}
      <div className="bg-white p-5 shadow rounded-2xl border">
        <div className="flex gap-[20px] flex-wrap content-stretch items-stretch">

          {categories.map((category) => (
            <Link
              key={category}
              href={`/users/category/${category.toLowerCase()}`}
              className="w-[200px]"
            >
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="flex flex-col items-center p-4">
                  <div className="w-full h-32 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                    <span className="text-4xl text-gray-400">📚</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-center">
                    {category}
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
