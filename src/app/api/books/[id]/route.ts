// 📄 src/app/api/books/[id]/route.ts

import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import { URL } from 'url'

// GET → ambil satu buku
export async function GET(req: NextRequest) {
  const { pathname } = new URL(req.url)
  const id = parseInt(pathname.split('/').pop() || '')

  if (isNaN(id)) {
    return NextResponse.json({ message: 'ID tidak valid' }, { status: 400 })
  }

  const book = await prisma.book.findUnique({ where: { id } })

  if (!book) {
    return NextResponse.json({ message: 'Buku tidak ditemukan' }, { status: 404 })
  }

  return NextResponse.json(book)
}

// PUT → update buku
export async function PUT(req: NextRequest) {
  const { pathname } = new URL(req.url)
  const id = parseInt(pathname.split('/').pop() || '')

  if (isNaN(id)) {
    return NextResponse.json({ message: 'ID tidak valid' }, { status: 400 })
  }

  try {
    const body = await req.json()
    const { title, author, status, progress, cover } = body

    const updated = await prisma.book.update({
      where: { id },
      data: { title, author, status, progress, cover }
    })

    return NextResponse.json(updated)
  } catch (error) {
    console.error('[BOOKS_PUT]', error)
    return NextResponse.json({ message: 'Gagal memperbarui buku' }, { status: 500 })
  }
}

// DELETE → hapus buku
export async function DELETE(req: NextRequest) {
  const { pathname } = new URL(req.url)
  const id = parseInt(pathname.split('/').pop() || '')

  if (isNaN(id)) {
    return NextResponse.json({ message: 'ID tidak valid' }, { status: 400 })
  }

  try {
    await prisma.book.delete({ where: { id } })
    return NextResponse.json({ message: 'Buku berhasil dihapus' })
  } catch (error) {
    console.error('[BOOKS_DELETE]', error)
    return NextResponse.json({ message: 'Gagal menghapus buku' }, { status: 500 })
  }
}
