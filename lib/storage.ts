'use client';

import { createId } from './id';
import { Note, Quiz, Snippet } from './types';
import { useLocalStorageState } from './useLocalStorageState';

const KEYS = {
  quizzes: 'desknote:quizzes',
  notes: 'desknote:notes',
  snippets: 'desknote:snippets',
};

export function useQuizzes() {
  const { value, setValue, hydrated } = useLocalStorageState<Quiz[]>(KEYS.quizzes, []);

  function add(input: Omit<Quiz, 'id' | 'createdAt' | 'updatedAt'>) {
    const now = Date.now();
    const quiz: Quiz = { ...input, id: createId(), createdAt: now, updatedAt: now };
    setValue((prev) => [quiz, ...prev]);
    return quiz;
  }

  function update(id: string, patch: Partial<Omit<Quiz, 'id' | 'createdAt'>>) {
    setValue((prev) =>
      prev.map((q) => (q.id === id ? { ...q, ...patch, updatedAt: Date.now() } : q))
    );
  }

  function remove(id: string) {
    setValue((prev) => prev.filter((q) => q.id !== id));
  }

  const sorted = [...value].sort((a, b) => {
    const aTime = new Date(`${a.date}T${a.time || '00:00'}`).getTime();
    const bTime = new Date(`${b.date}T${b.time || '00:00'}`).getTime();
    return aTime - bTime;
  });

  return { quizzes: sorted, add, update, remove, hydrated };
}

export function useNotes() {
  const { value, setValue, hydrated } = useLocalStorageState<Note[]>(KEYS.notes, []);

  function add(input: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) {
    const now = Date.now();
    const note: Note = { ...input, id: createId(), createdAt: now, updatedAt: now };
    setValue((prev) => [note, ...prev]);
    return note;
  }

  function update(id: string, patch: Partial<Omit<Note, 'id' | 'createdAt'>>) {
    setValue((prev) =>
      prev.map((n) => (n.id === id ? { ...n, ...patch, updatedAt: Date.now() } : n))
    );
  }

  function remove(id: string) {
    setValue((prev) => prev.filter((n) => n.id !== id));
  }

  const sorted = [...value].sort((a, b) => b.createdAt - a.createdAt);

  return { notes: sorted, add, update, remove, hydrated };
}

export function useSnippets() {
  const { value, setValue, hydrated } = useLocalStorageState<Snippet[]>(KEYS.snippets, []);

  function add(input: Omit<Snippet, 'id' | 'createdAt' | 'updatedAt'>) {
    const now = Date.now();
    const snippet: Snippet = { ...input, id: createId(), createdAt: now, updatedAt: now };
    setValue((prev) => [snippet, ...prev]);
    return snippet;
  }

  function update(id: string, patch: Partial<Omit<Snippet, 'id' | 'createdAt'>>) {
    setValue((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...patch, updatedAt: Date.now() } : s))
    );
  }

  function remove(id: string) {
    setValue((prev) => prev.filter((s) => s.id !== id));
  }

  const sorted = [...value].sort((a, b) => b.createdAt - a.createdAt);

  return { snippets: sorted, add, update, remove, hydrated };
}
