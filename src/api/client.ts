import type {
  MenuCategory,
  BoardGame,
  OrderPayload,
  OrderConfirmation,
  StaffCall 
} from '../types';
import { mockMenu, mockGames } from './mockData';

import {
  collection,
  getDocs,
  addDoc,
  doc,
  onSnapshot,
  setDoc,
  runTransaction,
  updateDoc,
  query,
  where
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

export function subscribeGames(
  callback: (games: BoardGame[]) => void
) {

  return onSnapshot(
      collection(db, "games"),
      snapshot => {

          const games = snapshot.docs.map(doc => {

              const data = doc.data();

              return {

                  id: doc.id,

                  ...data,

                  totalCopies: data.totalCopies ?? 1,

                  inUseCopies: data.inUseCopies ?? 0,

              } as BoardGame;

          });

          callback(games);

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

  const snapshot = await getDocs(collection(db, "games"));

  return snapshot.docs.map(doc => {

      const data = doc.data();

      return {

          id: doc.id,

          ...data,

          totalCopies: data.totalCopies ?? 1,

          inUseCopies: data.inUseCopies ?? 0,

      } as BoardGame;

  });

}
export async function placeOrder(
  payload: OrderPayload
): Promise<OrderConfirmation> {

  const orderRef = doc(collection(db, "orders"));

  await runTransaction(db, async (transaction) => {

      // Reserve every requested board game
      for (const item of payload.items) {

          if (item.type !== "game") continue;

          const gameRef = doc(db, "games", item.id);

          const gameSnap = await transaction.get(gameRef);

          if (!gameSnap.exists()) {
              throw new Error(`Game "${item.name}" not found.`);
          }

          const game = gameSnap.data() as BoardGame;

          const totalCopies = game.totalCopies ?? 1;
          const inUseCopies = game.inUseCopies ?? 0;

          // Enough copies available?
          if (inUseCopies + item.qty > totalCopies) {
              throw new Error(
                  `"${item.name}" is currently unavailable.`
              );
          }

          transaction.update(gameRef, {
              inUseCopies: inUseCopies + item.qty
          });

      }

      const now = new Date().toISOString();

      transaction.set(orderRef, {

          ...payload,

          status: "received",

          paid: false,

          createdAt: now,

          updatedAt: now,

          receivedAt: now,

          preparingAt: null,

          servedAt: null,

          paidAt: null

      });

  });

  return {

      orderId: orderRef.id,

      status: "received",

      tableNumber: payload.tableNumber

  };

}
export async function assignGame(gameId: string) {

  const gameRef = doc(db, "games", gameId);

  await runTransaction(db, async transaction => {

      const snap = await transaction.get(gameRef);

      if (!snap.exists()) {
          throw new Error("Game not found.");
      }

      const game = snap.data() as BoardGame;

      const totalCopies = game.totalCopies ?? 1;
      const inUseCopies = game.inUseCopies ?? 0;

      if (inUseCopies >= totalCopies) {
          throw new Error("No copies available.");
      }

      transaction.update(gameRef, {
          inUseCopies: inUseCopies + 1
      });

  });

}

export async function returnGame(
  gameId: string,
  qty: number = 1
) {

  const gameRef = doc(db, "games", gameId);

  await runTransaction(db, async (transaction) => {

      const snap = await transaction.get(gameRef);

      if (!snap.exists()) {
          throw new Error("Game not found.");
      }

      const game = snap.data() as BoardGame;

      const inUseCopies = game.inUseCopies ?? 0;

      transaction.update(gameRef, {
          inUseCopies: Math.max(0, inUseCopies - qty)
      });

  });

}

export async function callStaff(
  tableNumber: number,
  reason = "Need Assistance"
) {

  await addDoc(

      collection(db, "staffCalls"),

      {

          tableNumber,

          reason,

          status: "pending",

          createdAt: new Date().toISOString(),

          resolvedAt: null,

      }

  );

}

export function subscribeStaffCalls(

  callback: (calls: StaffCall[]) => void

) {

  return onSnapshot(

      collection(db, "staffCalls"),

      snapshot => {

          const calls = snapshot.docs.map(doc => ({

              id: doc.id,

              ...doc.data()

          })) as StaffCall[];

          callback(calls);

      }

  );

}

export async function resolveStaffCall(

  id: string

) {

  await updateDoc(

      doc(db, "staffCalls", id),

      {

          status: "resolved",

          resolvedAt: new Date().toISOString()

      }

  );

}

export function subscribePendingStaffCall(
  tableNumber: number,
  callback: (hasPending: boolean) => void
) {

  return onSnapshot(

      query(

          collection(db, "staffCalls"),

          where("tableNumber", "==", tableNumber),

          where("status", "==", "pending")

      ),

      snapshot => {

          callback(!snapshot.empty);

      }

  );

}