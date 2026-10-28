import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { colors, layout, radii, spacing } from "../../../theme";
import { AppText, type AppTextColor } from "./app-text";
import { Icon, type IconName } from "./icon";

type Variant = "primary" | "secondary" | "chip";

export type AppButtonProps = Omit<PressableProps, "children" | "style"> & {
  title: string;
  variant?: Variant;
  /** Highlights a `chip` as the current choice. */
  selected?: boolean;
  /** Trailing icon. */
  icon?: IconName;
  fullWidth?: boolean;
  /** Shows a spinner and blocks presses. */
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
};

const base = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  fullWidth: {
    alignSelf: "stretch",
  },
});

const variants = StyleSheet.create({
  primary: {
    minHeight: layout.controlHeight.button,
    paddingHorizontal: spacing.base,
    gap: spacing.lg,
    borderRadius: radii.sm,
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    borderWidth: layout.borderWidth,
  },
  secondary: {
    minHeight: layout.controlHeight.button,
    paddingHorizontal: spacing.base,
    gap: spacing.lg,
    borderRadius: radii.sm,
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: layout.borderWidth,
  },
  chip: {
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.md - spacing.xxs,
    borderRadius: radii.pill,
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: layout.borderWidth,
  },
});

const disabledStyle = StyleSheet.create({
  container: {
    opacity: layout.opacity.disabled,
  },
});

const chipSelected = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
});

/** The only button used in the app. */
export function AppButton({
  title,
  variant = "primary",
  selected = false,
  icon,
  fullWidth = false,
  loading = false,
  disabled,
  style,
  accessibilityLabel,
  ...rest
}: AppButtonProps) {
  const inverted = variant === "primary" || (variant === "chip" && selected);
  const textColor: AppTextColor = inverted ? "white" : "text";

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? title}
      disabled={disabled || loading}
      accessibilityState={{ selected, disabled: disabled || loading, busy: loading }}
      style={({ pressed }) => [
        base.container,
        variants[variant],
        variant === "chip" && selected && chipSelected.container,
        variant === "primary" && pressed && { backgroundColor: colors.primaryPressed },
        fullWidth && base.fullWidth,
        (disabled || loading) && disabledStyle.container,
        style,
      ]}
      {...rest}
    >
      <AppText variant={variant === "chip" ? "chip" : "button"} color={textColor}>
        {title}
      </AppText>
      {loading ? (
        <ActivityIndicator size="small" color={colors[textColor]} />
      ) : icon ? (
        <Icon name={icon} size={layout.iconSize.sm} color={colors[textColor]} />
      ) : null}
    </Pressable>
  );
}
