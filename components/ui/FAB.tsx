'use client';

import { Plus } from 'lucide-react';

export default function FAB({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="fixed bottom-[6.5rem] right-4 z-30 mx-auto flex h-14 w-14 max-w-md items-center justify-center rounded-2xl bg-amber text-base shadow-glow transition-transform active:scale-95"
      style={{ right: 'max(1rem, calc((100vw - 28rem) / 2 + 1rem))' }}
    >
      <Plus size={26} strokeWidth={2.5} />
    </button>
  );
}
