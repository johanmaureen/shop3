// apps/web/components/add-to-cart-button.tsx
"use client";

import { addToCart } from "@/lib/cart";
import type { CatalogueProduct } from "@/hooks/use-catalogue";

export function AddToCartButton({ product }: { product: CatalogueProduct }) {
  return (
    <button onClick={() => addToCart(product)}>
      Add to cart
    </button>
  );
}