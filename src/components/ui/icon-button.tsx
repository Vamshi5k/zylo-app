import { Pressable, StyleSheet, View, type ColorValue } from "react-native";
import { colors, layout, radii } from "../../../theme";
import { AppText } from "./app-text";
import { Icon, type IconName } from "./icon";

type IconButtonProps = {
  icon: IconName;
  /** Required: icon-only buttons need an accessible name. */
  label: string;
  onPress?: () => void;
  /** Shows a count badge when greater than zero. */
  badge?: number;
  /** Overrides the icon color (defaults to ink, or white for the glass tone). */
  color?: ColorValue;
  size?: number;
  filled?: boolean;
  /** Dark fill, for an active toggle. */
  selectedBackground?: boolean;
  /** `glass` is a translucent white button for use over photography. */
  tone?: "default" | "glass";
};

/** Round, bordered icon button with an optional count badge. */
export function IconButton({
  icon,
  label,
  onPress,
  badge = 0,
  color,
  size = layout.controlHeight.iconButton,
  filled = false,
  selectedBackground = false,
  tone = "default",
}: IconButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      style={[
        styles.button,
        { width: size, height: size },
        filled && styles.filled,
        selectedBackground && styles.selected,
        tone === "glass" && styles.glass,
      ]}
    >
      <Icon name={icon} size={layout.iconSize.md} color={color ?? (tone === "glass" ? colors.white : colors.text)} />
      {badge > 0 ? (
        <View style={styles.badge}>
          <AppText variant="tag" color="white">
            {badge > 9 ? "9+" : badge}
          </AppText>
        </View>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radii.pill,
    borderWidth: layout.borderWidth,
    borderColor: colors.border,
  },
  filled: {
    backgroundColor: colors.surface,
  },
  selected: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },
  glass: {
    borderColor: colors.glassLightBorder,
    backgroundColor: colors.glassLight,
  },
  badge: {
    position: "absolute",
    top: -layout.borderWidth * 2,
    right: -layout.borderWidth * 2,
    minWidth: layout.badge.size,
    height: layout.badge.size,
    borderRadius: radii.pill,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.accent,
  },
});
