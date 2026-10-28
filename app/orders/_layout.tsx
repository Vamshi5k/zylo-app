import { Stack } from "expo-router";
import { BackButton } from "../../src/components/ui/back-button";
import { stackScreenOptions } from "../../src/constants/navigation";

/**
 * Screens draw their own large headings, so the header only holds a back button. Both screens can
 * be the first in this stack (Profile → Orders, or Checkout → order confirmation), where the native
 * header would show no back arrow, so the button is always provided.
 */
export default function OrdersLayout() {
  return (
    <Stack screenOptions={{ ...stackScreenOptions, headerTitle: "" }}>
      <Stack.Screen name="index" options={{ headerLeft: () => <BackButton fallback="/profile" /> }} />
      <Stack.Screen name="[id]" options={{ headerLeft: () => <BackButton fallback="/" /> }} />
    </Stack>
  );
}
