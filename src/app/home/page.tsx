// 📄 app/home/page.tsx → Halaman utama aplikasi Uzero Companion untuk user

'use client' // Client Component karena menggunakan event dan interaksi

import Link from 'next/link'; // Untuk navigasi antar halaman
import { Book, ScrollText, Globe2, LibraryBig, User, MapPin } from 'lucide-react'; // Ikon dekoratif dari lucide-react
import ActionButton from '@/components/ui/ActionButton'; // Komponen tombol aksi reusable
import Image from 'next/image'; // Untuk menampilkan logo statis dengan optimasi bawaan Next.js

// Komponen halaman Home ("/home")
export default function Page() {
  return (
    <div className="w-full max-w-8xl mx-auto py-12 items-center"> {/* Container utama */}
      <div className="flex flex-col items-center text-center space-y-4 w-full px-4">
        {/* Logo Aplikasi */}
        <div className="flex justify-center">
          <Image 
            src="/logo.png" 
            alt="Uzero Logo" 
            width={128} 
            height={128}
            className="w-32 h-32 mx-auto mb-3" 
          />
        </div>

        {/* Judul Aplikasi */}
        <h1 className="text-4xl md:text-6xl font-bold mb-6" style={{ fontFamily: 'var(--font-cinzel)' }}>
        Welcome to Uzero Companion
        </h1>


        {/* Kutipan naratif sebagai pengantar dunia fiksi */}
        <p className="text-sm text-[var(--brand-gold)] leading-relaxed font-serif italic space-y-1">
          <span>Di dunia yang pernah diberkati lalu dikutuk,</span><br />
          <span>warisan tidak hanya berupa darah, tapi juga dosa.</span><br />
          <span>
            Kisah ini tertulis bukan dalam tinta, melainkan dalam tekad dan kehilangan.
          </span><br /><br />
          <span>
            Selamat datang di Uzero. <br />
            Di sinilah warisan terakhir dibisikkan dari reruntuhan,
          </span><br />
          <span>dan dosa pertama menolak dilupakan.</span>
        </p>

        {/* Tombol navigasi menuju fitur utama */}
        <div className="mt-8 flex flex-wrap justify-center gap-4 px-4">
            <Link href="/home/books/create">
              <ActionButton icon={<Book size={16} />}>Tambah Buku Baru</ActionButton>
            </Link>

            <Link href="/home/chapters/create">
              <ActionButton icon={<ScrollText size={16} />}>Tambah Chapter Baru</ActionButton>
            </Link>

            <Link href="/home/worldbuilding/create">
              <ActionButton icon={<Globe2 size={16} />}>Tambah Worldbuilding</ActionButton>
            </Link>

            <Link href="/home/glossary/create">
              <ActionButton icon={<LibraryBig size={16} />}>Tambah Istilah Baru</ActionButton>
            </Link>

            <Link href="/home/characters/create">
              <ActionButton icon={<User size={16} />}>Tambah Karakter Baru</ActionButton>
            </Link>

            <Link href="/home/locations/create">
              <ActionButton icon={<MapPin size={16} />}>Tambah Lokasi Baru</ActionButton>
            </Link>
          </div>
        </div>
    </div>
  );
}
