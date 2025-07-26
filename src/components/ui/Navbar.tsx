// 📄 src/components/Navbar.tsx → Komponen navigasi utama di bagian atas halaman

'use client' // Client Component karena menggunakan hook React

import { useState } from 'react' // Untuk toggle menu mobile
import Image from 'next/image' // Untuk menampilkan logo
import Link from 'next/link' // Navigasi antar halaman
import { usePathname } from 'next/navigation' // Mendapatkan path aktif saat ini
import { Menu, X } from 'lucide-react' // Ikon menu (hamburger dan close)

export default function Navbar() {
  const pathname = usePathname() // Path URL aktif
  const [isOpen, setIsOpen] = useState(false) // Status menu mobile

  // Daftar menu navigasi
  const navItems = [
    { name: 'Home', href: '/home' },
    { name: 'Books', href: '/home/books' },
    { name: 'Chapters', href: '/home/chapters' },
    { name: 'Worldbuilding', href: '/home/worldbuilding' },
    { name: 'Glossary', href: '/home/glossary' },
    { name: 'Characters', href: '/home/characters' },
    { name: 'Locations', href: '/home/locations' },
  ]

  // Penanda menu aktif
  const isActive = (href: string) => {
    if (href === '/home') return pathname === '/home'
    return pathname.startsWith(href)
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-[var(--brand-dark)] bg-[var(--background)] text-[var(--brand-accent)] backdrop-blur-md bg-opacity-90">
      <div className="mx-auto px-12 py-4 flex items-center justify-between">
        {/* Logo dan judul */}
        <Link href="/home" className="flex items-center space-x-2">
          <Image src="/logo.png" alt="Uzero Logo" width={20} height={20} />
          <span className="text-lg font-semibold tracking-wide font-cinzel">UZERO COMPANION</span>
        </Link>

        {/* Tombol hamburger untuk mobile */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-[var(--brand-accent)]"
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Navigasi horizontal untuk desktop */}
        <div className="hidden md:flex items-center space-x-4 text-sm font-semibold">
          {navItems.map(({ name, href }) => (
            <Link
              key={href}
              href={href}
              className={`transition-colors hover:text-[var(--brand-gold)] ${
                isActive(href) ? 'text-base text-[var(--brand-gold)]' : ''
              }`}
            >
              {name}
            </Link>
          ))}
        </div>
      </div>

    {/* Navigasi mobile (dropdown) */}
    {isOpen && (
    <div className="md:hidden absolute top-full left-0 right-0 bg-[var(--background)] z-50 px-12 pb-4 flex flex-col gap-2 text-sm font-semibold border-t border-[var(--brand-darker)]">
        {navItems.map(({ name, href }) => (
        <Link
            key={href}
            href={href}
            onClick={() => setIsOpen(false)}
            className={`block py-2 transition-colors hover:text-[var(--brand-gold)] ${
            isActive(href) ? 'text-[var(--brand-gold)]' : ''
            }`}
        >
            {name}
        </Link>
        ))}
    </div>
    )}
    </nav>
  )
}
