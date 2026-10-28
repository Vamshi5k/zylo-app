import type { ComponentProps } from "react";
import type { Stack } from "expo-router";
import { colors, typography } from "../../theme";

type StackScreenOptions = ComponentProps<typeof Stack>["screenOptions"];

/** Header and background styling shared by every stack navigator. */
export const stackScreenOptions: StackScreenOptions = {
  headerStyle: { backgroundColor: colors.background },
  headerTintColor: colors.text,
  headerShadowVisible: false,
  headerTitleStyle: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.size.header,
  },
  contentStyle: { backgroundColor: colors.background },
};
