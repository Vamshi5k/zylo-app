import { useCallback, useRef, useState } from "react";
import { FlatList, StyleSheet, View, useWindowDimensions } from "react-native";
import { useRouter } from "expo-router";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  OnboardingActions,
  OnboardingSkip,
} from "../src/features/onboarding/components/onboarding-actions";
import { OnboardingSlide } from "../src/features/onboarding/components/onboarding-slide";
import { PaginationDots } from "../src/features/onboarding/components/pagination-dots";
import { onboardingSlides } from "../src/features/onboarding/onboarding-data";
import { markOnboardingCompleted } from "../src/features/onboarding/onboarding-storage";
import { colors, layout, spacing } from "../theme";

const AnimatedFlatList = Animated.createAnimatedComponent(
  FlatList<(typeof onboardingSlides)[number]>,
);

export default function OnboardingScreen() {
  const router = useRouter();
  const { width, height } = useWindowDimensions();
  const listRef = useRef<FlatList<(typeof onboardingSlides)[number]>>(null);
  const scrollX = useSharedValue(0);
  const [index, setIndex] = useState(0);
  const finishing = useRef(false);

  const imageHeight = Math.min(
    height * layout.onboarding.imageHeightRatio,
    layout.onboarding.imageMaxHeight,
  );
  const isLast = index === onboardingSlides.length - 1;

  const onScroll = useAnimatedScrollHandler((event) => {
    scrollX.value = event.contentOffset.x;
  });

  const finish = useCallback(async () => {
    if (finishing.current) return;
    finishing.current = true;
    await markOnboardingCompleted();
    router.replace("/login");
  }, [router]);

  const next = useCallback(() => {
    listRef.current?.scrollToIndex({ index: index + 1, animated: true });
    setIndex(index + 1);
  }, [index]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <OnboardingSkip visible={!isLast} onSkip={finish} />

      <AnimatedFlatList
        ref={listRef}
        data={onboardingSlides}
        keyExtractor={(slide) => slide.id}
        horizontal
        pagingEnabled
        bounces={false}
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        onMomentumScrollEnd={(event) =>
          setIndex(Math.round(event.nativeEvent.contentOffset.x / width))
        }
        getItemLayout={(_, i) => ({ length: width, offset: width * i, index: i })}
        renderItem={({ item }) => (
          <OnboardingSlide slide={item} width={width} imageHeight={imageHeight} />
        )}
        style={styles.pager}
      />

      <View style={styles.footer}>
        <PaginationDots
          count={onboardingSlides.length}
          scrollX={scrollX}
          pageWidth={width}
        />
        <OnboardingActions isLast={isLast} onNext={next} onFinish={finish} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  pager: {
    flex: 1,
  },
  footer: {
    gap: spacing.lg,
    paddingHorizontal: spacing.screen,
    paddingTop: spacing.base,
    paddingBottom: spacing.lg,
    alignItems: "center",
  },
});
