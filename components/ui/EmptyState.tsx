import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: React.ReactNode;
}

export default function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-line px-6 py-14 text-center">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-elevated text-amber">
        <Icon size={22} />
      </div>
      <p className="font-display text-sm font-semibold text-ink-hi">{title}</p>
      <p className="mt-1.5 max-w-[26ch] text-sm text-ink-low">{description}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
