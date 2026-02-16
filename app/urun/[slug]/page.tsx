import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getProductBySlug, getProducts } from "@/lib/products";
import { AddToCartButton } from "./AddToCartButton";
import { formatPrice } from "@/lib/format";

export async function generateStaticParams() {
  return getProducts().map((p) => ({ slug: p.slug }));
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-sm text-amber-800/80 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 mb-8"
      >
        ← Məhsullara qayıt
      </Link>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-2xl border border-amber-200/80 dark:border-slate-600 bg-amber-50 dark:bg-slate-700">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </div>
        <div>
          <span className="rounded-full bg-amber-200/80 dark:bg-slate-600 px-3 py-1 text-xs font-medium text-amber-900 dark:text-amber-200">
            {product.category}
          </span>
          <h1 className="mt-3 font-display text-3xl font-serif text-amber-900 dark:text-amber-100 sm:text-4xl">
            {product.name}
          </h1>
          <p className="mt-4 text-amber-800/80 dark:text-slate-300">
            {product.description}
          </p>
          <p className="mt-6 text-3xl font-bold text-amber-600 dark:text-amber-400">
            {formatPrice(product.price)}
          </p>
          <div className="mt-8">
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}
