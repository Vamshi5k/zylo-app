import { StyleSheet, View } from "react-native";
import { AppText } from "../../../components/ui/app-text";
import { Card } from "../../../components/ui/card";
import { Icon } from "../../../components/ui/icon";
import { layout, spacing } from "../../../../theme";
import type { AddressValues } from "../../checkout/checkout-types";

/** Delivery address shown as a card, used by checkout review and order detail. */
export function AddressCard({ address }: { address: AddressValues }) {
  return (
    <Card style={styles.card}>
      <Icon name="location-outline" size={layout.iconSize.lg} />
      <View style={styles.text}>
        <AppText variant="productName">{address.fullName}</AppText>
        <AppText variant="caption" color="textSecondary">
          {address.line1}, {address.city} {address.pincode}
        </AppText>
        <AppText variant="caption" color="textSecondary">
          {address.phone}
        </AppText>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    gap: spacing.md,
  },
  text: {
    flex: 1,
    gap: spacing.xxs,
  },
});
