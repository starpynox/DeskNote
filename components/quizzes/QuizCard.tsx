'use client';

import { Pencil, Trash2, BookOpen } from 'lucide-react';
import { Quiz } from '@/lib/types';
import { getQuizDateTime } from '@/lib/countdown';
import CountdownChip from '@/components/CountdownChip';
import PriorityBadge from '@/components/ui/PriorityBadge';

interface QuizCardProps {
  quiz: Quiz;
  onEdit: () => void;
  onDelete: () => void;
}

const DATE_FMT = new Intl.DateTimeFormat('en-US', {
  weekday: 'short',
  month: 'short',
  day: 'numeric',
});

export default function QuizCard({ quiz, onEdit, onDelete }: QuizCardProps) {
  const target = getQuizDateTime(quiz);

  return (
    <li className="rounded-2xl border border-line bg-surface p-4 shadow-card">
      <div className="mb-3 flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="truncate text-xs font-medium text-ink-low">{quiz.subject}</p>
          <p className="truncate font-display text-base font-semibold text-ink-hi">
            {quiz.title}
          </p>
          <p className="mt-0.5 text-xs text-ink-mid">
            {DATE_FMT.format(target)} · {quiz.time}
          </p>
        </div>
        <PriorityBadge priority={quiz.priority} />
      </div>

      <CountdownChip target={target} />

      {quiz.topics && (
        <div className="mt-3 flex items-start gap-2 rounded-xl bg-elevated px-3 py-2.5">
          <BookOpen size={14} className="mt-0.5 shrink-0 text-ink-low" />
          <p className="text-xs leading-relaxed text-ink-mid">{quiz.topics}</p>
        </div>
      )}

      <div className="mt-3 flex justify-end gap-2">
        <button
          onClick={onEdit}
          className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-ink-mid hover:bg-elevated hover:text-ink-hi"
        >
          <Pencil size={13} /> Edit
        </button>
        <button
          onClick={onDelete}
          className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-danger hover:bg-danger/10"
        >
          <Trash2 size={13} /> Delete
        </button>
      </div>
    </li>
  );
}
