// 📄 app/page.tsx → Halaman landing utama di aplikasi Uzero
'use client'

import Image from 'next/image'; // Untuk logo Uzero app
import Link from 'next/link'; // Untuk navigasi antar halaman

export default function Home() {
  return (
    <div className="w-full max-w-8xl mx-auto py-12 items-center">
      {/* Main container with flex layout for two columns */}
      <div className="flex flex-col md:flex-row gap-12 justify-center items-center px-4">
        
        {/* Left Column - Branding */}
        <div className="w-full md:w-3/5 max-w-2xl">
          <div className="bg-[var(--brand-darker)] text-center text-brand-light p-8 md:p-12 rounded-xl">
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <Image
                src="/logo.png"
                alt="Uzero Logo"
                width={96}
                height={96}
                className="w-20 h-20 md:w-24 md:h-24"
              />
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'var(--font-cinzel)' }}>
              UZERO <br />COMPANION
            </h1>

            {/* Narrative Text */}
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

        {/* Right Column - Login Form */}
        <div className="w-full md:w-2/5 max-w-md">
          <div className="bg-[var(--brand-dark)] p-6 md:py-20 rounded-xl shadow-lg text-brand-light">
            <h2 className="text-4xl font-bold text-center mb-6 font-cinzel">Masuk ke Uzero</h2>

            <form className="space-y-6">
              <div>
                <label htmlFor="email" className="block mb-2 font-medium">Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="w-full px-4 py-2 rounded bg-[var(--brand-light)] text-black focus:outline-none focus:ring-2 focus:ring-[var(--brand-gold)]"
                />
              </div>

              <div>
                <label htmlFor="password" className="block mb-6 font-medium">Kata Sandi</label>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-2 rounded bg-[var(--brand-light)] text-black focus:outline-none focus:ring-2 focus:ring-[var(--brand-gold)]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 rounded bg-[var(--brand-gold)] text-black font-bold hover:bg-yellow-600 transition-colors duration-200"
              >
                Masuk
              </button>
            </form>

            <p className="mt-8 text-sm text-center">
              Belum punya akun?{' '}
              <Link href="/auth/register" className="text-[var(--brand-gold)] hover:underline font-medium">
                Daftar sekarang
              </Link>
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}