import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Search } from "lucide-react";

export default function CategorySection() {
  const categories = [
    "Fiction",
    "Non-Fiction",
    "Science Fiction",
    "Biography",
    "Mystery",
    "Romance",
    "Fantasy",
    "History",
  ];

  return (
    <div className="space-y-6">
      {/* ===== SEARCH BAR ===== */}
      <div className="bg-white p-4 rounded-2xl shadow flex items-center gap-3 border">
        <Search size={24} className="text-gray-500" />
        <input
          type="text"
          placeholder="Search your favourite books"
          className="flex-1 outline-none text-gray-600"
        />
      </div>

      {/* ===== CATEGORY SECTION ===== */}
      <div className="bg-white p-5 shadow rounded-2xl border">
        <div className="flex gap-[20px] flex-wrap content-stretch items-stretch">
          {categories.map((category) => (
            <Card
              key={category}
              className="w-[200px] hover:shadow-lg transition-shadow"
            >
              <CardContent className="flex flex-col items-center p-4">
                <div className="w-full h-32 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-4xl text-gray-400">📚</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{category}</h3>
                <Link
                  href={`/users/category/${category.toLowerCase()}`}
                  className="text-blue-600 hover:underline"
                >
                  Explore
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
