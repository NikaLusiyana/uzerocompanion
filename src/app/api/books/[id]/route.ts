// 📄 src/app/api/books/[id]/route.ts

import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { URL } from 'url';

// 🔹 Helper: Ambil ID dari URL
function extractIdFromUrl(url: string): number | null {
  const id = parseInt(new URL(url).pathname.split('/').pop() || '');
  return isNaN(id) ? null : id;
}

// 🔹 GET → Ambil detail satu buku
export async function GET(req: NextRequest) {
  const id = extractIdFromUrl(req.url);
  if (!id) {
    return NextResponse.json({ message: 'ID tidak valid' }, { status: 400 });
  }

  const book = await prisma.book.findUnique({
    where: { id },
    include: {
      genres: true,
    },
  });

  if (!book) {
    return NextResponse.json({ message: 'Buku tidak ditemukan' }, { status: 404 });
  }

  return NextResponse.json(book);
}

// 🔹 PUT → Perbarui data buku (termasuk genres)
export async function PUT(req: NextRequest) {
  const id = extractIdFromUrl(req.url);
  if (!id) {
    return NextResponse.json({ message: 'ID tidak valid' }, { status: 400 });
  }

  try {
    const body = await req.json();
    const { title, author, status, progress, sinopsis, cover, genreIds } = body;

    if (!title || typeof title !== 'string') {
      return NextResponse.json({ message: 'Judul tidak valid' }, { status: 400 });
    }

    const updated = await prisma.book.update({
      where: { id },
      data: {
        title,
        author,
        status,
        progress,
        cover,
        sinopsis,
        genres: {
          set: genreIds?.map((gid: number) => ({ id: gid })) || [],
        },
      },
      include: {
        genres: true,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('[BOOKS_PUT]', error);
    return NextResponse.json({ message: 'Gagal memperbarui buku' }, { status: 500 });
  }
}

// 🔹 DELETE → Hapus buku
export async function DELETE(req: NextRequest) {
  const id = extractIdFromUrl(req.url);
  if (!id) {
    return NextResponse.json({ message: 'ID tidak valid' }, { status: 400 });
  }

  try {
    await prisma.book.delete({ where: { id } });
    return NextResponse.json({ message: 'Buku berhasil dihapus' });
  } catch (error) {
    console.error('[BOOKS_DELETE]', error);
    return NextResponse.json({ message: 'Gagal menghapus buku' }, { status: 500 });
  }
}
