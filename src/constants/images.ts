import type { ImageRequireSource } from "react-native";

export type ArtAsset = {
  source: ImageRequireSource;
  /** Accessibility description of the image. */
  label: string;
};

/**
 * Photography from Unsplash (Unsplash License: free for commercial use, no attribution required).
 * Source pages are listed in `assets/images/photos/CREDITS.md`. Every `require` is static so Metro can bundle it.
 */
export const heroImage: ArtAsset = {
  source: require("../../assets/images/photos/hero-campaign.jpg"),
  label: "Man in a long trench coat walking down a city street",
};

export type EditImageId = "knitwear" | "flatlay" | "outerwear" | "studio";

export const editImages: Record<EditImageId, ArtAsset> = {
  knitwear: {
    source: require("../../assets/images/photos/collection-knitwear.jpg"),
    label: "Stack of folded knit sweaters beside a ball of yarn",
  },
  flatlay: {
    source: require("../../assets/images/photos/collection-weekend.jpg"),
    label: "Flat lay of a rust sweatshirt, cable knit jumper, suede boots and checked trousers",
  },
  outerwear: {
    source: require("../../assets/images/photos/collection-outerwear.jpg"),
    label: "Man in a charcoal wool overcoat and flat cap",
  },
  studio: {
    source: require("../../assets/images/photos/collection-studio.jpg"),
    label: "Clothing rail in a minimal concrete boutique",
  },
};

/** Keyed by product id from `catalog-data.ts`. */
export const productImages: Record<string, ArtAsset> = {
  "1": {
    source: require("../../assets/images/photos/product-essential-tshirt.jpg"),
    label: "White crew-neck t-shirt on a hanger against a concrete wall",
  },
  "2": {
    source: require("../../assets/images/photos/product-everyday-sneakers.jpg"),
    label: "White low-top sneakers on a sunlit pavement",
  },
  "3": {
    source: require("../../assets/images/photos/product-classic-watch.jpg"),
    label: "Chronograph watch with a brown leather strap",
  },
  "4": {
    source: require("../../assets/images/photos/product-relaxed-hoodie.jpg"),
    label: "Grey pullover hoodie seen from behind",
  },
  "5": {
    source: require("../../assets/images/photos/product-linen-overshirt.jpg"),
    label: "Man wearing a sage overshirt with chest pockets",
  },
  "6": {
    source: require("../../assets/images/photos/product-court-trainers.jpg"),
    label: "White lace-up trainers on a patterned rug",
  },
  "7": {
    source: require("../../assets/images/photos/product-canvas-tote.jpg"),
    label: "Natural canvas tote bag on a grey surface",
  },
  "8": {
    source: require("../../assets/images/photos/product-leather-belt.jpg"),
    label: "Brown leather belt coiled around a railing",
  },
};
