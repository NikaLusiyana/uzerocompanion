// 📄 src/app/api/books/[id]/chapters/[chapterId]/route.ts

import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { URL } from 'url';

// 🔹 Helper: Ambil ID dari URL
function extractIdsFromUrl(url: string): { bookId: number | null; chapterId: number | null } {
  const parts = new URL(url).pathname.split('/');
  const bookId = parseInt(parts[parts.length - 3]); // [id] position
  const chapterId = parseInt(parts[parts.length - 1]); // [chapterId] position
  return {
    bookId: isNaN(bookId) ? null : bookId,
    chapterId: isNaN(chapterId) ? null : chapterId
  };
}

// 🔹 GET → Ambil detail satu chapter
export async function GET(req: NextRequest) {
  const { bookId, chapterId } = extractIdsFromUrl(req.url);
  
  if (!bookId || !chapterId) {
    return NextResponse.json({ message: 'ID tidak valid' }, { status: 400 });
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
        createdAt: true,
        lastUpdated: true,
      },
    });

    if (!chapter) {
      return NextResponse.json({ message: 'Chapter tidak ditemukan' }, { status: 404 });
    }

    return NextResponse.json(chapter);
  } catch (error) {
    console.error('[CHAPTER_GET]', error);
    return NextResponse.json({ message: 'Gagal mengambil chapter' }, { status: 500 });
  }
}

// 🔹 PATCH → Perbarui chapter
export async function PATCH(req: NextRequest) {
  const { bookId, chapterId } = extractIdsFromUrl(req.url);

  if (!bookId || !chapterId) {
    return NextResponse.json({ message: 'ID tidak valid' }, { status: 400 });
  }

  try {
    const body = await req.json();
    const { title, content } = body;

    const existing = await prisma.chapter.findFirst({
      where: { id: chapterId, bookId: bookId },
    });

    if (!existing) {
      return NextResponse.json({ message: 'Chapter tidak ditemukan' }, { status: 404 });
    }

    const updated = await prisma.chapter.update({
      where: { id: chapterId },
      data: {
        title,
        content,
        lastUpdated: new Date(),
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('[CHAPTER_PATCH]', error);
    return NextResponse.json({ message: 'Gagal memperbarui chapter' }, { status: 500 });
  }
}


// 🔹 DELETE → Hapus chapter
export async function DELETE(req: NextRequest) {
  const { bookId, chapterId } = extractIdsFromUrl(req.url);
  
  if (!bookId || !chapterId) {
    return NextResponse.json({ message: 'ID tidak valid' }, { status: 400 });
  }

  try {
    // Verifikasi chapter termasuk dalam book yang benar
    const existing = await prisma.chapter.findFirst({
      where: {
        id: chapterId,
        bookId: bookId,
      },
    });

    if (!existing) {
      return NextResponse.json({ message: 'Chapter tidak ditemukan' }, { status: 404 });
    }

    await prisma.chapter.delete({
      where: { id: chapterId },
    });

    return NextResponse.json({ message: 'Chapter berhasil dihapus' });
  } catch (error) {
    console.error('[CHAPTER_DELETE]', error);
    return NextResponse.json({ message: 'Gagal menghapus chapter' }, { status: 500 });
  }
}