"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/products";
import { useCart } from "@/contexts/CartContext";
import { formatPrice } from "@/lib/format";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  return (
    <article className="group relative rounded-2xl border border-amber-200/80 dark:border-slate-600 bg-white dark:bg-slate-700/50 overflow-hidden shadow-sm hover:shadow-xl hover:border-amber-300 dark:hover:border-amber-500/50 transition-all duration-300">
      <Link href={`/urun/${product.slug}`} className="block">
        <div className="aspect-square relative bg-amber-50 dark:bg-slate-700 overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            unoptimized={product.image.startsWith("http")}
          />
          <span className="absolute top-3 left-3 rounded-full bg-amber-100/95 dark:bg-slate-800/95 px-2.5 py-0.5 text-xs font-medium text-amber-900 dark:text-amber-200">
            {product.category}
          </span>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-amber-900 dark:text-slate-100 line-clamp-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition">
            {product.name}
          </h3>
          <p className="mt-1 text-lg font-bold text-amber-600 dark:text-amber-400">
            {formatPrice(product.price)}
          </p>
        </div>
      </Link>
      <div className="px-4 pb-4">
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            addItem(product);
          }}
          className="w-full rounded-xl bg-amber-500 hover:bg-amber-600 dark:bg-amber-500 dark:hover:bg-amber-400 text-white py-2.5 text-sm font-medium transition"
        >
          Səbətə əlavə et
        </button>
      </div>
    </article>
  );
}
