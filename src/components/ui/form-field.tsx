import type { Ref } from "react";
import type { TextInput } from "react-native";
import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
  type RegisterOptions,
} from "react-hook-form";
import { AppInput, type AppInputProps } from "./app-input";

type FormFieldProps<T extends FieldValues> = Omit<
  AppInputProps,
  "value" | "onChangeText" | "onBlur" | "error" | "ref"
> & {
  control: Control<T>;
  name: FieldPath<T>;
  rules?: RegisterOptions<T, FieldPath<T>>;
};

/** Connects an `AppInput` to react-hook-form, including its error message and ref for `setFocus`. */
export function FormField<T extends FieldValues>({
  control,
  name,
  rules,
  ...inputProps
}: FormFieldProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field, fieldState }) => (
        <AppInput
          {...inputProps}
          ref={field.ref as Ref<TextInput>}
          value={field.value}
          onChangeText={field.onChange}
          onBlur={field.onBlur}
          error={fieldState.error?.message}
        />
      )}
    />
  );
}
