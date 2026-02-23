"use client";

import { useEffect, useState, useMemo } from "react";
import { fetchProductsFromFirestore, type Product } from "@/lib/products-firestore";
import { ProductCard } from "@/components/ProductCard";

const SEARCH_DEBOUNCE_MS = 300;

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const list = await fetchProductsFromFirestore();
        if (!cancelled) setProducts(list);
      } catch (e) {
        console.error(e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const t = setTimeout(() => {
      setSearchTerm(searchInput.trim().toLowerCase());
    }, SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(t);
  }, [searchInput]);

  const filteredProducts = useMemo(() => {
    if (!searchTerm) return products;
    return products.filter((p) => {
      const q = searchTerm;
      return (
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        (p.description && p.description.toLowerCase().includes(q))
      );
    });
  }, [products, searchTerm]);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-amber-200/60 dark:border-slate-600">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-100/90 dark:from-amber-950/40 via-amber-50/80 dark:via-slate-800 to-orange-50/80 dark:to-slate-900" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="font-display text-4xl font-serif tracking-tight text-amber-900 dark:text-amber-100 sm:text-5xl lg:text-6xl">
              Evinizə{" "}
              <span className="relative inline-block">
                <span className="relative z-10 bg-amber-400 dark:bg-amber-500 text-amber-950 dark:text-amber-950 font-semibold px-2 py-0.5 rounded-md">
                  rəng
                </span>
              </span>{" "}
              gətirin
            </h1>
            <p className="mt-4 text-lg text-amber-800/80 dark:text-slate-300">
              Daxili və xarici divar boyaları, tavan boyaları. Keyfiyyətli material, sərfəli qiymət.
            </p>
          </div>
        </div>
      </section>

      {/* Axtarış - kateqoriya bölməsi yığışdırılıb */}
      <section id="search" className="border-b border-amber-200/60 dark:border-slate-600 bg-amber-50/60 dark:bg-slate-800/50 py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <label htmlFor="search-input" className="sr-only">
            Məhsul axtarışı
          </label>
          <input
            id="search-input"
            type="search"
            placeholder="Məhsul axtar..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full max-w-md mx-auto block rounded-xl border border-amber-200/80 dark:border-slate-600 bg-white dark:bg-slate-700/80 px-4 py-3 text-amber-900 dark:text-slate-100 placeholder-amber-500 dark:placeholder-slate-400 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20"
          />
        </div>
      </section>

      {/* Məhsul grid */}
      <section className="py-12 sm:py-16 bg-white/30 dark:bg-transparent">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-serif text-amber-900 dark:text-amber-100 mb-8">
            {searchTerm ? "Axtarış nəticələri" : "Bütün məhsullar"}
          </h2>
          {loading ? (
            <p className="text-amber-800/70 dark:text-slate-400">Məhsullar yüklənir...</p>
          ) : filteredProducts.length === 0 ? (
            <p className="text-amber-800/70 dark:text-slate-400">
              {searchTerm ? "Heç bir məhsul tapılmadı." : "Hələ məhsul yoxdur. Admin səhifəsindən seed edin."}
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      <footer className="border-t border-amber-200/60 dark:border-slate-600 py-8 mt-12 bg-amber-50/40 dark:bg-slate-800/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center text-sm text-amber-800/70 dark:text-slate-400">
          © {new Date().getFullYear()} reng.az. Bütün hüquqlar qorunur.
        </div>
      </footer>
    </div>
  );
}
