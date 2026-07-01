export function formatIDR(n: number): string {
  return n === 0 ? 'Free' : 'Rp ' + n.toLocaleString('id-ID');
}


import { BoardGame } from "../types";

export function getAvailableCopies(game: BoardGame): number {
    return Math.max(0, game.totalCopies - game.inUseCopies);
}

export function isGameAvailable(game: BoardGame): boolean {
    return getAvailableCopies(game) > 0;
}