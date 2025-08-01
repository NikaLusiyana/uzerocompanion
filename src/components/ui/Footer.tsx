// 📄 src/components/ui/Footer.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();

  return (
    <footer className="sticky bottom-0 bg-[var(--background)] text-[var(--brand-accent)] py-4 mt-12 border-t border-[var(--brand-dark)]">
      <div className="mx-auto px-12 flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
        
        {/* Hak cipta dinamis */}
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Nika Lusiyana. All rights reserved.
        </p>

        {/* Navigasi */}
        <div className="flex gap-4 text-sm font-medium">
          <Link
            href="/home/about"
            className={`transition hover:text-[var(--brand-gold)] ${
              pathname === '/home/about' ? 'text-[var(--brand-gold)] font-bold' : ''
            }`}
          >
            About
          </Link>
          <Link
            href="/home/contact"
            className={`transition hover:text-[var(--brand-gold)] ${
              pathname === '/home/contact' ? 'text-[var(--brand-gold)] font-bold' : ''
            }`}
          >
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
