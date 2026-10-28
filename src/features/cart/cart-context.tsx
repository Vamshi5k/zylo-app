import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { commerce } from "../../constants/commerce";
import { getProduct, type Product } from "../catalog/catalog-data";

export type CartLine = { productId: string; size: string; quantity: number };

export type DetailedCartLine = CartLine & { product: Product; lineTotal: number };

type CartContextValue = {
  lines: readonly DetailedCartLine[];
  count: number;
  subtotal: number;
  delivery: number;
  total: number;
  add: (productId: string, size: string, quantity?: number) => void;
  setQuantity: (productId: string, size: string, quantity: number) => void;
  remove: (productId: string, size: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function deliveryFor(subtotal: number) {
  return subtotal === 0 || subtotal >= commerce.freeDeliveryThreshold ? 0 : commerce.deliveryFee;
}

const same = (a: CartLine, productId: string, size: string) =>
  a.productId === productId && a.size === size;

export function CartProvider({ children }: { children: ReactNode }) {
  const [raw, setRaw] = useState<CartLine[]>([]);

  const add = useCallback((productId: string, size: string, quantity = 1) => {
    setRaw((current) => {
      const existing = current.find((l) => same(l, productId, size));
      if (!existing) return [...current, { productId, size, quantity }];
      return current.map((l) =>
        l === existing
          ? { ...l, quantity: Math.min(l.quantity + quantity, commerce.maxQuantity) }
          : l,
      );
    });
  }, []);

  const setQuantity = useCallback((productId: string, size: string, quantity: number) => {
    setRaw((current) =>
      quantity <= 0
        ? current.filter((l) => !same(l, productId, size))
        : current.map((l) =>
            same(l, productId, size)
              ? { ...l, quantity: Math.min(quantity, commerce.maxQuantity) }
              : l,
          ),
    );
  }, []);

  const remove = useCallback((productId: string, size: string) => {
    setRaw((current) => current.filter((l) => !same(l, productId, size)));
  }, []);

  const clear = useCallback(() => setRaw([]), []);

  const value = useMemo<CartContextValue>(() => {
    const lines = raw.flatMap((line) => {
      const product = getProduct(line.productId);
      return product ? [{ ...line, product, lineTotal: product.price * line.quantity }] : [];
    });
    const subtotal = lines.reduce((sum, l) => sum + l.lineTotal, 0);
    const delivery = deliveryFor(subtotal);
    return {
      lines,
      count: lines.reduce((sum, l) => sum + l.quantity, 0),
      subtotal,
      delivery,
      total: subtotal + delivery,
      add,
      setQuantity,
      remove,
      clear,
    };
  }, [raw, add, setQuantity, remove, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside <CartProvider>");
  return context;
}
