import type {
  MenuCategory,
  BoardGame,
  OrderPayload,
  OrderConfirmation,
} from '../types';
import { mockMenu, mockGames } from './mockData';

import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  doc,
  onSnapshot,
  setDoc
} from "firebase/firestore";

import { db } from "./firebase";

export async function seedDatabase() {
  for (const category of mockMenu) {
      await setDoc(
          doc(db, "menu", category.category),
          category
      );
  }

  for (const game of mockGames) {
      await setDoc(
          doc(db, "games", game.id),
          game
      );
  }
}

export function subscribeGames(callback:  (games: BoardGame[]) => void) {
  return onSnapshot(
      collection(db, "games"),
      snapshot => {
          callback(snapshot.docs.map(d => d.data() as BoardGame));
      }
  );
}

/** GET /menu — returns the full menu, grouped by category. */
export async function fetchMenu(): Promise<MenuCategory[]> {

  const snapshot = await getDocs(collection(db, "menu"));

  return snapshot.docs.map(doc => doc.data() as MenuCategory);

}

/** GET /games — returns the board game library, including manual steps. */
export async function fetchGames(): Promise<BoardGame[]> {

  const snapshot = await getDocs(
      collection(db, "games")
  );

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...(doc.data() as Omit<BoardGame, "id">)
}));
}

export async function placeOrder(
  payload: OrderPayload
): Promise<OrderConfirmation> {

  const order = {

      ...payload,

      status: "received",

      paid: false,

      createdAt: new Date().toISOString(),

      updatedAt: new Date().toISOString(),

      receivedAt: new Date().toISOString(),

      preparingAt: null,

      servedAt: null,

      paidAt: null

  };

  const ref = await addDoc(
      collection(db, "orders"),
      order
  );

  return {

      orderId: ref.id,

      status: "received",

      tableNumber: payload.tableNumber

  };

}

export async function validateTable(tableNumber: number) {

  const snap = await getDoc(
      doc(db, "tables", tableNumber.toString())
  );

  return {
      valid: snap.exists()
  };

}