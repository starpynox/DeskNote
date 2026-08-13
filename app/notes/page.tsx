'use client';

import { useMemo, useState } from 'react';
import { Search, NotebookPen } from 'lucide-react';
import { useNotes } from '@/lib/storage';
import { NOTE_TAGS, NoteTag } from '@/lib/types';
import { TAG_STYLES } from '@/lib/constants';
import NoteComposer from '@/components/notes/NoteComposer';
import NoteCard from '@/components/notes/NoteCard';
import EmptyState from '@/components/ui/EmptyState';

export default function NotesPage() {
  const { notes, add, remove, hydrated } = useNotes();
  const [query, setQuery] = useState('');
  const [activeTag, setActiveTag] = useState<NoteTag | null>(null);
  const [activeSubject, setActiveSubject] = useState<string | null>(null);

  const subjects = useMemo(
    () => Array.from(new Set(notes.map((n) => n.subject))).slice(0, 8),
    [notes]
  );

  const filtered = notes.filter((n) => {
    const q = query.trim().toLowerCase();
    const matchesQuery =
      !q || n.content.toLowerCase().includes(q) || n.subject.toLowerCase().includes(q);
    const matchesTag = !activeTag || n.tag === activeTag;
    const matchesSubject = !activeSubject || n.subject === activeSubject;
    return matchesQuery && matchesTag && matchesSubject;
  });

  return (
    <div className="safe-top flex flex-col gap-5 px-4 pt-6">
      <header>
        <p className="text-xs font-medium uppercase tracking-wider text-ink-low">Notes</p>
        <h1 className="font-display text-2xl font-bold text-ink-hi">Lecture &amp; friend notes</h1>
      </header>

      <NoteComposer onSubmit={add} />

      <div className="relative">
        <Search
          size={16}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-low"
        />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search notes…"
          className="w-full rounded-xl border border-line bg-surface py-2.5 pl-9 pr-3 text-sm text-ink-hi outline-none placeholder:text-ink-low focus:border-amber/60"
        />
      </div>

      <div className="flex flex-col gap-2">
        <div className="no-scrollbar -mx-1 flex gap-1.5 overflow-x-auto px-1">
          <FilterPill
            active={activeTag === null}
            label="All tags"
            onClick={() => setActiveTag(null)}
          />
          {NOTE_TAGS.map((t) => (
            <FilterPill
              key={t}
              active={activeTag === t}
              label={t}
              accent={TAG_STYLES[t]}
              onClick={() => setActiveTag(activeTag === t ? null : t)}
            />
          ))}
        </div>
        {subjects.length > 0 && (
          <div className="no-scrollbar -mx-1 flex gap-1.5 overflow-x-auto px-1">
            <FilterPill
              active={activeSubject === null}
              label="All subjects"
              onClick={() => setActiveSubject(null)}
              subtle
            />
            {subjects.map((s) => (
              <FilterPill
                key={s}
                active={activeSubject === s}
                label={s}
                onClick={() => setActiveSubject(activeSubject === s ? null : s)}
                subtle
              />
            ))}
          </div>
        )}
      </div>

      {!hydrated ? null : filtered.length === 0 ? (
        <EmptyState
          icon={NotebookPen}
          title={notes.length === 0 ? 'Your feed is empty' : 'No notes match'}
          description={
            notes.length === 0
              ? 'Dictate or type your first lecture note above.'
              : 'Try a different search term or clear your filters.'
          }
        />
      ) : (
        <ul className="flex flex-col gap-3 pb-4">
          {filtered.map((note) => (
            <NoteCard key={note.id} note={note} onDelete={() => remove(note.id)} />
          ))}
        </ul>
      )}
    </div>
  );
}

function FilterPill({
  label,
  active,
  onClick,
  accent,
  subtle,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  accent?: { text: string; bg: string };
  subtle?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`shrink-0 rounded-full px-3 py-1.5 text-[11px] font-semibold transition-colors ${
        active
          ? accent
            ? `${accent.bg} ${accent.text}`
            : 'bg-amber/15 text-amber'
          : subtle
          ? 'bg-transparent text-ink-low ring-1 ring-line'
          : 'bg-elevated text-ink-low'
      }`}
    >
      {label}
    </button>
  );
}
