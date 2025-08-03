// 📄 src/app/home/books/page.tsx → Halaman daftar buku di aplikasi Uzero

'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'

import {
  Book,
  BookOpen,
  Plus,
  Search,
  Bookmark,
} from 'lucide-react'

import ActionButton from '@/src/components/ui/ActionButton'
import PageHeader from '@/src/components/ui/PageHeader'
import { StatCard } from '@/src/components/ui/StatCard'
import ConfirmDialog from '@/src/components/ui/ConfirmDialog'
import CustomAlert from '@/src/components/ui/CustomAlert'
import BookRow from '@/src/components/books/BookRow'
import Pagination from '@/src/components/ui/Pagination'

// 🔹 Types
interface Book {
  id: number
  title: string
  author: string
  status: string
  progress: number
  lastUpdated: string
  cover?: string
  targetWords: number
  genres: { name: string }[]
}

interface Stats {
  totalBooks: number
  published: number
  inProgress: number
}

const genreList = [
  'Fantasy',
  'Science Fiction',
  'Romance',
  'Mystery',
  'Thriller',
  'Historical',
  'Adventure',
  'Horror',
  'Drama',
  'Slice of Life',
]

// 🔹 Component
export default function Page() {
  const [books, setBooks] = useState<Book[]>([])
  const [stats, setStats] = useState<Stats | null>(null)

  const [loading, setLoading] = useState(true)

  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string | null>(null)
  const [selectedGenres, setSelectedGenres] = useState<string[]>([])

  const [alertMessage, setAlertMessage] = useState('')
  const [alertType, setAlertType] = useState<'success' | 'error' | 'info'>('info')

  const [showConfirm, setShowConfirm] = useState(false)
  const [bookToDelete, setBookToDelete] = useState<number | null>(null)

  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const limit = 4

  const fetchBooksAndStats = async (
    search?: string,
    status?: string | null,
    genres?: string[],
    page: number = 1
  ) => {
    try {
      setLoading(true)
      const params = new URLSearchParams()

      if (search) params.append('search', search)
      if (status) params.append('status', status)
      if (genres && genres.length > 0) {
        genres.forEach((name) => params.append('genres', name))
      }

      params.append('page', page.toString())
      params.append('limit', limit.toString())

      // 🔸 Fetch books
      const booksRes = await fetch(`/api/books?${params.toString()}`)
      if (!booksRes.ok) throw new Error('Gagal mengambil data buku')
      const booksData = await booksRes.json()

      // 🔸 Fetch stats dari endpoint terpisah
      const statsRes = await fetch(`/api/books/stats`)
      if (!statsRes.ok) throw new Error('Gagal mengambil statistik buku')
      const statsData = await statsRes.json()

      // 🔸 Set data
      setBooks(booksData.books ?? [])
      setStats(statsData ?? null)
      setTotalPages(booksData.totalPages ?? 1)
      setCurrentPage(page)
    } catch (error) {
      console.error(error)
      setAlertMessage('Gagal memuat ulang data')
      setAlertType('error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBooksAndStats()
  }, [])

  // 🔹 Handlers
  const confirmDelete = (id: number) => {
    setBookToDelete(id)
    setShowConfirm(true)
  }

  const handleDelete = async () => {
    if (!bookToDelete) return

    try {
      const res = await fetch(`/api/books/${bookToDelete}`, { method: 'DELETE' })

      if (res.ok) {
        setAlertMessage('Buku berhasil dihapus!')
        setAlertType('success')
        await fetchBooksAndStats(searchTerm, statusFilter, selectedGenres, currentPage)
      } else {
        const err = await res.json()
        setAlertMessage('Gagal menghapus: ' + (err.message || 'Unknown error'))
        setAlertType('error')
      }
    } catch (e) {
      console.error(e)
      setAlertMessage('Terjadi kesalahan saat menghapus buku')
      setAlertType('error')
    } finally {
      setShowConfirm(false)
      setBookToDelete(null)
    }
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value
    setSearchTerm(term)
    fetchBooksAndStats(term, statusFilter, selectedGenres, 1)
  }

  const handleStatusChange = (newStatus: string | null) => {
    setStatusFilter(newStatus)
    fetchBooksAndStats(searchTerm, newStatus, selectedGenres, 1)
  }

  const handleGenreToggle = (genre: string) => {
    const newGenres = selectedGenres.includes(genre)
      ? selectedGenres.filter((g) => g !== genre)
      : [...selectedGenres, genre]

    setSelectedGenres(newGenres)
    fetchBooksAndStats(searchTerm, statusFilter, newGenres, 1)
  }

  const handlePageChange = (page: number) => {
    fetchBooksAndStats(searchTerm, statusFilter, selectedGenres, page)
  }

  // 🔹 Render
  return (
    <>
      {showConfirm && (
        <ConfirmDialog
          open={showConfirm}
          message="Yakin ingin menghapus buku ini? Tindakan ini tidak bisa dibatalkan."
          onConfirm={handleDelete}
          onCancel={() => {
            setShowConfirm(false)
            setBookToDelete(null)
          }}
        />
      )}

      {alertMessage && <CustomAlert message={alertMessage} type={alertType} />}

      <PageHeader
        title="Daftar Buku"
        subtitle="Kelola koleksi buku Uzero Anda"
        action={
          <Link href="/home/books/create">
            <ActionButton icon={<Book size={16} />}>Tambah Buku Baru</ActionButton>
          </Link>
        }
      />

      {stats && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <StatCard icon={<BookOpen size={20} />} label="Total Buku" value={stats.totalBooks} />
          <StatCard icon={<Bookmark size={20} />} label="Dipublikasi" value={stats.published} />
          <StatCard icon={<BookOpen size={20} />} label="Dalam Proses" value={stats.inProgress} />
        </div>
      )}

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--brand-light)] opacity-60" size={18} />
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Cari buku..."
            className="w-full pl-10 pr-4 py-3 bg-[var(--brand-darker)] rounded-xl border border-[var(--brand-darker)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-gold)] text-[var(--brand-light)] placeholder-[var(--brand-light)] placeholder-opacity-60"
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          {['All', 'Published', 'Draft'].map((label) => {
            const value = label === 'All' ? null : label
            const isActive = statusFilter === value

            return (
              <button
                key={label}
                onClick={() => handleStatusChange(value)}
                className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                  isActive
                    ? 'bg-[var(--brand-gold)] text-[var(--brand-darker)]'
                    : 'bg-[var(--brand-darker)] text-[var(--brand-light)] hover:bg-[var(--brand-dark)]'
                }`}
              >
                {label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Genre Filter */}
      <div className="flex gap-2 flex-wrap mb-6">
        {genreList.map((genre) => {
          const isSelected = selectedGenres.includes(genre)
          return (
            <button
              key={genre}
              onClick={() => handleGenreToggle(genre)}
              className={`px-3 py-2 rounded-full text-sm transition-all border ${
                isSelected
                  ? 'bg-[var(--brand-gold)] text-[var(--brand-darker)] border-transparent'
                  : 'bg-[var(--brand-darker)] text-[var(--brand-light)] hover:bg-[var(--brand-dark)] border-[var(--brand-darker)]'
              }`}
            >
              {genre}
            </button>
          )
        })}
      </div>

      {/* Table Buku */}
      {!loading && books.length > 0 && (
        <>
          <div className="bg-[var(--brand-darker)] rounded-lg overflow-hidden mb-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="px-6 py-4 text-left text-md font-semibold text-[var(--brand-accent)]">Judul Buku</th>
                    <th className="px-6 py-4 text-left text-md font-semibold text-[var(--brand-accent)]">Status</th>
                    <th className="px-6 py-4 text-left text-md font-semibold text-[var(--brand-accent)]">Genre</th>
                    <th className="px-6 py-4 text-left text-md font-semibold text-[var(--brand-accent)]">Progress</th>
                    <th className="px-6 py-4 text-left text-md font-semibold text-[var(--brand-accent)]">Terakhir Diupdate</th>
                    <th className="px-6 py-4 text-center text-md font-semibold text-[var(--brand-accent)]">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {books.map((book) => (
                    <BookRow key={book.id} book={book} onDelete={confirmDelete} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 🔸 Pagination */}
          <div className="flex justify-center mb-12">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </>
      )}

      {/* Empty State */}
      {!loading && books.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <BookOpen size={48} className="text-[var(--brand-accent)] opacity-60 mb-4" />
          <h3 className="text-lg font-medium text-[var(--brand-light)]">Belum ada buku</h3>
          <p className="text-[var(--brand-light)] opacity-80 mt-1">
            Mulai dengan menambahkan buku
          </p>
          <Link href="/home/books/create">
            <button className="mt-4 flex items-center gap-2 bg-[var(--brand-gold)] hover:bg-[var(--brand-goldhover)] text-[var(--brand-darker)] hover:text-[var(--brand-accent)] px-4 py-2 rounded-lg transition-colors">
              <Plus size={16} />
              <span>Tambah Buku</span>
            </button>
          </Link>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="text-[var(--brand-light)] text-sm opacity-80">
          Memuat data buku...
        </div>
      )}
    </>
  )
}
