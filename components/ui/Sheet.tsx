'use client';

import { X } from 'lucide-react';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

interface SheetProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  fullScreen?: boolean;
}

export default function Sheet({ open, onClose, title, children, fullScreen }: SheetProps) {
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  if (!open || typeof document === 'undefined') return null;

  return createPortal(
    <div className="fixed inset-0 z-50 mx-auto flex max-w-md flex-col justify-end">
      <button
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-black/60 animate-fade-in"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={`safe-bottom relative flex flex-col overflow-hidden border-t border-line bg-surface shadow-sheet animate-slide-up ${
          fullScreen ? 'h-[94dvh] rounded-t-2xl' : 'max-h-[88dvh] rounded-t-2xl'
        }`}
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <h2 className="font-display text-base font-semibold text-ink-hi">{title}</h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-elevated text-ink-mid hover:text-ink-hi focus-visible:ring-2 focus-visible:ring-amber/60 outline-none"
          >
            <X size={18} />
          </button>
        </div>
        <div className="no-scrollbar flex-1 overflow-y-auto px-5 py-4">{children}</div>
      </div>
    </div>,
    document.body
  );
}
