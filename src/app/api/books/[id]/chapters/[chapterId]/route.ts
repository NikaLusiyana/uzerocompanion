// 📄 src/app/api/books/[id]/chapters/[chapterId]/route.ts

import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

// 🔹 GET: Ambil satu chapter berdasarkan bookId dan chapterId
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string; chapterId: string } }
) {
  const bookId = Number(params.id);
  const chapterId = Number(params.chapterId);

  try {
    const chapter = await prisma.chapter.findFirst({
      where: {
        id: chapterId,
        bookId: bookId,
      },
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
        lastUpdated: true,
      },
    });

    if (!chapter) {
      return NextResponse.json({ error: 'Chapter not found' }, { status: 404 });
    }

    return NextResponse.json(chapter);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch chapter' }, { status: 500 });
  }
}

// 🔹 DELETE: Hapus satu chapter berdasarkan bookId dan chapterId
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string; chapterId: string } }
) {
  const bookId = Number(params.id);
  const chapterId = Number(params.chapterId);

  try {
    const existing = await prisma.chapter.findFirst({
      where: {
        id: chapterId,
        bookId: bookId,
      },
    });

    if (!existing) {
      return NextResponse.json({ error: 'Chapter not found' }, { status: 404 });
    }

    await prisma.chapter.delete({
      where: { id: chapterId },
    });

    return NextResponse.json({ message: 'Chapter deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete chapter' }, { status: 500 });
  }
}
