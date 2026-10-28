import { ScrollView, StyleSheet } from "react-native";
import { AppButton } from "../../../components/ui/app-button";
import { spacing } from "../../../../theme";
import type { SortId } from "../catalog-utils";
import { sortOptions } from "../explore-content";

type SortBarProps = {
  value: SortId;
  onChange: (sort: SortId) => void;
};

/** Sort chips, based on fields every product has (catalog order and price). */
export function SortBar({ value, onChange }: SortBarProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.row}
      accessibilityLabel="Sort products"
    >
      {sortOptions.map((option) => (
        <AppButton
          key={option.id}
          title={option.label}
          variant="chip"
          selected={value === option.id}
          onPress={() => onChange(option.id)}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: {
    gap: spacing.sm,
  },
});
