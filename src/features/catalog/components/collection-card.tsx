import { Pressable, StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AppText } from "../../../components/ui/app-text";
import { Photo } from "../../../components/ui/photo";
import { colors, layout, radii, spacing } from "../../../../theme";
import type { Collection } from "../catalog-data";

type CollectionCardProps = {
  collection: Collection;
  onPress: (collection: Collection) => void;
  /** Outlines the card as the active filter. */
  selected?: boolean;
};

const ARCH_RADIUS = layout.home.archWidth / 2;

/** Arch-shaped editorial card shared by Home and Explore. */
export function CollectionCard({ collection, onPress, selected = false }: CollectionCardProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${collection.title} collection`}
      accessibilityState={{ selected }}
      onPress={() => onPress(collection)}
    >
      <View style={[styles.frame, selected && styles.selected]}>
        <Photo
          source={collection.image.source}
          label={collection.image.label}
          tint={collection.tint}
          fallbackIcon={collection.fallbackIcon}
          style={styles.photo}
        >
          <LinearGradient colors={[colors.scrimClear, colors.scrim]} style={styles.scrim} />
          <View style={styles.caption}>
            <AppText variant="meta" color="white">
              {collection.count}
            </AppText>
            <AppText variant="productName" color="white">
              {collection.title}
            </AppText>
          </View>
        </Photo>
      </View>
    </Pressable>
  );
}

const shape = {
  width: layout.home.archWidth,
  height: layout.home.archHeight,
  borderTopLeftRadius: ARCH_RADIUS,
  borderTopRightRadius: ARCH_RADIUS,
  borderBottomLeftRadius: radii.card,
  borderBottomRightRadius: radii.card,
} as const;

const styles = StyleSheet.create({
  frame: {
    ...shape,
    borderWidth: layout.borderWidth * 2,
    borderColor: colors.scrimClear,
  },
  selected: {
    borderColor: colors.primary,
  },
  photo: {
    flex: 1,
    ...shape,
    width: undefined,
    height: undefined,
  },
  scrim: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: layout.home.archHeight / 2,
  },
  caption: {
    position: "absolute",
    left: spacing.base,
    right: spacing.base,
    bottom: spacing.base,
    gap: spacing.xxs,
  },
});
