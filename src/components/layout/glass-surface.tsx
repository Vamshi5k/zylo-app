import { useEffect, useState, type ReactNode } from "react";
import { AccessibilityInfo, Platform, StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";
import { GlassView, isGlassEffectAPIAvailable, isLiquidGlassAvailable } from "expo-glass-effect";
import { colors, layout } from "../../../theme";

type GlassSurfaceProps = {
  style?: StyleProp<ViewStyle>;
  children: ReactNode;
};

/** Never throws: an Expo Go or build without the native glass module just uses the fallback. */
function detectNativeGlass(): boolean {
  if (Platform.OS !== "ios") return false;
  try {
    return isGlassEffectAPIAvailable() && isLiquidGlassAvailable();
  } catch {
    return false;
  }
}

const nativeGlassSupported = detectNativeGlass();

/**
 * Native liquid glass on iOS 26+. Everywhere else (older iOS, Android, web) and when
 * the user enables Reduce Transparency, it falls back to a near-opaque translucent fill.
 */
export function GlassSurface({ style, children }: GlassSurfaceProps) {
  const [reduceTransparency, setReduceTransparency] = useState(false);

  useEffect(() => {
    void AccessibilityInfo.isReduceTransparencyEnabled().then(setReduceTransparency);
    const subscription = AccessibilityInfo.addEventListener(
      "reduceTransparencyChanged",
      setReduceTransparency,
    );
    return () => subscription.remove();
  }, []);

  if (nativeGlassSupported && !reduceTransparency) {
    return (
      <GlassView glassEffectStyle="regular" style={[styles.border, style]}>
        {children}
      </GlassView>
    );
  }

  return <View style={[styles.fallback, styles.border, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  fallback: {
    backgroundColor: colors.glass,
  },
  border: {
    borderWidth: layout.borderWidth,
    borderColor: colors.glassBorder,
    overflow: "hidden",
  },
});
