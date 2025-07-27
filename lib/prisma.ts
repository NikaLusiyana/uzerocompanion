// 📄 lib/prisma.ts → 
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Cegah membuat instance baru tiap kali reload (penting di dev mode)
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query'], // bisa dihapus kalau gak mau lihat query DB
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
