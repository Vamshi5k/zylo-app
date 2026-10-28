import { StyleSheet, View } from "react-native";
import { AppText } from "../../../components/ui/app-text";
import { Card } from "../../../components/ui/card";
import { Divider } from "../../../components/ui/divider";
import { SummaryRow } from "../../../components/ui/summary-row";
import { formatPrice } from "../../../utils/format";
import { layout, radii, spacing } from "../../../../theme";
import { getProduct } from "../../catalog/catalog-data";
import { ProductVisual } from "../../catalog/components/product-visual";
import type { OrderLine } from "../orders-context";

type OrderSummaryCardProps = {
  lines: readonly OrderLine[];
  subtotal: number;
  delivery: number;
  total: number;
};

/** Item rows with thumbnails plus the price breakdown; shared by review and order detail. */
export function OrderSummaryCard({ lines, subtotal, delivery, total }: OrderSummaryCardProps) {
  return (
    <Card style={styles.card}>
      {lines.map((line) => {
        const product = getProduct(line.productId);
        return (
          <View key={`${line.productId}-${line.size}`} style={styles.line}>
            {product ? (
              <ProductVisual product={product} radius={radii.md} style={styles.thumb} />
            ) : null}
            <View style={styles.lineText}>
              <AppText variant="productName">{line.name}</AppText>
              <AppText variant="caption" color="textSecondary">
                Size {line.size} · Qty {line.quantity}
              </AppText>
            </View>
            <AppText variant="price">{formatPrice(line.price * line.quantity)}</AppText>
          </View>
        );
      })}
      <Divider />
      <View style={styles.rows}>
        <SummaryRow label="Subtotal" value={formatPrice(subtotal)} />
        <SummaryRow label="Delivery" value={delivery === 0 ? "Free" : formatPrice(delivery)} />
        <SummaryRow label="Total" value={formatPrice(total)} emphasized />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: spacing.base,
  },
  line: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  thumb: {
    width: layout.orderThumb.width,
    height: layout.orderThumb.height,
  },
  lineText: {
    flex: 1,
    gap: spacing.xxs,
  },
  rows: {
    gap: spacing.sm,
  },
});
