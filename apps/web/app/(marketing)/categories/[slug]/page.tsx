// apps/web/app/categories/[slug]/page.tsx
"use client";

import { use } from "react";
import Link from "next/link";
import { useCategoryTree, findNode, childrenOf } from "@/hooks/use-categories";
import { useCatalogue, useCategory } from "@/hooks/use-catalogue";
import ProductGridWithRatings from "@/components/grit-ui/product-grids/grid-with-ratings";

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);

  const { data: tree } = useCategoryTree();
  const node = findNode(tree?.data ?? [], slug);
  const subCategories = childrenOf(node);

  // Still the detail call, for descendant_ids. Two requests total for the
  // page, and the tree one is shared with every other category page.
  const { data: category } = useCategory(slug);

  const { data: products } = useCatalogue(
    category?.data
      ? { categoryIds: category.data.descendant_ids ?? [category.data.id], pageSize: 24 }
      : {},
  );

  return (
    <main>
      <h1>{node?.name ?? category?.data.name}</h1>

      {/* Level 2. Renders nothing on a leaf like Cameras, which is correct:
          a leaf has no sub-categories and should go straight to products. */}
      {subCategories.length > 0 && (
        <nav className="category-tiles">
          {subCategories.map((child) => (
            <Link key={child.id} href={`/categories/${child.slug}`}>
              {child.name}
            </Link>
          ))}
        </nav>
      )}

      <ProductGridWithRatings
        products={(products?.data ?? []).map((product) => ({
          id: product.id,
          name: product.name,
          price: product.price,
          originalPrice:
            product.compare_at_price > product.price
              ? product.compare_at_price
              : undefined,
          image: product.images?.[0]?.url ?? "",
          href: `/products/${product.slug}`,
        }))}
      />
    </main>
  );
}