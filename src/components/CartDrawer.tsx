import type { OrderLineItem } from '../types';
import { formatIDR } from '../utils/format';

interface CartDrawerProps {
  open: boolean;
  tableNumber: number | null;
  lineItems: OrderLineItem[];
  subtotal: number;
  tax: number;
  total: number;
  note: string;
  placing: boolean;
  onNoteChange: (note: string) => void;
  onInc: (id: string) => void;
  onDec: (id: string) => void;
  onRemoveGame: (id: string) => void;
  onClose: () => void;
  onPlaceOrder: () => void;
}

export function CartDrawer({
  open,
  tableNumber,
  lineItems,
  subtotal,
  tax,
  total,
  note,
  placing,
  onNoteChange,
  onInc,
  onDec,
  onRemoveGame,
  onClose,
  onPlaceOrder,
}: CartDrawerProps) {
  return (
    <div
      className={`overlay${open ? ' open' : ''}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="drawer">
        <div className="drawer-head">
          <h2>Your Order</h2>
          <button className="close-x" onClick={onClose}>
            &times;
          </button>
        </div>

        {lineItems.length === 0 ? (
          <div className="empty-cart">Your order is empty. Add a drink, snack, or game to get started.</div>
        ) : (
          <div>
            {lineItems.map((li) =>
              li.type === 'game' ? (
                <div className="ticket-row" key={li.id}>
                  <div>
                    <div className="ti-name">{li.name}</div>
                    <div className="game-pill">Game · Free</div>
                  </div>
                  <div className="ti-controls">
                    <button className="game-fixed-remove" onClick={() => onRemoveGame(li.id)}>
                      Remove
                    </button>
                  </div>
                </div>
              ) : (
                <div className="ticket-row" key={li.id}>
                  <div>
                    <div className="ti-name">{li.name}</div>
                    <div className="ti-price">{formatIDR(li.unitPrice)} each</div>
                  </div>
                  <div className="ti-controls">
                    <div className="stepper">
                      <button onClick={() => onDec(li.id)}>−</button>
                      <span className="qn">{li.qty}</span>
                      <button onClick={() => onInc(li.id)}>+</button>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        )}

        {lineItems.length > 0 && (
          <div>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>{formatIDR(subtotal)}</span>
            </div>
            <div className="summary-row">
              <span>Tax (10%)</span>
              <span>{formatIDR(tax)}</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>{formatIDR(total)}</span>
            </div>
          </div>
        )}

        <textarea
          rows={2}
          placeholder="Notes for the staff (allergies, game variant, etc.)"
          value={note}
          onChange={(e) => onNoteChange(e.target.value)}
        />

        <button className="place-btn" disabled={lineItems.length === 0 || placing} onClick={onPlaceOrder}>
          {placing ? 'Placing order…' : `Place Order — Table ${tableNumber ?? '–'}`}
        </button>
      </div>
    </div>
  );
}
