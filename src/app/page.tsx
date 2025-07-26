'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export default function Home() {
  const [flipped, setFlipped] = useState(false)

  return (
    <div className="w-full max-w-8xl mx-auto py-12 items-center">
      <div className="flex flex-col md:flex-row gap-12 justify-center items-center px-4">

        {/* Branding / Left Column */}
        <div className="w-full md:w-3/5 max-w-2xl">
          <div className="bg-[var(--brand-darker)] text-center text-brand-light p-8 md:p-12 rounded-xl">
            <div className="flex justify-center mb-6">
              <Image
                src="/logo.png"
                alt="Uzero Logo"
                width={96}
                height={96}
                className="w-20 h-20 md:w-24 md:h-24"
              />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'var(--font-cinzel)' }}>
              UZERO <br />COMPANION
            </h1>
            <div className="px-4">
              <p className="text-sm text-[var(--brand-gold)] font-serif italic leading-relaxed space-y-2">
                <span>Di dunia yang pernah diberkati lalu dikutuk,</span><br />
                <span>warisan tidak hanya berupa darah, tapi juga dosa.</span><br />
                <span>Kisah ini tertulis bukan dalam tinta,</span><br />
                <span>melainkan dalam tekad dan kehilangan.</span><br /><br />
                <span>Selamat datang di Uzero.</span><br />
                <span>Di sinilah warisan terakhir dibisikkan dari reruntuhan,</span><br />
                <span>dan dosa pertama menolak dilupakan.</span>
              </p>
            </div>
          </div>
        </div>

        <div className="w-full md:w-2/5 max-w-md perspective items-center">
          <div className={`relative w-full h-[480px] transition-transform duration-700 [transform-style:preserve-3d] ${flipped ? '[transform:rotateY(180deg)]' : ''}`}>

            {/* LOGIN SIDE */}
            <div className="absolute inset-0 backface-hidden bg-[var(--brand-dark)] rounded-xl shadow-lg text-brand-light p-8 flex flex-col justify-between">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 font-cinzel tracking-wide">MASUK KE UZERO</h2>
                <form className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block mb-1 font-medium">Email</label>
                    <input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      className="w-full px-4 py-2 rounded bg-[var(--brand-light)] text-black focus:outline-none focus:ring-2 focus:ring-[var(--brand-gold)]"
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="block mb-1 font-medium">Kata Sandi</label>
                    <input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      className="w-full px-4 py-2 rounded bg-[var(--brand-light)] text-black focus:outline-none focus:ring-2 focus:ring-[var(--brand-gold)]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full mt-4 py-2 rounded bg-[var(--brand-gold)] text-black font-bold hover:bg-yellow-600 transition-colors duration-200"
                  >
                    Masuk
                  </button>
                </form>
              </div>
              <p className="text-sm text-center">
                Belum punya akun?{' '}
                <button
                  type="button"
                  onClick={() => setFlipped(true)}
                  className="text-[var(--brand-gold)] hover:underline font-medium"
                >
                  Daftar sekarang
                </button>
              </p>
            </div>

            {/* REGISTER SIDE */}
            <div className="absolute inset-0 backface-hidden rotateY-180 bg-[var(--brand-dark)] rounded-xl shadow-lg text-brand-light p-8 flex flex-col justify-between">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 font-cinzel tracking-wide">Daftar Akun Baru</h2>
                <form className="space-y-4">
                  <div>
                    <label htmlFor="username" className="block mb-1 font-medium">Nama Pengguna</label>
                    <input
                      id="username"
                      type="text"
                      placeholder="pilih nama unik"
                      className="w-full px-4 py-2 rounded bg-[var(--brand-light)] text-black focus:outline-none focus:ring-2 focus:ring-[var(--brand-gold)]"
                    />
                  </div>
                  <div>
                    <label htmlFor="email-reg" className="block mb-1 font-medium">Email</label>
                    <input
                      id="email-reg"
                      type="email"
                      placeholder="email@contoh.com"
                      className="w-full px-4 py-2 rounded bg-[var(--brand-light)] text-black focus:outline-none focus:ring-2 focus:ring-[var(--brand-gold)]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="password-reg" className="block mb-1 font-medium">Kata Sandi</label>
                      <input
                        id="password-reg"
                        type="password"
                        placeholder="••••••••"
                        className="w-full px-4 py-2 rounded bg-[var(--brand-light)] text-black focus:outline-none focus:ring-2 focus:ring-[var(--brand-gold)]"
                      />
                    </div>
                    <div>
                      <label htmlFor="confirmPassword" className="block mb-1 font-medium">Konfirmasi Sandi</label>
                      <input
                        id="confirmPassword"
                        type="password"
                        placeholder="••••••••"
                        className="w-full px-4 py-2 rounded bg-[var(--brand-light)] text-black focus:outline-none focus:ring-2 focus:ring-[var(--brand-gold)]"
                      />
                    </div>
                  </div>
                  <label className="flex items-start space-x-2 text-sm pt-2">
                    <input type="checkbox" required className="mt-1 rounded bg-[var(--brand-light)] text-[var(--brand-gold)]" />
                    <span>
                      Saya menyetujui <Link href="/terms" className="text-[var(--brand-gold)] hover:underline">Syarat & Ketentuan</Link> dan <Link href="/privacy" className="text-[var(--brand-gold)] hover:underline">Kebijakan Privasi</Link>
                    </span>
                  </label>
                  <button
                    type="submit"
                    className="w-full mt-4 py-2 rounded bg-[var(--brand-gold)] text-black font-bold hover:bg-yellow-600 transition-colors"
                  >
                    Mulai Petualangan
                  </button>
                </form>
              </div>
              <p className="text-sm text-center">
                Sudah punya akun?{' '}
                <button
                  type="button"
                  onClick={() => setFlipped(false)}
                  className="text-[var(--brand-gold)] hover:underline font-medium"
                >
                  Masuk disini
                </button>
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}
