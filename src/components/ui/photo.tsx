import { useState, type ComponentProps, type ReactNode } from "react";
import { StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";
import { Image } from "expo-image";
import { colors, layout, motion } from "../../../theme";
import { Icon, type IconName } from "./icon";

type PhotoProps = {
  source: ComponentProps<typeof Image>["source"];
  /** Accessibility description of the photo. */
  label: string;
  /** Theme color shown while loading and if the photo fails. */
  tint: keyof typeof colors;
  fallbackIcon: IconName;
  style?: StyleProp<ViewStyle>;
  /** Rendered above the photo (gradients, captions). */
  children?: ReactNode;
};

/** Remote photo with a tinted loading placeholder and an icon fallback. */
export function Photo({ source, label, tint, fallbackIcon, style, children }: PhotoProps) {
  const [failed, setFailed] = useState(false);

  return (
    <View style={[styles.frame, { backgroundColor: colors[tint] }, style]}>
      {failed ? (
        <Icon name={fallbackIcon} size={layout.iconSize.xl * 2} color={colors.textSecondary} />
      ) : (
        <Image
          source={source}
          style={StyleSheet.absoluteFill}
          contentFit="cover"
          transition={motion.duration.base}
          cachePolicy="memory-disk"
          accessible
          accessibilityLabel={label}
          onError={() => setFailed(true)}
        />
      )}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  frame: {
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
});
