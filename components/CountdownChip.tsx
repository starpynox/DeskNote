'use client';

import { useEffect, useState } from 'react';
import { getCountdown, pad2 } from '@/lib/countdown';

interface CountdownChipProps {
  target: Date;
  compact?: boolean;
}

export default function CountdownChip({ target, compact }: CountdownChipProps) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!now) {
    // Avoid SSR/client mismatch: render a stable placeholder until mounted.
    return (
      <div className="led-chip led-digits flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs text-ink-low">
        --:--:--
      </div>
    );
  }

  const c = getCountdown(target, now);
  const urgent = c.isSoon && !c.isPast;

  if (c.isPast) {
    return (
      <div className="led-chip led-digits rounded-lg px-2.5 py-1.5 text-xs text-ink-low">
        Quiz started
      </div>
    );
  }

  const units = compact
    ? [
        { v: c.days, l: 'd' },
        { v: c.hours, l: 'h' },
        { v: c.minutes, l: 'm' },
      ]
    : [
        { v: c.days, l: 'DAYS' },
        { v: c.hours, l: 'HRS' },
        { v: c.minutes, l: 'MIN' },
        { v: c.seconds, l: 'SEC' },
      ];

  return (
    <div
      className={`led-chip ${urgent ? 'is-urgent' : ''} flex items-center gap-2.5 rounded-lg px-3 py-2`}
      role="timer"
      aria-live="off"
    >
      {units.map((u, i) => (
        <div key={u.l} className="flex items-center gap-2.5">
          <div className="flex flex-col items-center">
            <span
              className={`led-digits led-glow-text ${urgent ? 'is-urgent' : ''} ${
                compact ? 'text-sm' : 'text-lg'
              } font-semibold leading-none`}
            >
              {pad2(u.v)}
            </span>
            <span className="mt-1 text-[9px] font-medium tracking-wider text-ink-low">
              {u.l}
            </span>
          </div>
          {i < units.length - 1 && (
            <span className="led-digits mb-3 text-ink-low/50">:</span>
          )}
        </div>
      ))}
    </div>
  );
}
