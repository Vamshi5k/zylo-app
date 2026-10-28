import { IconButton } from "../../../components/ui/icon-button";
import { colors, layout } from "../../../../theme";
import { useWishlist } from "../../wishlist/wishlist-context";
import type { Product } from "../catalog-data";

type WishlistButtonProps = {
  product: Product;
  /** Smaller button for use on top of product tiles. */
  compact?: boolean;
  tone?: "default" | "glass";
};

/** Heart toggle bound to the shared wishlist state. */
export function WishlistButton({ product, compact = false, tone = "default" }: WishlistButtonProps) {
  const wishlist = useWishlist();
  const saved = wishlist.has(product.id);

  return (
    <IconButton
      icon={saved ? "heart" : "heart-outline"}
      label={saved ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
      color={saved ? colors.danger : undefined}
      tone={tone}
      size={compact ? layout.stepper.buttonSize : layout.controlHeight.iconButton}
      filled={tone === "default"}
      onPress={() => wishlist.toggle(product.id)}
    />
  );
}
