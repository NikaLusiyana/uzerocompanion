// 📄 src/app/api/books/route.ts

import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { Book, Genre, Chapter } from '@prisma/client';

// 🔹 GET → Ambil semua buku beserta genre & chapter
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)

    const search = searchParams.get('search')?.toLowerCase() || ''
    const statusFilter = searchParams.get('status')
    const genreFilters = searchParams.getAll('genres') // Ambil array string genre name

    const books = await prisma.book.findMany({
      where: {
        AND: [
          search
            ? {
                title: {
                  contains: search,
                  mode: 'insensitive',
                },
              }
            : {},
          statusFilter
            ? {
                status: statusFilter,
              }
            : {},
          genreFilters.length > 0
            ? {
                genres: {
                  some: {
                    name: {
                      in: genreFilters,
                    },
                  },
                },
              }
            : {},
        ],
      },
      include: {
        genres: true,
        chapters: true,
      },
      orderBy: {
        lastUpdated: 'desc',
      },
    }) as (Book & {
      genres: Genre[]
      chapters: Chapter[]
    })[]

    const booksWithProgress = books.map((book) => {
      const totalWords = book.chapters.reduce((sum: number, chapter: Chapter) => {
        return sum + chapter.content.trim().split(/\s+/).length
      }, 0)

      const progress = book.targetWordCount
        ? Math.min(100, Math.floor((totalWords / book.targetWordCount) * 100))
        : 0

      return {
        ...book,
        totalWords,
        progress,
      }
    })

    const stats = {
      totalBooks: books.length,
      published: booksWithProgress.filter((b) => b.status === 'Published').length,
      inProgress: booksWithProgress.filter((b) => b.status === 'Draft').length,
    }

    return NextResponse.json({ books: booksWithProgress, stats })
  } catch (error) {
    console.error('[BOOKS_GET]', error)
    return NextResponse.json({ message: 'Failed to fetch books' }, { status: 500 })
  }
}


// 🔹 POST → Tambah buku baru
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      title,
      author,
      status,
      genreIds, // array of genre IDs
      targetWordCount,
    } = body;

    if (!title || !author || !status || !Array.isArray(genreIds)) {
      return NextResponse.json(
        { message: 'Data tidak lengkap atau format tidak sesuai' },
        { status: 400 }
      );
    }

    const book = await prisma.book.create({
      data: {
        title,
        author,
        status,
        targetWordCount: targetWordCount || 0,
        progress: 0,
        genres: {
          connect: genreIds.map((id: number) => ({ id })),
        },
      },
      include: {
        genres: true,
      },
    });

    return NextResponse.json(book, { status: 201 });
  } catch (error) {
    console.error('[BOOKS_POST]', error);
    return NextResponse.json(
      { message: 'Gagal menyimpan buku' },
      { status: 500 }
    );
  }
}
