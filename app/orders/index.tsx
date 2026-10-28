import { StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";
import { Screen } from "../../src/components/layout/screen";
import { AppText } from "../../src/components/ui/app-text";
import { Card } from "../../src/components/ui/card";
import { Divider } from "../../src/components/ui/divider";
import { EmptyState } from "../../src/components/ui/empty-state";
import { Icon } from "../../src/components/ui/icon";
import { Reveal } from "../../src/components/ui/reveal";
import { editImages } from "../../src/constants/images";
import { getProduct, type Product } from "../../src/features/catalog/catalog-data";
import { StackedThumbs } from "../../src/features/orders/components/stacked-thumbs";
import { StatusBadge } from "../../src/features/orders/components/status-badge";
import { ordersCopy } from "../../src/features/orders/orders-content";
import { useOrders } from "../../src/features/orders/orders-context";
import { formatDate, formatPrice } from "../../src/utils/format";
import { colors, layout, spacing } from "../../theme";

export default function OrdersScreen() {
  const router = useRouter();
  const { orders } = useOrders();

  if (orders.length === 0) {
    return (
      <Screen title={ordersCopy.title} subtitle={ordersCopy.subtitle}>
        <EmptyState
          icon="receipt-outline"
          image={editImages.outerwear}
          title="No orders yet"
          description="Orders you place will appear here."
          actionLabel="START SHOPPING"
          onAction={() => router.navigate("/")}
        />
      </Screen>
    );
  }

  return (
    <Screen
      title={ordersCopy.title}
      subtitle={ordersCopy.subtitle}
      headerRight={
        <AppText variant="display" color="textTertiary">
          {String(orders.length).padStart(2, "0")}
        </AppText>
      }
      contentStyle={styles.content}
    >
      {orders.map((order, index) => {
        const products = order.lines.flatMap((l) => getProduct(l.productId) ?? []) as Product[];
        const itemCount = order.lines.reduce((sum, l) => sum + l.quantity, 0);
        const first = order.lines[0]?.name ?? "";
        const rest = order.lines.length - 1;
        return (
          <Reveal key={order.id} order={index + 1}>
            <Card
              accessibilityLabel={`Order ${order.id}, ${formatPrice(order.total)}`}
              onPress={() => router.push({ pathname: "/orders/[id]", params: { id: order.id } })}
              style={styles.card}
            >
              <View style={styles.top}>
                <AppText variant="productName">{order.id}</AppText>
                <StatusBadge status={order.status} />
              </View>

              <View style={styles.middle}>
                <StackedThumbs products={products} />
                <View style={styles.names}>
                  <AppText variant="caption" numberOfLines={1}>
                    {first}
                  </AppText>
                  {rest > 0 ? (
                    <AppText variant="caption" color="textSecondary">
                      {ordersCopy.more(rest)}
                    </AppText>
                  ) : null}
                </View>
              </View>

              <Divider />

              <View style={styles.bottom}>
                <View>
                  <AppText variant="caption" color="textSecondary">
                    {formatDate(order.createdAt)} · {ordersCopy.items(itemCount)}
                  </AppText>
                  <AppText variant="price">{formatPrice(order.total)}</AppText>
                </View>
                <Icon name="chevron-forward" size={layout.iconSize.sm} color={colors.textTertiary} />
              </View>
            </Card>
          </Reveal>
        );
      })}
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: spacing.base,
  },
  card: {
    gap: spacing.base,
    padding: spacing.lg,
  },
  top: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  middle: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.base,
  },
  names: {
    flex: 1,
    gap: spacing.xxs,
  },
  bottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
