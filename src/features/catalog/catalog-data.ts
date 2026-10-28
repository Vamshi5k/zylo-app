import { editImages, productImages, type ArtAsset } from "../../constants/images";
import type { colors } from "../../../theme";
import type { IconName } from "../../components/ui/icon";

export type CategoryId = "clothing" | "footwear" | "accessories";

export type Category = {
  id: CategoryId;
  title: string;
  icon: IconName;
};

export type Product = {
  id: string;
  name: string;
  categoryId: CategoryId;
  /** Price in rupees. */
  price: number;
  description: string;
  sizes: readonly string[];
  tint: keyof typeof colors;
  /** Width / height of the card tile; varied for the staggered grid. */
  aspectRatio: number;
  /** Local photo; `tint` shows behind it while it decodes. */
  image: ArtAsset;
};

export const categories: readonly Category[] = [
  { id: "clothing", title: "Clothing", icon: "shirt-outline" },
  { id: "footwear", title: "Footwear", icon: "footsteps-outline" },
  { id: "accessories", title: "Accessories", icon: "watch-outline" },
];

export const categoryTitles: Record<CategoryId, string> = Object.fromEntries(
  categories.map((category) => [category.id, category.title]),
) as Record<CategoryId, string>;

type ProductSeed = Omit<Product, "image">;

const seeds: readonly ProductSeed[] = [
  {
    id: "1",
    name: "Essential T-Shirt",
    categoryId: "clothing",
    price: 999,
    description: "A soft, heavyweight cotton tee with a relaxed, everyday fit.",
    sizes: ["XS", "S", "M", "L", "XL"],
    tint: "tintSand",
    aspectRatio: 0.78,
  },
  {
    id: "2",
    name: "Everyday Sneakers",
    categoryId: "footwear",
    price: 2499,
    description: "Clean leather-look sneakers designed for all-day comfort.",
    sizes: ["6", "7", "8", "9", "10", "11"],
    tint: "tintStone",
    aspectRatio: 0.95,
  },
  {
    id: "3",
    name: "Classic Watch",
    categoryId: "accessories",
    price: 1799,
    description: "A minimal analogue watch with a brushed steel case.",
    sizes: ["One size"],
    tint: "tintLinen",
    aspectRatio: 0.95,
  },
  {
    id: "4",
    name: "Relaxed Hoodie",
    categoryId: "clothing",
    price: 1499,
    description: "A midweight hoodie in a boxy, easy silhouette.",
    sizes: ["S", "M", "L", "XL"],
    tint: "tintAsh",
    aspectRatio: 0.78,
  },
  {
    id: "5",
    name: "Linen Overshirt",
    categoryId: "clothing",
    price: 1899,
    description: "Breathable linen that layers over anything.",
    sizes: ["S", "M", "L", "XL"],
    tint: "tintLinen",
    aspectRatio: 0.95,
  },
  {
    id: "6",
    name: "Court Trainers",
    categoryId: "footwear",
    price: 2999,
    description: "Low-profile trainers with a cushioned insole.",
    sizes: ["6", "7", "8", "9", "10", "11"],
    tint: "tintSand",
    aspectRatio: 0.78,
  },
  {
    id: "7",
    name: "Canvas Tote",
    categoryId: "accessories",
    price: 799,
    description: "A sturdy canvas tote with an inner zip pocket.",
    sizes: ["One size"],
    tint: "tintAsh",
    aspectRatio: 0.78,
  },
  {
    id: "8",
    name: "Leather Belt",
    categoryId: "accessories",
    price: 1199,
    description: "Full-grain leather with a matte brushed buckle.",
    sizes: ["S", "M", "L"],
    tint: "tintStone",
    aspectRatio: 0.95,
  },
];

export const products: readonly Product[] = seeds.map((seed) => ({
  ...seed,
  image: productImages[seed.id],
}));

export const getProduct = (id: string) => products.find((p) => p.id === id);

export type CollectionId = "knitwear" | "weekend" | "outerwear" | "studio";

export type Collection = {
  id: CollectionId;
  title: string;
  /** Shown in the editorial numbering, e.g. "01". */
  count: string;
  description: string;
  image: ArtAsset;
  tint: keyof typeof colors;
  fallbackIcon: IconName;
  /** Curated, in display order. */
  productIds: readonly string[];
};

export const collections: readonly Collection[] = [
  {
    id: "knitwear",
    title: "Knitwear",
    count: "01",
    description: "Soft layers for slower days.",
    image: editImages.knitwear,
    tint: "tintLinen",
    fallbackIcon: "sparkles-outline",
    productIds: ["4", "1", "5"],
  },
  {
    id: "weekend",
    title: "Weekend",
    count: "02",
    description: "Easy pieces for time off.",
    image: editImages.flatlay,
    tint: "tintStone",
    fallbackIcon: "watch-outline",
    productIds: ["2", "6", "7", "3"],
  },
  {
    id: "outerwear",
    title: "Outerwear",
    count: "03",
    description: "Considered layers for every season.",
    image: editImages.outerwear,
    tint: "tintSand",
    fallbackIcon: "shirt-outline",
    productIds: ["5", "4"],
  },
  {
    id: "studio",
    title: "The Studio",
    count: "04",
    description: "The essentials we reach for daily.",
    image: editImages.studio,
    tint: "tintAsh",
    fallbackIcon: "storefront-outline",
    productIds: ["1", "5", "8", "3"],
  },
];

export const getCollection = (id: string | undefined) => collections.find((c) => c.id === id);
export const getCategory = (id: string | undefined) => categories.find((c) => c.id === id);
