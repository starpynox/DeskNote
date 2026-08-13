'use client';

import { Snippet } from '@/lib/types';
import LanguageBadge from '@/components/ui/LanguageBadge';

const DATE_FMT = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' });

export default function SnippetCard({ snippet, onOpen }: { snippet: Snippet; onOpen: () => void }) {
  const preview = snippet.code.split('\n').slice(0, 2).join('\n');

  return (
    <button
      onClick={onOpen}
      className="flex flex-col gap-2.5 rounded-2xl border border-line bg-surface p-4 text-left"
    >
      <div className="flex items-center justify-between gap-2">
        <LanguageBadge language={snippet.language} />
        <span className="text-[10px] font-medium text-ink-low">
          {DATE_FMT.format(snippet.createdAt)}
        </span>
      </div>
      <p className="truncate font-display text-sm font-semibold text-ink-hi">{snippet.title}</p>
      <pre className="no-scrollbar overflow-hidden rounded-lg bg-elevated px-2.5 py-2 font-mono text-[11px] leading-snug text-ink-mid">
        <code className="line-clamp-2">{preview || '// empty snippet'}</code>
      </pre>
    </button>
  );
}
