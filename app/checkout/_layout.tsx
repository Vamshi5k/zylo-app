import { Stack } from "expo-router";
import { BackButton } from "../../src/components/ui/back-button";
import { stackScreenOptions } from "../../src/constants/navigation";
import { screenTitles } from "../../src/constants/screen-content";

export default function CheckoutLayout() {
  return (
    <Stack screenOptions={stackScreenOptions}>
      {/* First screen of this stack: the native header has no back arrow, so add one to leave checkout. */}
      <Stack.Screen
        name="address"
        options={{
          title: screenTitles.checkoutAddress,
          headerLeft: () => <BackButton fallback="/cart" />,
        }}
      />
      <Stack.Screen name="payment" options={{ title: screenTitles.checkoutPayment }} />
      <Stack.Screen name="review" options={{ title: screenTitles.checkoutReview }} />
    </Stack>
  );
}
