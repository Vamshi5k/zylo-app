import type { ArtAsset } from "../../constants/images";
import { editImages, heroImage } from "../../constants/images";
import { brand } from "../../constants/brand";
import { commerce } from "../../constants/commerce";
import type { CollectionId } from "../catalog/catalog-data";
import { formatPrice } from "../../utils/format";

export type HeroSlide = {
  id: string;
  eyebrow: string;
  title: string;
  cta: string;
  image: ArtAsset;
  /** Collection opened by the call to action; omit for the full catalog. */
  collection?: CollectionId;
};

export const heroSlides: readonly HeroSlide[] = [
  {
    id: "edit",
    eyebrow: "THE NEW EDIT",
    title: "Everyday\nstyle, refined.",
    cta: "EXPLORE COLLECTION",
    image: heroImage,
  },
  {
    id: "outerwear",
    eyebrow: "OUTERWEAR",
    title: "Layers,\nconsidered.",
    cta: "SHOP OUTERWEAR",
    image: editImages.outerwear,
    collection: "outerwear",
  },
  {
    id: "knitwear",
    eyebrow: "KNITWEAR",
    title: "Soft by\ndesign.",
    cta: "SHOP KNITWEAR",
    image: editImages.knitwear,
    collection: "knitwear",
  },
  {
    id: "weekend",
    eyebrow: "WEEKEND",
    title: "Time off,\nedited.",
    cta: "SHOP WEEKEND",
    image: editImages.flatlay,
    collection: "weekend",
  },
];

export const homeContent = {
  searchLabel: "Search",
  categoriesTitle: "Shop by category",
  categoriesMeta: "01 / SHOP",
  editsTitle: "The edits",
  editsIndex: "02 / EDITS",
  spotlightTitle: "In focus",
  spotlightMeta: "03 / NEW IN",
  spotlightBadge: "NEW IN",
  spotlightCta: "SHOP NOW",
  /** Product shown in the spotlight card. */
  spotlightProductId: "5",
  productsTitle: "Selected for you",
  productsDescription: "Pieces worth keeping.",
  viewAll: "VIEW ALL",
  pieces: (n: number) => `${n} ${n === 1 ? "piece" : "pieces"}`,
  marquee: [
    `FREE DELIVERY OVER ${formatPrice(commerce.freeDeliveryThreshold)}`,
    "THE NEW EDIT · NO. 001",
    brand.tagline,
  ].join("   ·   ") + "   ·   ",
  statement: {
    eyebrow: "OUR PHILOSOPHY",
    title: "Keep what\nmatters.",
    body: "A considered collection of everyday pieces. Made for your own kind of style.",
    footer: "ZYLO® — LIVE CONSIDERED",
  },
} as const;
