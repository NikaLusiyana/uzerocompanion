// 📄 src/components/auth/LoginForm.tsx

'use client'

import { signIn } from 'next-auth/react';
import { useState, FormEvent } from 'react';
import { FcGoogle } from 'react-icons/fc';

interface Props {
  onRegisterClick: () => void
}

export default function LoginForm({ onRegisterClick }: Props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault()

    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
      callbackUrl: '/home',
    })

    if (res?.error) {
      setError('Login gagal. Cek email dan password.')
    } else if (res?.ok && res.url) {
      window.location.href = res.url
    }
  }

  return (
    <>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 font-cinzel tracking-wide">MASUK KE UZERO</h2>
        <form className="space-y-4" onSubmit={handleLogin}>
            <div>
            <label htmlFor="email" className="block mb-1 font-medium">Email</label>
            <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded bg-[var(--brand-light)] text-black focus:outline-none focus:ring-2 focus:ring-[var(--brand-gold)]"
                required
            />
            </div>
            <div>
            <label htmlFor="password" className="block mb-1 font-medium">Kata Sandi</label>
            <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded bg-[var(--brand-light)] text-black focus:outline-none focus:ring-2 focus:ring-[var(--brand-gold)]"
                required
            />
            </div>
            {error && (
            <p className="text-sm text-red-500 text-center">{error}</p>
            )}
            <button
            type="submit"
            className="cursor-pointer w-full mt-4 py-2 rounded bg-[var(--brand-gold)] text-black font-bold hover:bg-yellow-600 transition-colors duration-200"
            >
            Masuk
            </button>
        </form>

        <hr className="my-6 border-t border-gray-300" />
        <div className="text-center text-md text-[var(--brand-accent)] mb-2">atau</div>

        <button
        type="button"
        onClick={() => signIn('google', { callbackUrl: '/home' })}
        className="cursor-pointer w-full mt-3 py-2 rounded bg-white text-black font-semibold border flex items-center justify-center gap-2 hover:bg-gray-100 transition"
        >
        <FcGoogle className="text-xl" />
        Masuk dengan Google
        </button>

        <p className="text-sm text-center mt-34">
            Belum punya akun?{' '}
            <button
            type="button"
            onClick={onRegisterClick}
            className="cursor-pointer text-[var(--brand-gold)] hover:underline hover:font-bold font-medium hover:text-yellow-600"
            >
            Daftar sekarang
            </button>
        </p>
        </>
    )
    }