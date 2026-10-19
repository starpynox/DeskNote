'use client';

import Link from 'next/link';
import { AlarmClock, NotebookPen, CodeXml, ArrowRight, Sparkles } from 'lucide-react';
import { useQuizzes, useNotes, useSnippets } from '@/lib/storage';
import { getQuizDateTime } from '@/lib/countdown';
import CountdownChip from '@/components/CountdownChip';
import InstallBanner from '@/components/InstallBanner';
import PriorityBadge from '@/components/ui/PriorityBadge';
import EmptyState from '@/components/ui/EmptyState';

function greeting() {
  const h = new Date().getHours();
  if (h < 5) return 'Still up?';
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  if (h < 21) return 'Good evening';
  return 'Late-night session';
}

export default function DashboardPage() {
  const { quizzes, hydrated: quizzesHydrated } = useQuizzes();
  const { notes } = useNotes();
  const { snippets } = useSnippets();

  const upcoming = quizzes.filter((q) => getQuizDateTime(q).getTime() > Date.now()).slice(0, 3);

  return (
    <div className="safe-top flex flex-col gap-6 px-4 pt-6">
      <header className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-ink-low">
            {greeting()}
          </p>
          <h1 className="font-display text-2xl font-bold text-ink-hi">Your desk, today.</h1>
        </div>
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-elevated text-amber">
          <Sparkles size={20} />
        </div>
      </header>

      <InstallBanner />

      <section className="grid grid-cols-3 gap-3">
        <SummaryCard
          href="/quizzes"
          icon={AlarmClock}
          count={quizzes.length}
          label="Quizzes"
          accent="text-amber"
        />
        <SummaryCard
          href="/notes"
          icon={NotebookPen}
          count={notes.length}
          label="Notes"
          accent="text-teal"
        />
        <SummaryCard
          href="/vault"
          icon={CodeXml}
          count={snippets.length}
          label="Snippets"
          accent="text-violet-300"
        />
      </section>

      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-sm font-semibold text-ink-hi">Coming up</h2>
          <Link
            href="/quizzes"
            className="flex items-center gap-1 text-xs font-medium text-amber"
          >
            View all <ArrowRight size={13} />
          </Link>
        </div>

        {!quizzesHydrated ? null : upcoming.length === 0 ? (
          <EmptyState
            icon={AlarmClock}
            title="No quizzes on the clock"
            description="Add a quiz reminder and DeskNote will start the countdown."
            action={
              <Link
                href="/quizzes"
                className="rounded-lg bg-amber px-4 py-2 text-sm font-semibold text-base"
              >
                Add a quiz
              </Link>
            }
          />
        ) : (
          <ul className="flex flex-col gap-3">
            {upcoming.map((quiz) => (
              <li
                key={quiz.id}
                className="rounded-2xl border border-line bg-surface p-4 shadow-card"
              >
                <div className="mb-3 flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="truncate text-xs font-medium text-ink-low">{quiz.subject}</p>
                    <p className="truncate font-display text-sm font-semibold text-ink-hi">
                      {quiz.title}
                    </p>
                  </div>
                  <PriorityBadge priority={quiz.priority} />
                </div>
                <CountdownChip target={getQuizDateTime(quiz)} compact />
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="flex flex-col gap-3 pb-4">
        <h2 className="font-display text-sm font-semibold text-ink-hi">Jump back in</h2>
        <div className="grid grid-cols-2 gap-3">
          <Link
            href="/notes"
            className="flex flex-col gap-2 rounded-2xl border border-line bg-surface p-4"
          >
            <NotebookPen size={18} className="text-teal" />
            <span className="text-sm font-medium text-ink-hi">Dictate a note</span>
            <span className="text-xs text-ink-low">Capture a tip hands-free</span>
          </Link>
          <Link
            href="/vault"
            className="flex flex-col gap-2 rounded-2xl border border-line bg-surface p-4"
          >
            <CodeXml size={18} className="text-violet-300" />
            <span className="text-sm font-medium text-ink-hi">Save a snippet</span>
            <span className="text-xs text-ink-low">Keep code you&apos;ll need again</span>
          </Link>
        </div>
      </section>
    </div>
  );
}

function SummaryCard({
  href,
  icon: Icon,
  count,
  label,
  accent,
}: {
  href: string;
  icon: typeof AlarmClock;
  count: number;
  label: string;
  accent: string;
}) {
  return (
    <Link
      href={href}
      className="flex flex-col items-start gap-2 rounded-2xl border border-line bg-surface p-3.5"
    >
      <Icon size={18} className={accent} />
      <span className="font-display text-xl font-bold text-ink-hi">{count}</span>
      <span className="text-[11px] font-medium text-ink-low">{label}</span>
    </Link>
  );
}
