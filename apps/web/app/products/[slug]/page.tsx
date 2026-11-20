// apps/web/app/products/[slug]/page.tsx
"use client";

import { use } from "react";
import PhysicalProductWithVariants from "@/components/grit-ui/product-details/physical-product-with-variants";
import { useProduct } from "@/hooks/use-catalogue";
import { addToCart } from "@/lib/cart";

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { data, isLoading, error } = useProduct(slug);

  if (isLoading) return <p>Loading...</p>;
  if (error || !data) return <p>Product not found</p>;
  const product = data.data;

  return (
    <PhysicalProductWithVariants
      name={product.name}
      price={product.price}
      // undefined, not 0, or the block draws a struck-through price on a
      // product that is not discounted.
      wasPrice={product.compare_at_price > product.price ? product.compare_at_price : undefined}
      description={product.description}
      images={(product.images ?? []).map((i) => i.url)}
      // Empty, not left out. The block keeps its sample colours and sizes for
      // any prop you omit, and your page then offers a Midnight Blue you do
      // not sell. Step 4f replaces these with a real picker.
      colours={[]}
      sizes={[]}
      onAddToBasket={() => addToCart(product)}
    />
  );
}