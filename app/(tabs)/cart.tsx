import { StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";
import { Screen } from "../../src/components/layout/screen";
import { AppButton } from "../../src/components/ui/app-button";
import { AppText } from "../../src/components/ui/app-text";
import { Card } from "../../src/components/ui/card";
import { Divider } from "../../src/components/ui/divider";
import { EmptyState } from "../../src/components/ui/empty-state";
import { Reveal } from "../../src/components/ui/reveal";
import { SectionHeader } from "../../src/components/ui/section-header";
import { SummaryRow } from "../../src/components/ui/summary-row";
import { editImages } from "../../src/constants/images";
import { screenContent } from "../../src/constants/screen-content";
import { useCart } from "../../src/features/cart/cart-context";
import { CartItemRow } from "../../src/features/cart/components/cart-item-row";
import { DeliveryProgress } from "../../src/features/cart/components/delivery-progress";
import { products } from "../../src/features/catalog/catalog-data";
import { ProductCarousel } from "../../src/features/catalog/components/product-carousel";
import { formatPrice } from "../../src/utils/format";
import { spacing } from "../../theme";

const content = screenContent.cart;
const RECOMMEND_COUNT = 4;

export default function CartScreen() {
  const router = useRouter();
  const cart = useCart();

  if (cart.lines.length === 0) {
    return (
      <Screen variant="tab" title={content.title}>
        <EmptyState
          icon="bag-outline"
          image={editImages.studio}
          title={content.emptyTitle}
          description={content.emptyDescription}
          actionLabel={content.emptyAction}
          onAction={() => router.navigate("/")}
        />
      </Screen>
    );
  }

  const inBag = new Set(cart.lines.map((l) => l.productId));
  const recommended = products.filter((p) => !inBag.has(p.id)).slice(0, RECOMMEND_COUNT);

  return (
    <Screen
      variant="tab"
      title={content.title}
      subtitle={content.items(cart.count)}
      headerRight={
        <AppText variant="display" color="textTertiary">
          {String(cart.count).padStart(2, "0")}
        </AppText>
      }
    >
      <Reveal order={1}>
        <DeliveryProgress subtotal={cart.subtotal} />
      </Reveal>

      <Reveal order={2} style={styles.list}>
        {cart.lines.map((line, index) => (
          <View key={`${line.productId}-${line.size}`} style={styles.item}>
            {index > 0 ? <Divider /> : null}
            <CartItemRow
              line={line}
              onOpen={() => router.push({ pathname: "/product/[id]", params: { id: line.productId } })}
              onQuantityChange={(q) => cart.setQuantity(line.productId, line.size, q)}
              onRemove={() => cart.remove(line.productId, line.size)}
            />
          </View>
        ))}
      </Reveal>

      <Reveal order={3}>
        <Card dark style={styles.summary}>
          <AppText variant="label" color="textTertiary">
            {content.summaryTitle.toUpperCase()}
          </AppText>
          <View style={styles.rows}>
            <SummaryRow inverted label="Subtotal" value={formatPrice(cart.subtotal)} />
            <SummaryRow inverted label="Delivery" value={cart.delivery === 0 ? "Free" : formatPrice(cart.delivery)} />
            <Divider />
            <SummaryRow inverted emphasized label="Total" value={formatPrice(cart.total)} />
          </View>
          <AppButton
            title={content.checkout}
            variant="secondary"
            icon="arrow-forward"
            fullWidth
            onPress={() => router.push("/checkout/address")}
          />
        </Card>
      </Reveal>

      {recommended.length > 0 ? (
        <Reveal order={4} style={styles.recommend}>
          <SectionHeader title={content.recommendTitle} />
          <View style={styles.bleed}>
            <ProductCarousel
              products={recommended}
              onPressProduct={(p) => router.push({ pathname: "/product/[id]", params: { id: p.id } })}
            />
          </View>
        </Reveal>
      ) : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: spacing.lg,
  },
  item: {
    gap: spacing.lg,
  },
  summary: {
    gap: spacing.lg,
    padding: spacing.lg,
  },
  rows: {
    gap: spacing.md,
  },
  recommend: {
    gap: spacing.base,
  },
  /** Lets the carousel scroll edge to edge inside the padded screen. */
  bleed: {
    marginHorizontal: -spacing.screen,
  },
});
