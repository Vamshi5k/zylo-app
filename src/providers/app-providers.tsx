import type { ReactNode } from "react";
import { CartProvider } from "../features/cart/cart-context";
import { CheckoutProvider } from "../features/checkout/checkout-context";
import { OrdersProvider } from "../features/orders/orders-context";
import { WishlistProvider } from "../features/wishlist/wishlist-context";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      <WishlistProvider>
        <CheckoutProvider>
          <OrdersProvider>{children}</OrdersProvider>
        </CheckoutProvider>
      </WishlistProvider>
    </CartProvider>
  );
}
