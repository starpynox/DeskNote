import { LANGUAGE_STYLES } from '@/lib/constants';
import { CodeLanguage } from '@/lib/types';

export default function LanguageBadge({ language }: { language: CodeLanguage }) {
  const s = LANGUAGE_STYLES[language];
  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-0.5 font-mono text-[11px] font-medium ${s.bg} ${s.text}`}
    >
      {language}
    </span>
  );
}
