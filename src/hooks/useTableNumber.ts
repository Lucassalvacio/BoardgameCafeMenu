import { useCallback, useState } from 'react';

function readTableFromURL(): number | null {
  const params = new URLSearchParams(window.location.search);
  const raw = params.get('table');
  if (raw && /^\d+$/.test(raw)) return parseInt(raw, 10);
  return null;
}

/**
 * Reads the table number from the `?table=N` query param set by each
 * table's QR code. Falls back to letting the customer type it in manually
 * (e.g. if they navigated to the site without scanning).
 */
export function useTableNumber() {
  const [tableNumber, setTableNumberState] = useState<number | null>(readTableFromURL);

  const setTableNumber = useCallback((value: number) => {
    setTableNumberState(value);
    const url = new URL(window.location.href);
    url.searchParams.set('table', String(value));
    window.history.replaceState({}, '', url);
  }, []);

  return { tableNumber, setTableNumber };
}
