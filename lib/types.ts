export type Priority = 'High' | 'Medium' | 'Low';

export interface Quiz {
  id: string;
  subject: string;
  title: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  topics: string;
  priority: Priority;
  createdAt: number;
  updatedAt: number;
}

export type NoteTag = '#FacultyTip' | '#QuizHint' | '#Assignment' | '#ExamAlert' | '#General';

export const NOTE_TAGS: NoteTag[] = [
  '#FacultyTip',
  '#QuizHint',
  '#Assignment',
  '#ExamAlert',
  '#General',
];

export interface Note {
  id: string;
  subject: string;
  tag: NoteTag;
  content: string;
  createdAt: number;
  updatedAt: number;
}

export type CodeLanguage =
  | 'Java'
  | 'Verilog'
  | 'SQL'
  | 'C'
  | 'C++'
  | 'Assembly'
  | 'Python'
  | 'JavaScript';

export const CODE_LANGUAGES: CodeLanguage[] = [
  'Java',
  'Verilog',
  'SQL',
  'C',
  'C++',
  'Assembly',
  'Python',
  'JavaScript',
];

export interface Snippet {
  id: string;
  title: string;
  language: CodeLanguage;
  code: string;
  notes: string;
  createdAt: number;
  updatedAt: number;
}
