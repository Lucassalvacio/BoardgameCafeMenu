export interface MenuItem {
  id: string;
  name: string;
  desc: string;
  price: number; // in IDR
}

export interface MenuCategory {
  category: string;
  items: MenuItem[];
}

export type GameDifficulty = 'Easy' | 'Medium' | 'Hard';

export interface BoardGame {
  id: string;
  name: string;
  players: string;
  time: string;
  difficulty: GameDifficulty;
  desc: string;
  manualSteps: string[];
}

export type CartEntryType = 'food' | 'game';

export interface CartEntry {
  id: string;
  type: CartEntryType;
  qty: number;
}

export type CartMap = Record<string, CartEntry>;

export interface OrderLineItem {
  id: string;
  name: string;
  type: CartEntryType;
  qty: number;
  unitPrice: number;
}

export interface OrderPayload {
  tableNumber: number;
  items: OrderLineItem[];
  subtotal: number;
  tax: number;
  total: number;
  note: string;
  createdAt: string; // ISO timestamp, set client-side, may be overwritten server-side
}

export interface OrderConfirmation {
  orderId: string;
  status: string;
  tableNumber: number;
  estimatedMinutes?: number;
}

export type OrderStatus =
    | "received"
    | "preparing"
    | "served"
    | "paid";

export interface StaffOrder extends OrderPayload {

    id: string;

    status: OrderStatus;

    paid: boolean;

    updatedAt: string;

    receivedAt: string;

    preparingAt: string | null;

    servedAt: string | null;

    paidAt: string | null;

}

