// layout.jsx
import Link from "next/link";
import Image from "next/image";
import { Search } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex gap-6">
      {/* LEFT CONTENT */}
      <div className="flex-1">

        {/* RECOMMENDED */}
        <div className="bg-white p-5 shadow rounded-2xl border">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Recommended</h2>
            <button className="text-gray-500 text-sm hover:underline">Lainnya →</button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="bg-white w-full p-4 shadow rounded-xl border">
                <div className="w-full h-40 bg-gray-200 rounded-xl mb-3"></div>
                <h3 className="font-medium">Book Title {i}</h3>
                <p className="text-sm text-gray-500">Author Name</p>
              </div>
            ))}
          </div>
        </div>

        {/* BOOK */}
        <div className="bg-white p-5 shadow rounded-2xl border mt-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Buku</h2>
            <button className="text-gray-500 text-sm hover:underline">Lainnya →</button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="bg-white w-full p-4 shadow rounded-xl border">
                <div className="w-full h-40 bg-gray-200 rounded-xl mb-3"></div>
                <h3 className="font-medium">Book Title {i}</h3>
                <p className="text-sm text-gray-500">Author Name</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mt-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="bg-white w-full p-4 shadow rounded-xl border">
                <div className="w-full h-40 bg-gray-200 rounded-xl mb-3"></div>
                <h3 className="font-medium">Book Title {i}</h3>
                <p className="text-sm text-gray-500">Author Name</p>
              </div>
            ))}
          </div>
        </div>

        {/* CATEGORIES */}
        <div className="mt-8 bg-white p-5 shadow rounded-2xl border">
          <h2 className="text-xl font-semibold mb-4">Categories</h2>

          <div className="flex gap-3 overflow-x-auto pb-2">
            {["All", "Sci-Fi", "Fantasy", "Drama", "Business", "Education", "Geography"].map((c) => (
              <button
                key={c}
                className="px-5 py-2 bg-gray-100 rounded-full text-sm hover:bg-blue-600 hover:text-white transition"
              >
                {c}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mt-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="bg-white p-4 shadow rounded-xl border">
                <div className="w-full h-40 bg-gray-200 rounded-xl mb-3"></div>
                <h3 className="font-medium">Category Book {i}</h3>
                <p className="text-sm text-gray-500">Author</p>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );}
