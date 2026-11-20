// apps/web/app/cart/page.tsx
"use client";

import Link from "next/link";
import { useStoreValue } from "@simplestack/store/react";
import { cartStore, setQuantity, removeFromCart, subtotalOf } from "@/lib/cart";
import { EmptyCart } from "@/components/shop/empty-cart";

export default function CartPage() {
  const lines = useStoreValue(cartStore);

  if (lines.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div>
      {lines.map((line) => (
        <div key={line.productId}>
          <img src={line.image} alt={line.name} />
          <span>{line.name}</span>
          <input
            type="number"
            min={0}
            value={line.quantity}
            onChange={(e) => setQuantity(line.productId, Number(e.target.value))}
          />
          <span>{line.price * line.quantity}</span>
          <button onClick={() => removeFromCart(line.productId)}>Remove</button>
        </div>
      ))}

      <footer>
        <strong>Subtotal: {subtotalOf(lines)}</strong>
        <Link href="/checkout">Checkout</Link>
      </footer>
    </div>
  );
}