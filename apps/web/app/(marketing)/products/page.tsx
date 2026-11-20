// apps/web/app/page.tsx
"use client";

import CircularCategoryRail, {
  type Category as RailCategory,
} from "@/components/grit-ui/store-categories/circular-category-rail";
import { useCategories } from "@/hooks/use-catalogue";

export default function HomePage() {
  const { data, isLoading } = useCategories();
  if (isLoading) return <p>Loading categories...</p>;

  const categories: RailCategory[] = (data?.data ?? []).map((c) => ({
    name: c.name,
    href: `/categories/${c.slug}`,
    // The rail is built around a picture per category. This is what the
    // image:file:image in Step 1 was for: without it every circle is empty
    // and the row reads as a loading state that never finishes.
    image: c.image?.url ?? "",
    tone: "#e5e7eb",
  }));

  return <CircularCategoryRail categories={categories} />;
}  