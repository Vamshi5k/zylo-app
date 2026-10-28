import { Pressable, StyleSheet, View } from "react-native";
import { AppText } from "../../../components/ui/app-text";
import { colors, layout, radii, spacing } from "../../../../theme";

type SizeSelectorProps = {
  sizes: readonly string[];
  value: string | null;
  onChange: (size: string) => void;
};

/** Square size boxes; the selected one is inverted. */
export function SizeSelector({ sizes, value, onChange }: SizeSelectorProps) {
  return (
    <View style={styles.row} accessibilityRole="radiogroup">
      {sizes.map((size) => {
        const selected = size === value;
        return (
          <Pressable
            key={size}
            accessibilityRole="radio"
            accessibilityLabel={`Size ${size}`}
            accessibilityState={{ selected }}
            onPress={() => onChange(size)}
            style={[styles.box, selected && styles.selected]}
          >
            <AppText variant="fieldLabel" color={selected ? "white" : "text"}>
              {size}
            </AppText>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  box: {
    minWidth: layout.productDetail.sizeBox,
    height: layout.productDetail.sizeBox,
    paddingHorizontal: spacing.md,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radii.md,
    borderWidth: layout.borderWidth,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  selected: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },
});
