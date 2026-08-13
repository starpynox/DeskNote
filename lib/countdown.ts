import { Quiz } from './types';

export interface CountdownParts {
  totalMs: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
  isToday: boolean;
  isSoon: boolean; // within 24 hours
}

export function getQuizDateTime(quiz: Pick<Quiz, 'date' | 'time'>): Date {
  return new Date(`${quiz.date}T${quiz.time || '00:00'}:00`);
}

export function getCountdown(target: Date, now: Date = new Date()): CountdownParts {
  const totalMs = target.getTime() - now.getTime();
  const isPast = totalMs <= 0;
  const abs = Math.abs(totalMs);

  const days = Math.floor(abs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((abs / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((abs / (1000 * 60)) % 60);
  const seconds = Math.floor((abs / 1000) % 60);

  const isToday = !isPast && target.toDateString() === now.toDateString();
  const isSoon = !isPast && totalMs <= 1000 * 60 * 60 * 24;

  return { totalMs, days, hours, minutes, seconds, isPast, isToday, isSoon };
}

export function formatCountdownShort(c: CountdownParts): string {
  if (c.isPast) return 'Started';
  if (c.days > 0) return `${c.days}d ${c.hours}h`;
  if (c.hours > 0) return `${c.hours}h ${c.minutes}m`;
  return `${c.minutes}m ${c.seconds}s`;
}

export function pad2(n: number): string {
  return n.toString().padStart(2, '0');
}
