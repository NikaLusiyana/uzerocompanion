// 📄 src/components/ui/PageHeader.tsx → Komponen header halaman yang fleksibel dan reusable

import { ReactNode } from 'react' // Tipe untuk menerima elemen JSX di prop `action`

// Tipe props untuk komponen PageHeader
type PageHeaderProps = {
  title: string // Judul utama halaman
  subtitle?: string // Subjudul opsional di bawah judul
  titleColor?: string // Warna teks untuk judul (opsional, default `--brand-accent`)
  action?: ReactNode // Slot untuk tombol aksi atau elemen tambahan di kanan header
}

// Komponen header halaman, bisa dipakai di semua halaman utama fitur (books, glossary, dll)
export default function PageHeader({
  title,
  subtitle,
  titleColor = 'var(--brand-accent)', // Default warna judul
  action
}: PageHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      {/* Bagian kiri: judul dan subjudul */}
      <div>
        <h1 
          className="text-3xl font-bold font-cinzel" 
          style={{ color: titleColor }} // Warna judul bisa dikustom
        >
          {title}
        </h1>
        {/* Tampilkan subtitle jika ada */}
        {subtitle && (
          <p className="text-[var(--brand-light)] opacity-80">
            {subtitle}
          </p>
        )}
      </div>

      {/* Bagian kanan: tombol aksi atau elemen tambahan */}
      {action && <div className="flex gap-3 w-full md:w-auto">{action}</div>}
    </div>
  )
}
