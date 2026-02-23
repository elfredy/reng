"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { getAuthInstance } from "@/lib/firebase";
import {
  fetchProductsFromFirestore,
  updateProductInFirestore,
  seedProductsToFirestore,
  type Product,
} from "@/lib/products-firestore";

const ADMIN_EMAIL_SUFFIX = "@reng.az";

type EditState = Record<
  string,
  { name: string; description: string; price: string; image: string; category: string }
>;

function AdminPanel() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [edit, setEdit] = useState<EditState>({});

  const load = async () => {
    setLoading(true);
    try {
      const list = await fetchProductsFromFirestore();
      setProducts(list);
      setEdit(
        list.reduce<EditState>((acc, p) => {
          acc[p.id] = {
            name: p.name,
            description: p.description ?? "",
            price: String(p.price),
            image: p.image ?? "",
            category: p.category ?? "",
          };
          return acc;
        }, {})
      );
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleSeed = async () => {
    setSeeding(true);
    try {
      const { count } = await seedProductsToFirestore();
      alert(`${count} məhsul Firestore-a əlavə edildi.`);
      await load();
    } catch (e) {
      console.error(e);
      alert("Seed xətası: " + (e instanceof Error ? e.message : String(e)));
    } finally {
      setSeeding(false);
    }
  };

  const updateEdit = (id: string, field: keyof EditState[string], value: string) => {
    setEdit((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: value },
    }));
  };

  const handleSave = async (product: Product) => {
    const e = edit[product.id];
    if (!e) return;
    const price = Math.round(parseFloat(e.price) * 100) / 100;
    if (Number.isNaN(price) || price < 0) {
      alert("Düzgün qiymət daxil edin.");
      return;
    }
    setSavingId(product.id);
    try {
      await updateProductInFirestore(product.id, {
        name: e.name.trim(),
        description: e.description.trim(),
        price,
        image: e.image.trim(),
        category: e.category.trim(),
      });
      setProducts((prev) =>
        prev.map((p) =>
          p.id === product.id
            ? {
                ...p,
                name: e.name.trim(),
                description: e.description.trim(),
                price,
                image: e.image.trim(),
                category: e.category.trim(),
              }
            : p
        )
      );
    } catch (err) {
      console.error(err);
      alert("Saxlanarkən xəta.");
    } finally {
      setSavingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-amber-50/50 dark:bg-slate-900">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-serif text-amber-900 dark:text-amber-100">
              Admin – Məhsullar
            </h1>
            <p className="mt-1 text-sm text-amber-800/70 dark:text-slate-400">
              Ad, açıqlama, qiymət və şəkil URL-i (Firebase-ə yükləməyək, URL yapışdırın).
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="rounded-lg border border-amber-300 dark:border-slate-600 px-4 py-2 text-sm font-medium text-amber-800 dark:text-slate-300 hover:bg-amber-100 dark:hover:bg-slate-700"
            >
              ← Ana səhifə
            </Link>
            <button
              type="button"
              onClick={() => signOut(getAuthInstance())}
              className="rounded-lg border border-red-300 dark:border-red-700 px-4 py-2 text-sm font-medium text-red-700 dark:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              Çıxış
            </button>
            <button
              type="button"
              onClick={handleSeed}
              disabled={seeding}
              className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium text-white hover:bg-amber-600 disabled:opacity-50"
            >
              {seeding ? "Yüklənir..." : "Firestore-a məhsulları yüklə (seed)"}
            </button>
          </div>
        </div>

        {loading ? (
          <p className="text-amber-800/70 dark:text-slate-400">Məhsullar yüklənir...</p>
        ) : products.length === 0 ? (
          <div className="rounded-2xl border border-amber-200/80 dark:border-slate-600 bg-white dark:bg-slate-800/50 p-8 text-center">
            <p className="text-amber-800/80 dark:text-slate-300 mb-4">
              Firestore-da hələ məhsul yoxdur. &quot;Firestore-a məhsulları yüklə (seed)&quot; düyməsinə basın.
            </p>
            <button
              type="button"
              onClick={handleSeed}
              disabled={seeding}
              className="rounded-lg bg-amber-500 px-6 py-2 text-white hover:bg-amber-600 disabled:opacity-50"
            >
              {seeding ? "Yüklənir..." : "Seed et"}
            </button>
          </div>
        ) : (
          <ul className="space-y-6">
            {products.map((product) => {
              const e = edit[product.id];
              if (!e) return null;
              return (
                <li
                  key={product.id}
                  className="rounded-2xl border border-amber-200/80 dark:border-slate-600 bg-white dark:bg-slate-800/50 p-4 sm:p-6"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                    <div className="w-24 h-24 shrink-0 overflow-hidden rounded-lg bg-amber-100 dark:bg-slate-700 relative">
                      {e.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={e.image}
                          alt=""
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                      ) : (
                        <span className="absolute inset-0 flex items-center justify-center text-xs text-amber-600 dark:text-slate-400">
                          URL yapışdırın
                        </span>
                      )}
                    </div>
                    <div className="min-w-0 flex-1 space-y-3">
                      <div>
                        <label className="block text-xs font-medium text-amber-800/80 dark:text-slate-400 mb-1">
                          Ad
                        </label>
                        <input
                          type="text"
                          value={e.name}
                          onChange={(ev) => updateEdit(product.id, "name", ev.target.value)}
                          className="w-full rounded-lg border border-amber-300 dark:border-slate-600 bg-amber-50/50 dark:bg-slate-700 px-3 py-2 text-sm text-amber-900 dark:text-slate-100"
                          placeholder="Məhsul adı"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-amber-800/80 dark:text-slate-400 mb-1">
                          Açıqlama
                        </label>
                        <textarea
                          value={e.description}
                          onChange={(ev) => updateEdit(product.id, "description", ev.target.value)}
                          rows={2}
                          className="w-full rounded-lg border border-amber-300 dark:border-slate-600 bg-amber-50/50 dark:bg-slate-700 px-3 py-2 text-sm text-amber-900 dark:text-slate-100 resize-none"
                          placeholder="Qısa təsvir"
                        />
                      </div>
                      <div className="flex flex-wrap gap-3">
                        <div>
                          <label className="block text-xs font-medium text-amber-800/80 dark:text-slate-400 mb-1">
                            Qiymət (₼)
                          </label>
                          <input
                            type="number"
                            min={0}
                            step={0.01}
                            value={e.price}
                            onChange={(ev) => updateEdit(product.id, "price", ev.target.value)}
                            className="w-28 rounded-lg border border-amber-300 dark:border-slate-600 bg-amber-50/50 dark:bg-slate-700 px-3 py-2 text-sm text-amber-900 dark:text-slate-100"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <label className="block text-xs font-medium text-amber-800/80 dark:text-slate-400 mb-1">
                            Kateqoriya
                          </label>
                          <input
                            type="text"
                            value={e.category}
                            onChange={(ev) => updateEdit(product.id, "category", ev.target.value)}
                            className="w-full rounded-lg border border-amber-300 dark:border-slate-600 bg-amber-50/50 dark:bg-slate-700 px-3 py-2 text-sm text-amber-900 dark:text-slate-100"
                            placeholder="Daxili divar, Tavan..."
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-amber-800/80 dark:text-slate-400 mb-1">
                          Şəkil URL (yapışdırın)
                        </label>
                        <input
                          type="url"
                          value={e.image}
                          onChange={(ev) => updateEdit(product.id, "image", ev.target.value)}
                          className="w-full rounded-lg border border-amber-300 dark:border-slate-600 bg-amber-50/50 dark:bg-slate-700 px-3 py-2 text-sm text-amber-900 dark:text-slate-100"
                          placeholder="https://... və ya /img/fayl.jpeg"
                        />
                      </div>
                      <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={() => handleSave(product)}
                          disabled={savingId === product.id}
                          className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium text-white hover:bg-amber-600 disabled:opacity-50"
                        >
                          {savingId === product.id ? "Saxlanır..." : "Saxla"}
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

export default function AbalaPage() {
  const [user, setUser] = useState<unknown>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [loginUser, setLoginUser] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  useEffect(() => {
    const auth = getAuthInstance();
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setAuthLoading(false);
    });
    return () => unsub();
  }, []);

  const email = loginUser.trim().toLowerCase() + ADMIN_EMAIL_SUFFIX;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setLoginLoading(true);
    try {
      await signInWithEmailAndPassword(getAuthInstance(), email, loginPass);
    } catch {
      setLoginError("İstifadəçi tapılmadı və ya parol səhvdir.");
    } finally {
      setLoginLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-amber-50/50 dark:bg-slate-900">
        <p className="text-amber-800/70 dark:text-slate-400">Yüklənir...</p>
      </div>
    );
  }

  if (user) {
    return <AdminPanel />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-amber-50/50 dark:bg-slate-900 px-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm rounded-2xl border border-amber-200/80 dark:border-slate-600 bg-white dark:bg-slate-800/80 p-6 shadow-lg"
      >
        <h1 className="font-display text-xl font-serif text-amber-900 dark:text-amber-100 mb-1">
          Giriş
        </h1>
        <p className="text-sm text-amber-800/70 dark:text-slate-400 mb-6">
          Admin panelinə daxil olun.
        </p>
        <div className="space-y-4">
          <div>
            <label htmlFor="abala-user" className="block text-xs font-medium text-amber-800/80 dark:text-slate-400 mb-1">
              İstifadəçi adı
            </label>
            <input
              id="abala-user"
              type="text"
              value={loginUser}
              onChange={(e) => setLoginUser(e.target.value)}
              autoComplete="username"
              required
              className="w-full rounded-lg border border-amber-300 dark:border-slate-600 bg-amber-50/50 dark:bg-slate-700 px-3 py-2 text-amber-900 dark:text-slate-100"
              placeholder="elfredy"
            />
          </div>
          <div>
            <label htmlFor="abala-pass" className="block text-xs font-medium text-amber-800/80 dark:text-slate-400 mb-1">
              Parol
            </label>
            <input
              id="abala-pass"
              type="password"
              value={loginPass}
              onChange={(e) => setLoginPass(e.target.value)}
              autoComplete="current-password"
              required
              className="w-full rounded-lg border border-amber-300 dark:border-slate-600 bg-amber-50/50 dark:bg-slate-700 px-3 py-2 text-amber-900 dark:text-slate-100"
            />
          </div>
          {loginError && (
            <p className="text-sm text-red-600 dark:text-red-400">{loginError}</p>
          )}
          <button
            type="submit"
            disabled={loginLoading}
            className="w-full rounded-lg bg-amber-500 py-2.5 text-sm font-medium text-white hover:bg-amber-600 disabled:opacity-50"
          >
            {loginLoading ? "Daxil olunur..." : "Daxil ol"}
          </button>
        </div>
        <p className="mt-4 text-center">
          <Link href="/" className="text-sm text-amber-600 dark:text-amber-400 hover:underline">
            ← Ana səhifə
          </Link>
        </p>
      </form>
    </div>
  );
}
