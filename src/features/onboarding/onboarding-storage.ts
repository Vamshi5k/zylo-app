import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "zylo:onboarding-completed";
const STORAGE_TIMEOUT_MS = 2000;

const timeout = <T>(fallback: T) =>
  new Promise<T>((resolve) => setTimeout(() => resolve(fallback), STORAGE_TIMEOUT_MS));

/** Resolves to false (show onboarding) if storage fails or is too slow, so launch never stalls. */
export async function hasCompletedOnboarding(): Promise<boolean> {
  try {
    const value = await Promise.race([
      AsyncStorage.getItem(KEY),
      timeout<null>(null),
    ]);
    return value === "true";
  } catch (error) {
    console.warn("[onboarding] could not read completion state", error);
    return false;
  }
}

/** Best effort: a failed write only means onboarding may show again next launch. */
export async function markOnboardingCompleted(): Promise<void> {
  try {
    await Promise.race([AsyncStorage.setItem(KEY, "true"), timeout<void>(undefined)]);
  } catch (error) {
    console.warn("[onboarding] could not save completion state", error);
  }
}
