import {
  categoryTitles,
  collections,
  products,
  type CategoryId,
  type Collection,
  type Product,
} from "./catalog-data";

export type SortId = "featured" | "price-asc" | "price-desc";

export function sortProducts(list: readonly Product[], sort: SortId): Product[] {
  const copy = [...list];
  if (sort === "price-asc") return copy.sort((a, b) => a.price - b.price);
  if (sort === "price-desc") return copy.sort((a, b) => b.price - a.price);
  return copy;
}

type Filters = { categoryId?: CategoryId | null; collection?: Collection | null };

/** Catalog order is preserved, except inside a collection, which uses its curated order. */
export function filterProducts({ categoryId, collection }: Filters): Product[] {
  const base = collection
    ? collection.productIds.flatMap((id) => products.filter((p) => p.id === id))
    : [...products];
  return categoryId ? base.filter((p) => p.categoryId === categoryId) : base;
}

/** Every word in the query must appear in the name, description, category or a collection title. */
export function searchProducts(query: string): Product[] {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (words.length === 0) return [];

  return products.filter((product) => {
    const inCollections = collections
      .filter((c) => c.productIds.includes(product.id))
      .map((c) => c.title)
      .join(" ");
    const haystack =
      `${product.name} ${product.description} ${categoryTitles[product.categoryId]} ${inCollections}`.toLowerCase();
    return words.every((word) => haystack.includes(word));
  });
}
