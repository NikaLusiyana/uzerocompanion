// 📄 src/app/api/books/stats/route.ts

import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { Chapter } from '@prisma/client';

// 🔹 GET → Ambil statistik global buku (tidak terpengaruh filter/paginasi)
export async function GET() {
  try {
    const books = await prisma.book.findMany({
      include: {
        chapters: true,
      },
    });

    const booksWithProgress = books.map((book) => {
      const totalWords = book.chapters.reduce((sum: number, chapter: Chapter) => {
        return sum + chapter.content.trim().split(/\s+/).length;
      }, 0);

      const progress = book.targetWordCount
        ? Math.min(100, Math.floor((totalWords / book.targetWordCount) * 100))
        : 0;

      return {
        ...book,
        totalWords,
        progress,
      };
    });

    const stats = {
      totalBooks: books.length,
      published: booksWithProgress.filter((b) => b.status === 'Published').length,
      inProgress: booksWithProgress.filter((b) => b.status === 'Draft').length,
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error('[BOOKS_STATS_GET]', error);
    return NextResponse.json({ message: 'Failed to fetch book stats' }, { status: 500 });
  }
}
