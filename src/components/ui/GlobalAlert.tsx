// 📄 components/ui/GlobalAlert.tsx

'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

export default function GlobalAlert({
  type,
  message,
  onClose,
  withIcon = true,
  duration = 4000, // default 4 detik
}: {
  type: 'success' | 'error'
  message: string
  onClose?: () => void
  withIcon?: boolean
  duration?: number
}) {
  const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        if (onClose) {
        const timer = setTimeout(onClose, duration)
        return () => clearTimeout(timer)
        }
    }, [onClose, duration])

  if (!mounted) return null

  const bgColor = type === 'success' ? 'var(--success-bg)' : 'var(--error-bg)'
  const textColor = type === 'success' ? 'var(--success)' : 'var(--error)'

  return createPortal(
    <div
      className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 shadow-lg border rounded-lg px-4 py-3 flex items-center gap-3 max-w-md w-full"
      style={{
        backgroundColor: bgColor,
        color: textColor,
      }}
    >
      {withIcon && (
        <img
          src="/logo.png"
          alt="Logo"
          className="w-6 h-6 object-contain"
        />
      )}
      <span className="flex-1">{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          className="ml-auto text-sm underline"
          style={{ color: textColor }}
        >
          Tutup
        </button>
      )}
    </div>,
    document.body
  )
}
