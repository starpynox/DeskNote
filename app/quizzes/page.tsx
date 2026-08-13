'use client';

import { useState } from 'react';
import { AlarmClock } from 'lucide-react';
import { useQuizzes } from '@/lib/storage';
import { Quiz } from '@/lib/types';
import QuizCard from '@/components/quizzes/QuizCard';
import QuizFormSheet from '@/components/quizzes/QuizFormSheet';
import EmptyState from '@/components/ui/EmptyState';
import FAB from '@/components/ui/FAB';

export default function QuizzesPage() {
  const { quizzes, add, update, remove, hydrated } = useQuizzes();
  const [sheetOpen, setSheetOpen] = useState(false);
  const [editing, setEditing] = useState<Quiz | null>(null);

  function openNew() {
    setEditing(null);
    setSheetOpen(true);
  }

  function openEdit(quiz: Quiz) {
    setEditing(quiz);
    setSheetOpen(true);
  }

  function handleSubmit(input: Omit<Quiz, 'id' | 'createdAt' | 'updatedAt'>) {
    if (editing) {
      update(editing.id, input);
    } else {
      add(input);
    }
  }

  function handleDelete(id: string) {
    if (window.confirm('Delete this quiz reminder?')) {
      remove(id);
    }
  }

  return (
    <div className="safe-top flex flex-col gap-5 px-4 pt-6">
      <header>
        <p className="text-xs font-medium uppercase tracking-wider text-ink-low">Quizzes</p>
        <h1 className="font-display text-2xl font-bold text-ink-hi">Quiz reminders</h1>
      </header>

      {!hydrated ? null : quizzes.length === 0 ? (
        <EmptyState
          icon={AlarmClock}
          title="Nothing on the clock yet"
          description="Add your first quiz and DeskNote will keep a live countdown running."
          action={
            <button
              onClick={openNew}
              className="rounded-lg bg-amber px-4 py-2 text-sm font-semibold text-base"
            >
              Add a quiz
            </button>
          }
        />
      ) : (
        <ul className="flex flex-col gap-3 pb-4">
          {quizzes.map((quiz) => (
            <QuizCard
              key={quiz.id}
              quiz={quiz}
              onEdit={() => openEdit(quiz)}
              onDelete={() => handleDelete(quiz.id)}
            />
          ))}
        </ul>
      )}

      <FAB onClick={openNew} label="Add quiz reminder" />

      <QuizFormSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        onSubmit={handleSubmit}
        initial={editing}
      />
    </div>
  );
}
