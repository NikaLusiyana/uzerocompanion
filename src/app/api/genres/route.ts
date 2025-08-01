// 📄 src/app/api/genre/route.ts

import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

// Ambil semua genre
export async function GET() {
  try {
    const genres = await prisma.genre.findMany({
      orderBy: { name: 'asc' },
    })
    return NextResponse.json(genres)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch genres' }, { status: 500 })
  }
}

// Tambah genre baru (opsional, hanya kalau kamu mau bisa create dari UI)
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name } = body

    if (!name) {
      return NextResponse.json({ error: 'Genre name is required' }, { status: 400 })
    }

    const existing = await prisma.genre.findUnique({ where: { name } })
    if (existing) {
      return NextResponse.json({ error: 'Genre already exists' }, { status: 400 })
    }

    const newGenre = await prisma.genre.create({
      data: { name },
    })

    return NextResponse.json(newGenre, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create genre' }, { status: 500 })
  }
}
