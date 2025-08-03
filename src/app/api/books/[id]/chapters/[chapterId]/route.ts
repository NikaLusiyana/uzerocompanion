// 📄 src/app/api/books/[id]/chapters/[chapterId]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET endpoint untuk ambil 1 chapter dari sebuah buku
export async function GET(
  req: NextRequest,
  context: { params: { id: string; chapterId: string } }
) {
  const { id, chapterId } = context.params;
  const bookId = Number(id);
  const chapId = Number(chapterId);

  if (isNaN(bookId) || isNaN(chapId)) {
    return NextResponse.json({ error: 'Invalid bookId or chapterId' }, { status: 400 });
  }

  try {
    const chapter = await prisma.chapter.findFirst({
      where: { id: chapId, bookId },
      select: {
        id: true,
        title: true,
        content: true,
        bookId: true,
        lastUpdated: true,
      },
    });

    if (!chapter) {
      return NextResponse.json({ error: 'Chapter not found' }, { status: 404 });
    }

    return NextResponse.json(chapter);
  } catch (error) {
    console.error('[CHAPTER_GET_ERROR]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE → Hapus 1 chapter dari 1 buku
export async function DELETE(
  req: NextRequest,
  context: { params: { id: string; chapterId: string } }
) {
  const { id, chapterId } = context.params;
  const bookId = Number(id);
  const chapId = Number(chapterId);

  if (isNaN(bookId) || isNaN(chapId)) {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
  }

  try {
    const chapter = await prisma.chapter.findFirst({
      where: { id: chapId, bookId },
    });

    if (!chapter) {
      return NextResponse.json({ error: 'Chapter not found' }, { status: 404 });
    }

    await prisma.chapter.delete({
      where: { id: chapId },
    });

    return NextResponse.json({ message: 'Chapter deleted successfully' });
  } catch (error) {
    console.error('[CHAPTER_DELETE_ERROR]', error);
    return NextResponse.json({ error: 'Failed to delete chapter' }, { status: 500 });
  }
}
