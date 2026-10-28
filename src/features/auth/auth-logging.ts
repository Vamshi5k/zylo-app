import type { LoginValues, RegisterValues } from "./auth-types";

/**
 * Development-only: logs a submitted form without credentials.
 * Passwords are never included; remove this once a real backend exists.
 */
export function logAuthSubmission(
  form: "login" | "register",
  values: LoginValues | RegisterValues,
) {
  const { email } = values;
  const name = "name" in values ? values.name : undefined;

  if (__DEV__) {
    console.log(`[auth:${form}] submitted`, { name, email });
  }
}
