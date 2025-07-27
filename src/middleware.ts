import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

  const { pathname } = req.nextUrl

  // Jika user BELUM login dan mencoba akses ke halaman yang butuh login
  const protectedPaths = ["/home"]
  const isProtected = protectedPaths.some((path) => pathname.startsWith(path))

  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/", req.url)) // Redirect ke login
  }

  // Jika user SUDAH login dan mencoba ke halaman login ("/")
  if (pathname === "/" && token) {
    return NextResponse.redirect(new URL("/home", req.url)) // Redirect ke home
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/", "/home/:path*"], // Middleware aktif untuk halaman "/" dan semua di bawah "/home"
}
