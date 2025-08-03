// 📄 src/app/home/books/[id]/page.tsx → Detail Buku

'use client'

import { use } from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import dayjs from 'dayjs';
import 'dayjs/locale/id';
import { Trash2, Plus, ArrowBigLeftDashIcon, Edit, Eye } from 'lucide-react';

import PageHeader from '@/src/components/ui/PageHeader';
import ActionButton from '@/src/components/ui/ActionButton';
import ConfirmDialog from '@/src/components/ui/ConfirmDialog';
import CustomAlert from '@/src/components/ui/CustomAlert';

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

interface Chapter {
  id: number
  title: string
}

interface BookDetailProps {
  params: {
    id: string
  }
}

type BookParams = { id: string }

export default function BookDetailPage({ params }: BookDetailProps & { params: Promise<BookParams> }) {
  const { id } = use(params)
  const numericId = parseInt(id, 10)
  const router = useRouter()

  const [book, setBook] = useState<Book | null>(null)
  const [chapters, setChapters] = useState<Chapter[]>([])
  const [chaptersLoading, setChaptersLoading] = useState(true)
  const [loading, setLoading] = useState(true)
  const [alertMessage, setAlertMessage] = useState('')
  const [alertType, setAlertType] = useState<'success' | 'error' | 'info'>('info')
  const [showConfirm, setShowConfirm] = useState(false)
  const [showChapterConfirm, setShowChapterConfirm] = useState(false)
  const [chapterToDelete, setChapterToDelete] = useState<number | null>(null)

  // Fetch book details
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await fetch(`/api/books/${numericId}`)
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

    if (!isNaN(numericId)) fetchBook()
  }, [numericId])

  // Fetch chapters
  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const res = await fetch(`/api/books/${numericId}/chapters`)
        if (!res.ok) throw new Error('Gagal mengambil chapter')
        const data = await res.json()
        setChapters(data)
      } catch (error) {
        console.error('Failed to fetch chapters:', error)
      } finally {
        setChaptersLoading(false)
      }
    }

    if (!isNaN(numericId)) fetchChapters()
  }, [numericId])

  // Delete book
  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/books/${numericId}`, {
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

  // Delete chapter
  const handleDeleteChapter = async () => {
    if (chapterToDelete === null) return

    try {
      const res = await fetch(`/api/books/${numericId}/chapters/${chapterToDelete}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        setChapters((prev) => prev.filter((ch) => ch.id !== chapterToDelete))
        setAlertMessage('Chapter berhasil dihapus.')
        setAlertType('success')
      } else {
        const err = await res.json()
        setAlertMessage('Gagal menghapus: ' + (err.message || 'Unknown error'))
        setAlertType('error')
      }
    } catch (error) {
      console.error('Delete chapter failed:', error)
      setAlertMessage('Terjadi kesalahan saat menghapus chapter.')
      setAlertType('error')
    } finally {
      setShowChapterConfirm(false)
      setChapterToDelete(null)
    }
  }

  // Trigger confirmation dialog for chapter
  const onDelete = (chapterId: number) => {
    setChapterToDelete(chapterId)
    setShowChapterConfirm(true)
  }

  // UI states
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

      {/* Confirm Dialog: Buku */}
      {showConfirm && (
        <ConfirmDialog
          open={showConfirm}
          message="Yakin ingin menghapus buku ini? Tindakan ini tidak bisa dibatalkan."
          onConfirm={handleDelete}
          onCancel={() => setShowConfirm(false)}
        />
      )}

      {/* Confirm Dialog: Chapter */}
      {showChapterConfirm && (
        <ConfirmDialog
          open={showChapterConfirm}
          message="Yakin ingin menghapus chapter ini? Tindakan ini tidak bisa dibatalkan."
          onConfirm={handleDeleteChapter}
          onCancel={() => {
            setShowChapterConfirm(false)
            setChapterToDelete(null)
          }}
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

      {/* Info Buku */}
      <div className="bg-[var(--brand-darker)] rounded-xl px-15 py-10 space-y-4 border border-[var(--brand-dark)] text-[var(--brand-light)]">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="font-cinzel text-2xl font-semibold mb-1">{book.title}</h2>
            <p className="italic text-sm opacity-80">by {book.author}</p>
            <p className="text-sm opacity-60">
              Terakhir diupdate: {dayjs(book.lastUpdated).format('D MMMM YYYY HH:mm A')}
            </p>
          </div>
        </div>

        {/* Genre */}
        {book.genres?.length > 0 && (
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

        {/* Aksi */}
        <div className="flex gap-2">
          <Link href={`/home/books/${book.id}/edit`}>
            <ActionButton icon={<Plus size={16} />} intent="info">
              Edit Detail Buku
            </ActionButton>
          </Link>
            <ActionButton
                onClick={() => setShowConfirm(true)}
                icon={<Trash2 size={16} />}
                intent="danger"
                aria-label="Konfirmasi Hapus Buku"
                >
                Hapus Buku
            </ActionButton>
         
          <Link href={`/home/books/${book.id}/chapters/create`}>
            <ActionButton icon={<Plus size={16} />} intent="success">
              Tambah Chapter
            </ActionButton>
          </Link>
        </div>

        {/* Daftar Chapter */}
        <div className="mt-10">
          <h3 className="text-lg font-semibold mb-3 text-[var(--brand-light)]">Daftar Chapter</h3>
          {chaptersLoading ? (
            <p className="text-sm text-[var(--brand-light)] opacity-80">Memuat daftar chapter...</p>
          ) : chapters.length === 0 ? (
            <p className="text-sm text-[var(--brand-light)] opacity-60 italic">
              Belum ada chapter yang ditambahkan.
            </p>
          ) : (
            <ul className="space-y-2">
              {chapters.map((chapter) => (
                <li
                  key={chapter.id}
                  className="border border-[var(--brand-dark)] rounded-md px-4 py-2 text-[var(--brand-light)] hover:bg-[var(--brand-dark)] transition flex items-center justify-between"
                >
                  <Link href={`/home/books/${book.id}/chapters/${chapter.id}`} className="block">
                    <span className="font-medium">{chapter.title}</span>
                  </Link>
                  <div className="flex gap-1">
                    <Link href={`/home/books/${book.id}/chapters/${chapter.id}`}>
                        <button
                        className="p-2 text-[var(--brand-gold)] hover:text-[var(--brand-accent)] hover:bg-[var(--brand-blue)] rounded transition-colors"
                        aria-label="Preview Chapter"
                        >
                        <Eye size={18} />
                        </button>
                    </Link>
                    <Link href={`/home/books/${book.id}/chapters/${chapter.id}/edit`}>
                        <button
                        className="p-2 text-[var(--brand-gold)] hover:text-[var(--brand-accent)] hover:bg-[var(--brand-blue)] rounded transition-colors"
                        aria-label="Edit Chapter"
                        >
                        <Edit size={18} />
                        </button>
                    </Link>
                    <button
                        onClick={() => onDelete(chapter.id)}
                        className="p-2 text-[var(--brand-gold)] hover:text-[var(--brand-accent)] hover:bg-red-800 rounded transition-colors"
                        aria-label="Hapus Chapter"
                    >
                        <Trash2 size={18} />
                    </button>
</div>

                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  )
}
