export interface Product {
  id: string;
  name: string;
  slug: string;
  image: string;
  price: number;
  category: string;
  description: string;
}

const SEED_PRODUCT_COUNT = 25;

const CATEGORIES = [
  "Daxili divar",
  "Xarici divar",
  "Tavan boyası",
  "Su əsaslı",
  "Silikonsuz",
  "Mat",
  "Parlaq",
];

function getCategory(index: number) {
  return CATEGORIES[index % CATEGORIES.length];
}

export function getProducts(): Product[] {
  return Array.from({ length: SEED_PRODUCT_COUNT }, (_, i) => {
    const id = `prod-${i + 1}`;
    const category = getCategory(i);
    return {
      id,
      name: `${category} boyası - ${i + 1}`,
      slug: id,
      image: "", // Şəkil yalnız admin panelindən URL ilə əlavə edilir
      price: 89 + (i % 12) * 25,
      category,
      description: `Yüksək keyfiyyətli ${category.toLowerCase()}. Uzun ömürlü və asan tətbiq.`,
    };
  });
}

export function getProductBySlug(slug: string): Product | undefined {
  return getProducts().find((p) => p.slug === slug);
}
