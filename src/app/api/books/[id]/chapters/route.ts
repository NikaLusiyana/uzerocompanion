// 📄 src/app/api/books/[id]/chapters/route.ts

import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

// GET all chapters for a book
export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const match = url.pathname.match(/\/api\/books\/(\d+)\/chapters/)
  const bookId = match ? parseInt(match[1]) : null

  if (!bookId) {
    return NextResponse.json({ error: 'Invalid book ID' }, { status: 400 })
  }

  const chapters = await prisma.chapter.findMany({
    where: { bookId },
    select: {
      id: true,
      title: true,
    },
    orderBy: {
      id: 'asc',
    },
  })

  return NextResponse.json(chapters)
}

// POST create a new chapter
export async function POST(req: NextRequest) {
  try {
    const url = new URL(req.url)
    const match = url.pathname.match(/\/api\/books\/(\d+)\/chapters/)
    const bookId = match ? parseInt(match[1]) : null

    if (!bookId) {
      return NextResponse.json({ error: 'Invalid book ID' }, { status: 400 })
    }

    const body = await req.json()
    const { title, content } = body

    if (!title || !content) {
      return NextResponse.json({ error: 'Missing title or content' }, { status: 400 })
    }

    const newChapter = await prisma.chapter.create({
      data: {
        title,
        content,
        bookId,
      },
    })

    return NextResponse.json(newChapter, { status: 201 })
  } catch (error) {
    console.error('[POST /api/books/[id]/chapters]', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
