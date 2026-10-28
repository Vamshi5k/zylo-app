import { StyleSheet, View } from "react-native";
import { IconButton } from "../../../components/ui/icon-button";
import { colors, layout, spacing } from "../../../../theme";
import { exploreContent } from "../explore-content";

export type ViewMode = "grid" | "list";

type ViewModeToggleProps = {
  mode: ViewMode;
  onChange: (mode: ViewMode) => void;
};

/** Grid / list switch shared by Explore and Wishlist. */
export function ViewModeToggle({ mode, onChange }: ViewModeToggleProps) {
  return (
    <View style={styles.row}>
      <IconButton
        icon="grid-outline"
        label={exploreContent.gridView}
        size={layout.explore.toggleSize}
        color={mode === "grid" ? colors.white : colors.textSecondary}
        selectedBackground={mode === "grid"}
        onPress={() => onChange("grid")}
      />
      <IconButton
        icon="list-outline"
        label={exploreContent.listView}
        size={layout.explore.toggleSize}
        color={mode === "list" ? colors.white : colors.textSecondary}
        selectedBackground={mode === "list"}
        onPress={() => onChange("list")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: spacing.sm,
  },
});
