import React from 'react';
import { Mail, Phone, MapPin, Book } from 'lucide-react';
import Link from 'next/link';
import PageHeader from '@/src/components/ui/PageHeader';

export default function ContactPage() {
  return (
    <main className="flex-1 flex items-center sm:px-6 md:px-8 text-[var(--brand-accent)]">
      <div className="w-full max-w-5xl mx-auto py-12 items-center">
        <div className="p-12 space-y-6 rounded-2xl mx-auto bg-[var(--background)]">
          <PageHeader
            title="Hubungi Kami"
            subtitle="Kami senang mendengar dari Anda — baik pertanyaan, saran, maupun kerjasama."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
            {/* FORM KONTAK */}
            <div className="bg-[var(--brand-darker)] rounded-3xl shadow-md shadow-black/40 p-8 border border-[var(--brand-goldsoft)]">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-[var(--brand-light)] mb-2">Kirim Pesan</h2>
                <p className="text-[var(--brand-accent)]">
                  Ceritakan apa yang ada di pikiranmu. Kami akan merespons secepat mungkin.
                </p>
              </div>
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-1 text-[var(--brand-light)]">Nama</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-[var(--brand-goldsoft)] rounded-xl bg-[var(--brand-dark)] text-white placeholder-[var(--brand-accent)] focus:ring-2 focus:ring-[var(--brand-gold)] focus:outline-none"
                    placeholder="Namamu"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-[var(--brand-light)]">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-[var(--brand-goldsoft)] rounded-xl bg-[var(--brand-dark)] text-white placeholder-[var(--brand-accent)] focus:ring-2 focus:ring-[var(--brand-gold)] focus:outline-none"
                    placeholder="alamat@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-[var(--brand-light)]">Pesan</label>
                  <textarea
                    rows={5}
                    className="w-full px-4 py-3 border border-[var(--brand-goldsoft)] rounded-xl bg-[var(--brand-dark)] text-white placeholder-[var(--brand-accent)] focus:ring-2 focus:ring-[var(--brand-gold)] focus:outline-none"
                    placeholder="Tuliskan pesanmu di sini..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center gap-3 bg-[var(--brand-gold)] text-[var(--brand-darker)] hover:text-[var(--brand-accent)] px-6 py-2 rounded-xl font-semibold text-md hover:bg-[var(--brand-goldhover)] transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-black/30"
                >
                  <Mail className="w-5 h-5" />
                  Kirim Pesan
                </button>
              </form>
            </div>

            {/* INFO KONTAK */}
            <div className="space-y-6">
              <div className="group bg-[var(--brand-darker)] text-white rounded-2xl p-6 shadow-md shadow-black/30 border border-[var(--brand-goldsoft)] hover:shadow-lg hover:shadow-[var(--brand-goldsoft)] transition-all duration-300 hover:-translate-y-1">
                <Mail className="w-6 h-6 mb-2 text-[var(--brand-gold)]" />
                <p className="text-lg font-semibold">Email</p>
                <p className="text-[var(--brand-accent)]">support@uzero.app</p>
              </div>
              <div className="group bg-[var(--brand-darker)] text-white rounded-2xl p-6 shadow-md shadow-black/30 border border-[var(--brand-goldsoft)] hover:shadow-lg hover:shadow-[var(--brand-goldsoft)] transition-all duration-300 hover:-translate-y-1">
                <Phone className="w-6 h-6 mb-2 text-[var(--brand-gold)]" />
                <p className="text-lg font-semibold">Whatsapp</p>
                <p className="text-[var(--brand-accent)]">+62 877-8932-5062</p>
              </div>
              <div className="group bg-[var(--brand-darker)] text-white rounded-2xl p-6 shadow-md shadow-black/30 border border-[var(--brand-goldsoft)] hover:shadow-lg hover:shadow-[var(--brand-goldsoft)] transition-all duration-300 hover:-translate-y-1">
                <MapPin className="w-6 h-6 mb-2 text-[var(--brand-gold)]" />
                <p className="text-lg font-semibold">Alamat</p>
                <p className="text-[var(--brand-accent)]">Jl. Imajinasi No. 42, Dunia Fiksi</p>
              </div>

              <div className="mt-6">
                <Link
                  href="/home/books"
                  className="inline-flex items-center gap-3 bg-[var(--brand-gold)] text-[var(--brand-darker)] hover:text-[var(--brand-accent)] px-6 py-2 rounded-xl font-semibold text-md hover:bg-[var(--brand-goldhover)] transition-all duration-300 hover:scale-105 shadow-lg shadow-black/30"
                >
                  <Book className="w-5 h-5" />
                  Mulai Menulis Dunia Fiksimu
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
