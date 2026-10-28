import { useEffect, useRef } from "react";
import { useRouter } from "expo-router";
import { hasCompletedOnboarding } from "./onboarding-storage";

/**
 * Sends a cold start to onboarding (first launch) or the auth flow (afterwards).
 * Runs once, so it can't cause redirect loops.
 */
export function useLaunchRoute(enabled: boolean) {
  const router = useRouter();
  const routed = useRef(false);

  useEffect(() => {
    if (!enabled || routed.current) return;
    routed.current = true;

    void hasCompletedOnboarding().then((completed) => {
      router.replace(completed ? "/login" : "/onboarding");
    });
  }, [enabled, router]);
}
