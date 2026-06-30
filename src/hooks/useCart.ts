import { useCallback, useMemo, useState } from 'react';
import type { CartMap, MenuCategory, BoardGame, OrderLineItem } from '../types';

export function useCart(menu: MenuCategory[], games: BoardGame[]) {
  const [cart, setCart] = useState<CartMap>({});

  const findFoodItem = useCallback(
    (id: string) => {
      for (const sec of menu) {
        const found = sec.items.find((i) => i.id === id);
        if (found) return found;
      }
      return undefined;
    },
    [menu]
  );

  const findGame = useCallback((id: string) => games.find((g) => g.id === id), [games]);

  const addFood = useCallback((id: string) => {
    setCart((prev) => ({ ...prev, [id]: { id, type: 'food', qty: (prev[id]?.qty ?? 0) + 1 } }));
  }, []);

  const decFood = useCallback((id: string) => {
    setCart((prev) => {
      const existing = prev[id];
      if (!existing) return prev;
      const nextQty = existing.qty - 1;
      const next = { ...prev };
      if (nextQty <= 0) delete next[id];
      else next[id] = { ...existing, qty: nextQty };
      return next;
    });
  }, []);

  const toggleGame = useCallback((id: string) => {
    setCart((prev) => {
      const next = { ...prev };
      if (next[id]) delete next[id];
      else next[id] = { id, type: 'game', qty: 1 };
      return next;
    });
  }, []);

  const clear = useCallback(() => setCart({}), []);

  const count = useMemo(() => Object.values(cart).reduce((a, b) => a + b.qty, 0), [cart]);

  const lineItems: OrderLineItem[] = useMemo(() => {
    return Object.values(cart).map((entry) => {
      if (entry.type === 'food') {
        const item = findFoodItem(entry.id);
        return {
          id: entry.id,
          name: item?.name ?? entry.id,
          type: 'food' as const,
          qty: entry.qty,
          unitPrice: item?.price ?? 0,
        };
      }
      const game = findGame(entry.id);
      return {
        id: entry.id,
        name: game?.name ?? entry.id,
        type: 'game' as const,
        qty: entry.qty,
        unitPrice: 0,
      };
    });
  }, [cart, findFoodItem, findGame]);

  const subtotal = useMemo(
    () => lineItems.reduce((sum, li) => sum + li.unitPrice * li.qty, 0),
    [lineItems]
  );
  const tax = Math.round(subtotal * 0.1);
  const total = subtotal + tax;

  return { cart, addFood, decFood, toggleGame, clear, count, lineItems, subtotal, tax, total };
}
