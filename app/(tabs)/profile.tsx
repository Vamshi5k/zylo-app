import { Alert, Pressable, StyleSheet, View } from "react-native";
import Constants from "expo-constants";
import { useRouter } from "expo-router";
import { Screen } from "../../src/components/layout/screen";
import { AppButton } from "../../src/components/ui/app-button";
import { AppText } from "../../src/components/ui/app-text";
import { Card } from "../../src/components/ui/card";
import { Divider } from "../../src/components/ui/divider";
import { Icon } from "../../src/components/ui/icon";
import { ListRow } from "../../src/components/ui/list-row";
import { Reveal } from "../../src/components/ui/reveal";
import { SectionHeader } from "../../src/components/ui/section-header";
import { StatTile } from "../../src/components/ui/stat-tile";
import { brand } from "../../src/constants/brand";
import { screenContent } from "../../src/constants/screen-content";
import { useCart } from "../../src/features/cart/cart-context";
import { useOrders } from "../../src/features/orders/orders-context";
import { useWishlist } from "../../src/features/wishlist/wishlist-context";
import { colors, layout, radii, spacing, typography } from "../../theme";

const content = screenContent.profile;

export default function ProfileScreen() {
  const router = useRouter();
  const { orders } = useOrders();
  const wishlist = useWishlist();
  const cart = useCart();
  const version = Constants.expoConfig?.version;

  /** No session is stored yet, so logging out just returns to sign-in. */
  const confirmLogout = () =>
    Alert.alert(content.logoutConfirmTitle, content.logoutConfirmMessage, [
      { text: content.logoutCancel, style: "cancel" },
      { text: content.logout, style: "destructive", onPress: () => router.replace("/login") },
    ]);

  return (
    <Screen variant="tab" title={content.title}>
      <Reveal order={1}>
        <Card dark style={styles.hero}>
          <AppText variant="wordmark" color="white" style={styles.ghostMark} numberOfLines={1}>
            {brand.name}
          </AppText>
          <View style={styles.avatar}>
            <Icon name="person-outline" size={layout.iconSize.xl} color={colors.white} />
          </View>
          <View style={styles.heroText}>
            <AppText variant="display" color="white">
              {content.guestName}
            </AppText>
            <AppText variant="body" color="textTertiary">
              {content.guestNote}
            </AppText>
          </View>
          <View style={styles.heroActions}>
            <AppButton title={content.signIn} variant="secondary" fullWidth onPress={() => router.push("/login")} />
            <Pressable
              accessibilityRole="button"
              onPress={() => router.push("/register")}
              style={styles.link}
            >
              <AppText variant="label" color="white">
                {content.createAccount}
              </AppText>
            </Pressable>
          </View>
        </Card>
      </Reveal>

      <Reveal order={2} style={styles.stats}>
        <StatTile value={orders.length} label={content.statOrders} onPress={() => router.push("/orders")} />
        <StatTile value={wishlist.ids.length} label={content.statWishlist} onPress={() => router.navigate("/wishlist")} />
        <StatTile value={cart.count} label={content.statBag} onPress={() => router.navigate("/cart")} />
      </Reveal>

      <Reveal order={3} style={styles.block}>
        <SectionHeader title={content.menuTitle} />
        <Card style={styles.menu}>
          <ListRow
            icon="receipt-outline"
            title={content.menuOrders}
            value={String(orders.length)}
            onPress={() => router.push("/orders")}
          />
          <Divider />
          <ListRow
            icon="heart-outline"
            title={content.menuWishlist}
            value={String(wishlist.ids.length)}
            onPress={() => router.navigate("/wishlist")}
          />
          <Divider />
          <ListRow
            icon="bag-outline"
            title={content.menuBag}
            value={String(cart.count)}
            onPress={() => router.navigate("/cart")}
          />
        </Card>
        <Card style={styles.menu}>
          <ListRow icon="log-out-outline" title={content.logout} onPress={confirmLogout} />
        </Card>
      </Reveal>

      <Reveal order={4} style={styles.about}>
        <AppText variant="label" color="textTertiary">
          {content.aboutTitle.toUpperCase()}
        </AppText>
        <AppText variant="body" color="textSecondary">
          {content.aboutBody}
        </AppText>
        {version ? (
          <AppText variant="meta" color="textTertiary">
            {content.version(version)}
          </AppText>
        ) : null}
      </Reveal>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: {
    gap: spacing.lg,
    padding: spacing.lg,
    borderRadius: radii.xl,
    overflow: "hidden",
  },
  ghostMark: {
    position: "absolute",
    right: -spacing.base,
    top: spacing.sm,
    fontSize: layout.home.statementMarkSize,
    lineHeight: layout.home.statementMarkSize + spacing.sm,
    letterSpacing: typography.letterSpacing.tight,
    opacity: 0.08,
  },
  avatar: {
    width: layout.avatar.size,
    height: layout.avatar.size,
    borderRadius: radii.pill,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: layout.borderWidth,
    borderColor: colors.glassLightBorder,
    backgroundColor: colors.glassLight,
  },
  heroText: {
    gap: spacing.sm,
  },
  heroActions: {
    gap: spacing.sm,
  },
  link: {
    alignSelf: "center",
    minHeight: layout.controlHeight.iconButton,
    justifyContent: "center",
  },
  stats: {
    flexDirection: "row",
    gap: spacing.md,
  },
  block: {
    gap: spacing.md,
  },
  menu: {
    paddingVertical: spacing.xs,
  },
  about: {
    gap: spacing.sm,
  },
});
