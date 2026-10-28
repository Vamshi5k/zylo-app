import { Pressable, StyleSheet, View } from "react-native";
import { colors, layout, radii, spacing } from "../../../theme";
import { AppText } from "./app-text";
import { Icon } from "./icon";

type QuantityStepperProps = {
  value: number;
  onChange: (value: number) => void;
  max?: number;
};

/** − qty + control. Decrementing from 1 reports 0 so the caller can remove the line. */
export function QuantityStepper({ value, onChange, max }: QuantityStepperProps) {
  const atMax = max !== undefined && value >= max;

  return (
    <View style={styles.row}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Decrease quantity"
        hitSlop={spacing.xs}
        onPress={() => onChange(value - 1)}
        style={styles.button}
      >
        <Icon name="remove" size={layout.iconSize.sm} />
      </Pressable>
      <AppText variant="productName" accessibilityLabel={`Quantity ${value}`} style={styles.value}>
        {value}
      </AppText>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Increase quantity"
        accessibilityState={{ disabled: atMax }}
        disabled={atMax}
        hitSlop={spacing.xs}
        onPress={() => onChange(value + 1)}
        style={[styles.button, atMax && styles.disabled]}
      >
        <Icon name="add" size={layout.iconSize.sm} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  button: {
    width: layout.stepper.buttonSize,
    height: layout.stepper.buttonSize,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radii.pill,
    borderWidth: layout.borderWidth,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  disabled: {
    opacity: layout.opacity.disabled,
  },
  value: {
    minWidth: spacing.lg,
    textAlign: "center",
  },
});
