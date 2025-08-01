// 📄 src/components/ui/Navbar.tsx
'use client'

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { Menu, X, LogOut } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const { data: session } = useSession()

  const navItems = [
    { name: 'Home', href: '/home' },
    { name: 'Books', href: '/home/books' },
    { name: 'Worldbuilding', href: '/home/worldbuilding' },
    { name: 'Glossary', href: '/home/glossary' },
    { name: 'Characters', href: '/home/characters' },
    { name: 'Locations', href: '/home/locations' },
  ]

  const isActive = (href: string) => {
    if (href === '/home') return pathname === '/home'
    return pathname.startsWith(href)
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-[var(--brand-dark)] bg-[var(--background)] text-[var(--brand-accent)] backdrop-blur-md bg-opacity-90">
      <div className="mx-auto px-12 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/home" className="flex items-center space-x-2">
          <Image src="/logo.png" alt="Uzero Logo" width={20} height={20} />
          <span className="text-lg font-semibold tracking-wide font-cinzel">UZERO COMPANION</span>
        </Link>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-[var(--brand-accent)]"
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop nav */}
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

          {/* Logout Button */}
          {session?.user && (
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="ml-4 inline-flex items-center gap-2 text-sm text-[var(--brand-gold)] hover:underline"
            >
              <LogOut className="w-4 h-4" strokeWidth={3.0} />
              Keluar
            </button>
          )}
        </div>
      </div>

      {/* Mobile Dropdown Nav */}
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

          {/* Logout Mobile */}
          {session?.user && (
            <button
              onClick={() => {
                setIsOpen(false)
                signOut({ callbackUrl: '/' })
              }}
              className="text-left py-2 text-[var(--brand-gold)] hover:underline"
            >
              <LogOut className="w-4 h-4" strokeWidth={2.5} />
            </button>
          )}
        </div>
      )}
    </nav>
  )
}
