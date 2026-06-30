import { formatIDR } from '../utils/format';

interface CartBarProps {
  count: number;
  total: number;
  onOpen: () => void;
}

export function CartBar({ count, total, onOpen }: CartBarProps) {
  return (
    <div className="cart-bar">
      <div className={`cart-inner${count === 0 ? ' disabled' : ''}`} onClick={onOpen}>
        <div className="cart-left">
          <div className="cart-count">{count}</div>
          <div className="lbl">View order</div>
        </div>
        <div className="cart-total">{formatIDR(total)}</div>
      </div>
    </div>
  );
}
