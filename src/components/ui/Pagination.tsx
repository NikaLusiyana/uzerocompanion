// 📄 src/components/ui/Pagination.tsx

'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const handlePrevious = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <nav
      className="flex items-center justify-center gap-4 mt-6"
      aria-label="Navigasi halaman"
    >
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="cursor-pointer flex items-center gap-1 px-3 py-2 rounded text-sm bg-[var(--brand-dark)] text-[var(--brand-light)] hover:opacity-90 disabled:opacity-30 disabled:cursor-not-allowed transition"
        aria-label="Halaman sebelumnya"
      >
        <ChevronLeft size={16} />
        <span>Sebelumnya</span>
      </button>

      <span className="text-sm text-[var(--brand-light)]">
        Halaman <strong>{currentPage}</strong> dari <strong>{totalPages}</strong>
      </span>

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="cursor-pointer flex items-center gap-1 px-3 py-2 rounded text-sm bg-[var(--brand-dark)] text-[var(--brand-light)] hover:opacity-90 disabled:opacity-30 disabled:cursor-not-allowed transition"
        aria-label="Halaman selanjutnya"
      >
        <span>Selanjutnya</span>
        <ChevronRight size={16} />
      </button>
    </nav>
  );
}
