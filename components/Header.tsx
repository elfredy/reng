"use client";

import Link from "next/link";
import { useTheme } from "@/contexts/ThemeContext";
import { useCart } from "@/contexts/CartContext";

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const { totalItems, toggleCart } = useCart();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-amber-200/60 dark:border-slate-600 bg-amber-50/90 dark:bg-slate-800/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="font-display text-2xl font-serif text-amber-900 dark:text-amber-100 tracking-tight"
        >
          RƏNG
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className="text-sm font-medium text-amber-800/80 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400 transition"
          >
            Məhsullar
          </Link>
          <Link
            href="/#kategoriler"
            className="text-sm font-medium text-amber-800/80 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400 transition"
          >
            Kateqoriyalar
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-lg p-2 text-amber-800/80 dark:text-slate-300 hover:bg-amber-200/50 dark:hover:bg-slate-700 transition"
            aria-label={theme === "light" ? "Qaranlıq rejim" : "İşıqlı rejim"}
          >
            {theme === "light" ? (
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            )}
          </button>

          <button
            type="button"
            onClick={toggleCart}
            className="relative rounded-lg p-2 text-amber-800/80 dark:text-slate-300 hover:bg-amber-200/50 dark:hover:bg-slate-700 transition"
            aria-label="Səbət"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-[10px] font-semibold text-white">
                {totalItems > 99 ? "99+" : totalItems}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
