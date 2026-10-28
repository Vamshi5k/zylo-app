import { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
  type SharedValue,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { ParallaxImage } from "../../../components/ui/parallax-image";
import { PaginationDots } from "../../onboarding/components/pagination-dots";
import { colors, layout, spacing } from "../../../../theme";
import type { Product } from "../catalog-data";

type ProductGalleryProps = {
  product: Product;
  scrollY: SharedValue<number>;
  width: number;
  height: number;
};

type GalleryView = { id: string; zoom: number; focus: { x: number; y: number }; label: string };

const { detailZoom } = layout.productDetail;

/** The full piece, then two close-ups of the same artwork. */
const views: readonly GalleryView[] = [
  { id: "full", zoom: 1, focus: { x: 0.5, y: 0.5 }, label: "" },
  { id: "upper", zoom: detailZoom, focus: { x: 0.5, y: 0.34 }, label: "Close-up, upper detail" },
  { id: "lower", zoom: detailZoom, focus: { x: 0.5, y: 0.7 }, label: "Close-up, lower detail" },
];

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList<GalleryView>);

/** Swipeable full-bleed gallery with parallax and page indicator. */
export function ProductGallery({ product, scrollY, width, height }: ProductGalleryProps) {
  const scrollX = useSharedValue(0);
  const [, setPage] = useState(0);
  const onScroll = useAnimatedScrollHandler((e) => {
    scrollX.value = e.contentOffset.x;
  });

  return (
    <View style={{ width, height, backgroundColor: colors[product.tint] }}>
      <AnimatedFlatList
        data={views}
        keyExtractor={(v) => v.id}
        horizontal
        pagingEnabled
        bounces={false}
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        onMomentumScrollEnd={(e) => setPage(Math.round(e.nativeEvent.contentOffset.x / width))}
        getItemLayout={(_, i) => ({ length: width, offset: width * i, index: i })}
        renderItem={({ item }) => (
          <View style={{ width, height, overflow: "hidden" }}>
            <ParallaxImage
              source={product.image.source}
              label={item.label ? `${product.image.label}. ${item.label}` : product.image.label}
              scrollY={scrollY}
              height={height}
              zoom={item.zoom}
              focus={item.focus}
            />
          </View>
        )}
      />
      <LinearGradient colors={[colors.scrimSoft, colors.scrimClear]} style={styles.topScrim} pointerEvents="none" />
      <View style={styles.dots} pointerEvents="none">
        <PaginationDots count={views.length} scrollX={scrollX} pageWidth={width} color={colors.primary} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topScrim: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: layout.home.marqueeHeight * 3,
  },
  dots: {
    position: "absolute",
    bottom: spacing["3xl"],
    left: 0,
    right: 0,
    alignItems: "center",
  },
});
