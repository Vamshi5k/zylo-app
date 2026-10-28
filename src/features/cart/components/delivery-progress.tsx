import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { AppText } from "../../../components/ui/app-text";
import { Icon } from "../../../components/ui/icon";
import { commerce } from "../../../constants/commerce";
import { screenContent } from "../../../constants/screen-content";
import { formatPrice } from "../../../utils/format";
import { colors, layout, motion, radii, spacing } from "../../../../theme";

const content = screenContent.cart;

/** Progress toward the free-delivery threshold. */
export function DeliveryProgress({ subtotal }: { subtotal: number }) {
  const ratio = Math.min(subtotal / commerce.freeDeliveryThreshold, 1);
  const unlocked = ratio >= 1;
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(ratio, { duration: motion.duration.slow });
  }, [ratio, progress]);

  const fill = useAnimatedStyle(() => ({ width: `${progress.value * 100}%` }));

  return (
    <View style={styles.wrapper} accessible accessibilityLabel={unlocked ? content.deliveryUnlocked : content.freeDeliveryNote(formatPrice(commerce.freeDeliveryThreshold - subtotal))}>
      <View style={styles.message}>
        {unlocked ? <Icon name="checkmark-circle" size={layout.iconSize.md} /> : <Icon name="cube-outline" size={layout.iconSize.md} />}
        <AppText variant="caption">
          {unlocked
            ? content.deliveryUnlocked
            : content.freeDeliveryNote(formatPrice(commerce.freeDeliveryThreshold - subtotal))}
        </AppText>
      </View>
      <View style={styles.track}>
        <Animated.View style={[styles.fill, fill]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: spacing.md,
    padding: spacing.base,
    borderRadius: radii.card,
    backgroundColor: colors.surfaceMuted,
  },
  message: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  track: {
    height: layout.deliveryBar.height,
    borderRadius: radii.pill,
    overflow: "hidden",
    backgroundColor: colors.border,
  },
  fill: {
    height: "100%",
    borderRadius: radii.pill,
    backgroundColor: colors.primary,
  },
});
