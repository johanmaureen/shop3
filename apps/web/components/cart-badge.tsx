// apps/web/components/cart-badge.tsx
"use client";

import { useStoreValue } from "@simplestack/store/react";
import { cartStore, countOf } from "@/lib/cart";

export function CartBadge() {
  const lines = useStoreValue(cartStore);
  const count = countOf(lines);

  if (count === 0) return null;
  return <span className="cart-badge">{count}</span>;
}