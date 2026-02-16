"use client";

import { useCart } from "@/contexts/CartContext";
import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/format";

export default function SepetPage() {
  const { items, removeItem, updateQuantity, totalItems, totalPrice } = useCart();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-serif text-amber-900 dark:text-amber-100 mb-8">
        Səbətim
      </h1>

      {items.length === 0 ? (
        <div className="rounded-2xl border border-amber-200/80 dark:border-slate-600 bg-amber-50/80 dark:bg-slate-700/30 p-12 text-center">
          <p className="text-amber-800/80 dark:text-slate-400 mb-6">
            Səbətinizdə hələ məhsul yoxdur.
          </p>
          <Link
            href="/"
            className="inline-flex rounded-xl bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 font-medium transition"
          >
            Alış-verişə başla
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          <ul className="space-y-4">
            {items.map(({ product, quantity }) => (
              <li
                key={product.id}
                className="flex gap-4 rounded-2xl border border-amber-200/80 dark:border-slate-600 bg-white dark:bg-slate-700/50 p-4"
              >
                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-amber-900 dark:text-slate-100">
                    {product.name}
                  </h3>
                  <p className="text-sm text-amber-800/70 dark:text-slate-400">{product.category}</p>
                  <p className="mt-1 text-amber-600 dark:text-amber-400 font-semibold">
                    {formatPrice(product.price)}
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => updateQuantity(product.id, quantity - 1)}
                      className="h-8 w-8 rounded-lg border border-amber-300 dark:border-slate-500 flex items-center justify-center hover:bg-amber-100 dark:hover:bg-slate-600"
                    >
                      −
                    </button>
                    <span className="w-8 text-center font-medium">{quantity}</span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(product.id, quantity + 1)}
                      className="h-8 w-8 rounded-lg border border-amber-300 dark:border-slate-500 flex items-center justify-center hover:bg-amber-100 dark:hover:bg-slate-600"
                    >
                      +
                    </button>
                    <button
                      type="button"
                      onClick={() => removeItem(product.id)}
                      className="ml-4 text-sm text-red-600 dark:text-red-400 hover:underline"
                    >
                      Sil
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-amber-900 dark:text-slate-100">
                    {formatPrice(product.price * quantity)}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <div className="rounded-2xl border border-amber-200/80 dark:border-slate-600 bg-amber-50/80 dark:bg-slate-700/30 p-6">
            <div className="flex justify-between text-lg font-semibold mb-4">
              <span className="text-amber-800/80 dark:text-slate-400">Cəmi ({totalItems} məhsul)</span>
              <span className="text-amber-900 dark:text-amber-100">
                {formatPrice(totalPrice)}
              </span>
            </div>
            <p className="text-sm text-amber-800/70 dark:text-slate-400 mb-4">
              Ödəniş və çatdırılma addımları backend əlavə edildikdə aktiv olacaq.
            </p>
            <button
              type="button"
              disabled
              className="w-full rounded-xl bg-amber-300 dark:bg-slate-600 text-amber-900 dark:text-slate-300 py-3 font-medium cursor-not-allowed"
            >
              Ödənişə keç (Tezliklə)
            </button>
          </div>

          <p className="text-center">
            <Link href="/" className="text-amber-600 dark:text-amber-400 hover:underline font-medium">
              ← Alış-verişə davam et
            </Link>
          </p>
        </div>
      )}
    </div>
  );
}
