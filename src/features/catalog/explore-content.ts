import type { SortId } from "./catalog-utils";

export const exploreContent = {
  title: "Explore",
  bannerEyebrow: "THE FULL EDIT",
  bannerTitle: "All pieces",
  collectionEyebrow: (count: string) => `COLLECTION ${count}`,
  subtitle: "Everything in one considered place.",
  search: "Search your essentials",
  collectionsTitle: "Collections",
  collectionsMeta: "01 / EDITS",
  allPieces: "All pieces",
  all: "All",
  gridView: "Grid view",
  listView: "List view",
  searchLabel: "Search",
  count: (n: number) => `${n} ${n === 1 ? "piece" : "pieces"}`,
  emptyTitle: "Nothing matches these filters",
  emptyDescription: "Try another category, or clear the collection.",
  clearFilters: "CLEAR FILTERS",
} as const;

export const sortOptions: readonly { id: SortId; label: string }[] = [
  { id: "featured", label: "Featured" },
  { id: "price-asc", label: "Price: low to high" },
  { id: "price-desc", label: "Price: high to low" },
];
