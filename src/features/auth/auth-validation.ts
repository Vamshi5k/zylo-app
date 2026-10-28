import type { Validate } from "react-hook-form";

export const authRules = {
  name: {
    required: "Enter your name",
    minLength: { value: 2, message: "Name must be at least 2 characters" },
    validate: (value: string) =>
      value.trim().length >= 2 || "Name must be at least 2 characters",
  },
  email: {
    required: "Enter your email address",
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Enter a valid email address",
    },
  },
  /** Used on login, where we only check that something was entered. */
  passwordRequired: {
    required: "Enter your password",
  },
  /** Used on signup, where we enforce a minimum strength. */
  passwordNew: {
    required: "Create a password",
    minLength: { value: 8, message: "Use at least 8 characters" },
    validate: (value: string) =>
      (/[A-Za-z]/.test(value) && /\d/.test(value)) ||
      "Include at least one letter and one number",
  },
} as const;

export const matchesPassword: Validate<string, { password: string }> = (
  value,
  { password },
) => value === password || "Passwords don't match";
