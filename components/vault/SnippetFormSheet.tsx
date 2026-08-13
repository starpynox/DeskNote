'use client';

import { useEffect, useState } from 'react';
import Sheet from '@/components/ui/Sheet';
import { CODE_LANGUAGES, CodeLanguage, Snippet } from '@/lib/types';

interface SnippetFormSheetProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (input: { title: string; language: CodeLanguage; code: string; notes: string }) => void;
  initial?: Snippet | null;
}

const EMPTY = { title: '', language: 'Python' as CodeLanguage, code: '', notes: '' };

export default function SnippetFormSheet({
  open,
  onClose,
  onSubmit,
  initial,
}: SnippetFormSheetProps) {
  const [form, setForm] = useState(EMPTY);
  const [error, setError] = useState('');

  useEffect(() => {
    if (open) {
      setError('');
      setForm(
        initial
          ? {
              title: initial.title,
              language: initial.language,
              code: initial.code,
              notes: initial.notes,
            }
          : EMPTY
      );
    }
  }, [open, initial]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim() || !form.code.trim()) {
      setError('Title and code are required.');
      return;
    }
    onSubmit(form);
    onClose();
  }

  return (
    <Sheet open={open} onClose={onClose} title={initial ? 'Edit snippet' : 'New snippet'} fullScreen>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 pb-6">
        <Field label="Snippet title">
          <input
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            placeholder="e.g. Binary search"
            className="input"
          />
        </Field>

        <Field label="Language">
          <select
            value={form.language}
            onChange={(e) =>
              setForm((f) => ({ ...f, language: e.target.value as CodeLanguage }))
            }
            className="input"
          >
            {CODE_LANGUAGES.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Code">
          <textarea
            value={form.code}
            onChange={(e) => setForm((f) => ({ ...f, code: e.target.value }))}
            placeholder="Paste or write your code…"
            rows={10}
            spellCheck={false}
            className="input resize-none font-mono text-[13px] leading-relaxed"
          />
        </Field>

        <Field label="Notes & learnings">
          <textarea
            value={form.notes}
            onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
            placeholder="Explain the approach, complexity, or gotchas…"
            rows={4}
            className="input resize-none"
          />
        </Field>

        {error && <p className="text-xs font-medium text-danger">{error}</p>}

        <button
          type="submit"
          className="mt-2 rounded-xl bg-amber py-3 text-sm font-semibold text-base"
        >
          {initial ? 'Save changes' : 'Save snippet'}
        </button>
      </form>

      <style jsx global>{`
        .input {
          width: 100%;
          border-radius: 0.75rem;
          border: 1px solid #2a2f3e;
          background-color: #1e2230;
          padding: 0.65rem 0.85rem;
          font-size: 0.875rem;
          color: #edeef2;
          outline: none;
        }
        .input::placeholder {
          color: #6e7385;
        }
        .input:focus {
          border-color: #f5a623;
          box-shadow: 0 0 0 3px rgba(245, 166, 35, 0.15);
        }
      `}</style>
    </Sheet>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-medium text-ink-low">{label}</span>
      {children}
    </label>
  );
}
