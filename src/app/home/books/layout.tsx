// 📄 app/home/books/layout.tsx → Layout khusus untuk halaman-halaman buku

import React from 'react' // React core
import { Metadata } from 'next' // Tipe untuk metadata

// Metadata khusus untuk halaman buku
export const metadata: Metadata = {
  title: 'Buku | Uzero Companion', // Judul spesifik untuk halaman buku
  description: 'Kelola koleksi buku dalam seri Uzero', // Deskripsi spesifik
}

/**
 * Layout khusus untuk semua halaman dibawah /home/books
 * - Membungkus semua halaman buku dengan container yang konsisten
 * - Memastikan styling dan struktur yang seragam
 * - Menerapkan padding dan spacing yang sesuai
 */
export default function BooksLayout({ children }: { children: React.ReactNode }) {
  return (
    /**
     * Container utama untuk halaman buku
     * - Lebar maksimum 7xl untuk tampilan yang optimal
     * - Padding vertikal untuk spacing
     * - Margin horizontal otomatis untuk posisi tengah
     */
    <div className="w-full max-w-7xl mx-auto py-12 items-center">
      {/**
       * Inner container dengan:
       * - Padding besar di semua sisi
       * - Spacing vertikal antar elemen
       * - Border radius untuk estetika
       * - Background color sesuai tema
       */}
      <div className="p-12 space-y-6 rounded-2xl mx-auto bg-[var(--background)]">
        {children} {/* Konten spesifik tiap halaman buku */}
      </div>
    </div>
  )
}