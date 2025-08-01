// 📄 components/ui/ActionButton.tsx → Tombol aksi reusable untuk navigasi atau tindakan utama

'use client'

import { ReactNode } from 'react'; // Tipe untuk children dan icon sebagai elemen React

// Interface untuk properti komponen ActionButton
interface ActionButtonProps {
  children: ReactNode;     // Isi teks tombol
  icon?: ReactNode;        // Opsional: ikon di sisi kiri teks
  onClick?: () => void;    // Opsional: fungsi yang dipanggil saat tombol diklik
}

// Komponen tombol aksi yang dapat digunakan ulang (reusable)
// Menggunakan Tailwind CSS untuk styling responsif dan transisi warna
export default function ActionButton({ children, icon, onClick }: ActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className="cursor-pointer inline-flex items-center gap-2 rounded-md bg-[var(--brand-gold)] text-[var(--brand-darker)] px-3 py-2 font-medium text-sm hover:bg-[var(--brand-goldhover)] hover:text-[var(--brand-accent)] transition-colors"
    >
      {icon}
      {children}
    </button>
  )
}
