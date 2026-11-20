// apps/web/components/shop/product-card.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { addToCart } from "@/lib/cart";
import { formatMoney } from "@/lib/format";
import type { CatalogueProduct } from "@/hooks/use-catalogue";

export function ProductCard({ product }: { product: CatalogueProduct }) {
  const onSale = product.compare_at_price > product.price;

  return (
    <div className="rounded-lg border p-3">
      <Link href={`/products/${product.slug}`}>
        {product.images?.[0]?.url ? (
          <Image
            src={product.images[0].url}
            alt={product.name}
            width={600}
            height={400}
            className="mb-2 aspect-[3/2] w-full rounded object-cover"
          />
        ) : (
          <div className="mb-2 aspect-[3/2] w-full rounded bg-neutral-200" />
        )}
        <h3 className="text-sm font-medium">{product.name}</h3>
      </Link>

      <p className="text-sm">
        {formatMoney(product.price)}
        {onSale && (
          <s className="ml-2 text-neutral-500">{formatMoney(product.compare_at_price)}</s>
        )}
      </p>

      <button
        onClick={() => addToCart(product)}
        className="mt-2 rounded bg-black px-3 py-1 text-xs text-white"
      >
        Add to cart
      </button>
    </div>
  );
}