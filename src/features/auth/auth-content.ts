import type { FieldConfig } from "../forms/field-config";
import { authRules, matchesPassword } from "./auth-validation";
import type { LoginValues, RegisterValues } from "./auth-types";

export const loginFields: FieldConfig<LoginValues>[] = [
  {
    name: "email",
    label: "Email",
    placeholder: "you@example.com",
    keyboardType: "email-address",
    autoCapitalize: "none",
    autoComplete: "email",
    textContentType: "emailAddress",
    rules: authRules.email,
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    secure: true,
    autoCapitalize: "none",
    autoComplete: "current-password",
    textContentType: "password",
    rules: authRules.passwordRequired,
  },
];

export const registerFields: FieldConfig<RegisterValues>[] = [
  {
    name: "name",
    label: "Full name",
    placeholder: "Your name",
    autoCapitalize: "words",
    autoComplete: "name",
    textContentType: "name",
    rules: authRules.name,
  },
  {
    name: "email",
    label: "Email",
    placeholder: "you@example.com",
    keyboardType: "email-address",
    autoCapitalize: "none",
    autoComplete: "email",
    textContentType: "emailAddress",
    rules: authRules.email,
  },
  {
    name: "password",
    label: "Password",
    placeholder: "At least 8 characters",
    secure: true,
    autoCapitalize: "none",
    autoComplete: "new-password",
    textContentType: "newPassword",
    rules: authRules.passwordNew,
  },
  {
    name: "confirmPassword",
    label: "Confirm password",
    placeholder: "Re-enter your password",
    secure: true,
    autoCapitalize: "none",
    autoComplete: "new-password",
    textContentType: "newPassword",
    rules: { required: "Confirm your password", validate: matchesPassword },
  },
];

export const authContent = {
  login: {
    title: "Welcome back",
    subtitle: "Sign in to continue your ZYLO experience.",
    submit: "SIGN IN",
    footerPrompt: "New to ZYLO?",
    footerAction: "Create an account",
  },
  register: {
    title: "Create your account",
    subtitle: "Join ZYLO for considered everyday essentials.",
    submit: "CREATE ACCOUNT",
    footerPrompt: "Already have an account?",
    footerAction: "Sign in",
  },
} as const;
