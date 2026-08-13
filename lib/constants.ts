import { CodeLanguage, NoteTag, Priority } from './types';

export const PRIORITY_STYLES: Record<
  Priority,
  { dot: string; text: string; ring: string; bg: string }
> = {
  High: { dot: 'bg-danger', text: 'text-danger', ring: 'ring-danger/30', bg: 'bg-danger/10' },
  Medium: { dot: 'bg-amber', text: 'text-amber', ring: 'ring-amber/30', bg: 'bg-amber/10' },
  Low: { dot: 'bg-teal', text: 'text-teal', ring: 'ring-teal/30', bg: 'bg-teal/10' },
};

export const TAG_STYLES: Record<NoteTag, { text: string; bg: string }> = {
  '#FacultyTip': { text: 'text-teal', bg: 'bg-teal/10' },
  '#QuizHint': { text: 'text-amber', bg: 'bg-amber/10' },
  '#Assignment': { text: 'text-violet-300', bg: 'bg-violet-400/10' },
  '#ExamAlert': { text: 'text-danger', bg: 'bg-danger/10' },
  '#General': { text: 'text-ink-mid', bg: 'bg-white/5' },
};

export const LANGUAGE_STYLES: Record<CodeLanguage, { text: string; bg: string; prism: string }> = {
  Java: { text: 'text-orange-300', bg: 'bg-orange-400/10', prism: 'language-java' },
  Verilog: { text: 'text-emerald-300', bg: 'bg-emerald-400/10', prism: 'language-verilog' },
  SQL: { text: 'text-sky-300', bg: 'bg-sky-400/10', prism: 'language-sql' },
  C: { text: 'text-blue-300', bg: 'bg-blue-400/10', prism: 'language-c' },
  'C++': { text: 'text-indigo-300', bg: 'bg-indigo-400/10', prism: 'language-cpp' },
  Assembly: { text: 'text-rose-300', bg: 'bg-rose-400/10', prism: 'language-nasm' },
  Python: { text: 'text-amber-300', bg: 'bg-amber-400/10', prism: 'language-python' },
  JavaScript: { text: 'text-yellow-300', bg: 'bg-yellow-400/10', prism: 'language-javascript' },
};

export const PRESET_SUBJECTS = [
  'Data Structures',
  'DBMS',
  'Digital Logic',
  'Computer Networks',
  'Operating Systems',
];
