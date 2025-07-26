// 📄 components/ui/StatCard.tsx → Komponen kartu statistik serbaguna (misalnya: total buku, progres, dll.)

// Tipe props untuk komponen StatCard
type StatCardProps = {
  icon: React.ReactNode;       // Ikon di sisi kiri kartu
  label: string;               // Label keterangan (misal: "Total Buku")
  value: number | string;      // Nilai utama (angka atau teks)
  loading?: boolean;           // Jika true, tampilkan animasi loading
  onClick?: () => void;        // Event saat diklik (opsional, misal navigasi)
}

// Komponen kartu statistik yang reusable dan responsif
export function StatCard({ icon, label, value, loading, onClick }: StatCardProps) {
  return (
    <div 
      className="bg-[var(--brand-darker)] hover:bg-[var(--brand-dark)] p-4 rounded-lg border border-[var(--brand-darker)] cursor-pointer transition-colors"
      onClick={onClick} // Opsional, jika disediakan akan menjadikan kartu interaktif
    >
      <div className="flex items-center gap-3">
        {/* Ikon di dalam bulatan */}
        <div className="p-2 rounded-full bg-[var(--brand-darker)] text-[var(--brand-accent)]">
          {icon}
        </div>

        {/* Label dan nilai */}
        <div>
          <p className="text-[var(--brand-light)] opacity-80 text-sm">{label}</p>
          
          {/* Jika loading, tampilkan placeholder animasi; jika tidak, tampilkan nilai */}
          {loading ? (
            <div className="h-6 w-10 bg-[var(--brand-dark)] animate-pulse rounded" />
          ) : (
            <p className="text-xl font-bold text-[var(--brand-accent)]">{value}</p>
          )}
        </div>
      </div>
    </div>
  );
}
