"use client";
import Image from "next/image";
import { AskQuestion } from "@/components/form/askQuestion";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-100 to-white text-gray-800 font-poppins">

      {/* NAVBAR */}
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[90%] md:w-[80%] bg-white/70 backdrop-blur-xl border border-white/40 shadow-lg rounded-full z-50 flex items-center justify-between px-8 py-3">
        <div className="flex items-center gap-3">
          <Image src="/assets/logoTB.jpg" alt="logo" width={36} height={36} />
          <div className="flex flex-col leading-tight">
            <span className="text-gray-600 text-sm tracking-wide">Perpustakaan</span>
            <span className="text-sky-900 font-bold text-lg">CENDEKIA</span>
          </div>
        </div>

        <ul className="hidden md:flex gap-8 font-medium text-gray-700">
          <li><a href="#" className="hover:text-sky-700 transition">Beranda</a></li>
          <li><a href="#" className="hover:text-sky-700 transition">Tentang</a></li>
          <li><a href="#" className="hover:text-sky-700 transition">Pinjam Buku</a></li>
          <li><a href="#" className="hover:text-sky-700 transition">Pengembalian</a></li>
          <li><a href="#" className="hover:text-sky-700 transition">Riwayat</a></li>
        </ul>

        <div className="hidden md:flex gap-3">
          <a href="./register">
            <button className="px-5 py-2 rounded-full border border-sky-500 text-sky-500 hover:bg-sky-500 hover:text-white transition font-medium">
              Daftar
            </button>
          </a>

          <a href="./login">
            <button className="px-5 py-2 rounded-full bg-sky-500 text-white hover:bg-sky-600 transition font-medium">
              Masuk
            </button>
          </a>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="flex flex-col justify-center items-center text-center min-h-screen px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-sky-100/30 via-white to-white -z-10" />

        <h1 className="text-5xl md:text-6xl font-extrabold text-sky-800 mb-4 leading-tight">
          Temukan Pengetahuan di
        </h1>

        <h2 className="text-4xl md:text-5xl font-extrabold text-sky-600 mb-6">
          Perpustakaan CENDEKIA
        </h2>

        <p className="text-gray-700 text-lg md:text-xl max-w-2xl mb-10">
          Jelajahi berbagai koleksi buku, jurnal, dan literatur terbaik dari perpustakaan CENDEKIA.
        </p>

        <Link href="/register">
          <button className="px-10 py-3 rounded-full bg-sky-500 text-white text-lg font-semibold shadow-lg hover:shadow-xl hover:bg-sky-600 transition transform hover:-translate-y-1">
            Eksplorasi Sekarang
          </button>
        </Link>

        {/* Glow Effects */}
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-sky-200/40 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-sky-300/30 rounded-full blur-3xl" />
      </section>

      {/* ABOUT SECTION */}
      <section className="py-24 bg-gray-50 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-sky-800 mb-6">
            Tentang Perpustakaan CENDEKIA
          </h2>

          <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed">
            Perpustakaan CENDEKIA menyediakan berbagai koleksi buku, jurnal, dan
            bahan pembelajaran untuk mendukung kegiatan belajar siswa.
            Kami berkomitmen memberikan pengalaman membaca yang nyaman, modern, dan mudah diakses.
          </p>

          <div className="grid grid-cols-3 gap-8 mt-14 text-sky-700 font-bold">
            <div>
              <p className="text-3xl">2500+</p>
              <p className="text-sm text-gray-600">Koleksi Buku</p>
            </div>

            <div>
              <p className="text-3xl">500+</p>
              <p className="text-sm text-gray-600">Peminjaman / Bulan</p>
            </div>

            <div>
              <p className="text-3xl">200+</p>
              <p className="text-sm text-gray-600">Siswa Aktif</p>
            </div>
          </div>
        </div>
      </section>

    <footer className="bg-sky-900 text-white py-12 mt-20">
  <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 px-6">
    <div>
      <h3 className="text-xl font-bold mb-3">Perpustakaan STARBHAK</h3>
      <p className="text-gray-300">
        SMK Taruna Bhakti Depok  
      </p>
    </div>

    <div>
      <h3 className="text-lg font-semibold mb-3">Menu Cepat</h3>
      <ul className="space-y-2 text-gray-300">
        <li>Daftar Buku</li>
        <li>Peminjaman</li>
        <li>Pengembalian</li>
        <li>Riwayat</li>
      </ul>
    </div>

    <div>
      <h3 className="text-lg font-semibold mb-3">Kontak</h3>
      <p className="text-gray-300">Email: info@starbhak.sch.id</p>
      <p className="text-gray-300">Telp: (021) 1234 5678</p>
    </div>
  </div>
</footer>

    </main>
  );
}
