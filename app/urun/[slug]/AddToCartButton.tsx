"use client";

import type { Product } from "@/lib/products";
import { useCart } from "@/contexts/CartContext";

export function AddToCartButton({ product }: { product: Product }) {
  const { addItem, openCart } = useCart();

  const handleAdd = () => {
    addItem(product);
    openCart();
  };

  return (
    <button
      type="button"
      onClick={handleAdd}
      className="w-full rounded-xl bg-amber-500 hover:bg-amber-600 dark:bg-amber-500 dark:hover:bg-amber-400 text-white py-4 text-base font-semibold transition"
    >
      Səbətə əlavə et
    </button>
  );
}
