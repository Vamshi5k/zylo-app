import { StyleSheet, View } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  type SharedValue,
} from "react-native-reanimated";
import { colors, layout, radii, spacing } from "../../../../theme";

type PaginationDotsProps = {
  count: number;
  /** Horizontal scroll offset of the pager. */
  scrollX: SharedValue<number>;
  pageWidth: number;
  /** Defaults to the primary (ink) color. */
  color?: string;
};

function Dot({
  index,
  scrollX,
  pageWidth,
  color,
}: {
  index: number;
  scrollX: SharedValue<number>;
  pageWidth: number;
  color: string;
}) {
  const style = useAnimatedStyle(() => {
    const range = [(index - 1) * pageWidth, index * pageWidth, (index + 1) * pageWidth];
    return {
      width: interpolate(
        scrollX.value,
        range,
        [layout.pagination.dotSize, layout.pagination.activeDotWidth, layout.pagination.dotSize],
        Extrapolation.CLAMP,
      ),
      opacity: interpolate(scrollX.value, range, [0.35, 1, 0.35], Extrapolation.CLAMP),
    };
  });

  return <Animated.View style={[styles.dot, { backgroundColor: color }, style]} />;
}

export function PaginationDots({ count, scrollX, pageWidth, color = colors.primary }: PaginationDotsProps) {
  return (
    <View style={styles.row} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
      {Array.from({ length: count }, (_, index) => (
        <Dot key={index} index={index} scrollX={scrollX} pageWidth={pageWidth} color={color} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  dot: {
    height: layout.pagination.dotSize,
    borderRadius: radii.pill,
    backgroundColor: colors.primary,
  },
});
