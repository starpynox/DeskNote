'use client';

import { Trash2 } from 'lucide-react';
import { Note } from '@/lib/types';
import { TAG_STYLES } from '@/lib/constants';

const TIME_FMT = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  hour: 'numeric',
  minute: '2-digit',
});

export default function NoteCard({ note, onDelete }: { note: Note; onDelete: () => void }) {
  const s = TAG_STYLES[note.tag];
  return (
    <li className="rounded-2xl border border-line bg-surface p-4">
      <div className="mb-2 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${s.bg} ${s.text}`}>
            {note.tag}
          </span>
          <span className="text-[11px] font-medium text-ink-low">{note.subject}</span>
        </div>
        <button
          onClick={onDelete}
          aria-label="Delete note"
          className="text-ink-low hover:text-danger"
        >
          <Trash2 size={14} />
        </button>
      </div>
      <p className="whitespace-pre-wrap text-sm leading-relaxed text-ink-hi">{note.content}</p>
      <p className="mt-2 text-[11px] text-ink-low">{TIME_FMT.format(note.createdAt)}</p>
    </li>
  );
}
