// 📄 src/components/auth/RegisterForm.tsx

'use client'

import { useState } from 'react';
import Link from 'next/link';
import GlobalAlert from '@/src/components/ui/GlobalAlert';

type Props = {
  onLoginClick?: () => void
}

export default function RegisterForm({ onLoginClick }: Props) {
  const [loading, setLoading] = useState(false)
  const [alertData, setAlertData] = useState<{
    type: 'success' | 'error'
    message: string
  } | null>(null)

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const form = e.currentTarget
    const username = (form.querySelector('#username') as HTMLInputElement)?.value
    const email = (form.querySelector('#email-reg') as HTMLInputElement)?.value
    const password = (form.querySelector('#password-reg') as HTMLInputElement)?.value
    const confirmPassword = (form.querySelector('#confirmPassword') as HTMLInputElement)?.value

    if (password !== confirmPassword) {
      setAlertData({ type: 'error', message: 'Konfirmasi sandi tidak cocok.' })
      setLoading(false)
      return
    }

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        setAlertData({ type: 'error', message: data.error || 'Gagal mendaftar.' })
      } else {
        setAlertData({ type: 'success', message: 'Registrasi berhasil! Silakan login.' })
        setTimeout(() => onLoginClick?.(), 1200)
      }
    } catch (err) {
      console.error(err)
      setAlertData({ type: 'error', message: 'Terjadi kesalahan saat mendaftar.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {alertData && (
        <div className="mb-6">
          <GlobalAlert
            type={alertData.type}
            message={alertData.message}
            onClose={() => setAlertData(null)}
            withIcon // opsional: bisa kamu ubah jadi props
          />
        </div>
      )}

      <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 font-cinzel tracking-wide">
        Daftar Akun Baru
      </h2>

      <form className="space-y-4" onSubmit={handleRegister}>
        <div>
          <label htmlFor="username" className="block mb-1 font-medium">
            Nama Pengguna
          </label>
          <input
            id="username"
            type="text"
            required
            className="w-full px-4 py-2 rounded bg-[var(--brand-light)] text-black focus:outline-none focus:ring-2 focus:ring-[var(--brand-gold)]"
          />
        </div>

        <div>
          <label htmlFor="email-reg" className="block mb-1 font-medium">
            Email
          </label>
          <input
            id="email-reg"
            type="email"
            required
            className="w-full px-4 py-2 rounded bg-[var(--brand-light)] text-black focus:outline-none focus:ring-2 focus:ring-[var(--brand-gold)]"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="password-reg" className="block mb-1 font-medium">
              Kata Sandi
            </label>
            <input
              id="password-reg"
              type="password"
              required
              className="w-full px-4 py-2 rounded bg-[var(--brand-light)] text-black focus:outline-none focus:ring-2 focus:ring-[var(--brand-gold)]"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block mb-1 font-medium">
              Konfirmasi Sandi
            </label>
            <input
              id="confirmPassword"
              type="password"
              required
              className="w-full px-4 py-2 rounded bg-[var(--brand-light)] text-black focus:outline-none focus:ring-2 focus:ring-[var(--brand-gold)]"
            />
          </div>
        </div>

        <label className="flex items-start gap-2 text-sm pt-2">
          <input
            type="checkbox"
            required
            className="cursor-pointer mt-1 rounded bg-[var(--brand-light)] text-[var(--brand-gold)]"
          />
          <span>
            Saya menyetujui{' '}
            <Link href="/terms" className="text-[var(--brand-gold)] hover:underline">
              Syarat & Ketentuan
            </Link>{' '}
            dan{' '}
            <Link href="/privacy" className="text-[var(--brand-gold)] hover:underline">
              Kebijakan Privasi
            </Link>
          </span>
        </label>

        <button
          type="submit"
          disabled={loading}
          className="cursor-pointer w-full mt-4 py-2 rounded bg-[var(--brand-gold)] text-black font-bold hover:bg-yellow-600 transition-colors disabled:opacity-50"
        >
          {loading ? 'Mendaftar...' : 'Mulai Petualangan'}
        </button>
      </form>

      <p className="text-sm text-center mt-30">
        Sudah punya akun?{' '}
        <button
          type="button"
          onClick={onLoginClick}
          className="cursor-pointer text-[var(--brand-gold)] hover:underline font-medium hover:font-bold hover:text-yellow-600"
        >
          Masuk di sini
        </button>
      </p>
    </>
  )
}