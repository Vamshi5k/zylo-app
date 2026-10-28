import { editImages, heroImage, type ArtAsset } from "../../constants/images";
import type { IconName } from "../../components/ui/icon";
import type { colors } from "../../../theme";

export type OnboardingSlide = {
  id: string;
  title: string;
  description: string;
  image: ArtAsset;
  /** Shown behind the image while it decodes. */
  tint: keyof typeof colors;
  fallbackIcon: IconName;
};

export const onboardingSlides: OnboardingSlide[] = [
  {
    id: "curated",
    title: "Considered essentials, curated for you",
    description:
      "A focused edit of everyday pieces, chosen for quality and made to last.",
    image: editImages.studio,
    tint: "tintSand",
    fallbackIcon: "shirt-outline",
  },
  {
    id: "style",
    title: "Everyday style, refined",
    description:
      "Soft textures and warm neutrals that work together, season after season.",
    image: heroImage,
    tint: "tintLinen",
    fallbackIcon: "sparkles-outline",
  },
  {
    id: "effortless",
    title: "Shop with ease",
    description:
      "Save favourites, build your bag and check out in a few simple steps.",
    image: editImages.flatlay,
    tint: "tintStone",
    fallbackIcon: "bag-handle-outline",
  },
];

export const onboardingContent = {
  skip: "Skip",
  next: "NEXT",
  getStarted: "GET STARTED",
} as const;
