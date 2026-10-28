import { StyleSheet, Text, type TextProps } from "react-native";
import { colors, typography } from "../../../theme";

const { fontFamily, size, lineHeight, letterSpacing } = typography;

const variants = StyleSheet.create({
  brand: {
    fontFamily: fontFamily.extraBold,
    fontSize: size["3xl"],
    letterSpacing: letterSpacing.brand,
  },
  brandCaption: {
    fontFamily: fontFamily.medium,
    fontSize: size.micro,
    letterSpacing: letterSpacing.widest,
  },
  wordmark: {
    fontFamily: fontFamily.extraBold,
    fontSize: size.splash,
    letterSpacing: letterSpacing.brand,
  },
  hero: {
    fontFamily: fontFamily.bold,
    fontSize: size.hero,
    lineHeight: lineHeight.hero,
    letterSpacing: letterSpacing.tight,
  },
  display: {
    fontFamily: fontFamily.bold,
    fontSize: size.display,
    lineHeight: lineHeight.display,
    letterSpacing: letterSpacing.tight,
  },
  title: {
    fontFamily: fontFamily.bold,
    fontSize: size.xl,
    letterSpacing: letterSpacing.subtle,
  },
  body: {
    fontFamily: fontFamily.regular,
    fontSize: size.sm,
    lineHeight: lineHeight.body,
  },
  caption: {
    fontFamily: fontFamily.regular,
    fontSize: size.sm,
  },
  fieldLabel: {
    fontFamily: fontFamily.semiBold,
    fontSize: size.sm,
  },
  eyebrow: {
    fontFamily: fontFamily.bold,
    fontSize: size.xs,
    letterSpacing: letterSpacing.label,
  },
  label: {
    fontFamily: fontFamily.bold,
    fontSize: size.micro,
    letterSpacing: letterSpacing.wide,
  },
  meta: {
    fontFamily: fontFamily.medium,
    fontSize: size.micro,
  },
  overline: {
    fontFamily: fontFamily.medium,
    fontSize: size.micro,
    letterSpacing: letterSpacing.caps,
  },
  tag: {
    fontFamily: fontFamily.bold,
    fontSize: size.tiny,
    letterSpacing: letterSpacing.wider,
  },
  mark: {
    fontFamily: fontFamily.extraBold,
    fontSize: size.mark,
    letterSpacing: letterSpacing.mark,
  },
  chip: {
    fontFamily: fontFamily.medium,
    fontSize: size.sm,
  },
  productName: {
    fontFamily: fontFamily.semiBold,
    fontSize: size.sm,
  },
  price: {
    fontFamily: fontFamily.bold,
    fontSize: size.md,
  },
  button: {
    fontFamily: fontFamily.bold,
    fontSize: size.xs,
    letterSpacing: letterSpacing.wide,
  },
});

export type AppTextVariant = keyof typeof variants;
export type AppTextColor = keyof typeof colors;

export type AppTextProps = TextProps & {
  variant?: AppTextVariant;
  color?: AppTextColor;
};

/** The only Text used in the app: typography comes from `variant`, color from theme tokens. */
export function AppText({
  variant = "body",
  color = "text",
  style,
  ...rest
}: AppTextProps) {
  return (
    <Text
      style={[variants[variant], { color: colors[color] }, style]}
      {...rest}
    />
  );
}
