// 📄 src/app/api/books/route.ts

import { prisma } from '@/lib/prisma'
import { NextResponse, NextRequest } from 'next/server'
import { Book } from '@prisma/client'

// GET → ambil semua buku
export async function GET() {
  const books = await prisma.book.findMany({
    orderBy: { lastUpdated: 'desc' }
  })

  const stats = {
    totalBooks: books.length,
    published: books.filter((b: Book) => b.status === 'Published').length,
    inProgress: books.filter((b: Book) => b.status === 'Draft').length
  }

  return NextResponse.json({ books, stats })
}

// POST → tambah buku baru
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const { title, author, status, progress, cover } = body

    // Validasi sederhana
    if (!title || !author || typeof progress !== 'number') {
      return NextResponse.json(
        { message: 'Data tidak lengkap atau tidak valid' },
        { status: 400 }
      )
    }

    const book = await prisma.book.create({
      data: {
        title,
        author,
        status,
        progress,
        cover: cover || null // cover bisa null
      }
    })

    return NextResponse.json(book, { status: 201 })
  } catch (error) {
    console.error('[BOOKS_POST]', error)
    return NextResponse.json(
      { message: 'Gagal menyimpan buku' },
      { status: 500 }
    )
  }
}
