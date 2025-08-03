// 📄 src/app/api/books/[bookId]/chapters/route.ts

import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

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
