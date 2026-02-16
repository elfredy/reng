"use client";

import { useCart } from "@/contexts/CartContext";
import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/format";

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalItems, totalPrice } = useCart();

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
        aria-hidden
        onClick={closeCart}
      />
      <aside
        className="fixed right-0 top-0 z-50 h-full w-full max-w-md border-l border-amber-200/60 dark:border-slate-600 bg-amber-50/98 dark:bg-slate-800 shadow-2xl flex flex-col"
        aria-label="Səbət"
      >
        <div className="flex items-center justify-between border-b border-amber-200/60 dark:border-slate-600 px-4 py-4">
          <h2 className="font-display text-xl font-serif text-amber-900 dark:text-amber-100">
            Səbət ({totalItems})
          </h2>
          <button
            type="button"
            onClick={closeCart}
            className="rounded-lg p-2 text-amber-800/80 hover:bg-amber-200/50 dark:hover:bg-slate-700 transition"
            aria-label="Bağla"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <p className="text-amber-800/70 dark:text-slate-400 text-center py-12">
              Səbətiniz boşdur. Məhsul əlavə etmək üçün kataloqa baxın.
            </p>
          ) : (
            <ul className="space-y-4">
              {items.map(({ product, quantity }) => (
                <li
                  key={product.id}
                  className="flex gap-3 rounded-xl border border-amber-200/60 dark:border-slate-600 p-3 bg-white/80 dark:bg-slate-700/50"
                >
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-amber-900 dark:text-slate-100 truncate">
                      {product.name}
                    </p>
                    <p className="text-sm text-amber-600 dark:text-amber-400 font-semibold">
                      {formatPrice(product.price)}
                    </p>
                    <div className="mt-1 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        className="h-7 w-7 rounded border border-amber-300 dark:border-slate-500 flex items-center justify-center text-amber-800 dark:text-slate-300 hover:bg-amber-100 dark:hover:bg-slate-600"
                      >
                        −
                      </button>
                      <span className="w-6 text-center text-sm font-medium">{quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        className="h-7 w-7 rounded border border-amber-300 dark:border-slate-500 flex items-center justify-center text-amber-800 dark:text-slate-300 hover:bg-amber-100 dark:hover:bg-slate-600"
                      >
                        +
                      </button>
                      <button
                        type="button"
                        onClick={() => removeItem(product.id)}
                        className="ml-2 text-xs text-red-600 dark:text-red-400 hover:underline"
                      >
                        Sil
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-amber-200/60 dark:border-slate-600 p-4 space-y-3">
            <div className="flex justify-between text-lg font-semibold">
              <span className="text-amber-800/80 dark:text-slate-400">Cəmi</span>
              <span className="text-amber-900 dark:text-amber-100">
                {formatPrice(totalPrice)}
              </span>
            </div>
            <Link
              href="/sepet"
              onClick={closeCart}
              className="block w-full rounded-xl bg-amber-500 hover:bg-amber-600 dark:bg-amber-500 dark:hover:bg-amber-400 text-white text-center py-3 font-medium transition"
            >
              Səbətə get
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
