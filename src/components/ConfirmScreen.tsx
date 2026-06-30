interface ConfirmScreenProps {
  open: boolean;
  tableNumber: number | null;
  orderId: string;
  onNewOrder: () => void;
}

export function ConfirmScreen({ open, tableNumber, orderId, onNewOrder }: ConfirmScreenProps) {
  return (
    <div className={`overlay${open ? ' open' : ''}`}>
      <div className="drawer">
        <div className="confirm-screen">
          <div className="confirm-ring">🎲</div>
          <h2>Order sent to the counter</h2>
          <p>
            Your order for Table {tableNumber ?? '–'} is being prepared. A staff member will bring it
            over shortly.
          </p>
          <div className="order-id">{orderId}</div>
          <div>
            <button className="new-order-btn" onClick={onNewOrder}>
              Order something else
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
