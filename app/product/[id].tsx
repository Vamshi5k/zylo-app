import { useState } from "react";
import { StyleSheet, View, useWindowDimensions } from "react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import Animated, { useAnimatedScrollHandler, useSharedValue } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FloatingHeader } from "../../src/components/layout/floating-header";
import { Screen } from "../../src/components/layout/screen";
import { AppButton } from "../../src/components/ui/app-button";
import { AppText } from "../../src/components/ui/app-text";
import { Divider } from "../../src/components/ui/divider";
import { EmptyState } from "../../src/components/ui/empty-state";
import { ExpandableRow } from "../../src/components/ui/expandable-row";
import { Icon } from "../../src/components/ui/icon";
import { IconButton } from "../../src/components/ui/icon-button";
import { QuantityStepper } from "../../src/components/ui/quantity-stepper";
import { Reveal } from "../../src/components/ui/reveal";
import { SectionHeader } from "../../src/components/ui/section-header";
import { commerce } from "../../src/constants/commerce";
import { screenContent } from "../../src/constants/screen-content";
import { useCart } from "../../src/features/cart/cart-context";
import {
  categoryTitles,
  collections,
  getProduct,
  products,
  type Product,
} from "../../src/features/catalog/catalog-data";
import { ProductCarousel } from "../../src/features/catalog/components/product-carousel";
import { ProductGallery } from "../../src/features/catalog/components/product-gallery";
import { SizeSelector } from "../../src/features/catalog/components/size-selector";
import { WishlistButton } from "../../src/features/catalog/components/wishlist-button";
import { formatPrice } from "../../src/utils/format";
import { colors, layout, radii, spacing } from "../../theme";

const content = screenContent.product;
const RELATED_COUNT = 4;

/** Same-collection pieces first, then the rest of the catalog, never the product itself. */
function relatedTo(product: Product): Product[] {
  const sameEdit = collections
    .filter((c) => c.productIds.includes(product.id))
    .flatMap((c) => c.productIds)
    .map((id) => getProduct(id))
    .filter((p): p is Product => Boolean(p));
  const seen = new Set<string>([product.id]);
  return [...sameEdit, ...products]
    .filter((p) => (seen.has(p.id) ? false : (seen.add(p.id), true)))
    .slice(0, RELATED_COUNT);
}

export default function ProductScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const cart = useCart();
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  const product = getProduct(id);

  const [chosenSize, setChosenSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const scrollY = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler((e) => {
    scrollY.value = e.contentOffset.y;
  });

  if (!product) {
    return (
      <Screen>
        <EmptyState
          icon="alert-circle-outline"
          title={content.notFoundTitle}
          description={content.notFoundDescription}
          actionLabel={content.notFoundAction}
          onAction={() => router.navigate("/categories")}
        />
      </Screen>
    );
  }

  const galleryHeight = Math.min(
    Math.max(height * layout.productDetail.galleryHeightRatio, layout.productDetail.galleryMinHeight),
    layout.productDetail.galleryMaxHeight,
  );
  const size = chosenSize ?? (product.sizes.length === 1 ? product.sizes[0] : null);
  const total = formatPrice(product.price * quantity);
  const edits = collections.filter((c) => c.productIds.includes(product.id));

  const onPrimary = () => {
    if (added) {
      router.navigate("/cart");
    } else if (size) {
      cart.add(product.id, size, quantity);
      setAdded(true);
    }
  };

  return (
    <View style={styles.root}>
      <Stack.Screen options={{ headerShown: false }} />

      <Animated.ScrollView
        onScroll={onScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <ProductGallery product={product} scrollY={scrollY} width={width} height={galleryHeight} />

        <View style={styles.sheet}>
          <Reveal order={0} style={styles.titleBlock}>
            <View style={styles.tags}>
              <AppText variant="overline" color="textSecondary">
                {categoryTitles[product.categoryId].toUpperCase()}
              </AppText>
              {edits.map((edit) => (
                <AppText key={edit.id} variant="overline" color="textTertiary">
                  · {edit.title.toUpperCase()}
                </AppText>
              ))}
            </View>
            <AppText variant="display" accessibilityRole="header">
              {product.name}
            </AppText>
            <View style={styles.priceRow}>
              <AppText variant="title">{formatPrice(product.price)}</AppText>
              <AppText variant="caption" color="textSecondary">
                {content.taxNote}
              </AppText>
            </View>
            <AppText variant="body" color="textSecondary">
              {product.description}
            </AppText>
            <View style={styles.perk}>
              <Icon name="cube-outline" size={layout.iconSize.md} />
              <AppText variant="caption">
                {content.deliveryText(
                  formatPrice(commerce.freeDeliveryThreshold),
                  formatPrice(commerce.deliveryFee),
                )}
              </AppText>
            </View>
          </Reveal>

          <Reveal order={1} style={styles.block}>
            <SectionHeader
              title={content.sizeTitle}
              description={size ? `${content.sizeTitle} ${size}` : content.selectSize}
            />
            <SizeSelector
              sizes={product.sizes}
              value={size}
              onChange={(s) => {
                setChosenSize(s);
                setAdded(false);
              }}
            />
          </Reveal>

          <Reveal order={2} style={styles.quantityRow}>
            <AppText variant="productName">{content.quantityTitle}</AppText>
            <QuantityStepper
              value={quantity}
              max={commerce.maxQuantity}
              onChange={(q) => {
                setQuantity(Math.max(1, q));
                setAdded(false);
              }}
            />
          </Reveal>

          <Reveal order={3}>
            <Divider />
            <ExpandableRow title={content.detailsTitle} defaultOpen>
              <AppText variant="body" color="textSecondary">
                {product.description}
              </AppText>
              <AppText variant="caption" color="textSecondary">
                {content.availableSizes(product.sizes)}
              </AppText>
            </ExpandableRow>
            <Divider />
          </Reveal>

          <Reveal order={4} style={styles.related}>
            <SectionHeader title={content.related} />
          </Reveal>
        </View>

        <ProductCarousel
          products={relatedTo(product)}
          onPressProduct={(p) => router.push({ pathname: "/product/[id]", params: { id: p.id } })}
        />
      </Animated.ScrollView>

      <FloatingHeader
        scrollY={scrollY}
        heroHeight={galleryHeight}
        left={(tone) => (
          <View style={styles.headerLeft}>
            <IconButton
              icon="arrow-back"
              label="Go back"
              tone={tone}
              onPress={() => router.back()}
            />
            {tone === "default" ? (
              <AppText variant="productName" numberOfLines={1} style={styles.headerTitle}>
                {product.name}
              </AppText>
            ) : null}
          </View>
        )}
        right={(tone) => (
          <>
            <WishlistButton product={product} tone={tone} />
            <IconButton
              icon="bag-outline"
              label={cart.count > 0 ? `Open shopping bag, ${cart.count} items` : "Open shopping bag"}
              badge={cart.count}
              tone={tone}
              onPress={() => router.navigate("/cart")}
            />
          </>
        )}
      />

      <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, spacing.sm) }]}>
        <View>
          <AppText variant="price">{total}</AppText>
          <AppText variant="caption" color="textSecondary">
            {quantity > 1 ? `${quantity} × ${formatPrice(product.price)}` : content.taxNote}
          </AppText>
        </View>
        <AppButton
          title={added ? content.viewBag : size ? content.addToBag : content.pickSize}
          disabled={!size}
          onPress={onPrimary}
          style={styles.footerButton}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingBottom: spacing.xl,
  },
  /** Overlaps the gallery with a rounded top edge. */
  sheet: {
    marginTop: -radii.xl,
    paddingHorizontal: spacing.screen,
    paddingTop: spacing.xl,
    gap: spacing.lg,
    borderTopLeftRadius: radii.xl,
    borderTopRightRadius: radii.xl,
    backgroundColor: colors.background,
  },
  titleBlock: {
    gap: spacing.sm,
  },
  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.xs,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: spacing.md,
  },
  perk: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    marginTop: spacing.xs,
    padding: spacing.md,
    borderRadius: radii.md,
    backgroundColor: colors.surfaceMuted,
  },
  block: {
    gap: spacing.md,
  },
  quantityRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  related: {
    marginTop: spacing.base,
  },
  headerLeft: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  headerTitle: {
    flex: 1,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.base,
    paddingHorizontal: spacing.screen,
    paddingTop: spacing.md,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
    backgroundColor: colors.background,
  },
  footerButton: {
    flex: 1,
  },
});
