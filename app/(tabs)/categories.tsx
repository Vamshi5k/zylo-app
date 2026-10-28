import { useState } from "react";
import { ScrollView, StyleSheet, View, useWindowDimensions } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import Animated, { useAnimatedScrollHandler, useSharedValue } from "react-native-reanimated";
import { useFloatingTabBarInset } from "../../src/components/layout/floating-tab-bar";
import { AppText } from "../../src/components/ui/app-text";
import { EmptyState } from "../../src/components/ui/empty-state";
import { Reveal } from "../../src/components/ui/reveal";
import { SectionHeader } from "../../src/components/ui/section-header";
import { heroImage } from "../../src/constants/images";
import { useCart } from "../../src/features/cart/cart-context";
import {
  categories,
  collections,
  getCategory,
  getCollection,
  type CategoryId,
  type CollectionId,
  type Product,
} from "../../src/features/catalog/catalog-data";
import { filterProducts, sortProducts, type SortId } from "../../src/features/catalog/catalog-utils";
import { CategoryTabs, type TabOption } from "../../src/features/catalog/components/category-tabs";
import { CollectionBubble } from "../../src/features/catalog/components/collection-bubble";
import { ExploreBanner } from "../../src/features/catalog/components/explore-banner";
import { ProductGrid } from "../../src/features/catalog/components/product-grid";
import { ProductListRow } from "../../src/features/catalog/components/product-list-row";
import { ViewModeToggle, type ViewMode } from "../../src/features/catalog/components/view-mode-toggle";
import { SortMenu } from "../../src/features/catalog/components/sort-menu";
import { exploreContent } from "../../src/features/catalog/explore-content";
import { HomeHeader } from "../../src/features/home/components/home-header";
import { colors, layout, spacing } from "../../theme";

type Initial = { collection?: string; category?: string };

const categoryTabs: readonly TabOption<CategoryId>[] = [
  { id: null, label: exploreContent.all },
  ...categories.map((c) => ({ id: c.id, label: c.title })),
];

/** Remounts when the route params change, so links from Home pre-select the right filters. */
export default function ExploreScreen() {
  const { collection, category } = useLocalSearchParams<Initial>();
  return (
    <ExploreContent
      key={`${collection ?? ""}|${category ?? ""}`}
      collection={collection}
      category={category}
    />
  );
}

function ExploreContent({ collection, category }: Initial) {
  const router = useRouter();
  const cart = useCart();
  const { width, height } = useWindowDimensions();
  const tabBarInset = useFloatingTabBarInset();

  const [collectionId, setCollectionId] = useState<CollectionId | null>(
    getCollection(collection)?.id ?? null,
  );
  const [categoryId, setCategoryId] = useState<CategoryId | null>(getCategory(category)?.id ?? null);
  const [sort, setSort] = useState<SortId>("featured");
  const [mode, setMode] = useState<ViewMode>("grid");

  const scrollY = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler((e) => {
    scrollY.value = e.contentOffset.y;
  });

  const bannerHeight = Math.min(
    Math.max(height * layout.explore.bannerHeightRatio, layout.explore.bannerMinHeight),
    layout.explore.bannerMaxHeight,
  );

  const activeCollection = getCollection(collectionId ?? undefined) ?? null;
  const activeCategory = getCategory(categoryId ?? undefined) ?? null;
  const visible = sortProducts(filterProducts({ categoryId, collection: activeCollection }), sort);
  const filtered = Boolean(activeCollection || categoryId);

  const openProduct = (p: Product) =>
    router.push({ pathname: "/product/[id]", params: { id: p.id } });

  const clearFilters = () => {
    setCollectionId(null);
    setCategoryId(null);
  };

  return (
    <View style={styles.root}>
      <Animated.ScrollView
        onScroll={onScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: tabBarInset }}
      >
        <ExploreBanner
          scrollY={scrollY}
          width={width}
          height={bannerHeight}
          image={activeCollection?.image ?? heroImage}
          eyebrow={
            activeCollection
              ? exploreContent.collectionEyebrow(activeCollection.count)
              : exploreContent.bannerEyebrow
          }
          title={activeCollection?.title ?? activeCategory?.title ?? exploreContent.bannerTitle}
          subtitle={activeCollection?.description ?? exploreContent.subtitle}
        />

        <Reveal order={0} style={styles.section}>
          <View style={styles.padded}>
            <SectionHeader title={exploreContent.collectionsTitle} meta={exploreContent.collectionsMeta} />
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.bubbles}
          >
            {collections.map((item) => (
              <CollectionBubble
                key={item.id}
                collection={item}
                selected={item.id === collectionId}
                onPress={(c) => setCollectionId(c.id === collectionId ? null : c.id)}
              />
            ))}
          </ScrollView>
        </Reveal>

        <Reveal order={1} style={[styles.padded, styles.results]}>
          <CategoryTabs options={categoryTabs} value={categoryId} onChange={setCategoryId} />

          <View style={styles.toolbar}>
            <View style={styles.toolbarLeft}>
              <AppText variant="meta" color="textTertiary">
                {exploreContent.count(visible.length).toUpperCase()}
              </AppText>
              <SortMenu value={sort} onChange={setSort} />
            </View>
            <ViewModeToggle mode={mode} onChange={setMode} />
          </View>

          {visible.length === 0 ? (
            <EmptyState
              icon="funnel-outline"
              title={exploreContent.emptyTitle}
              description={exploreContent.emptyDescription}
              actionLabel={filtered ? exploreContent.clearFilters : undefined}
              onAction={filtered ? clearFilters : undefined}
            />
          ) : mode === "grid" ? (
            <ProductGrid products={visible} onPressProduct={openProduct} />
          ) : (
            <View style={styles.list}>
              {visible.map((product) => (
                <ProductListRow key={product.id} product={product} onPress={openProduct} />
              ))}
            </View>
          )}
        </Reveal>
      </Animated.ScrollView>

      <HomeHeader
        scrollY={scrollY}
        heroHeight={bannerHeight}
        bagCount={cart.count}
        onSearch={() => router.push("/search")}
        onBag={() => router.navigate("/cart")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  padded: {
    paddingHorizontal: spacing.screen,
  },
  section: {
    gap: spacing.base,
    marginTop: spacing.lg,
    marginBottom: spacing.lg,
  },
  bubbles: {
    gap: spacing.xs,
    paddingHorizontal: spacing.screen,
  },
  results: {
    gap: spacing.lg,
  },
  toolbar: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: spacing.md,
  },
  toolbarLeft: {
    flex: 1,
    gap: spacing.xs,
  },
  list: {
    gap: spacing.lg,
  },
});
