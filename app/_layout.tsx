import { useCallback, useEffect, useState } from "react";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import {
  useFonts,
  Manrope_400Regular,
  Manrope_500Medium,
  Manrope_600SemiBold,
  Manrope_700Bold,
  Manrope_800ExtraBold,
} from "@expo-google-fonts/manrope";
import { useLaunchRoute } from "../src/features/onboarding/use-launch-route";
import { AnimatedSplash } from "../src/features/splash/animated-splash";
import { AppProviders } from "../src/providers/app-providers";
import { stackScreenOptions } from "../src/constants/navigation";
import { screenTitles } from "../src/constants/screen-content";
import { motion } from "../theme";

void SplashScreen.preventAutoHideAsync();
SplashScreen.setOptions({ duration: motion.duration.fast, fade: true });

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Manrope_400Regular,
    Manrope_500Medium,
    Manrope_600SemiBold,
    Manrope_700Bold,
    Manrope_800ExtraBold,
  });

  const [showSplash, setShowSplash] = useState(true);
  const hideSplash = useCallback(() => setShowSplash(false), []);

  const ready = fontsLoaded || !!fontError;
  useLaunchRoute(ready);

  useEffect(() => {
    if (fontsLoaded || fontError) {
      void SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <AppProviders>
      <Stack screenOptions={stackScreenOptions}>
        <Stack.Screen
          name="onboarding"
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="product/[id]" options={{ title: screenTitles.product }} />
        <Stack.Screen name="search" options={{ title: screenTitles.search }} />
        <Stack.Screen name="checkout" options={{ headerShown: false }} />
        <Stack.Screen name="orders" options={{ headerShown: false }} />
      </Stack>
      {showSplash && <AnimatedSplash onFinish={hideSplash} />}
    </AppProviders>
  );
}
