import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";
import { Screen } from "../src/components/layout/screen";
import { AppButton } from "../src/components/ui/app-button";
import { AppText } from "../src/components/ui/app-text";
import { EmptyState } from "../src/components/ui/empty-state";
import { Reveal } from "../src/components/ui/reveal";
import { SearchInput } from "../src/components/ui/search-input";
import { SectionHeader } from "../src/components/ui/section-header";
import { screenContent } from "../src/constants/screen-content";
import { categories, collections } from "../src/features/catalog/catalog-data";
import { searchProducts, sortProducts, type SortId } from "../src/features/catalog/catalog-utils";
import { ProductGrid } from "../src/features/catalog/components/product-grid";
import { SortBar } from "../src/features/catalog/components/sort-bar";
import { spacing } from "../theme";

const content = screenContent.search;

export default function SearchScreen() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortId>("featured");
  const trimmed = query.trim();

  const results = sortProducts(searchProducts(trimmed), sort);

  return (
    <Screen>
      <SearchInput value={query} onChangeText={setQuery} placeholder={content.placeholder} autoFocus />

      {!trimmed ? (
        <Reveal order={1} style={styles.browse}>
          <View style={styles.group}>
            <SectionHeader title={content.browseTitle} description={content.browseDescription} />
            <View style={styles.chips}>
              {categories.map((category) => (
                <AppButton
                  key={category.id}
                  title={category.title}
                  variant="chip"
                  onPress={() => setQuery(category.title)}
                />
              ))}
            </View>
          </View>

          <View style={styles.group}>
            <SectionHeader title={content.collectionsTitle} />
            <View style={styles.chips}>
              {collections.map((collection) => (
                <AppButton
                  key={collection.id}
                  title={collection.title}
                  variant="chip"
                  onPress={() =>
                    router.push({ pathname: "/categories", params: { collection: collection.id } })
                  }
                />
              ))}
            </View>
          </View>
        </Reveal>
      ) : results.length > 0 ? (
        <View style={styles.group}>
          <AppText variant="meta" color="textTertiary">
            {content.results(results.length, trimmed).toUpperCase()}
          </AppText>
          <SortBar value={sort} onChange={setSort} />
          <ProductGrid
            products={results}
            onPressProduct={(p) => router.push({ pathname: "/product/[id]", params: { id: p.id } })}
          />
        </View>
      ) : (
        <EmptyState
          icon="search-outline"
          title={content.emptyTitle}
          description={content.emptyDescription}
          actionLabel={content.clear}
          onAction={() => setQuery("")}
        />
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  browse: {
    gap: spacing.section,
  },
  group: {
    gap: spacing.base,
  },
  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
});
