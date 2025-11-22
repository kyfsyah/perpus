import Link from "next/link";
import Image from "next/image";
import { Search } from "lucide-react";

export default function FavoritePage() {
  return (
    <div className="space-y-6">
    <div className="bg-white p-4 rounded-2xl shadow flex items-center gap-3 border">
        <Search size={24} className="text-gray-500" />
        <input
          type="text"
          placeholder="Search your favourite books"
          className="flex-1 outline-none text-gray-600"
        />
      </div>

    <div className="bg-white p-5 shadow rounded-2xl border border-2xl">
      <div className="flex gap-[20px] flex-wrap content-stretch items-stretch">
      </div>
    </div>
    </div>
  );
}
