// // 📄 src/app/not-found.tsx
'use client';

import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
  const { data: session } = useSession();

  const isUserLoggedIn = !!session?.user;

  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--background)] text-[var(--brand-light)] p-8">
      <div className="flex flex-col sm:flex-row items-center gap-6">
        <Image
          src="/logo.png"
          alt="Logo Uzero"
          width={100}
          height={100}
          className="object-contain"
        />

        <div className="h-16 w-px bg-[var(--brand-gold)] sm:h-24" />

        <div className="text-center sm:text-left max-w-sm">
          <h1 className="text-xl sm:text-2xl font-bold text-[var(--brand-accent)]">
            {isUserLoggedIn ? 'Sepertinya anda tersesat' : 'Halaman tidak ditemukan'}
          </h1>
          <h1 className="text-lg text-[var(--brand-accent)]">
            {isUserLoggedIn
              ? 'dalam belantara Uzero Companion.'
              : 'Silakan cek kembali tautan yang Anda buka.'}
          </h1>
          <Link
            href={isUserLoggedIn ? '/home' : '/'}
            className="inline-block mt-4 text-[var(--brand-gold)] hover:underline"
          >
            ← Kembali ke {isUserLoggedIn ? 'Beranda' : 'Halaman Login'}
          </Link>
        </div>
      </div>
    </main>
  );
}
