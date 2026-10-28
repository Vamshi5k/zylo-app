import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import type { AddressValues, PaymentMethodId } from "../checkout/checkout-types";

export type OrderLine = { productId: string; name: string; size: string; quantity: number; price: number };

export type Order = {
  id: string;
  createdAt: string;
  status: "Processing";
  lines: readonly OrderLine[];
  subtotal: number;
  delivery: number;
  total: number;
  address: AddressValues;
  payment: PaymentMethodId;
};

type NewOrder = Omit<Order, "id" | "createdAt" | "status">;

type OrdersContextValue = {
  orders: readonly Order[];
  placeOrder: (order: NewOrder) => string;
  getOrder: (id: string) => Order | undefined;
};

const OrdersContext = createContext<OrdersContextValue | null>(null);

const FIRST_ORDER_NUMBER = 1001;

/** Local, in-memory orders for UI development; there is no backend yet. */
export function OrdersProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);

  const placeOrder = useCallback(
    (order: NewOrder) => {
      const id = `ZY${FIRST_ORDER_NUMBER + orders.length}`;
      setOrders((current) => [
        { ...order, id, createdAt: new Date().toISOString(), status: "Processing" },
        ...current,
      ]);
      return id;
    },
    [orders.length],
  );

  const value = useMemo<OrdersContextValue>(
    () => ({ orders, placeOrder, getOrder: (id) => orders.find((o) => o.id === id) }),
    [orders, placeOrder],
  );

  return <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>;
}

export function useOrders() {
  const context = useContext(OrdersContext);
  if (!context) throw new Error("useOrders must be used inside <OrdersProvider>");
  return context;
}
