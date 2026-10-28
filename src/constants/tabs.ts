import type { IconName } from "../components/ui/icon";

export type TabConfig = {
  name: string;
  title: string;
  icon: IconName;
  activeIcon: IconName;
  accessibilityLabel: string;
};

export const tabs: readonly TabConfig[] = [
  {
    name: "index",
    title: "Home",
    icon: "home-outline",
    activeIcon: "home",
    accessibilityLabel: "Home",
  },
  {
    name: "categories",
    title: "Explore",
    icon: "grid-outline",
    activeIcon: "grid",
    accessibilityLabel: "Explore categories",
  },
  {
    name: "wishlist",
    title: "Wishlist",
    icon: "heart-outline",
    activeIcon: "heart",
    accessibilityLabel: "Wishlist",
  },
  {
    name: "cart",
    title: "Bag",
    icon: "bag-outline",
    activeIcon: "bag",
    accessibilityLabel: "Shopping bag",
  },
  {
    name: "profile",
    title: "Profile",
    icon: "person-outline",
    activeIcon: "person",
    accessibilityLabel: "Profile",
  },
];

export const tabsByName: Record<string, TabConfig> = Object.fromEntries(
  tabs.map((tab) => [tab.name, tab]),
);
