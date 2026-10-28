import type { ReactNode } from "react";
import { StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, spacing } from "../../../theme";
import { AppText } from "../ui/app-text";
import { Reveal } from "../ui/reveal";
import { useFloatingTabBarInset } from "./floating-tab-bar";
import { KeyboardScrollView } from "./keyboard-scroll-view";

type ScreenProps = {
  /** Large heading. Omit on stack screens whose navigation header already shows a title. */
  title?: string;
  subtitle?: string;
  /** `tab` screens clear the floating tab bar; `stack` screens sit under a navigation header. */
  variant?: "tab" | "stack";
  /** Sticky bar pinned to the bottom (stack screens), typically the primary action. */
  footer?: ReactNode;
  /** Element aligned with the title, e.g. an icon button. */
  headerRight?: ReactNode;
  /** Set false for full-bleed content that manages its own padding (no side padding, top padding or gap). */
  padded?: boolean;
  contentStyle?: StyleProp<ViewStyle>;
  children: ReactNode;
};

/** Shared screen shell: safe areas, scrolling, keyboard avoidance, tab-bar clearance, heading and sticky footer. */
export function Screen({
  title,
  subtitle,
  variant = "stack",
  footer,
  headerRight,
  padded = true,
  contentStyle,
  children,
}: ScreenProps) {
  const tabInset = useFloatingTabBarInset();
  const isTab = variant === "tab";

  return (
    <SafeAreaView style={styles.safeArea} edges={isTab ? ["top"] : ["bottom"]}>
      <KeyboardScrollView
        showsVerticalScrollIndicator={false}
        footer={footer ? <View style={styles.footer}>{footer}</View> : undefined}
        contentContainerStyle={[
          padded && styles.content,
          { paddingBottom: isTab ? tabInset : spacing.xl },
          contentStyle,
        ]}
      >
        {title || subtitle || headerRight ? (
          <Reveal order={0} style={styles.header}>
            <View style={styles.headerText}>
              {title ? (
                <AppText variant="display" accessibilityRole="header">
                  {title}
                </AppText>
              ) : null}
              {subtitle ? (
                <AppText variant="body" color="textSecondary">
                  {subtitle}
                </AppText>
              ) : null}
            </View>
            {headerRight}
          </Reveal>
        ) : null}
        {children}
      </KeyboardScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingHorizontal: spacing.screen,
    paddingTop: spacing.lg,
    gap: spacing.section,
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: spacing.md,
  },
  headerText: {
    flex: 1,
    gap: spacing.sm,
  },
  footer: {
    paddingHorizontal: spacing.screen,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
    backgroundColor: colors.background,
  },
});
