import Navbar from "@/components/landing/Navbar";
import Kami from "@/components/landing/Kami";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-100 to-white text-gray-800 font-poppins">
      <Navbar />

      <section className="flex flex-col justify-center items-center text-center min-h-screen px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-sky-100/30 via-white to-white -z-10" />

        <h1 className="text-5xl md:text-6xl font-extrabold text-sky-800 mb-4 leading-tight">
          Temukan Pengetahuan di
        </h1>

        <h2 className="text-4xl md:text-5xl font-extrabold text-sky-600 mb-6">
          Perpustakaan CENDEKIA
        </h2>

        <p className="text-gray-700 text-lg md:text-xl max-w-2xl mb-10">
          Jelajahi berbagai koleksi buku terbaik.
        </p>

        <Link href="/register">
          <button className="px-10 py-3 rounded-full bg-sky-500 text-white text-lg font-semibold shadow-lg hover:shadow-xl hover:bg-sky-600 transition transform hover:-translate-y-1">
            Eksplorasi Sekarang
          </button>
        </Link>
      </section>

      <section className="py-24 bg-gray-50 px-6">
        <div className="max-w-6xl px-6 mx-auto">
          <Kami />
        </div>
      </section>
    </main>
  );
}
