import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { AddressValues, PaymentMethodId } from "./checkout-types";

type CheckoutContextValue = {
  address: AddressValues | null;
  payment: PaymentMethodId | null;
  setAddress: (address: AddressValues) => void;
  setPayment: (payment: PaymentMethodId) => void;
  reset: () => void;
};

const CheckoutContext = createContext<CheckoutContextValue | null>(null);

/** Holds the in-progress checkout (address and payment choice) between steps. Never persisted. */
export function CheckoutProvider({ children }: { children: ReactNode }) {
  const [address, setAddress] = useState<AddressValues | null>(null);
  const [payment, setPayment] = useState<PaymentMethodId | null>(null);

  const value = useMemo(
    () => ({
      address,
      payment,
      setAddress,
      setPayment,
      reset: () => {
        setAddress(null);
        setPayment(null);
      },
    }),
    [address, payment],
  );

  return <CheckoutContext.Provider value={value}>{children}</CheckoutContext.Provider>;
}

export function useCheckout() {
  const context = useContext(CheckoutContext);
  if (!context) throw new Error("useCheckout must be used inside <CheckoutProvider>");
  return context;
}
