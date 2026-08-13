'use client';

import { useEffect, useMemo, useState } from 'react';
import Prism from 'prismjs';
// Load in dependency order: clike underpins java/c/cpp.
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-nasm';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-verilog';
import { Check, Copy, Pencil, Trash2 } from 'lucide-react';
import Sheet from '@/components/ui/Sheet';
import { Snippet } from '@/lib/types';
import { LANGUAGE_STYLES } from '@/lib/constants';
import LanguageBadge from '@/components/ui/LanguageBadge';

interface SnippetModalProps {
  snippet: Snippet | null;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const DATE_FMT = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
});

export default function SnippetModal({ snippet, onClose, onEdit, onDelete }: SnippetModalProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setCopied(false);
  }, [snippet?.id]);

  const highlightedLines = useMemo(() => {
    if (!snippet) return [];
    const grammarName = LANGUAGE_STYLES[snippet.language].prism.replace('language-', '');
    const grammar = Prism.languages[grammarName] || Prism.languages.markup;
    const html = Prism.highlight(snippet.code, grammar, grammarName);
    return html.split('\n');
  }, [snippet]);

  if (!snippet) return null;

  async function handleCopy() {
    if (!snippet) return;
    try {
      await navigator.clipboard.writeText(snippet.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard unavailable — silently ignore
    }
  }

  function handleDelete() {
    if (window.confirm('Delete this snippet?')) {
      onDelete();
    }
  }

  return (
    <Sheet open={!!snippet} onClose={onClose} title={snippet.title} fullScreen>
      <div className="flex flex-col gap-4 pb-8">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <LanguageBadge language={snippet.language} />
            <span className="text-xs text-ink-low">{DATE_FMT.format(snippet.createdAt)}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 rounded-lg bg-elevated px-3 py-1.5 text-xs font-medium text-ink-mid hover:text-ink-hi"
            >
              {copied ? <Check size={13} className="text-success" /> : <Copy size={13} />}
              {copied ? 'Copied' : 'Copy code'}
            </button>
            <button
              onClick={onEdit}
              className="flex items-center gap-1.5 rounded-lg bg-elevated px-3 py-1.5 text-xs font-medium text-ink-mid hover:text-ink-hi"
            >
              <Pencil size={13} /> Edit
            </button>
            <button
              onClick={handleDelete}
              className="flex items-center gap-1.5 rounded-lg bg-danger/10 px-3 py-1.5 text-xs font-medium text-danger"
            >
              <Trash2 size={13} /> Delete
            </button>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-line bg-[#0c0e13]">
          <pre className="no-scrollbar m-0 flex overflow-x-auto p-0 text-[13px]">
            <code className="flex w-full flex-col">
              {highlightedLines.map((lineHtml, i) => (
                <span key={i} className="flex px-0">
                  <span className="select-none border-r border-line/70 px-3 py-0.5 text-right text-ink-low/60">
                    {i + 1}
                  </span>
                  <span
                    className="flex-1 whitespace-pre px-4 py-0.5"
                    dangerouslySetInnerHTML={{ __html: lineHtml || '&nbsp;' }}
                  />
                </span>
              ))}
            </code>
          </pre>
        </div>

        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-ink-low">
            Notes &amp; learnings
          </p>
          {snippet.notes ? (
            <p className="whitespace-pre-wrap rounded-xl bg-elevated p-3.5 text-sm leading-relaxed text-ink-mid">
              {snippet.notes}
            </p>
          ) : (
            <p className="rounded-xl border border-dashed border-line p-3.5 text-sm text-ink-low">
              No notes yet. Tap edit to add an explanation or study tip.
            </p>
          )}
        </div>
      </div>
    </Sheet>
  );
}
