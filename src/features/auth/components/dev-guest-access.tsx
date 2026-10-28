import { useRouter } from "expo-router";
import { AppButton } from "../../../components/ui/app-button";

/**
 * TEMPORARY, development builds only: opens Home without signing in so the tabs can be
 * tested before real authentication exists. It does not authenticate or store anything.
 * Remove this file and its usage in `app/(auth)/login.tsx` once auth is integrated.
 */
export function DevGuestAccess() {
  const router = useRouter();

  if (!__DEV__) return null;

  return (
    <AppButton
      title="CONTINUE AS GUEST (DEV ONLY)"
      variant="secondary"
      fullWidth
      onPress={() => router.replace("/")}
    />
  );
}
