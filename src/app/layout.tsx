// 📄 app/layout.tsx → layout utama

import type { Metadata } from "next";
import { Cinzel, Inter } from "next/font/google";
import "./globals.css";
import Providers from '@/src/app/providers';
 // 🔁 kita bungkus dengan client component khusus

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  weight: ['400', '700'],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: 'Uzero Companion',
    template: '%s | Uzero Companion'
  },
  description: 'Companion app for the Uzero fantasy series',
  icons: {
    icon: '/logo.png',
  },
  metadataBase: new URL(process.env.NEXTAUTH_URL || 'http://localhost:3000'),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cinzel.variable} ${inter.variable}`} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen antialiased font-sans bg-[var(--brand-darker)] text-[var(--foreground)] selection:bg-brand/50">
        <Providers>{children}</Providers> {/* ✅ Provider dibungkus khusus */}
      </body>
    </html>
  );
}
