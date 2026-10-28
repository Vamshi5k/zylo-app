import { Pressable, StyleSheet, View } from "react-native";
import { AppText } from "../../../components/ui/app-text";
import { Photo } from "../../../components/ui/photo";
import { colors, layout, radii, spacing } from "../../../../theme";
import type { Collection } from "../catalog-data";

type CollectionBubbleProps = {
  collection: Collection;
  selected: boolean;
  onPress: (collection: Collection) => void;
};

const OUTER = layout.explore.bubbleSize + spacing.sm;

/** Round "story" thumbnail used to pick a collection. */
export function CollectionBubble({ collection, selected, onPress }: CollectionBubbleProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${collection.title} collection`}
      accessibilityState={{ selected }}
      onPress={() => onPress(collection)}
      style={styles.item}
    >
      <View style={[styles.ring, selected && styles.ringSelected]}>
        <Photo
          source={collection.image.source}
          label={collection.image.label}
          tint={collection.tint}
          fallbackIcon={collection.fallbackIcon}
          style={styles.photo}
        />
      </View>
      <AppText variant="meta" color={selected ? "text" : "textSecondary"} numberOfLines={1}>
        {collection.title}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  item: {
    width: OUTER + spacing.sm,
    alignItems: "center",
    gap: spacing.sm,
  },
  ring: {
    width: OUTER,
    height: OUTER,
    borderRadius: radii.pill,
    borderWidth: layout.borderWidth * 2,
    borderColor: colors.scrimClear,
    alignItems: "center",
    justifyContent: "center",
  },
  ringSelected: {
    borderColor: colors.primary,
  },
  photo: {
    width: layout.explore.bubbleSize,
    height: layout.explore.bubbleSize,
    borderRadius: radii.pill,
  },
});
