// 📄 app/layout.tsx → Root layout utama aplikasi (membungkus seluruh halaman)

import type { Metadata } from "next"; // Tipe untuk metadata halaman (SEO, title, dsb)
import { Cinzel, Inter } from "next/font/google"; // Font utama aplikasi (Cinzel = serif, Inter = sans-serif)
import "./globals.css"; // File CSS global (Tailwind + variabel tema)
import Navbar from "@/components/ui/Navbar"; // Komponen navigasi atas
import Footer from "@/components/ui/Footer"; // Komponen footer bawah

// Inisialisasi font serif untuk judul atau elemen dekoratif
const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  weight: ['400', '700'],
  display: "swap",
})

// Inisialisasi font sans-serif untuk konten utama
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

// Metadata untuk SEO dan PWA
export const metadata: Metadata = {
  title: {
    default: 'Uzero Companion',
    template: '%s | Uzero Companion' // Template untuk title halaman child
  },
  description: 'Companion app for the Uzero fantasy series - Manage books, chapters, worldbuilding, and glossary',
  icons: {
    icon: '/logo.png',
  },
  metadataBase: new URL(process.env.NEXTAUTH_URL || 'http://localhost:3000'), // Base URL untuk metadata
}

// Komponen layout root — membungkus semua halaman di dalam <body>
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cinzel.variable} ${inter.variable}`} suppressHydrationWarning>
      {/* 
        - suppressHydrationWarning untuk menghindari warning karena mismatch antara SSR dan hydration
        - Font variable akan aktif di seluruh aplikasi 
      */}
      <body className="flex flex-col min-h-screen antialiased font-sans bg-[var(--brand-darker)] text-[var(--foreground)] selection:bg-brand/50">
        {children} {/* Konten utama halaman */}
      </body>
    </html>
  )
}
