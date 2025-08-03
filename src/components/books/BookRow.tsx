// 📄 src/components/books/BookRow.tsx

'use client'

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BookOpen, Edit, Trash2 } from 'lucide-react';
import dayjs from 'dayjs';
import 'dayjs/locale/id';
dayjs.locale('id');

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

interface Props {
  book: Book
  onDelete: (id: number) => void
}

export default function BookRow({ book, onDelete }: Props) {
  return (
    <tr className="hover:bg-[var(--brand-dark)] transition-colors">
      <td className="px-6 py-4">
        <div className="flex items-center gap-4">
          <div className="w-10 h-14 bg-[var(--brand-darker)] rounded flex items-center justify-center overflow-hidden">
            {book.cover ? (
              <Image
                src={book.cover}
                alt={book.title}
                width={40}
                height={56}
                className="w-full h-full object-cover"
              />
            ) : (
              <BookOpen size={20} className="text-[var(--brand-accent)] opacity-60" />
            )}
          </div>
          <div>
            <Link href={`/home/books/${book.id}`}>
              <p className="font-medium text-[var(--brand-light)] hover:underline hover:text-[var(--brand-gold)] transition-colors">
                {book.title}
              </p>
            </Link>
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
      <td className="px-6 py-4 text-sm text-[var(--brand-light)] opacity-80">
        {book.genres.map(g => g.name).join(', ')}
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
      <td className="px-6 py-4 text-[var(--brand-light)] opacity-80 text-sm">
        {dayjs(book.lastUpdated).format('D MMM YYYY HH:mm A')}
      </td>
      <td className="px-6 py-4">
        <div className="flex justify-end gap-2">
          <Link href={`/home/books/${book.id}/edit`}>
            <button className="p-2 text-[var(--brand-gold)] hover:text-[var(--brand-accent)] hover:bg-[var(--brand-blue)] rounded transition-colors">
              <Edit size={18} />
            </button>
          </Link>
          <button
            onClick={() => onDelete(book.id)}
            className="p-2 text-[var(--brand-gold)] hover:text-[var(--brand-accent)] hover:bg-red-800 rounded transition-colors"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </td>
    </tr>
  )
}