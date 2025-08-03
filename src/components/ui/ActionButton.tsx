'use client'

import { ReactNode } from 'react';

interface ActionButtonProps {
  children: ReactNode;
  icon?: ReactNode;
  onClick?: () => void;
  intent?: 'default' | 'danger' | 'success' | 'warning' | 'info' | 'secondary';
}

export default function ActionButton({
  children,
  icon,
  onClick,
  intent = 'default',
}: ActionButtonProps) {
  const baseClass =
    'cursor-pointer inline-flex items-center gap-2 rounded-md px-3 py-2 font-medium text-sm transition-colors';

  const intentClass = {
    default:
      'bg-[var(--brand-gold)] text-[var(--brand-darker)] hover:bg-[var(--brand-goldhover)] hover:text-[var(--brand-accent)]',
    danger:
      'bg-[var(--brand-gold)] hover:bg-red-600 text-[var(--brand-darker)] hover:text-white',
    success:
      'bg-[var(--brand-gold)] hover:bg-green-600 text-[var(--brand-darker)] hover:text-white',
    warning:
      'bg-[var(--brand-gold)] hover:bg-yellow-500 text-[var(--brand-darker)] hover:text-black',
    info:
      'bg-[var(--brand-gold)] hover:bg-blue-600 text-[var(--brand-darker)] hover:text-white',
    secondary:
      'bg-[var(--brand-gold)] hover:bg-gray-300 text-[var(--brand-darker)] hover:text-black',
  }[intent];

  return (
    <button onClick={onClick} className={`${baseClass} ${intentClass}`}>
      {icon}
      {children}
    </button>
  );
}
