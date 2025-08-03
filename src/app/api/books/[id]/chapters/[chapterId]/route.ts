import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Definisi parameter
type Params = {
  params: {
    id: string;
    chapterId: string;
  };
};

// GET endpoint untuk ambil 1 chapter dari sebuah buku
export async function GET(req: NextRequest, { params }: Params) {
  const bookId = Number(params.id);
  const chapterId = Number(params.chapterId);

  if (isNaN(bookId) || isNaN(chapterId)) {
    return NextResponse.json({ error: 'Invalid bookId or chapterId' }, { status: 400 });
  }

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
export async function DELETE(req: NextRequest, { params }: Params) {
  const bookId = Number(params.id);
  const chapterId = Number(params.chapterId);

  if (isNaN(bookId) || isNaN(chapterId)) {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
  }

  try {
    const chapter = await prisma.chapter.findFirst({
      where: {
        id: chapterId,
        bookId: bookId,
      },
    });

    if (!chapter) {
      return NextResponse.json({ error: 'Chapter not found' }, { status: 404 });
    }

    await prisma.chapter.delete({
      where: {
        id: chapterId,
      },
    });

    return NextResponse.json({ message: 'Chapter deleted successfully' });
  } catch (error) {
    console.error('[CHAPTER_DELETE_ERROR]', error);
    return NextResponse.json({ error: 'Failed to delete chapter' }, { status: 500 });
  }
}
