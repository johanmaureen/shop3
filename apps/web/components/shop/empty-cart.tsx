// apps/web/components/shop/empty-cart.tsx
import Link from "next/link";

export function EmptyCart() {
  return (
    <div className="mx-auto max-w-md py-16 text-center">
      <h1 className="text-xl font-semibold">Your cart is empty</h1>
      <p className="mt-2 text-sm text-neutral-600">
        Nothing here yet. Have a look at what is in stock.
      </p>
      <Link
        href="/products"
        className="mt-6 inline-block rounded bg-black px-5 py-2 text-sm text-white"
      >
        Browse products
      </Link>
    </div>
  );
}