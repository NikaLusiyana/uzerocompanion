// 📄 src/app/home/books/[id]/page.tsx → Detail Buku

'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import dayjs from 'dayjs'
import 'dayjs/locale/id'
import { Edit, Trash2, Plus, Book, ArrowBigLeftDashIcon } from 'lucide-react'

import PageHeader from '@/src/components/ui/PageHeader'
import ActionButton from '@/src/components/ui/ActionButton'
import ConfirmDialog from '@/src/components/ui/ConfirmDialog'
import CustomAlert from '@/src/components/ui/CustomAlert'

dayjs.locale('id')

interface Book {
  id: number
  title: string
  author: string
  status: string
  progress: number
  lastUpdated: string
  sinopsis: string
  cover?: string
  targetWords: number
  genres: { name: string }[]
}

interface BookDetailProps {
  params: {
    id: string
  }
}

export default function BookDetailPage({ params }: BookDetailProps) {
  const [book, setBook] = useState<Book | null>(null)
  const [loading, setLoading] = useState(true)
  const [alertMessage, setAlertMessage] = useState('')
  const [alertType, setAlertType] = useState<'success' | 'error' | 'info'>('info')
  const [showConfirm, setShowConfirm] = useState(false)

  const router = useRouter()

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await fetch(`/api/books/${params.id}`)
        if (!res.ok) throw new Error('Gagal mengambil detail buku')
        const data = await res.json()
        setBook(data)
      } catch (error) {
        console.error('Failed to fetch book:', error)
        setAlertMessage('Gagal memuat detail buku')
        setAlertType('error')
      } finally {
        setLoading(false)
      }
    }

    fetchBook()
  }, [params.id])

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/books/${params.id}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        setAlertMessage('Buku berhasil dihapus!')
        setAlertType('success')
        router.push('/home/books')
      } else {
        const err = await res.json()
        setAlertMessage('Gagal menghapus: ' + (err.message || 'Unknown error'))
        setAlertType('error')
      }
    } catch (error) {
      console.error('Delete failed:', error)
      setAlertMessage('Terjadi kesalahan saat menghapus buku')
      setAlertType('error')
    } finally {
      setShowConfirm(false)
    }
  }

  if (loading) {
    return <p className="text-[var(--brand-light)] opacity-80">Memuat detail buku...</p>
  }

  if (!book) {
    return (
      <div className="text-[var(--brand-light)] opacity-80">
        Buku tidak ditemukan atau gagal dimuat.
      </div>
    )
  }

  return (
    <>
      {/* Alert */}
      {alertMessage && <CustomAlert message={alertMessage} type={alertType} />}

      {/* Confirm Dialog */}
      {showConfirm && (
        <ConfirmDialog
          open={showConfirm}
          message="Yakin ingin menghapus buku ini? Tindakan ini tidak bisa dibatalkan."
          onConfirm={handleDelete}
          onCancel={() => setShowConfirm(false)}
        />
      )}

        {/* Page Header */}
        <PageHeader
            title="Detail Buku"
            subtitle="Informasi mengenai buku"
            action={
            <Link href="/home/books">
                <ActionButton icon={<ArrowBigLeftDashIcon size={16} />}>
                Kembali ke daftar buku
                </ActionButton>
            </Link>
            }
        />

      {/* Informasi Buku */}
      <div className="bg-[var(--brand-darker)] rounded-xl px-15 py-10 space-y-4 border border-[var(--brand-dark)] text-[var(--brand-light)]">
        <div className="p-6flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="font-cinzel text-2xl font-semibold mb-1">{book.title}</h2>
            <p className="italic text-sm opacity-80">by {book.author}</p>
            <p className="text-sm opacity-60">
              Terakhir diupdate: {dayjs(book.lastUpdated).format('D MMMM YYYY HH:mm A')}
            </p>
          </div>
        </div>

        {/* Genre Badge */}
        {book.genres && book.genres.length > 0 && (
          <div className="flex gap-2 flex-wrap mt-4">
            {book.genres.map((genre) => (
              <span
                key={genre.name}
                className="px-3 py-1 rounded-full text-xs bg-[var(--brand-dark)] text-[var(--brand-light)] border border-[var(--brand-light)] opacity-80"
              >
                {genre.name}
              </span>
            ))}
          </div>
        )}

        {/* Sinopsis */}
        {book.sinopsis && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Sinopsis</h3>
            <p className="whitespace-pre-line text-[var(--brand-light)] opacity-90 text-sm leading-relaxed">
              {book.sinopsis}
            </p>
          </div>
        )}

        <div className="flex gap-2">
            <Link href={`/home/books/${book.id}/edit`}>
              <ActionButton icon={<Plus size={16} />}>
                Edit Detail Buku
              </ActionButton>
            </Link>
            <button onClick={() => setShowConfirm(true)}>
              <ActionButton icon={<Trash2 size={16} />} intent="danger">
                Hapus
              </ActionButton>
            </button>

            <Link href={`/home/books/${book.id}/chapters/create`}>
              <ActionButton icon={<Plus size={16} />} intent="success">
                Tambah Chapter
              </ActionButton>
            </Link>
        </div>
      </div>
    </>
  )
}
