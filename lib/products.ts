export interface Product {
  id: string;
  name: string;
  slug: string;
  image: string;
  price: number;
  category: string;
  description: string;
}

const IMAGE_NAMES = [
  "WhatsApp Image 2026-02-15 at 21.17.44 (1).jpeg",
  "WhatsApp Image 2026-02-15 at 21.17.44 (2).jpeg",
  "WhatsApp Image 2026-02-15 at 21.17.44.jpeg",
  "WhatsApp Image 2026-02-15 at 21.17.45 (1).jpeg",
  "WhatsApp Image 2026-02-15 at 21.17.45 (2).jpeg",
  "WhatsApp Image 2026-02-15 at 21.17.45.jpeg",
  "WhatsApp Image 2026-02-15 at 21.17.46 (1).jpeg",
  "WhatsApp Image 2026-02-15 at 21.17.46 (2).jpeg",
  "WhatsApp Image 2026-02-15 at 21.17.46 (3).jpeg",
  "WhatsApp Image 2026-02-15 at 21.17.46.jpeg",
  "WhatsApp Image 2026-02-15 at 21.17.47 (1).jpeg",
  "WhatsApp Image 2026-02-15 at 21.17.47 (2).jpeg",
  "WhatsApp Image 2026-02-15 at 21.17.47 (3).jpeg",
  "WhatsApp Image 2026-02-15 at 21.17.47.jpeg",
  "WhatsApp Image 2026-02-15 at 21.17.48 (1).jpeg",
  "WhatsApp Image 2026-02-15 at 21.17.48 (2).jpeg",
  "WhatsApp Image 2026-02-15 at 21.17.48.jpeg",
  "WhatsApp Image 2026-02-15 at 21.17.49 (1).jpeg",
  "WhatsApp Image 2026-02-15 at 21.17.49 (2).jpeg",
  "WhatsApp Image 2026-02-15 at 21.17.49 (3).jpeg",
  "WhatsApp Image 2026-02-15 at 21.17.49 (4).jpeg",
  "WhatsApp Image 2026-02-15 at 21.17.49.jpeg",
  "WhatsApp Image 2026-02-15 at 21.17.50 (1).jpeg",
  "WhatsApp Image 2026-02-15 at 21.17.50 (2).jpeg",
  "WhatsApp Image 2026-02-15 at 21.17.50.jpeg",
];

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
  return IMAGE_NAMES.map((imgName, i) => {
    const id = `prod-${i + 1}`;
    const category = getCategory(i);
    return {
      id,
      name: `${category} boyası - ${i + 1}`,
      slug: id,
      image: `/img/${encodeURIComponent(imgName)}`,
      price: 89 + (i % 12) * 25,
      category,
      description: `Yüksək keyfiyyətli ${category.toLowerCase()}. Uzun ömürlü və asan tətbiq.`,
    };
  });
}

export function getProductBySlug(slug: string): Product | undefined {
  return getProducts().find((p) => p.slug === slug);
}
