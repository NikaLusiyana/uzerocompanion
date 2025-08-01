// 📄 src/app/page.tsx

'use client'

import Image from 'next/image';
import { useState } from 'react';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';

export default function Home() {
  const [flipped, setFlipped] = useState(false)

  return (
    <div className="w-full max-w-8xl mx-auto py-12 items-center">
      <div className="flex flex-col md:flex-row gap-12 justify-center items-center px-4">

        {/* LEFT: Branding */}
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
              <p className="text-sm text-[var(--brand-gold)] font-serif italic leading-relaxed">
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

        {/* RIGHT: Auth Card */}
        <div className="w-full md:w-2/5 max-w-md perspective items-center mt-10">
          <div className={`relative w-full h-[480px] transition-transform duration-700 [transform-style:preserve-3d] ${flipped ? '[transform:rotateY(180deg)]' : ''}`}>

            {/* LOGIN SIDE */}
            <div className="absolute inset-0 backface-hidden bg-[var(--brand-dark)] rounded-xl shadow-lg text-brand-light p-8 flex flex-col justify-start">
              <LoginForm onRegisterClick={() => setFlipped(true)} />
            </div>

            {/* REGISTER SIDE */}
            <div className="absolute inset-0 backface-hidden rotateY-180 bg-[var(--brand-dark)] rounded-xl shadow-lg text-brand-light p-8 flex flex-col justify-start">
              <RegisterForm onLoginClick={() => setFlipped(false)} />
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}
