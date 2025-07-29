// 📄 src/app/home/books/page.tsx → Halaman daftar buku di aplikasi Uzero

'use client'

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Book, BookOpen, Plus, Search, Filter, Bookmark, Edit, Trash2
} from 'lucide-react';
import ActionButton from '@/src/components/ui/ActionButton';
import PageHeader from '@/src/components/ui/PageHeader';
import { StatCard } from '@/src/components/ui/StatCard';
import ConfirmDialog from '@/src/components/ui/ConfirmDialog';
import CustomAlert from '@/src/components/ui/CustomAlert';


interface Book {
  id: number
  title: string
  author: string
  status: string
  progress: number
  lastUpdated: string
  cover?: string
}

interface Stats {
  totalBooks: number
  published: number
  inProgress: number
}

export default function Page() {
  const [books, setBooks] = useState<Book[]>([])
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)
  const [alertMessage, setAlertMessage] = useState('')
  const [alertType, setAlertType] = useState<'success' | 'error' | 'info'>('info')
  const [showConfirm, setShowConfirm] = useState(false)
  const [bookToDelete, setBookToDelete] = useState<number | null>(null)


  useEffect(() => {
    fetch('/api/books')
      .then(res => res.json())
      .then(data => {
        setBooks(data.books)
        setStats(data.stats)
      })
      .finally(() => setLoading(false))
  }, [])

  const confirmDelete = (id: number) => {
    setBookToDelete(id)
    setShowConfirm(true)
  }

  const handleDelete = async () => {
    if (!bookToDelete) return

    try {
      const res = await fetch(`/api/books/${bookToDelete}`, {
        method: 'DELETE'
      })

      if (res.ok) {
        setAlertMessage('Buku berhasil dihapus!')
        setAlertType('success')
        setBooks(prev => prev.filter(book => book.id !== bookToDelete))
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

      {/* Stats Section */}
      {stats && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <StatCard icon={<BookOpen size={20} />} label="Total Buku" value={stats.totalBooks} />
          <StatCard icon={<Bookmark size={20} />} label="Dipublikasi" value={stats.published} />
          <StatCard icon={<BookOpen size={20} />} label="Dalam Proses" value={stats.inProgress} />
        </div>
      )}

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--brand-light)] opacity-60" size={18} />
          <input 
            type="text" 
            placeholder="Cari buku..." 
            className="w-full pl-10 pr-4 py-3 bg-[var(--brand-darker)] rounded-xl border border-[var(--brand-darker)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-gold)] text-[var(--brand-light)] placeholder-[var(--brand-light)] placeholder-opacity-60"
          />
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-[var(--brand-darker)] rounded-lg border border-[var(--brand-darker)] text-[var(--brand-light)]">
            <Filter size={16} />
            <span>Filter</span>
          </button>
        </div>
      </div>

      {/* Tabel Buku */}
      {!loading && books.length > 0 && (
        <div className="bg-[var(--brand-darker)] rounded-lg overflow-hidden mb-6">
          {/* Books Table */}
          <div className="bg-[var(--brand-darker)] rounded-lg overflow-hidden mb-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[var(--brand-accent)]">Judul Buku</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[var(--brand-accent)]">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[var(--brand-accent)]">Progress</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[var(--brand-accent)]">Terakhir Diupdate</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-[var(--brand-accent)]">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {books.map((book) => (
                    <tr key={book.id} className="hover:bg-[var(--brand-dark)] transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-14 bg-[var(--brand-darker)] rounded flex items-center justify-center overflow-hidden">
                            {book.cover ? (
                              <img src={book.cover} alt={book.title} className="w-full h-full object-cover" />
                            ) : (
                              <BookOpen size={20} className="text-[var(--brand-accent)] opacity-60" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-[var(--brand-light)]">{book.title}</p>
                            <p className="text-sm text-[var(--brand-light)] opacity-80">{book.author}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          book.status === "Published" 
                            ? "bg-[var(--brand-blue)] text-[var(--brand-accent)]" 
                            : "bg-[var(--background)] text-[var(--brand-gold)]"
                        }`}>
                          {book.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-[var(--background)] rounded-full h-2">
                            <div 
                              className="bg-[var(--brand-gold)] h-2 rounded-full" 
                              style={{ width: `${book.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-[var(--brand-light)] opacity-80">{book.progress}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-[var(--brand-light)] opacity-80 text-sm">{book.lastUpdated}</td>
                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-2">
                          <Link href={`/home/books/${book.id}/edit`}>
                            <button className="p-2 text-[var(--brand-gold)] hover:text-[var(--brand-accent)] hover:bg-[var(--brand-blue)] rounded transition-colors">
                              <Edit size={18} />
                            </button>
                          </Link>

                          <button
                            onClick={() => confirmDelete(book.id)}
                            className="p-2 text-[var(--brand-gold)] hover:text-[var(--brand-accent)] hover:bg-red-800 rounded transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>

                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!loading && books.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <BookOpen size={48} className="text-[var(--brand-accent)] opacity-60 mb-4" />
          <h3 className="text-lg font-medium text-[var(--brand-light)]">Belum ada buku</h3>
          <p className="text-[var(--brand-light)] opacity-80 mt-1">Mulai dengan menambahkan buku pertama Anda</p>
          <Link href="/home/books/create">
            <button className="mt-4 flex items-center gap-2 bg-[var(--brand-gold)] hover:bg-[var(--brand-goldhover)] text-[var(--brand-darker)] hover:text-[var(--brand-accent)] px-4 py-2 rounded-lg transition-colors">
              <Plus size={16} />
              <span>Tambah Buku</span>
            </button>
          </Link>
        </div>
      )}

      {/* Optional loading skeleton */}
      {loading && (
        <div className="text-[var(--brand-light)] text-sm opacity-80">Memuat data buku...</div>
      )}
    </>
  );
}
