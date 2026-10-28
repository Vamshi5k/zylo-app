import type { ReactNode } from "react";
import { Pressable, StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";
import { colors, layout, radii, spacing } from "../../../theme";

type CardProps = {
  children: ReactNode;
  onPress?: () => void;
  accessibilityLabel?: string;
  /** Inverted dark surface, as used by the Home brand statement. */
  dark?: boolean;
  style?: StyleProp<ViewStyle>;
};

/** Bordered surface container; becomes a button when `onPress` is given. */
export function Card({ children, onPress, accessibilityLabel, dark = false, style }: CardProps) {
  const cardStyle = [styles.card, dark && styles.dark, style];

  if (onPress) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        onPress={onPress}
        style={cardStyle}
      >
        {children}
      </Pressable>
    );
  }
  return <View style={cardStyle}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    padding: spacing.base,
    borderRadius: radii.card,
    borderWidth: layout.borderWidth,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  dark: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },
});
