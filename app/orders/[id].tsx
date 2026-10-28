import { StyleSheet, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Screen } from "../../src/components/layout/screen";
import { AppButton } from "../../src/components/ui/app-button";
import { AppText } from "../../src/components/ui/app-text";
import { Card } from "../../src/components/ui/card";
import { EmptyState } from "../../src/components/ui/empty-state";
import { Icon } from "../../src/components/ui/icon";
import { Reveal } from "../../src/components/ui/reveal";
import { SectionHeader } from "../../src/components/ui/section-header";
import { paymentOptions, paymentTitles } from "../../src/features/checkout/checkout-content";
import { AddressCard } from "../../src/features/orders/components/address-card";
import { OrderSummaryCard } from "../../src/features/orders/components/order-summary-card";
import { OrderTimeline } from "../../src/features/orders/components/order-timeline";
import { StatusBadge } from "../../src/features/orders/components/status-badge";
import { SuccessMark } from "../../src/features/orders/components/success-mark";
import { ordersCopy } from "../../src/features/orders/orders-content";
import { useOrders } from "../../src/features/orders/orders-context";
import { formatDate } from "../../src/utils/format";
import { layout, radii, spacing } from "../../theme";

export default function OrderDetailScreen() {
  const { id, placed } = useLocalSearchParams<{ id: string; placed?: string }>();
  const router = useRouter();
  const order = useOrders().getOrder(id);

  if (!order) {
    return (
      <Screen>
        <EmptyState
          icon="receipt-outline"
          title="Order not found"
          description="This order may have been cleared when the app restarted."
          actionLabel={ordersCopy.allOrders}
          onAction={() => router.replace("/orders")}
        />
      </Screen>
    );
  }

  const paymentIcon = paymentOptions.find((o) => o.id === order.payment)?.icon ?? "card-outline";

  return (
    <Screen contentStyle={styles.content}>
      {placed ? (
        <Reveal order={0}>
          <Card dark style={styles.hero}>
            <SuccessMark />
            <View style={styles.heroText}>
              <AppText variant="display" color="white" style={styles.center}>
                {ordersCopy.placedTitle}
              </AppText>
              <AppText variant="body" color="textTertiary" style={styles.center}>
                {ordersCopy.placedDescription}
              </AppText>
            </View>
            <View style={styles.idChip}>
              <AppText variant="label" color="textTertiary">
                {ordersCopy.orderNumber}
              </AppText>
              <AppText variant="productName" color="white">
                {order.id}
              </AppText>
            </View>
          </Card>
        </Reveal>
      ) : (
        <Reveal order={0} style={styles.header}>
          <AppText variant="label" color="textSecondary">
            {ordersCopy.orderNumber}
          </AppText>
          <AppText variant="display" accessibilityRole="header">
            {order.id}
          </AppText>
          <AppText variant="body" color="textSecondary">
            {formatDate(order.createdAt)}
          </AppText>
          <StatusBadge status={order.status} />
        </Reveal>
      )}

      <Reveal order={1} style={styles.block}>
        <SectionHeader title={ordersCopy.statusTitle} />
        <Card>
          <OrderTimeline status={order.status} />
        </Card>
      </Reveal>

      <Reveal order={2} style={styles.block}>
        <SectionHeader title={ordersCopy.itemsTitle} />
        <OrderSummaryCard
          lines={order.lines}
          subtotal={order.subtotal}
          delivery={order.delivery}
          total={order.total}
        />
      </Reveal>

      <Reveal order={3} style={styles.block}>
        <SectionHeader title={ordersCopy.deliveryTitle} />
        <AddressCard address={order.address} />
      </Reveal>

      <Reveal order={4} style={styles.block}>
        <SectionHeader title={ordersCopy.paymentTitle} />
        <Card style={styles.payment}>
          <Icon name={paymentIcon} size={layout.iconSize.lg} />
          <AppText variant="productName">{paymentTitles[order.payment]}</AppText>
        </Card>
      </Reveal>

      <Reveal order={5} style={styles.actions}>
        <AppButton title={ordersCopy.continueShopping} fullWidth onPress={() => router.navigate("/")} />
        <AppButton
          title={ordersCopy.allOrders}
          variant="secondary"
          fullWidth
          onPress={() => router.replace("/orders")}
        />
      </Reveal>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: spacing.lg,
  },
  hero: {
    alignItems: "center",
    gap: spacing.lg,
    padding: spacing.xl,
    borderRadius: radii.xl,
  },
  heroText: {
    gap: spacing.sm,
  },
  center: {
    textAlign: "center",
  },
  idChip: {
    alignItems: "center",
    gap: spacing.xxs,
  },
  header: {
    gap: spacing.sm,
  },
  block: {
    gap: spacing.md,
  },
  payment: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  actions: {
    gap: spacing.md,
  },
});
