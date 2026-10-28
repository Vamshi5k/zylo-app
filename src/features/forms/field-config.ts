import type { TextInputProps } from "react-native";

/** Describes one form field so screens render fields from data instead of repeating markup. */
export type FieldConfig<T> = {
  name: keyof T & string;
  label: string;
  placeholder: string;
  secure?: boolean;
  keyboardType?: TextInputProps["keyboardType"];
  autoCapitalize?: TextInputProps["autoCapitalize"];
  autoComplete?: TextInputProps["autoComplete"];
  textContentType?: TextInputProps["textContentType"];
  maxLength?: number;
  rules: object;
};
