import type { SharedValue } from "react-native-reanimated";
import { FloatingHeader } from "../../../components/layout/floating-header";
import { AppText } from "../../../components/ui/app-text";
import { IconButton } from "../../../components/ui/icon-button";
import { brand } from "../../../constants/brand";
import { homeContent } from "../home-data";

type HomeHeaderProps = {
  scrollY: SharedValue<number>;
  heroHeight: number;
  bagCount: number;
  onSearch: () => void;
  onBag: () => void;
};

/** Wordmark with search and bag; used by Home and Explore over their heroes. */
export function HomeHeader({ scrollY, heroHeight, bagCount, onSearch, onBag }: HomeHeaderProps) {
  return (
    <FloatingHeader
      scrollY={scrollY}
      heroHeight={heroHeight}
      left={(tone) => (
        <AppText variant="brand" color={tone === "glass" ? "white" : "text"}>
          {brand.name}
        </AppText>
      )}
      right={(tone) => (
        <>
          <IconButton icon="search-outline" label={homeContent.searchLabel} tone={tone} onPress={onSearch} />
          <IconButton
            icon="bag-outline"
            label={bagCount > 0 ? `Open shopping bag, ${bagCount} items` : "Open shopping bag"}
            badge={bagCount}
            tone={tone}
            onPress={onBag}
          />
        </>
      )}
    />
  );
}
