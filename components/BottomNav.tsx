'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, AlarmClock, NotebookPen, CodeXml } from 'lucide-react';

const TABS = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/quizzes', label: 'Quizzes', icon: AlarmClock },
  { href: '/notes', label: 'Notes', icon: NotebookPen },
  { href: '/vault', label: 'Code Vault', icon: CodeXml },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="safe-bottom fixed inset-x-0 bottom-0 z-40 mx-auto max-w-md border-t border-line bg-surface/90 backdrop-blur-lg"
      aria-label="Primary"
    >
      <ul className="grid grid-cols-4">
        {TABS.map(({ href, label, icon: Icon }) => {
          const active = href === '/' ? pathname === '/' : pathname?.startsWith(href);
          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={active ? 'page' : undefined}
                className="group flex flex-col items-center gap-1 py-2.5 outline-none"
              >
                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-xl transition-colors ${
                    active ? 'bg-amber/15 text-amber' : 'text-ink-low group-focus-visible:ring-2 group-focus-visible:ring-amber/60'
                  }`}
                >
                  <Icon size={20} strokeWidth={active ? 2.4 : 2} />
                </span>
                <span
                  className={`text-[11px] font-medium ${
                    active ? 'text-amber' : 'text-ink-low'
                  }`}
                >
                  {label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
