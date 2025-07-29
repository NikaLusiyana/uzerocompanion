// 📄 src/components/ui/CustomAlert.tsx
'use client'

import { X } from 'lucide-react'
import { useState, useEffect } from 'react'

interface CustomAlertProps {
  message: string
  type?: 'success' | 'error' | 'info'
}

export default function CustomAlert({ message, type = 'info' }: CustomAlertProps) {
  const [visible, setVisible] = useState(true)

  // ⬇️ Auto-close setelah 3 detik
  useEffect(() => {
    const timeout = setTimeout(() => setVisible(false), 2000)
    return () => clearTimeout(timeout)
  }, [])

  const getBgColor = () => {
    switch (type) {
      case 'success': return 'bg-green-600'
      case 'error': return 'bg-red-600'
      case 'info':
      default: return 'bg-[var(--brand-blue)]'
    }
  }

  if (!visible) return null

  return (
    <div className={`fixed bottom-6 right-6 z-50 text-white px-4 py-3 rounded-lg shadow-lg flex items-center justify-between min-w-[250px] ${getBgColor()}`}>
      <span className="text-sm">{message}</span>
      <button onClick={() => setVisible(false)} className="ml-4">
        <X size={16} />
      </button>
    </div>
  )
}
