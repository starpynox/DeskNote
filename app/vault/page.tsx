'use client';

import { useMemo, useState } from 'react';
import { Search, CodeXml } from 'lucide-react';
import { useSnippets } from '@/lib/storage';
import { CODE_LANGUAGES, CodeLanguage, Snippet } from '@/lib/types';
import SnippetCard from '@/components/vault/SnippetCard';
import SnippetFormSheet from '@/components/vault/SnippetFormSheet';
import SnippetModal from '@/components/vault/SnippetModal';
import EmptyState from '@/components/ui/EmptyState';
import FAB from '@/components/ui/FAB';

export default function VaultPage() {
  const { snippets, add, update, remove, hydrated } = useSnippets();
  const [query, setQuery] = useState('');
  const [activeLang, setActiveLang] = useState<CodeLanguage | null>(null);

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Snippet | null>(null);
  const [viewing, setViewing] = useState<Snippet | null>(null);

  const usedLanguages = useMemo(
    () => CODE_LANGUAGES.filter((l) => snippets.some((s) => s.language === l)),
    [snippets]
  );

  const filtered = snippets.filter((s) => {
    const q = query.trim().toLowerCase();
    const matchesQuery = !q || s.title.toLowerCase().includes(q);
    const matchesLang = !activeLang || s.language === activeLang;
    return matchesQuery && matchesLang;
  });

  function openNew() {
    setEditing(null);
    setFormOpen(true);
  }

  function openEditFromModal(snippet: Snippet) {
    setViewing(null);
    setEditing(snippet);
    setFormOpen(true);
  }

  function handleSubmit(input: {
    title: string;
    language: CodeLanguage;
    code: string;
    notes: string;
  }) {
    if (editing) {
      update(editing.id, input);
    } else {
      add(input);
    }
  }

  function handleDelete(id: string) {
    remove(id);
    setViewing(null);
  }

  return (
    <div className="safe-top flex flex-col gap-5 px-4 pt-6">
      <header>
        <p className="text-xs font-medium uppercase tracking-wider text-ink-low">Code Vault</p>
        <h1 className="font-display text-2xl font-bold text-ink-hi">Snippet gallery</h1>
      </header>

      <div className="relative">
        <Search
          size={16}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-low"
        />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search snippet titles…"
          className="w-full rounded-xl border border-line bg-surface py-2.5 pl-9 pr-3 text-sm text-ink-hi outline-none placeholder:text-ink-low focus:border-amber/60"
        />
      </div>

      {usedLanguages.length > 0 && (
        <div className="no-scrollbar -mx-1 flex gap-1.5 overflow-x-auto px-1">
          <button
            onClick={() => setActiveLang(null)}
            className={`shrink-0 rounded-full px-3 py-1.5 text-[11px] font-semibold ${
              activeLang === null ? 'bg-amber/15 text-amber' : 'bg-elevated text-ink-low'
            }`}
          >
            All languages
          </button>
          {usedLanguages.map((l) => (
            <button
              key={l}
              onClick={() => setActiveLang(activeLang === l ? null : l)}
              className={`shrink-0 rounded-full px-3 py-1.5 text-[11px] font-semibold ${
                activeLang === l ? 'bg-amber/15 text-amber' : 'bg-elevated text-ink-low'
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      )}

      {!hydrated ? null : filtered.length === 0 ? (
        <EmptyState
          icon={CodeXml}
          title={snippets.length === 0 ? 'Your vault is empty' : 'No snippets match'}
          description={
            snippets.length === 0
              ? 'Save code you want to remember, with syntax highlighting and study notes.'
              : 'Try a different search term or language filter.'
          }
          action={
            snippets.length === 0 ? (
              <button
                onClick={openNew}
                className="rounded-lg bg-amber px-4 py-2 text-sm font-semibold text-base"
              >
                Add a snippet
              </button>
            ) : undefined
          }
        />
      ) : (
        <div className="grid grid-cols-2 gap-3 pb-4">
          {filtered.map((snippet) => (
            <SnippetCard key={snippet.id} snippet={snippet} onOpen={() => setViewing(snippet)} />
          ))}
        </div>
      )}

      <FAB onClick={openNew} label="Add snippet" />

      <SnippetFormSheet
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleSubmit}
        initial={editing}
      />

      <SnippetModal
        snippet={viewing}
        onClose={() => setViewing(null)}
        onEdit={() => viewing && openEditFromModal(viewing)}
        onDelete={() => viewing && handleDelete(viewing.id)}
      />
    </div>
  );
}
