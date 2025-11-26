"use client";

import { useEffect, useState } from "react";

export default function FavoritePage() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    async function fetchFav() {
      const res = await fetch("/api/favorite");
      const data = await res.json();
      setBooks(data);
    }
    fetchFav();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Favorite Books</h1>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
        {books.map((book) => (
          <div key={book.id_buku} className="bg-white p-4 rounded-xl shadow border">

            <div className="w-full h-40 bg-gray-200 rounded-xl mb-3 overflow-hidden">
              <img
                src={`/image/cover/${book.cover_buku}`}
                alt={book.judul_buku}
                className="w-full h-full object-cover"
              />
            </div>

            <h3 className="font-medium">{book.judul_buku}</h3>
            <p className="text-sm text-gray-500">{book.penulis_buku}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
