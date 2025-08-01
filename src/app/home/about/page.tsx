// 📄 app/about/page.tsx → Tentang Uzero


import React from 'react';
import Link from 'next/link';
import PageHeader from '@/src/components/ui/PageHeader';
import {
  Book,
  Sparkles,
  MapPin,
  Users,
  Clock,
  Gavel,
  Cog,
  FileText,
  Globe,
  Settings,
} from 'lucide-react';

export default function Page() {
  // Fitur utama aplikasi
  const features = [
    {
      icon: Book,
      title: "Buku",
      description:
        "Menyimpan daftar novel dari Series Uzero yang dibuat oleh kolaborator. Setiap buku dapat memiliki metadata, genre, sinopsis, dan status pengembangan. Fitur ini juga dapat menambahkan dan mengelola bab-bab dalam setiap buku. Bab bisa dikaitkan dengan tokoh, lokasi, atau worldbuilding lainnya.",
    },
    {
      icon: Users,
      title: "Tokoh",
      description:
        "Halaman karakter yang menampung informasi mendalam mengenai karakter-karakter dari setiap entitas di Series Uzero, seperti latar belakang, peran dalam cerita, kemampuan, hubungan, dan kutipan.",
    },
    {
      icon: MapPin,
      title: "Lokasi",
      description:
        "Menyimpan data tentang tempat dan landmark dalam dunia di Series Uzero. Lokasi bisa memiliki hubungan dengan sejarah, tokoh, atau bab tertentu.",
    },
    {
      icon: Globe,
      title: "Worldbuilding",
      description:
        "Menyimpan data tentang semua pengaturan dalam Series Uzero. Worldbuilngding bisa memiliki hubungan dengan semua aspek yang ada dalam series.",
    },
    {
      icon: FileText,
      title: "Glosarium",
      description:
        "Menyimpan setiap istilah penting yang digunakan dalam cerita di Series Uzero. Setiap entri bisa mencakup definisi, asal kata, dan referensi silang ke fitur lainnya.",
    },
    {
      icon: Settings,
      title: "Sistem Terhubung",
      description:
        "Semua elemen dalam aplikasi saling terhubung, memungkinkan kolaborator untuk melihat relasi antar karakter, lokasi, dan peristiwa dengan mudah."
    }
  ];

  // Aspek utama worldbuilding
  const worldbuildingAspects = [
    {
      icon: Users,
      title: "Sosial & Budaya",
      description: "Sistem kasta, tradisi, bahasa, hingga struktur masyarakat.",
    },
    {
      icon: Sparkles,
      title: "Magis & Supranatural",
      description:
        "Mantra, artefak, entitas gaib, sistem kekuatan, dan hukum alam non-fisik.",
    },
    {
      icon: MapPin,
      title: "Geografi & Lingkungan",
      description:
        "Peta dunia, benua, daerah, iklim, dan fenomena alam.",
    },
    {
      icon: Clock,
      title: "Sejarah & Kronologi",
      description:
        "Peristiwa penting dalam timeline, dinasti, perang, dan revolusi dunia fiksi.",
    },
    {
      icon: Gavel,
      title: "Politik & Hukum",
      description:
        "Sistem pemerintahan, fraksi, hukum adat, dan konflik kekuasaan.",
    },
    {
      icon: Cog,
      title: "Teknologi & Peradaban",
      description:
        "Tingkat teknologi, penemuan besar, dan perkembangan peradaban.",
    },
  ];

  return (
    <main className="flex-1 flex items-center sm:px-6 md:px-8 text-[var(--brand-accent)]">
      <div className="w-full max-w-5xl mx-auto py-12 items-center">
        <div className="p-12 space-y-6 rounded-2xl mx-auto bg-[var(--background)]">
          <PageHeader
            title="Tentang Uzero Companion"
            subtitle="Bagaimana aplikasi ini membersamaimu pada perjalanan panjang bersama para Pewaris Uzero"
          />

           {/* Introduction */}
          <section className="rounded-2xl p-6 md:p-8 bg-[var(--background)] border border-[var(--brand-dark)] shadow-inner">
            <p className="text-[var(--brand-light)] leading-relaxed text-md">
              <strong className="text-[var(--brand-gold)]">Uzero Companion</strong> adalah aplikasi pendamping untuk para penulis kolaborator dalam fiksi <strong className="text-[var(--brand-gold)]">Series Uzero</strong> yang kompleks — terutama dunia fiksi dengan banyak elemen, latar, karakter, dan elemen pengaturan dunia fiksi lainnya. Aplikasi ini membantu para kolaborator untuk merancang, menyusun, dan merawat kontinuitas cerita melalui sistem modular yang saling terhubung.
            </p>
          </section>

          {/* Fitur Utama */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--brand-light)] mb-6 text-center font-cinzel">Fitur Utama</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {features.map((feature, idx) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={idx}
                    className="group bg-[var(--brand-darker)] border border-[var(--brand-dark)] rounded-xl p-6 shadow-md hover:shadow-lg transition duration-300 hover:-translate-y-1"
                  >
                    <div className="flex gap-4 items-start">
                      <div className="w-10 h-10 p-2 bg-gradient-to-br from-[var(--brand-gold)] to-[var(--brand-goldsoft)] rounded-xl flex items-center justify-center group-hover:scale-110 transition">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-[var(--brand-light)] mb-1">{feature.title}</h3>
                        <p className="text-sm text-[var(--brand-accent)] leading-relaxed">{feature.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Worldbuilding */}
          <section>
            <div className="text-center my-8">
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--brand-light)] font-cinzel mb-2">Worldbuilding Framework</h2>
              <p className="text-[var(--brand-accent)] text-base">
                Enam bidang utama untuk memetakan dunia fiksimu secara mendalam dan terstruktur
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {worldbuildingAspects.map((aspect, idx) => {
                const Icon = aspect.icon;
                return (
                  <div
                    key={idx}
                    className="group bg-[var(--background)] border border-[var(--brand-dark)] rounded-xl p-6 shadow-md hover:shadow-lg transition duration-300 hover:-translate-y-1"
                  >
                    <div className="text-center space-y-3">
                      <div className="mx-auto w-12 h-12 bg-gradient-to-br from-[var(--brand-gold)] to-[var(--brand-goldsoft)] rounded-xl flex items-center justify-center group-hover:scale-110 transition">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-[var(--brand-light)]">{aspect.title}</h3>
                      <p className="text-sm text-[var(--brand-accent)] leading-relaxed">{aspect.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* CTA */}
          <section className="text-center bg-gradient-to-r from-[var(--brand-dark)] to-[var(--brand-darker)] rounded-3xl p-12 text-white mt-12">
            <h2 className="text-3xl font-bold mb-4 font-cinzel">Siap Memulai Kontribusimu Dalam Series Uzero?</h2>
            <p className="text-[var(--brand-accent)] text-md mb-8 max-w-2xl mx-auto">
              Mulai berkolaborasi membangun Series Uzero yang kompleks dan menarik dengan tools yang dirancang khusus untuk para kolaborator.
            </p>
              <Link
                href="/home/books"
                className="inline-flex items-center gap-3 bg-[var(--brand-gold)] text-[var(--brand-darker)] px-6 py-2 rounded-xl font-semibold text-md hover:bg-[var(--brand-goldhover)] hover:text-[var(--brand-accent)] transition-all duration-300 hover:scale-105 shadow-lg shadow-black/30"
              >
                <Book className="w-5 h-5" />
                Mulai Menulis Dunia Fiksimu
              </Link>
          </section>
        </div>
      </div>
    </main>
  );
}