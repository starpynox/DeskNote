'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';
import { NOTE_TAGS } from '@/lib/types';
import type { NoteTag } from '@/lib/types';
import { TAG_STYLES } from '@/lib/constants';
import VoiceDictationButton from './VoiceDictationButton';

interface NoteComposerProps {
  onSubmit: (input: { subject: string; tag: NoteTag; content: string }) => void;
}

export default function NoteComposer({ onSubmit }: NoteComposerProps) {
  const [subject, setSubject] = useState('');
  const [tag, setTag] = useState<NoteTag>('#General');
  const [content, setContent] = useState('');

  function handleDictation(transcript: string) {
    setContent((prev) => (prev ? `${prev} ${transcript}` : transcript));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim()) return;
    onSubmit({ subject: subject.trim() || 'General', tag, content: content.trim() });
    setContent('');
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 rounded-2xl border border-line bg-surface p-4"
    >
      <input
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        placeholder="Subject (optional)"
        className="rounded-lg border border-line bg-elevated px-3 py-2 text-sm text-ink-hi outline-none placeholder:text-ink-low focus:border-amber/60"
      />

      <div className="no-scrollbar -mx-1 flex gap-1.5 overflow-x-auto px-1">
        {NOTE_TAGS.map((t) => {
          const active = t === tag;
          const s = TAG_STYLES[t];
          return (
            <button
              type="button"
              key={t}
              onClick={() => setTag(t)}
              className={`shrink-0 rounded-full px-3 py-1.5 text-[11px] font-semibold transition-colors ${
                active ? `${s.bg} ${s.text}` : 'bg-elevated text-ink-low'
              }`}
            >
              {t}
            </button>
          );
        })}
      </div>

      <div className="flex items-end gap-2">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Dictate or type a quick note…"
          rows={2}
          className="flex-1 resize-none rounded-lg border border-line bg-elevated px-3 py-2 text-sm text-ink-hi outline-none placeholder:text-ink-low focus:border-amber/60"
        />
        <VoiceDictationButton onResult={handleDictation} />
        <button
          type="submit"
          disabled={!content.trim()}
          aria-label="Save note"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-amber text-base disabled:opacity-40"
        >
          <Send size={17} />
        </button>
      </div>
    </form>
  );
}
