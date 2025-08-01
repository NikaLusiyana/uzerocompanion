// 📝 src/app/api/auth/[...nextauth]/route.ts

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { compare } from "bcryptjs";
import { prisma } from "@/lib/prisma";

const handler = NextAuth({
  providers: [
    // 🔐 Email/Password login
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.password) return null;

        const isValid = await compare(credentials.password, user.password);
        if (!isValid) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name ?? "User",
        };
      },
    }),

    // 🔗 Google OAuth login
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  // 🔐 Session config
  session: {
    strategy: "jwt",
  },

  // 🔄 Callback untuk inject data ke session dan token
  callbacks: {
    // Saat token dibuat atau diperbarui
    async jwt({ token, user, account }) {
      // Saat login pertama kali via provider (user baru)
      if (account && user) {
        token.id = user.id;

        // Cek apakah user sudah ada di DB (untuk Google OAuth)
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email! },
        });

        // Jika belum, buat user baru secara otomatis
        if (!existingUser) {
          const newUser = await prisma.user.create({
            data: {
              email: user.email!,
              name: user.name ?? "User",
              image: user.image ?? undefined,
              // Tidak menyimpan password untuk OAuth
            },
          });
          token.id = newUser.id;
        } else {
          token.id = existingUser.id;
        }
      }

      return token;
    },

    // Inject token ke session.user
    async session({ session, token }) {
      if (session.user && token) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
      }
      return session;
    },
  },

  // Redirect custom
  pages: {
    signIn: "/",
  },

  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };