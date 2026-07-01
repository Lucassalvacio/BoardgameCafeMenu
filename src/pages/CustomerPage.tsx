import { useEffect, useState } from 'react';
import type { MenuCategory, BoardGame, OrderPayload } from '@/types';
import {
  fetchMenu,
  subscribeGames,
  placeOrder,
  callStaff,
  subscribePendingStaffCall,
} from "@/api/client";
import { useTableNumber } from '@/hooks/useTableNumber';
import { useCart } from '@/hooks/useCart';
import { Header } from '@/components/Header';
import { TabBar, type MainTab } from '@/components/TabBar';
import { CategoryNav } from '@/components/CategoryNav';
import { MenuList } from '@/components/MenuList';
import { GameLibrary } from '@/components/GameLibrary';
import { ManualModal } from '@/components/ManualModal';
import { CartBar } from '@/components/CartBar';
import { CartDrawer } from '@/components/CartDrawer';
import { ConfirmScreen } from '@/components/ConfirmScreen';
import { db } from "@/api/firebase";
import CustomerOrderStatus from "@/components/CustomerOrderStatus";

import {
  collection,
  onSnapshot,
  query,
  where
} from "firebase/firestore";

import type { StaffOrder } from "@/types";

import { createPayment } from "@/payment/api";

export default function CustomerPage() {
  const { tableNumber, setTableNumber } = useTableNumber();

  const [menu, setMenu] = useState<MenuCategory[]>([]);
  const [games, setGames] = useState<BoardGame[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const cart = useCart(menu, games);

  const [activeTab, setActiveTab] = useState<MainTab>('menu');
  const [manualGame, setManualGame] = useState<BoardGame | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [note, setNote] = useState('');
  const [placing, setPlacing] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [customerOrders, setCustomerOrders] =
      useState<StaffOrder[]>([]);
  const [orderId, setOrderId] = useState('');

  const [callingStaff, setCallingStaff] = useState(false);
  const [staffCalled, setStaffCalled] = useState(false);
  useEffect(() => {

    let cancelled = false;

    setLoading(true);

    fetchMenu()
        .then(menuData => {

            if (cancelled) return;

            setMenu(menuData);

        })
        .catch(err => {

            if (cancelled) return;

            setLoadError(
                err instanceof Error
                    ? err.message
                    : "Failed to load menu."
            );

        });

    const unsubscribeGames = subscribeGames(games => {

        if (cancelled) return;

        setGames(games);

        setLoading(false);

        setLoadError(null);

    });

    return () => {

        cancelled = true;

        unsubscribeGames();

    };

}, []);

  useEffect(() => {

    if (!tableNumber) return;

    const q = query(

        collection(db, "orders"),

        where("tableNumber", "==", tableNumber)

    );

    const unsubscribe = onSnapshot(

        q,

        snapshot => {

            const orders = snapshot.docs.map(doc => ({

                id: doc.id,

                ...doc.data()

            })) as StaffOrder[];

            orders.sort(

                (a, b) =>

                    new Date(b.createdAt).getTime()

                    -

                    new Date(a.createdAt).getTime()

            );

            setCustomerOrders(orders);

        }

    );

    return unsubscribe;

  }, [tableNumber]);

  useEffect(() => {

    if (!tableNumber) return;

    const unsubscribe = subscribePendingStaffCall(

        tableNumber,

        pending => {

            setStaffCalled(pending);

        }

    );

    return unsubscribe;

}, [tableNumber]);

  const currentBill = customerOrders
    .filter(order => !order.paid)
    .reduce(
        (sum, order) => sum + order.total,
        0
    );

  async function handlePlaceOrder() {
    if (cart.lineItems.length === 0) return;
    setPlacing(true);
    const payload: OrderPayload = {
      tableNumber: tableNumber ?? 0,
      items: cart.lineItems,
      subtotal: cart.subtotal,
      tax: cart.tax,
      total: cart.total,
      note,
      createdAt: new Date().toISOString(),
    };
    try {
      const confirmation = await placeOrder(payload);
      setOrderId(confirmation.orderId);
      setCartOpen(false);
      setConfirmOpen(true);
    } catch (err) {
      alert('Could not place your order. Please try again or ask a staff member for help.');
      console.error(err);
    } finally {
      setPlacing(false);
    }
  }

  async function handleCallStaff() {

    if (!tableNumber) return;

    try {

        setCallingStaff(true);

        await callStaff(tableNumber);

    }

    catch (err) {

        console.error(err);

        alert("Unable to call staff.");

    }

    finally {

        setCallingStaff(false);

    }

}

  function handleNewOrder() {
    cart.clear();
    setNote('');
    setConfirmOpen(false);
  }

  return (
    <>
      <Header
    tableNumber={tableNumber}
    onSetTable={setTableNumber}

    callingStaff={callingStaff}
    staffCalled={staffCalled}
    onCallStaff={handleCallStaff}
/>
      <CustomerOrderStatus
        orders={customerOrders.filter(
            order => order.status !== "paid"
        )}
      />

      <div className="customer-bill">
          <h3>
              Current Bill
          </h3>
          <h2>
              Rp{currentBill.toLocaleString()}
          </h2>
      </div>

      <div className="call-staff-container">



</div>
<button
  onClick={() => {
    console.log(import.meta.env.VITE_API_URL);
  }}
>
  Test Env
</button>
<button
    onClick={async () => {

        const payment = await createPayment(
          5,                                  // TEMP TEMP TEMP TEMP TEMP REPLACE WITH REAL VARIABLES
          ["order1"],                         // TEMP TEMP TEMP TEMP TEMP REPLACE WITH REAL VARIABLES
          125000                              // TEMP TEMP TEMP TEMP TEMP REPLACE WITH REAL VARIABLES
        );

        console.log(payment);

        alert(JSON.stringify(payment, null, 2));

    }}
>
    Test Payment API
</button>
      <TabBar active={activeTab} onChange={setActiveTab} />

      {activeTab === 'menu' && <CategoryNav categories={menu} />}

      <main className="content-main">
        {loading && <p className="status-text">Loading menu…</p>}
        {!loading && loadError && (
          <p className="status-text">Couldn't reach the menu service. Showing local data instead.</p>
        )}

        {!loading && activeTab === 'menu' && (
          <MenuList
            categories={menu}
            cart={cart.cart}
            onAdd={cart.addFood}
            onInc={cart.addFood}
            onDec={cart.decFood}
          />
        )}

        {!loading && activeTab === 'games' && (
          <GameLibrary
            games={games}
            cart={cart.cart}
            customerOrders={customerOrders}
            onToggleGame={cart.toggleGame}
            onViewManual={setManualGame}
          />
        )}
      </main>
      
      <CartBar count={cart.count} total={cart.total} onOpen={() => setCartOpen(true)} />

      <CartDrawer
        open={cartOpen}
        tableNumber={tableNumber}
        lineItems={cart.lineItems}
        subtotal={cart.subtotal}
        tax={cart.tax}
        total={cart.total}
        note={note}
        placing={placing}
        onNoteChange={setNote}
        onInc={cart.addFood}
        onDec={cart.decFood}
        onRemoveGame={cart.toggleGame}
        onClose={() => setCartOpen(false)}
        onPlaceOrder={handlePlaceOrder}
      />

      <ManualModal game={manualGame} onClose={() => setManualGame(null)} />

      <ConfirmScreen
        open={confirmOpen}
        tableNumber={tableNumber}
        orderId={orderId}
        onNewOrder={handleNewOrder}
      />
      
    </>
  );
}
