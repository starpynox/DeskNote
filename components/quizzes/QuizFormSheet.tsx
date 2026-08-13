'use client';

import { useEffect, useState } from 'react';
import Sheet from '@/components/ui/Sheet';
import { Priority, Quiz } from '@/lib/types';
import { PRESET_SUBJECTS } from '@/lib/constants';

interface QuizFormSheetProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (input: Omit<Quiz, 'id' | 'createdAt' | 'updatedAt'>) => void;
  initial?: Quiz | null;
}

function toDateInput(d: Date) {
  return d.toISOString().slice(0, 10);
}
function toTimeInput(d: Date) {
  return `${d.getHours().toString().padStart(2, '0')}:${d
    .getMinutes()
    .toString()
    .padStart(2, '0')}`;
}

const EMPTY = {
  subject: '',
  title: '',
  date: '',
  time: '09:00',
  topics: '',
  priority: 'Medium' as Priority,
};

export default function QuizFormSheet({ open, onClose, onSubmit, initial }: QuizFormSheetProps) {
  const [form, setForm] = useState(EMPTY);
  const [error, setError] = useState('');

  useEffect(() => {
    if (open) {
      setError('');
      setForm(
        initial
          ? {
              subject: initial.subject,
              title: initial.title,
              date: initial.date,
              time: initial.time,
              topics: initial.topics,
              priority: initial.priority,
            }
          : EMPTY
      );
    }
  }, [open, initial]);

  function applyPreset(preset: '1day' | 'week' | 'tomorrow9') {
    const now = new Date();
    if (preset === '1day') {
      const d = new Date(now.getTime() + 24 * 60 * 60 * 1000);
      setForm((f) => ({ ...f, date: toDateInput(d), time: toTimeInput(now) }));
    } else if (preset === 'week') {
      const d = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
      setForm((f) => ({ ...f, date: toDateInput(d), time: toTimeInput(now) }));
    } else {
      const d = new Date(now.getTime() + 24 * 60 * 60 * 1000);
      setForm((f) => ({ ...f, date: toDateInput(d), time: '09:00' }));
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.subject.trim() || !form.title.trim() || !form.date) {
      setError('Subject, title and date are required.');
      return;
    }
    onSubmit(form);
    onClose();
  }

  return (
    <Sheet open={open} onClose={onClose} title={initial ? 'Edit quiz' : 'New quiz reminder'}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 pb-6">
        <Field label="Subject name">
          <input
            list="subject-presets"
            value={form.subject}
            onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
            placeholder="e.g. Data Structures"
            className="input"
          />
          <datalist id="subject-presets">
            {PRESET_SUBJECTS.map((s) => (
              <option key={s} value={s} />
            ))}
          </datalist>
        </Field>

        <Field label="Quiz title">
          <input
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            placeholder="e.g. Unit 2 surprise quiz"
            className="input"
          />
        </Field>

        <div>
          <p className="mb-2 text-xs font-medium text-ink-low">Quick presets</p>
          <div className="flex flex-wrap gap-2">
            <PresetButton label="+1 Day" onClick={() => applyPreset('1day')} />
            <PresetButton label="Next Week" onClick={() => applyPreset('week')} />
            <PresetButton label="Tomorrow 9 AM" onClick={() => applyPreset('tomorrow9')} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Date">
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
              className="input"
            />
          </Field>
          <Field label="Time">
            <input
              type="time"
              value={form.time}
              onChange={(e) => setForm((f) => ({ ...f, time: e.target.value }))}
              className="input"
            />
          </Field>
        </div>

        <Field label="Topics / syllabus">
          <textarea
            value={form.topics}
            onChange={(e) => setForm((f) => ({ ...f, topics: e.target.value }))}
            placeholder="Chapters, topics or hints to revise"
            rows={3}
            className="input resize-none"
          />
        </Field>

        <div>
          <p className="mb-2 text-xs font-medium text-ink-low">Priority level</p>
          <div className="grid grid-cols-3 gap-2">
            {(['High', 'Medium', 'Low'] as Priority[]).map((p) => (
              <button
                type="button"
                key={p}
                onClick={() => setForm((f) => ({ ...f, priority: p }))}
                className={`rounded-xl border px-3 py-2 text-sm font-medium transition-colors ${
                  form.priority === p
                    ? 'border-amber bg-amber/10 text-amber'
                    : 'border-line text-ink-mid'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {error && <p className="text-xs font-medium text-danger">{error}</p>}

        <button
          type="submit"
          className="mt-2 rounded-xl bg-amber py-3 text-sm font-semibold text-base"
        >
          {initial ? 'Save changes' : 'Add quiz reminder'}
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
        .input[type='date'],
        .input[type='time'] {
          color-scheme: dark;
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

function PresetButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-full border border-line bg-elevated px-3 py-1.5 text-xs font-medium text-ink-mid hover:border-amber/40 hover:text-amber"
    >
      {label}
    </button>
  );
}
