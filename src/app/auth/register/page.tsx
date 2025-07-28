// 📄 app/auth/register/page.tsx → Register

import Image from 'next/image'; // Untuk logo Uzero app
import Link from 'next/link'; // Untuk navigasi antar halaman

export default function RegisterPage() {
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

        {/* Kolom kanan - Register Form */}
        <div className="w-full md:w-2/5 max-w-md">
          <div className="bg-[var(--brand-dark)] p-6 md:py-12 rounded-xl shadow-lg text-brand-light">
            <h2 className="text-xl font-bold text-center mb-6">Daftar Akun Baru</h2>
            
            <form className="space-y-4">
              {/* Personal Information */}
              <div className="space-y-4">
                <div>
                  <label htmlFor="username" className="block mb-1 font-medium">
                    Nama Pengguna <span className="text-[var(--brand-gold)]">*</span>
                  </label>
                  <input
                    id="username"
                    type="text"
                    required
                    className="w-full px-4 py-2 rounded bg-[var(--brand-light)] text-black focus:ring-2 focus:ring-[var(--brand-gold)]"
                    placeholder="pilih nama unik"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block mb-1 font-medium">
                    Email <span className="text-[var(--brand-gold)]">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    className="w-full px-4 py-2 rounded bg-[var(--brand-light)] text-black focus:ring-2 focus:ring-[var(--brand-gold)]"
                    placeholder="email@contoh.com"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="password" className="block mb-1 font-medium">
                      Kata Sandi <span className="text-[var(--brand-gold)]">*</span>
                    </label>
                    <input
                      id="password"
                      type="password"
                      required
                      className="w-full px-4 py-2 rounded bg-[var(--brand-light)] text-black focus:ring-2 focus:ring-[var(--brand-gold)]"
                      placeholder="••••••••"
                    />
                  </div>
                  <div>
                    <label htmlFor="confirmPassword" className="block mb-1 font-medium">
                      Konfirmasi Sandi <span className="text-[var(--brand-gold)]">*</span>
                    </label>
                    <input
                      id="confirmPassword"
                      type="password"
                      required
                      className="w-full px-4 py-2 rounded bg-[var(--brand-light)] text-black focus:ring-2 focus:ring-[var(--brand-gold)]"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
              </div>

              {/* Terms and Submit */}
              <div className="pt-4">
                <label className="flex items-start space-x-2">
                  <input
                    type="checkbox"
                    required
                    className="mt-1 rounded bg-[var(--brand-light)] text-[var(--brand-gold)] focus:ring-[var(--brand-gold)]"
                  />
                  <span className="text-sm">
                    Saya menyetujui <Link href="/terms" className="text-[var(--brand-gold)] hover:underline">Syarat & Ketentuan</Link> dan <Link href="/privacy" className="text-[var(--brand-gold)] hover:underline">Kebijakan Privasi</Link>
                  </span>
                </label>

                <button
                  type="submit"
                  className="w-full mt-6 py-2 rounded bg-[var(--brand-gold)] hover:bg-[var(--brand-goldhover)] text-[var(--brand-darker)] font-bold transition-colors"
                >
                  Mulai Petualangan
                </button>
              </div>
            </form>

            <p className="mt-6 text-sm text-center">
              Sudah punya akun?{' '}
              <Link 
                href="/auth/login" 
                className="text-[var(--brand-gold)] hover:underline font-medium"
              >
                Masuk disini
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
