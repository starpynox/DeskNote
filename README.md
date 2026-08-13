# DeskNote

A mobile-first Progressive Web App for students: quiz countdowns, fast lecture
notes with voice dictation, and a syntax-highlighted code vault. Built with
Next.js (App Router, TypeScript) and Tailwind CSS. All data is stored locally
in the browser (`localStorage`) — there is no backend.

## Design

Dark, "late-night study desk" palette (deep navy/charcoal with an amber
desk-lamp accent and a teal secondary). The signature element is the
LED-digit countdown chip used for quiz reminders — styled like a small desk
clock, tying the app's identity to its core feature. Type: Space Grotesk for
display, Inter for body, JetBrains Mono for code and countdown digits.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000. The app is mobile-first — use your browser's
device toolbar (375–430px wide) for the intended layout, though it also
works at desktop widths (centered, max-width column).

## Project structure

```
app/
  layout.tsx          Root shell: fonts, PWA metadata, bottom nav
  page.tsx             Dashboard (Page 0)
  quizzes/page.tsx      Quiz Reminders (Page 1)
  notes/page.tsx        Lecture & Friend Notes (Page 2)
  vault/page.tsx         Code Vault (Page 3)
components/
  BottomNav.tsx, CountdownChip.tsx, InstallBanner.tsx, ServiceWorkerRegister.tsx
  quizzes/   QuizCard, QuizFormSheet
  notes/     NoteCard, NoteComposer, VoiceDictationButton
  vault/     SnippetCard, SnippetFormSheet, SnippetModal (Prism highlighting)
  ui/        Sheet, FAB, PriorityBadge, LanguageBadge, EmptyState
lib/
  types.ts, constants.ts, countdown.ts, id.ts
  storage.ts               useQuizzes / useNotes / useSnippets (CRUD)
  useLocalStorageState.ts    generic persistence hook
public/
  manifest.json, sw.js, offline.html, icons/
```

## Data persistence

All three feature areas (`quizzes`, `notes`, `snippets`) persist to
`localStorage` under the `desknote:*` keys via `useLocalStorageState`, which
hydrates client-side after mount (avoiding SSR/client markup mismatches) and
syncs across open tabs.

## Voice dictation

The Notes composer uses the browser's `SpeechRecognition` /
`webkitSpeechRecognition` API. It's only available in Chromium-based
browsers over HTTPS (or `localhost`); the mic button hides itself
automatically when the API isn't supported.

## PWA / offline support

- `public/manifest.json` — name, icons (including maskable variants),
  `standalone` display, dark theme colors, and quick-action shortcuts.
- `public/sw.js` — caches the app shell and recently visited routes;
  network-first for navigations with an offline fallback page, cache-first
  for static assets.
- `components/ServiceWorkerRegister.tsx` — registers the service worker
  (production builds only).
- `components/InstallBanner.tsx` — listens for `beforeinstallprompt` and
  shows an "Install DeskNote" card on the dashboard; dismissible, and hides
  itself once the app is installed.

The service worker only activates in a production build (`npm run build &&
npm run start`) or once deployed — it's skipped in `next dev` so local
development always sees fresh code.

## Deploying to Vercel

1. Push this project to a Git repository.
2. Import it in Vercel — framework preset "Next.js" is detected
   automatically, no extra configuration needed.
3. Deploy. PWA install prompts and the service worker require HTTPS, which
   Vercel provides by default.

## Notes on scope

This is a fully client-side app by design (fast, offline-capable, no
account needed). If you later want cross-device sync, the `lib/storage.ts`
hooks are the seam to swap `localStorage` for a real API or IndexedDB-backed
sync layer without touching the UI components.
