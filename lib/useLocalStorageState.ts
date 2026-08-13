'use client';

import { useCallback, useEffect, useState } from 'react';

/**
 * Persists state to localStorage under `key`. Safe for Next.js SSR: the
 * first render always returns `initialValue`, then hydrates from storage
 * on mount (avoids hydration mismatches for a client-only PWA data store).
 */
export function useLocalStorageState<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw) setValue(JSON.parse(raw) as T);
    } catch {
      // ignore corrupt storage
    } finally {
      setHydrated(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // storage full or unavailable — fail silently, data stays in memory
    }
  }, [key, value, hydrated]);

  // Keep multiple tabs/windows in sync.
  useEffect(() => {
    function onStorage(e: StorageEvent) {
      if (e.key !== key || e.newValue == null) return;
      try {
        setValue(JSON.parse(e.newValue) as T);
      } catch {
        // ignore
      }
    }
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [key]);

  const update = useCallback((updater: T | ((prev: T) => T)) => {
    setValue((prev) =>
      typeof updater === 'function' ? (updater as (prev: T) => T)(prev) : updater
    );
  }, []);

  return { value, setValue: update, hydrated };
}
