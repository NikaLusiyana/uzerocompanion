// 📄 app/home/books/create/page.tsx → Tambah Buku

import React from 'react';
import Link from 'next/link';
import ActionButton from '@/components/ui/ActionButton';
import PageHeader from '@/components/ui/PageHeader';
import {
  Book,        // Ikon untuk tombol "Tambah Buku Baru"
  BookOpen,    // Ikon sampul/placeholder
  Plus,        // Ikon "Tambah" untuk Empty State
  Search,      // Ikon pencarian
  Filter,      // Ikon filter
  Bookmark,    // Ikon buku dipublikasi
  Edit,        // Ikon aksi edit
  Trash2       // Ikon aksi hapus
} from 'lucide-react'

// Komponen default halaman
export default function Page() {
  return (
    <>
      {/* Header Section */}
      <PageHeader
        title="Daftar Buku"
        subtitle="Kelola koleksi buku Uzero Anda"
        action={
          <Link href="/home/books/create">
            <ActionButton icon={<Book size={16} />}>Tambah Buku Baru</ActionButton>
          </Link>
        }
      />
      </>)}
