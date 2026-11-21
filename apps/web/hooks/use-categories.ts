import type { Category } from "@repo/shared/types";
import type {
  CreateCategoryInput,
  UpdateCategoryInput,
} from "@repo/shared/schemas";
import { resourceHooks } from "./use-resource";
import { useQuery } from "@tanstack/react-query";

// React Query hooks for categories.
//
// The bodies live in ./use-resource.ts, so a fix to the hook shape, a new
// query parameter or a change to how the cache is invalidated reaches every
// resource in this project at once. Edit this file to change what THIS
// resource does; edit use-resource.ts to change what they all do.
const categories = resourceHooks<
  Category,
  CreateCategoryInput,
  UpdateCategoryInput
>("categories", "/api/categories");

export const useCategories = categories.useList;
export const useGetCategory = categories.useOne;
export const useCreateCategory = categories.useCreate;
export const useUpdateCategory = categories.useUpdate;
export const useDeleteCategory = categories.useRemove;

/** The cache keys, for an invalidation this file does not already do. */
export const categoryKeys = categories.keys;

// apps/web/hooks/use-categories.ts
export interface CategoryNode {
  id: string;
  parent_id: string;
  depth: number;
  name: string;
  slug: string;
  description?: string;
  /** null on a leaf, NOT an empty array. Go marshals an empty slice as null. */
  children: CategoryNode[] | null;
}

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";
const KEY = process.env.NEXT_PUBLIC_API_KEY ?? "";

async function get<T>(
  path: string,
  params: Record<string, string> = {},
): Promise<T> {
  const query = new URLSearchParams(params);
  // The publishable key, not a bearer token. There is no user here.
  const res = await fetch(`${API}/api/v1/public/${path}?${query}`, {
    headers: { "X-API-Key": KEY },
  });
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json();
}

/** The whole hierarchy, once. It changes when somebody edits the catalogue,
 *  which is rarely, so it is cached hard. */
export function useCategoryTree() {
  return useQuery({
    queryKey: ["category-tree"],
    staleTime: 5 * 60 * 1000,
    queryFn: () => get<{ data: CategoryNode[] }>("categories/tree"),
  });
}

/** Depth-first lookup by slug. */
export function findNode(
  nodes: CategoryNode[],
  slug: string,
): CategoryNode | undefined {
  for (const node of nodes) {
    if (node.slug === slug) return node;
    const hit = node.children ? findNode(node.children, slug) : undefined;
    if (hit) return hit;
  }
  return undefined;
}

/** Children as an array, whatever the API sent. */
export function childrenOf(node?: CategoryNode): CategoryNode[] {
  return node?.children ?? [];
}
