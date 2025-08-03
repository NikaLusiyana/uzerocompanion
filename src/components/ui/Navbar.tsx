// 📄 src/components/ui/Navbar.tsx
'use client'

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { Menu, X, LogOut, User } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const { data: session } = useSession();

  const navItems = [
    { name: 'Home', href: '/home' },
    { name: 'Books', href: '/home/books' },
    { name: 'Worldbuilding', href: '/home/worldbuilding' },
    { name: 'Glossary', href: '/home/glossary' },
    { name: 'Characters', href: '/home/characters' },
    { name: 'Locations', href: '/home/locations' },
  ];

  const isActive = (href: string) => {
    if (href === '/home') return pathname === '/home';
    return pathname.startsWith(href);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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

          {/* Profile Dropdown */}
          {session?.user && (
            <div className="items-center relative ml-5" ref={profileRef}>
              <button
                onClick={() => setProfileOpen((prev) => !prev)}
                className="rounded-4xl cursor-pointer flex items-center gap-2 text-sm text-[var(--brand-gold)] focus:outline-none"
              >
                {session.user.image ? (
                  <Image
                    src={session.user.image}
                    alt="Profile"
                    width={20}
                    height={20}
                    className="rounded-full object-cover"
                  />
                ) : (
                  <User className="w-5 h-5 text-[var(--brand-gold)]" />
                )}
                <span>{session.user.name?.split(' ')[0]}</span>
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-[var(--brand-dark)] border border-[var(--brand-darker)] rounded-md z-50">
                  <Link
                    href="/home/profile"
                    className="block px-4 py-2 text-sm text-[var(--brand-accent)] hover:bg-white hover:text-[var(--background)]"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    Keluar
                  </button>
                </div>
              )}
            </div>
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

          {/* Mobile profile dropdown */}
          {session?.user && (
            <div className="mt-4 border-t border-[var(--brand-darker)] pt-2">
              <div className="flex items-center gap-2 my-2 text-[var(--brand-gold)]">
                {session.user.image ? (
                  <Image
                    src={session.user.image}
                    alt="Profile"
                    width={28}
                    height={28}
                    className="rounded-full object-cover"
                  />
                ) : (
                  <User className="w-6 h-6" />
                )}
                <span className="font-medium">
                  {session.user.name?.split(' ')[0]}
                </span>
              </div>
              <Link
                href="/profile"
                onClick={() => setIsOpen(false)}
                className="block py-2 text-sm text-[var(--brand-accent)] hover:underline"
              >
                Profil
              </Link>
              <button
                onClick={() => {
                  setIsOpen(false);
                  signOut({ callbackUrl: '/' });
                }}
                className="block w-full text-left py-2 text-sm text-red-600 hover:underline"
              >
                Keluar
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
