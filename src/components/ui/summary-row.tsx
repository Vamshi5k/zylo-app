import { StyleSheet, View } from "react-native";
import { spacing } from "../../../theme";
import { AppText } from "./app-text";

type SummaryRowProps = {
  label: string;
  value: string;
  /** Larger, bolder row for totals. */
  emphasized?: boolean;
  /** Light text, for use on a dark card. */
  inverted?: boolean;
};

export function SummaryRow({ label, value, emphasized = false, inverted = false }: SummaryRowProps) {
  return (
    <View style={styles.row}>
      <AppText variant={emphasized ? "productName" : "caption"} color={inverted ? (emphasized ? "white" : "whiteMuted") : emphasized ? "text" : "textSecondary"}>
        {label}
      </AppText>
      <AppText variant={emphasized ? "price" : "caption"} color={inverted ? "white" : "text"}>
        {value}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.md,
  },
});
