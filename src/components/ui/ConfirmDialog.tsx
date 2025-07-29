// 📄 src/components/ui/COnfirmDialog.tsx


'use client'

import { useEffect } from 'react'
import Image from 'next/image'

interface ConfirmDialogProps {
  open: boolean
  title?: string
  message: string
  onConfirm: () => void
  onCancel: () => void
}

export default function ConfirmDialog({
  open,
  title = 'Konfirmasi',
  message,
  onConfirm,
  onCancel
}: ConfirmDialogProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancel()
    }
    if (open) document.addEventListener('keydown', handleEsc)
    return () => document.removeEventListener('keydown', handleEsc)
  }, [open])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.25)] backdrop-blur-md min-h-screen">
      <div className="bg-[var(--brand-darker)] p-6 rounded-lg shadow-xl w-full max-w-sm text-[var(--brand-light)]">
        <div className="flex items-center gap-3 mb-4">
          <Image src="/logo.png" width={32} height={32} alt="Logo" />
          <h2 className="text-lg font-semibold">{title}</h2>
        </div>
        <p className="mb-6 text-sm opacity-90">{message}</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-[var(--background)] hover:bg-[var(--brand-dark)] rounded text-[var(--brand-light)]"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-[var(--brand-gold)]  hover:text-[var(--brand-accent)] hover:bg-red-800 text-[var(--brand-darker)] rounded font-medium"
          >
            Ya, hapus
          </button>
        </div>
      </div>
    </div>
  )
}
