// 📄 src/components/Footer.tsx → Komponen footer sederhana di bagian bawah halaman

export default function Footer() {
  return (
    <footer className="sticky bottom-0 bg-[var(--background)] text-[var(--brand-accent)] py-4 mt-12 border-t border-[var(--brand-dark)]">
      {/* Kontainer utama footer */}
      <div className="mx-auto px-12 flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
        
        {/* Teks hak cipta dinamis berdasarkan tahun saat ini */}
        <p className="text-md">&copy; {new Date().getFullYear()} Nika Lusiyana. All rights reserved.</p>
        
        {/* Navigasi link ke halaman Tentang dan Kontak */}
        <div className="flex gap-4 text-md font-medium">
          <a href="/about" className="hover:text-[var(--brand-gold)] transition">About</a>
          <a href="/contact" className="hover:text-[var(--brand-gold)] transition">Contact</a>
        </div>
      </div>
    </footer>
  )
}
