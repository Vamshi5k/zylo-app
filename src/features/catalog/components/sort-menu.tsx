import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { AppText } from "../../../components/ui/app-text";
import { Card } from "../../../components/ui/card";
import { Divider } from "../../../components/ui/divider";
import { Icon } from "../../../components/ui/icon";
import { colors, layout, spacing } from "../../../../theme";
import type { SortId } from "../catalog-utils";
import { sortOptions } from "../explore-content";

type SortMenuProps = {
  value: SortId;
  onChange: (sort: SortId) => void;
};

/** "Sort: Featured" trigger that opens an inline list of options. */
export function SortMenu({ value, onChange }: SortMenuProps) {
  const [open, setOpen] = useState(false);
  const current = sortOptions.find((o) => o.id === value)?.label ?? "";

  return (
    <View style={styles.wrapper}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Sort: ${current}`}
        accessibilityState={{ expanded: open }}
        onPress={() => setOpen((v) => !v)}
        style={styles.trigger}
      >
        <AppText variant="label" color="textSecondary">
          SORT
        </AppText>
        <AppText variant="fieldLabel">{current}</AppText>
        <Icon name={open ? "chevron-up" : "chevron-down"} size={layout.iconSize.xs} />
      </Pressable>

      {open ? (
        <Card style={styles.menu}>
          {sortOptions.map((option, index) => (
            <View key={option.id}>
              {index > 0 ? <Divider /> : null}
              <Pressable
                accessibilityRole="menuitem"
                accessibilityState={{ selected: option.id === value }}
                onPress={() => {
                  onChange(option.id);
                  setOpen(false);
                }}
                style={styles.option}
              >
                <AppText variant="caption" color={option.id === value ? "text" : "textSecondary"}>
                  {option.label}
                </AppText>
                {option.id === value ? (
                  <Icon name="checkmark" size={layout.iconSize.sm} color={colors.text} />
                ) : null}
              </Pressable>
            </View>
          ))}
        </Card>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: spacing.sm,
  },
  trigger: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    minHeight: layout.stepper.buttonSize,
  },
  menu: {
    paddingVertical: spacing.xs,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: layout.controlHeight.iconButton,
  },
});
