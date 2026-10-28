import type { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardScrollView } from "../../../components/layout/keyboard-scroll-view";
import { AppText } from "../../../components/ui/app-text";
import { BackButton } from "../../../components/ui/back-button";
import { brand } from "../../../constants/brand";
import { colors, spacing } from "../../../../theme";

type AuthScreenLayoutProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
};

/** Shared shell for the login and signup screens: safe areas, keyboard avoidance and header. */
export function AuthScreenLayout({
  title,
  subtitle,
  children,
  footer,
}: AuthScreenLayoutProps) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View>
          <View style={styles.topRow}>
            {/* Only shown when Login/Signup was opened from inside the app (e.g. Profile). */}
            <BackButton />
            <AppText variant="brand">{brand.name}</AppText>
          </View>

          <View style={styles.heading}>
            <AppText variant="display" accessibilityRole="header">
              {title}
            </AppText>
            <AppText variant="body" color="textSecondary">
              {subtitle}
            </AppText>
          </View>

          <View style={styles.form}>{children}</View>
        </View>

        <View style={styles.footer}>{footer}</View>
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
    flexGrow: 1,
    justifyContent: "space-between",
    paddingHorizontal: spacing.screen,
    paddingTop: spacing.xl,
    paddingBottom: spacing.lg,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  heading: {
    gap: spacing.sm,
    marginTop: spacing["2xl"],
  },
  form: {
    gap: spacing.base,
    marginTop: spacing.xl,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: spacing.xs,
    paddingTop: spacing.xl,
  },
});
