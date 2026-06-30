import type { MenuCategory, CartMap } from '../types';
import { formatIDR } from '../utils/format';

interface MenuListProps {
  categories: MenuCategory[];
  cart: CartMap;
  onAdd: (id: string) => void;
  onInc: (id: string) => void;
  onDec: (id: string) => void;
}

export function MenuList({ categories, cart, onAdd, onInc, onDec }: MenuListProps) {
  return (
    <>
      {categories.map((sec, idx) => (
        <section id={`sec-${idx}`} key={sec.category}>
          <h2 className="section-title">{sec.category}</h2>
          {sec.items.map((item) => {
            const qty = cart[item.id]?.qty ?? 0;
            return (
              <div className="item" key={item.id}>
                <div className="info">
                  <p className="name">{item.name}</p>
                  <p className="desc">{item.desc}</p>
                  <p className="price">{formatIDR(item.price)}</p>
                </div>
                <div className="qty-control">
                  {qty === 0 ? (
                    <button className="add-btn" onClick={() => onAdd(item.id)}>
                      Add
                    </button>
                  ) : (
                    <div className="stepper">
                      <button onClick={() => onDec(item.id)}>−</button>
                      <span className="qn">{qty}</span>
                      <button onClick={() => onInc(item.id)}>+</button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </section>
      ))}
    </>
  );
}
