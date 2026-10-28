import type { Order } from "./orders-context";

/** Phases an order moves through; only the first is reachable until there is a backend. */
export const orderSteps: readonly { status: Order["status"] | "Packed" | "Shipped" | "Delivered"; description: string }[] = [
  { status: "Processing", description: "We've received your order" },
  { status: "Packed", description: "Your pieces are being packed" },
  { status: "Shipped", description: "On its way to you" },
  { status: "Delivered", description: "Delivered to your address" },
];

export const ordersCopy = {
  title: "Orders",
  subtitle: "Everything you've bought from ZYLO.",
  placedTitle: "Order placed",
  placedDescription: "Thank you. We're getting your order ready.",
  orderNumber: "ORDER NUMBER",
  statusTitle: "Order status",
  itemsTitle: "Items",
  deliveryTitle: "Delivery address",
  paymentTitle: "Payment",
  continueShopping: "CONTINUE SHOPPING",
  allOrders: "ALL ORDERS",
  more: (n: number) => `+${n} more`,
  items: (n: number) => `${n} ${n === 1 ? "item" : "items"}`,
} as const;
