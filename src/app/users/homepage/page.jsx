// layout.jsx
import Link from "next/link";
import Image from "next/image";
import { Search } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex gap-6">
      {/* LEFT CONTENT */}
      <div className="flex-1">
        {/* SEARCH */}
        <div className="bg-white p-4 rounded-2xl shadow flex items-center gap-3 mb-6 border">
          <Search size={24} className="text-gray-500" />
          <input type="text" placeholder="Cari buku favoritmu" className="flex-1 outline-none text-gray-600"/>
        </div>

        {/* RECOMMENDED */}
        <div className="bg-white p-5 shadow rounded-2xl border">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Recommended</h2>
            <button className="text-gray-500 text-sm hover:underline">Lainnya →</button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
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

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white w-full p-4 shadow rounded-xl border">
                <div className="w-full h-40 bg-gray-200 rounded-xl mb-3"></div>
                <h3 className="font-medium">Book Title {i}</h3>
                <p className="text-sm text-gray-500">Author Name</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-4">
            {[1, 2, 3, 4].map((i) => (
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

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white p-4 shadow rounded-xl border">
                <div className="w-full h-40 bg-gray-200 rounded-xl mb-3"></div>
                <h3 className="font-medium">Category Book {i}</h3>
                <p className="text-sm text-gray-500">Author</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT BOOK DETAIL PANEL */}
      <div className="w-80 bg-[#0A1A44] text-white p-6 rounded-2xl shadow-xl h-max sticky top-8">
        <div className="w-full h-48 bg-white rounded-xl mb-4"></div>
        <h2 className="text-lg font-semibold mb-1">Company of One</h2>
        <p className="text-sm text-gray-300 mb-4">Paul Jarvis</p>

        <div className="flex items-center gap-2 text-yellow-400 text-sm mb-4">⭐⭐⭐⭐⭐ 4.8</div>

        <div className="flex gap-6 text-sm mb-6">
          <div>
            <p className="font-bold text-lg">320</p>
            <p className="text-gray-300 text-xs">Pages</p>
          </div>
          <div>
            <p className="font-bold text-lg">643</p>
            <p className="text-gray-300 text-xs">Ratings</p>
          </div>
          <div>
            <p className="font-bold text-lg">110</p>
            <p className="text-gray-300 text-xs">Reviews</p>
          </div>
        </div>

        <p className="text-gray-200 text-sm mb-6">
          Company of One offers a refreshingly original strategy focused on
          staying small and avoiding unnecessary stress...
        </p>

        <button className="w-full bg-blue-500 hover:bg-blue-600 p-3 rounded-xl text-white font-medium flex items-center justify-center gap-2">
          Read Now 📖
        </button>
      </div>
    </div>
  );}
