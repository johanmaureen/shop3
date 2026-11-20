// apps/web/components/cart-hydrator.tsx
"use client";

import { useEffect } from "react";
import { hydrateCart } from "@/lib/cart";

export function CartHydrator() {
  useEffect(() => hydrateCart(), []);
  return null;
}