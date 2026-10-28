import { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
  type SharedValue,
} from "react-native-reanimated";
import { AppButton } from "../../../components/ui/app-button";
import { AppText } from "../../../components/ui/app-text";
import { ParallaxImage } from "../../../components/ui/parallax-image";
import { PaginationDots } from "../../onboarding/components/pagination-dots";
import { colors, layout, spacing } from "../../../../theme";
import { heroSlides, type HeroSlide } from "../home-data";

type HomeHeroProps = {
  /** Vertical scroll offset of the Home screen, used for parallax. */
  scrollY: SharedValue<number>;
  width: number;
  height: number;
  onPressSlide: (slide: HeroSlide) => void;
};

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList<HeroSlide>);

function pad(n: number) {
  return String(n).padStart(2, "0");
}

/** Full-bleed, swipeable campaign hero with parallax and a progress indicator. */
export function HomeHero({ scrollY, width, height, onPressSlide }: HomeHeroProps) {
  const scrollX = useSharedValue(0);
  const [page, setPage] = useState(0);

  const onScroll = useAnimatedScrollHandler((e) => {
    scrollX.value = e.contentOffset.x;
  });

  return (
    <View style={{ width, height }}>
      <AnimatedFlatList
        data={heroSlides}
        keyExtractor={(slide) => slide.id}
        horizontal
        pagingEnabled
        bounces={false}
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        onMomentumScrollEnd={(e) => setPage(Math.round(e.nativeEvent.contentOffset.x / width))}
        getItemLayout={(_, i) => ({ length: width, offset: width * i, index: i })}
        renderItem={({ item }) => (
          <View style={{ width, height }}>
            <ParallaxImage source={item.image.source} label={item.image.label} scrollY={scrollY} height={height} />
            <LinearGradient
              colors={[colors.scrimSoft, colors.scrimClear]}
              style={styles.topScrim}
              pointerEvents="none"
            />
            <LinearGradient
              colors={[colors.scrimClear, colors.scrim]}
              style={styles.bottomScrim}
              pointerEvents="none"
            />
            <View style={styles.copy}>
              <AppText variant="eyebrow" color="white">
                {item.eyebrow}
              </AppText>
              <AppText variant="hero" color="white" accessibilityRole="header">
                {item.title}
              </AppText>
              <AppButton
                title={item.cta}
                variant="secondary"
                icon="arrow-forward"
                onPress={() => onPressSlide(item)}
                style={styles.cta}
              />
            </View>
          </View>
        )}
      />

      <View style={styles.progress} pointerEvents="none">
        <AppText variant="meta" color="white">
          {pad(page + 1)} / {pad(heroSlides.length)}
        </AppText>
        <PaginationDots count={heroSlides.length} scrollX={scrollX} pageWidth={width} color={colors.white} />
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
    height: layout.home.marqueeHeight * 4,
  },
  bottomScrim: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "55%",
  },
  copy: {
    position: "absolute",
    left: spacing.screen,
    right: spacing.screen,
    bottom: spacing["3xl"] + spacing.lg,
    gap: spacing.md,
  },
  cta: {
    alignSelf: "flex-start",
    marginTop: spacing.sm,
  },
  progress: {
    position: "absolute",
    left: spacing.screen,
    right: spacing.screen,
    bottom: spacing.lg,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
