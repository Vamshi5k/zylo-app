import { useRouter, type Href } from "expo-router";
import { layout } from "../../../theme";
import { IconButton } from "./icon-button";

type BackButtonProps = {
  /** Where to go when there is no screen to go back to (e.g. opened from a link). */
  fallback?: Href;
  tone?: "default" | "glass";
  size?: number;
};

/** Goes back when there is history, otherwise to `fallback`. Renders nothing if neither applies. */
export function BackButton({ fallback, tone = "default", size = layout.explore.toggleSize }: BackButtonProps) {
  const router = useRouter();
  const canGoBack = router.canGoBack();

  if (!canGoBack && !fallback) return null;

  return (
    <IconButton
      icon="arrow-back"
      label="Go back"
      tone={tone}
      size={size}
      onPress={() => (canGoBack ? router.back() : fallback && router.replace(fallback))}
    />
  );
}
