import { StyleSheet, View } from "react-native";
import { colors, layout, radii, spacing } from "../../../theme";
import { AppButton } from "./app-button";
import { AppText } from "./app-text";
import type { ArtAsset } from "../../constants/images";
import { Icon, type IconName } from "./icon";
import { Photo } from "./photo";

type EmptyStateProps = {
  icon: IconName;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  /** Artwork shown in an arch frame instead of the icon circle. */
  image?: ArtAsset;
};

export function EmptyState({ icon, title, description, actionLabel, onAction, image }: EmptyStateProps) {
  return (
    <View style={styles.container}>
      {image ? (
        <Photo
          source={image.source}
          label={image.label}
          tint="surfaceMuted"
          fallbackIcon={icon}
          style={styles.arch}
        />
      ) : (
        <View style={styles.iconWrap}>
          <Icon name={icon} size={layout.iconSize.xl} color={colors.textSecondary} />
        </View>
      )}
      <View style={styles.copy}>
        <AppText variant="title" style={styles.center}>
          {title}
        </AppText>
        <AppText variant="body" color="textSecondary" style={styles.center}>
          {description}
        </AppText>
      </View>
      {actionLabel && onAction ? (
        <AppButton title={actionLabel} onPress={onAction} />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: spacing.lg,
    paddingVertical: spacing["2xl"],
  },
  iconWrap: {
    width: layout.avatar.size,
    height: layout.avatar.size,
    borderRadius: radii.pill,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.surfaceMuted,
  },
  arch: {
    width: layout.emptyState.archWidth,
    height: layout.emptyState.archHeight,
    borderTopLeftRadius: layout.emptyState.archWidth / 2,
    borderTopRightRadius: layout.emptyState.archWidth / 2,
    borderBottomLeftRadius: radii.card,
    borderBottomRightRadius: radii.card,
  },
  copy: {
    gap: spacing.sm,
  },
  center: {
    textAlign: "center",
  },
});
