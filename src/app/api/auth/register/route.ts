// app/api/auth/register/route.ts

import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcrypt'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { username, email, password } = body

    // Validasi input
    if (!email || !password || !username) {
      return NextResponse.json({ error: 'Semua field wajib diisi' }, { status: 400 })
    }

    // Cek apakah user sudah ada
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json({ error: 'Email sudah terdaftar' }, { status: 400 })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Simpan user baru
    const newUser = await prisma.user.create({
      data: {
        name: username,
        email,
        password: hashedPassword,
      },
    })

    return NextResponse.json({ message: 'Registrasi berhasil', user: { id: newUser.id, email: newUser.email } })
  } catch (error) {
    console.error('[REGISTER_ERROR]', error)
    return NextResponse.json({ error: 'Gagal melakukan registrasi' }, { status: 500 })
  }
}
