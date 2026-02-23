"use client";

import {
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
  type DocumentData,
  type QueryDocumentSnapshot,
} from "firebase/firestore";
import { getDb } from "./firebase";
import type { Product } from "./products";
import { getProducts as getProductsStatic } from "./products";

export type { Product };

const COLLECTION = "products";

function docToProduct(docSnap: QueryDocumentSnapshot<DocumentData>): Product {
  const d = docSnap.data();
  return {
    id: docSnap.id,
    name: d.name ?? "",
    slug: d.slug ?? docSnap.id,
    image: d.image ?? "",
    price: typeof d.price === "number" ? d.price : 0,
    category: d.category ?? "",
    description: d.description ?? "",
  };
}

export async function fetchProductsFromFirestore(): Promise<Product[]> {
  const db = getDb();
  const snap = await getDocs(collection(db, COLLECTION));
  if (snap.empty) return [];
  return snap.docs.map(docToProduct).sort((a, b) => a.slug.localeCompare(b.slug));
}

export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  const products = await fetchProductsFromFirestore();
  return products.find((p) => p.slug === slug) ?? null;
}

export async function updateProductInFirestore(
  id: string,
  data: { price?: number; name?: string; category?: string; description?: string; image?: string }
): Promise<void> {
  const db = getDb();
  const ref = doc(db, COLLECTION, id);
  await updateDoc(ref, data as DocumentData);
}

export async function seedProductsToFirestore(): Promise<{ count: number }> {
  const db = getDb();
  const products = getProductsStatic();
  for (const p of products) {
    const ref = doc(db, COLLECTION, p.id);
    await setDoc(ref, {
      name: p.name,
      slug: p.slug,
      image: p.image,
      price: p.price,
      category: p.category,
      description: p.description,
    });
  }
  return { count: products.length };
}
