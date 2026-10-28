import type { FieldConfig } from "../forms/field-config";
import type { IconName } from "../../components/ui/icon";
import type { AddressValues, PaymentMethodId } from "./checkout-types";

export const checkoutSteps = ["Address", "Payment", "Review"] as const;

export const addressFields: FieldConfig<AddressValues>[] = [
  {
    name: "fullName",
    label: "Full name",
    placeholder: "Your name",
    autoCapitalize: "words",
    autoComplete: "name",
    textContentType: "name",
    rules: { required: "Enter your name" },
  },
  {
    name: "phone",
    label: "Phone number",
    placeholder: "10-digit mobile number",
    keyboardType: "phone-pad",
    autoComplete: "tel",
    textContentType: "telephoneNumber",
    maxLength: 10,
    rules: {
      required: "Enter your phone number",
      pattern: { value: /^[6-9]\d{9}$/, message: "Enter a valid 10-digit number" },
    },
  },
  {
    name: "line1",
    label: "Address",
    placeholder: "House no., street, area",
    autoCapitalize: "words",
    autoComplete: "street-address",
    textContentType: "streetAddressLine1",
    rules: { required: "Enter your address" },
  },
  {
    name: "city",
    label: "City",
    placeholder: "City",
    autoCapitalize: "words",
    textContentType: "addressCity",
    rules: { required: "Enter your city" },
  },
  {
    name: "pincode",
    label: "Pincode",
    placeholder: "6-digit pincode",
    keyboardType: "number-pad",
    autoComplete: "postal-code",
    textContentType: "postalCode",
    maxLength: 6,
    rules: {
      required: "Enter your pincode",
      pattern: { value: /^\d{6}$/, message: "Enter a valid 6-digit pincode" },
    },
  },
];

export const paymentOptions: readonly {
  id: PaymentMethodId;
  title: string;
  description: string;
  icon: IconName;
}[] = [
  { id: "upi", title: "UPI", description: "Pay with any UPI app", icon: "phone-portrait-outline" },
  { id: "card", title: "Credit / debit card", description: "Visa, Mastercard, RuPay", icon: "card-outline" },
  { id: "cod", title: "Cash on delivery", description: "Pay when your order arrives", icon: "cash-outline" },
];

export const paymentTitles: Record<PaymentMethodId, string> = Object.fromEntries(
  paymentOptions.map((o) => [o.id, o.title]),
) as Record<PaymentMethodId, string>;

export const checkoutCopy = {
  contactTitle: "Contact",
  deliveryTitle: "Delivery",
  orderTotal: "TOTAL",
  itemsLine: (n: number) => `${n} ${n === 1 ? "item" : "items"}`,
  summaryTitle: "Your order",
  methodTitle: "Payment method",
} as const;
