import { useContext, type ReactNode } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, type ScrollViewProps } from "react-native";
import { HeaderHeightContext } from "expo-router/react-navigation";

type KeyboardScrollViewProps = ScrollViewProps & {
  /** Pinned below the scroll area; lifted above the keyboard while it is open. */
  footer?: ReactNode;
};

/**
 * ScrollView that keeps the focused input and any pinned footer clear of the keyboard.
 *
 * - iOS: the scroll view insets itself natively and scrolls the focused input into view.
 *   With a footer, the container pads instead so the footer rides on top of the keyboard.
 * - Android: edge-to-edge means the window no longer resizes, so the container always pads.
 *   Padding is the measured overlap, so it stays 0 if the OS has already resized the window.
 */
export function KeyboardScrollView({ footer, ...scrollProps }: KeyboardScrollViewProps) {
  // The container is measured relative to the screen, which starts below a native header.
  const headerHeight = useContext(HeaderHeightContext) ?? 0;
  const hasFooter = footer != null;
  const pad = Platform.OS === "android" || (Platform.OS === "ios" && hasFooter);

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={pad ? "padding" : undefined}
      keyboardVerticalOffset={headerHeight}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode={Platform.OS === "ios" ? "interactive" : "on-drag"}
        automaticallyAdjustKeyboardInsets={!hasFooter}
        {...scrollProps}
      />
      {footer}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
});
