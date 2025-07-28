// 📄 app/about/page.tsx → Tentang Uzero

import React from 'react';
import Link from 'next/link';
import PageHeader from '@/src/components/ui/PageHeader';
import ActionButton from '@/src/components/ui/ActionButton';
import { Book } from 'lucide-react';

export default function Page() {
  return (
    <>
      <main className="flex-1 flex items-center sm:px-6 md:px-8 text-[var(--brand-accent)]">
        <div className="w-full max-w-5xl mx-auto py-12 items-center">
          <div className="p-12 space-y-6 rounded-2xl mx-auto bg-[var(--background)]">
            <PageHeader
              title="Tentang Uzero Companion"
              subtitle="Bagaimana aplikasi ini membersamaimu pada perjalanan panjang bersama para Uzero"
            />

            <p className="text-base text-muted-foreground leading-relaxed">
              <strong>Uzero Companion</strong> adalah aplikasi pendamping untuk para penulis cerita fiksi yang kompleks — terutama dunia fiksi dengan banyak elemen, latar, dan karakter seperti dalam dunia Uzero. Aplikasi ini membantumu merancang, menyusun, dan merawat kontinuitas cerita melalui sistem modular yang saling terhubung.
            </p>

            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-foreground font-cinzel">Navigasi Utama Fitur:</h2>

              <ul className="list-disc pl-6 text-sm text-muted-foreground space-y-2">
                <li>
                  <strong>Buku</strong> → Menyimpan daftar buku fiksi yang kamu buat. Setiap buku dapat memiliki metadata, genre, sinopsis, dan status pengembangan.
                </li>
                <li>
                  <strong>Chapter</strong> → Menyusun dan mengelola bab-bab dalam setiap buku. Bab bisa dikaitkan dengan tokoh, lokasi, atau entitas worldbuilding.
                </li>
                <li>
                  <strong>Worldbuilding</strong> → Dibagi ke dalam 6 bidang utama untuk memetakan dunia fiksimu secara mendalam:
                  <ul className="list-disc pl-6">
                    <li><strong>Sosial & Budaya</strong> → Sistem kasta, tradisi, bahasa, hingga struktur masyarakat.</li>
                    <li><strong>Magis & Supranatural</strong> → Mantra, artefak, entitas gaib, sistem kekuatan, dan hukum alam non-fisik.</li>
                    <li><strong>Geografi & Lingkungan</strong> → Peta dunia, benua, daerah, iklim, dan fenomena alam.</li>
                    <li><strong>Sejarah & Kronologi</strong> → Peristiwa penting dalam timeline, dinasti, perang, dan revolusi dunia fiksi.</li>
                    <li><strong>Politik & Hukum</strong> → Sistem pemerintahan, fraksi, hukum adat, dan konflik kekuasaan.</li>
                    <li><strong>Teknologi & Peradaban</strong> → Tingkat teknologi, penemuan besar, dan perkembangan peradaban.</li>
                  </ul>
                </li>
                <li>
                  <strong>Glosarium</strong> → Kumpulan istilah penting yang digunakan dalam cerita. Setiap entri bisa mencakup definisi, asal kata, dan referensi silang ke fitur lainnya.
                </li>
                <li>
                  <strong>Tokoh</strong> → Halaman karakter yang menampung informasi mendalam seperti latar belakang, peran dalam cerita, kemampuan, hubungan, dan kutipan.
                </li>
                <li>
                  <strong>Lokasi</strong> → Menyimpan data tentang tempat dan landmark dalam duniamu. Lokasi bisa memiliki hubungan dengan sejarah, tokoh, atau bab tertentu.
                </li>
              </ul>
            </div>

            <div className="pt-8">
              <ActionButton>
                <Link href="/books" className="flex items-center gap-2">
                  <Book className="w-4 h-4" />
                  Mulai Menulis Dunia Fiksimu
                </Link>
              </ActionButton>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
