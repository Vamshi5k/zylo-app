import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";
import { Screen } from "../../src/components/layout/screen";
import { AppText } from "../../src/components/ui/app-text";
import { EmptyState } from "../../src/components/ui/empty-state";
import { Icon } from "../../src/components/ui/icon";
import { Reveal } from "../../src/components/ui/reveal";
import { SectionHeader } from "../../src/components/ui/section-header";
import { editImages } from "../../src/constants/images";
import { screenContent } from "../../src/constants/screen-content";
import { useCart } from "../../src/features/cart/cart-context";
import { products, type Product } from "../../src/features/catalog/catalog-data";
import { ProductCarousel } from "../../src/features/catalog/components/product-carousel";
import { ProductGrid } from "../../src/features/catalog/components/product-grid";
import { ProductListRow } from "../../src/features/catalog/components/product-list-row";
import { ViewModeToggle, type ViewMode } from "../../src/features/catalog/components/view-mode-toggle";
import { useWishlist } from "../../src/features/wishlist/wishlist-context";
import { colors, layout, spacing } from "../../theme";

const content = screenContent.wishlist;
const RECOMMEND_COUNT = 4;

export default function WishlistScreen() {
  const router = useRouter();
  const wishlist = useWishlist();
  const cart = useCart();
  const [mode, setMode] = useState<ViewMode>("grid");

  const saved = products.filter((p) => wishlist.has(p.id));
  const recommended = products.filter((p) => !wishlist.has(p.id)).slice(0, RECOMMEND_COUNT);
  const openProduct = (p: Product) =>
    router.push({ pathname: "/product/[id]", params: { id: p.id } });

  if (saved.length === 0) {
    return (
      <Screen variant="tab" title={content.title}>
        <EmptyState
          icon="heart-outline"
          image={editImages.knitwear}
          title={content.emptyTitle}
          description={content.emptyDescription}
          actionLabel={content.emptyAction}
          onAction={() => router.navigate("/categories")}
        />
      </Screen>
    );
  }

  /** One-size pieces go straight to the bag; others open the product to choose a size. */
  const quickAdd = (product: Product) => {
    if (product.sizes.length === 1) cart.add(product.id, product.sizes[0]);
    else openProduct(product);
  };

  const label = (product: Product) =>
    cart.lines.some((l) => l.productId === product.id)
      ? content.inBag
      : product.sizes.length === 1
        ? content.quickAdd
        : content.chooseSize;

  return (
    <Screen
      variant="tab"
      title={content.title}
      subtitle={content.subtitle}
      headerRight={
        <AppText variant="display" color="textTertiary">
          {String(saved.length).padStart(2, "0")}
        </AppText>
      }
    >
      <Reveal order={1} style={styles.block}>
        <View style={styles.toolbar}>
          <AppText variant="meta" color="textTertiary">
            {content.saved(saved.length).toUpperCase()}
          </AppText>
          <ViewModeToggle mode={mode} onChange={setMode} />
        </View>

        {mode === "grid" ? (
          <ProductGrid products={saved} onPressProduct={openProduct} />
        ) : (
          <View style={styles.list}>
            {saved.map((product) => (
              <ProductListRow
                key={product.id}
                product={product}
                onPress={openProduct}
                footer={
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel={`${label(product)} ${product.name}`}
                    onPress={() => quickAdd(product)}
                    style={styles.quick}
                  >
                    <AppText variant="label">{label(product)}</AppText>
                    <Icon name="arrow-forward" size={layout.iconSize.xs} color={colors.text} />
                  </Pressable>
                }
              />
            ))}
          </View>
        )}
      </Reveal>

      {recommended.length > 0 ? (
        <Reveal order={2} style={styles.block}>
          <SectionHeader title={content.recommendTitle} />
          <View style={styles.bleed}>
            <ProductCarousel products={recommended} onPressProduct={openProduct} />
          </View>
        </Reveal>
      ) : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  block: {
    gap: spacing.base,
  },
  toolbar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  list: {
    gap: spacing.lg,
  },
  quick: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    marginTop: spacing.sm,
    minHeight: layout.stepper.buttonSize,
  },
  /** Lets the carousel scroll edge to edge inside the padded screen. */
  bleed: {
    marginHorizontal: -spacing.screen,
  },
});
