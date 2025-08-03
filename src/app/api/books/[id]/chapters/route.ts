// 📄 src/app/api/books/[id]/chapters/route.ts

import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(req: Request, { params }: { params: { bookId: string } }) {
  const chapters = await prisma.chapter.findMany({
    where: { bookId: parseInt(params.bookId) },
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
