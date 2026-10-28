import { ScrollView, StyleSheet, View, useWindowDimensions } from "react-native";
import { useRouter } from "expo-router";
import Animated, { useAnimatedScrollHandler, useSharedValue } from "react-native-reanimated";
import { useFloatingTabBarInset } from "../../src/components/layout/floating-tab-bar";
import { AppText } from "../../src/components/ui/app-text";
import { Marquee } from "../../src/components/ui/marquee";
import { Reveal } from "../../src/components/ui/reveal";
import { SectionHeader } from "../../src/components/ui/section-header";
import { useCart } from "../../src/features/cart/cart-context";
import { categories, collections, getProduct, products } from "../../src/features/catalog/catalog-data";
import { CollectionCard } from "../../src/features/catalog/components/collection-card";
import { ProductGrid } from "../../src/features/catalog/components/product-grid";
import { CategoryRow } from "../../src/features/home/components/category-row";
import { HomeHeader } from "../../src/features/home/components/home-header";
import { HomeHero } from "../../src/features/home/components/home-hero";
import { SpotlightCard } from "../../src/features/home/components/spotlight-card";
import { homeContent, type HeroSlide } from "../../src/features/home/home-data";
import { colors, layout, radii, spacing, typography } from "../../theme";

const FEATURED_COUNT = 4;
const featured = products.slice(0, FEATURED_COUNT);
const spotlight = getProduct(homeContent.spotlightProductId);

export default function HomeScreen() {
  const router = useRouter();
  const { width, height } = useWindowDimensions();
  const tabBarInset = useFloatingTabBarInset();
  const cart = useCart();

  const heroHeight = Math.min(
    Math.max(height * layout.home.heroHeightRatio, layout.home.heroMinHeight),
    layout.home.heroMaxHeight,
  );

  const scrollY = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler((e) => {
    scrollY.value = e.contentOffset.y;
  });

  const openExplore = (params: { collection?: string; category?: string } = {}) =>
    router.navigate({ pathname: "/categories", params });
  const openProduct = (id: string) =>
    router.push({ pathname: "/product/[id]", params: { id } });
  const onSlide = (slide: HeroSlide) => openExplore({ collection: slide.collection });

  return (
    <View style={styles.root}>
      <Animated.ScrollView
        onScroll={onScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: tabBarInset }}
      >
        <HomeHero scrollY={scrollY} width={width} height={heroHeight} onPressSlide={onSlide} />

        <Reveal order={0} style={styles.marquee}>
          <Marquee text={homeContent.marquee} />
        </Reveal>

        {/* Shop by category */}
        <Reveal order={1} style={styles.section}>
          <View style={styles.padded}>
            <SectionHeader title={homeContent.categoriesTitle} meta={homeContent.categoriesMeta} />
          </View>
          <View style={[styles.padded, styles.rows]}>
            {categories.map((category, index) => (
              <CategoryRow
                key={category.id}
                category={category}
                index={index}
                pieceCount={products.filter((p) => p.categoryId === category.id).length}
                onPress={(c) => openExplore({ category: c.id })}
              />
            ))}
          </View>
        </Reveal>

        {/* The edits */}
        <Reveal order={1} style={styles.section}>
          <View style={styles.padded}>
            <SectionHeader title={homeContent.editsTitle} meta={homeContent.editsIndex} />
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            decelerationRate="fast"
            snapToInterval={layout.home.archWidth + spacing.md}
            contentContainerStyle={styles.archList}
          >
            {collections.map((collection) => (
              <CollectionCard
                key={collection.id}
                collection={collection}
                onPress={(c) => openExplore({ collection: c.id })}
              />
            ))}
          </ScrollView>
        </Reveal>

        {/* In focus */}
        {spotlight ? (
          <Reveal order={1} style={[styles.section, styles.padded]}>
            <SectionHeader title={homeContent.spotlightTitle} meta={homeContent.spotlightMeta} />
            <SpotlightCard product={spotlight} onPress={(p) => openProduct(p.id)} />
          </Reveal>
        ) : null}

        {/* Selected for you */}
        <Reveal order={1} style={[styles.section, styles.padded]}>
          <SectionHeader
            title={homeContent.productsTitle}
            description={homeContent.productsDescription}
            actionLabel={homeContent.viewAll}
            onAction={() => openExplore()}
          />
          <ProductGrid products={featured} onPressProduct={(p) => openProduct(p.id)} />
        </Reveal>

        {/* Brand statement */}
        <Reveal order={1} style={styles.padded}>
          <View style={[styles.statement, { minHeight: width * 0.9 }]}>
            <AppText variant="label" color="textTertiary">
              {homeContent.statement.eyebrow}
            </AppText>
            <View>
              <AppText variant="display" color="white">
                {homeContent.statement.title}
              </AppText>
              <AppText variant="body" color="textTertiary" style={styles.statementBody}>
                {homeContent.statement.body}
              </AppText>
            </View>
            <View>
              <AppText variant="wordmark" color="white" style={styles.giantMark} numberOfLines={1} adjustsFontSizeToFit>
                ZYLO
              </AppText>
              <AppText variant="label" color="textTertiary">
                {homeContent.statement.footer}
              </AppText>
            </View>
          </View>
        </Reveal>
      </Animated.ScrollView>

      <HomeHeader
        scrollY={scrollY}
        heroHeight={heroHeight}
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
  marquee: {
    marginTop: spacing.lg,
    marginBottom: spacing.section,
  },
  section: {
    gap: spacing.base,
    marginBottom: spacing.section + spacing.sm,
  },
  rows: {
    marginTop: spacing.xs,
    borderTopWidth: layout.borderWidth,
    borderTopColor: colors.border,
  },
  archList: {
    gap: spacing.md,
    paddingHorizontal: spacing.screen,
  },
  statement: {
    justifyContent: "space-between",
    backgroundColor: colors.primary,
    borderRadius: radii.xl,
    padding: spacing.lg,
  },
  statementBody: {
    marginTop: spacing.md,
  },
  giantMark: {
    fontSize: layout.home.statementMarkSize,
    lineHeight: layout.home.statementMarkSize + spacing.sm,
    letterSpacing: typography.letterSpacing.tight,
    opacity: 0.12,
    marginBottom: spacing.sm,
  },
});
