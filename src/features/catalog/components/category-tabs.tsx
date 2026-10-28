import { Pressable, StyleSheet, View } from "react-native";
import { AppText } from "../../../components/ui/app-text";
import { colors, layout, spacing } from "../../../../theme";

export type TabOption<T extends string> = { id: T | null; label: string };

type CategoryTabsProps<T extends string> = {
  options: readonly TabOption<T>[];
  value: T | null;
  onChange: (value: T | null) => void;
};

/** Typographic tabs with an underline on the active one. */
export function CategoryTabs<T extends string>({ options, value, onChange }: CategoryTabsProps<T>) {
  return (
    <View style={styles.row} accessibilityRole="tablist">
      {options.map((option) => {
        const active = option.id === value;
        return (
          <Pressable
            key={option.label}
            accessibilityRole="tab"
            accessibilityState={{ selected: active }}
            onPress={() => onChange(option.id)}
            style={[styles.tab, active && styles.active]}
          >
            <AppText variant="fieldLabel" color={active ? "text" : "textTertiary"}>
              {option.label}
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
    gap: spacing.lg,
    borderBottomWidth: layout.borderWidth,
    borderBottomColor: colors.border,
  },
  tab: {
    paddingVertical: spacing.md,
    marginBottom: -layout.borderWidth,
    borderBottomWidth: layout.borderWidth * 2,
    borderBottomColor: colors.scrimClear,
  },
  active: {
    borderBottomColor: colors.primary,
  },
});
