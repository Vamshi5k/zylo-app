import { useState, type ComponentProps } from "react";
import type { Tabs } from "expo-router";
import { LayoutChangeEvent, Pressable, StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useReducedMotion,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { tabsByName } from "../../constants/tabs";
import { colors, layout, motion, radii, shadows, spacing } from "../../../theme";
import { AppText } from "../ui/app-text";
import { Icon } from "../ui/icon";
import { GlassSurface } from "./glass-surface";

type BottomTabBarProps = Parameters<
  NonNullable<ComponentProps<typeof Tabs>["tabBar"]>
>[0];

/** Space a screen's scrollable content must leave at the bottom so the bar never covers it. */
export function useFloatingTabBarInset() {
  const { bottom } = useSafeAreaInsets();
  const { itemHeight, bottomGap } = layout.floatingTabBar;
  return itemHeight + spacing.sm * 2 + bottomGap + bottom + spacing.lg;
}

export function FloatingTabBar({ state, navigation }: BottomTabBarProps) {
  const { bottom } = useSafeAreaInsets();
  const reduceMotion = useReducedMotion();
  const [rowWidth, setRowWidth] = useState(0);

  const itemWidth = rowWidth / state.routes.length;

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: withTiming(state.index * itemWidth, {
          duration: reduceMotion ? 0 : motion.duration.base,
          easing: Easing.out(Easing.cubic),
        }),
      },
    ],
  }));

  return (
    <View
      pointerEvents="box-none"
      style={[styles.wrapper, { bottom: bottom + layout.floatingTabBar.bottomGap }]}
    >
      <View style={styles.shadow}>
        <GlassSurface style={styles.bar}>
          <View
            style={styles.row}
            onLayout={(e: LayoutChangeEvent) => setRowWidth(e.nativeEvent.layout.width)}
            accessibilityRole="tablist"
          >
            {rowWidth > 0 ? (
              <Animated.View
                pointerEvents="none"
                style={[styles.indicator, { width: itemWidth }, indicatorStyle]}
              />
            ) : null}

            {state.routes.map((route, index) => {
              const config = tabsByName[route.name];
              if (!config) return null;
              const focused = state.index === index;
              const tint = focused ? colors.white : colors.textSecondary;

              const onPress = () => {
                const event = navigation.emit({
                  type: "tabPress",
                  target: route.key,
                  canPreventDefault: true,
                });
                if (!focused && !event.defaultPrevented) {
                  navigation.navigate(route.name, route.params);
                }
              };

              return (
                <Pressable
                  key={route.key}
                  accessibilityRole="tab"
                  accessibilityLabel={config.accessibilityLabel}
                  accessibilityState={{ selected: focused }}
                  onPress={onPress}
                  onLongPress={() =>
                    navigation.emit({ type: "tabLongPress", target: route.key })
                  }
                  style={styles.item}
                >
                  <Icon
                    name={focused ? config.activeIcon : config.icon}
                    size={layout.floatingTabBar.iconSize}
                    color={tint}
                  />
                  <AppText variant="tag" style={{ color: tint }}>
                    {config.title}
                  </AppText>
                </Pressable>
              );
            })}
          </View>
        </GlassSurface>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    left: 0,
    right: 0,
    alignItems: "center",
    paddingHorizontal: spacing.screen,
  },
  shadow: {
    width: "100%",
    maxWidth: layout.floatingTabBar.maxWidth,
    borderRadius: radii.pill,
    ...shadows.floating,
  },
  bar: {
    borderRadius: radii.pill,
    padding: spacing.sm,
  },
  row: {
    flexDirection: "row",
  },
  indicator: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    borderRadius: radii.pill,
    backgroundColor: colors.primary,
  },
  item: {
    flex: 1,
    height: layout.floatingTabBar.itemHeight,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xxs,
  },
});
