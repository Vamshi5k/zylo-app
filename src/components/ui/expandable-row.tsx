import { useState, type ReactNode } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { layout, spacing } from "../../../theme";
import { AppText } from "./app-text";
import { Icon } from "./icon";

type ExpandableRowProps = {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
};

/** Accordion row: tap the title to show or hide its content. */
export function ExpandableRow({ title, children, defaultOpen = false }: ExpandableRowProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <View>
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ expanded: open }}
        onPress={() => setOpen((v) => !v)}
        style={styles.header}
      >
        <AppText variant="productName">{title}</AppText>
        <Icon name={open ? "remove" : "add"} size={layout.iconSize.md} />
      </Pressable>
      {open ? <View style={styles.body}>{children}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: layout.controlHeight.input,
  },
  body: {
    gap: spacing.sm,
    paddingBottom: spacing.base,
  },
});
