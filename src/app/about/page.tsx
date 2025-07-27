// 📄 app/about/page.tsx → Tentang Uzero

import React from 'react';
import Link from 'next/link';
import Navbar from '@/src/components/ui/Navbar';
import Footer from '@/src/components/ui/Footer';
import PageHeader from '@/src/components/ui/PageHeader';
import ActionButton from '@/src/components/ui/ActionButton';
import { Book } from 'lucide-react';


// Komponen default halaman
export default function Page() {
  return (
    <>
      <Navbar />
      <main className="flex-1 flex items-center sm:px-6 md:px-8">
        <div className="w-full max-w-7xl mx-auto py-12 items-center">
          <div className="p-12 space-y-6 rounded-2xl mx-auto bg-[var(--background)]">
            <PageHeader
              title="Tentang Uzero Companion"
              subtitle="Bagaimana aplikasi ini membersamaimu pada perjalanan panjang bersama para Uzero"
              
            />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
