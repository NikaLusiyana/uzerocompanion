'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import dayjs from 'dayjs'
import 'dayjs/locale/id'
import { ArrowBigLeftDashIcon, User } from 'lucide-react'

import PageHeader from '@/src/components/ui/PageHeader'
import ActionButton from '@/src/components/ui/ActionButton'
import CustomAlert from '@/src/components/ui/CustomAlert'

dayjs.locale('id')

interface UserProfile {
  name?: string | null
  email: string
  image?: string | null
  createdAt: string
}

export default function ProfilePage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [alertMessage, setAlertMessage] = useState('')
  const [alertType, setAlertType] = useState<'success' | 'error' | 'info'>('info')

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch('/api/profile')
        if (!res.ok) throw new Error('Gagal memuat data profil')
        const data = await res.json()
        setProfile(data)
      } catch (error) {
        console.error('Gagal mengambil profil:', error)
        setAlertMessage('Gagal memuat data profil')
        setAlertType('error')
      } finally {
        setLoading(false)
      }
    }

    if (status === 'authenticated') {
      fetchProfile()
    } else if (status === 'unauthenticated') {
      router.push('/')
    }
  }, [status, router])

  if (loading) {
    return <p className="text-[var(--brand-light)] opacity-80">Memuat profil...</p>
  }

  if (!profile) {
    return (
      <div className="text-[var(--brand-light)] opacity-80">
        API masih dalam pengembangan.
      </div>
    )
  }

  return (
    <>
      {/* Alert */}
      {alertMessage && <CustomAlert message={alertMessage} type={alertType} />}

      {/* Page Header */}
      <PageHeader
        title="Detail Profil"
        subtitle="Informasi akun pengguna"
        action={
          <Link href="/home">
            <ActionButton icon={<ArrowBigLeftDashIcon size={16} />}>
              Kembali ke beranda
            </ActionButton>
          </Link>
        }
      />

      <div className="mt-6 bg-[var(--background-alt)] rounded-lg border border-[var(--brand-dark)] p-6 text-[var(--brand-light)] space-y-4">
        {/* Avatar */}
        <div className="flex items-center gap-4">
          {profile.image ? (
            <img
              src={profile.image}
              alt="Foto Profil"
              className="w-16 h-16 rounded-full object-cover border border-[var(--brand-darker)]"
            />
          ) : (
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-[var(--brand-dark)] border border-[var(--brand-darker)]">
              <User className="w-8 h-8 text-[var(--brand-light)]" />
            </div>
          )}
          <div>
            <h2 className="text-lg font-semibold">{profile.name || 'Tanpa Nama'}</h2>
            <p className="text-sm text-[var(--brand-muted)]">{profile.email}</p>
          </div>
        </div>

        {/* Info lainnya */}
        <div>
          <p className="text-sm text-[var(--brand-muted)]">
            Akun dibuat pada{' '}
            <span className="font-medium text-[var(--brand-gold)]">
              {dayjs(profile.createdAt).format('D MMMM YYYY')}
            </span>
          </p>
        </div>
      </div>
    </>
  )
}
