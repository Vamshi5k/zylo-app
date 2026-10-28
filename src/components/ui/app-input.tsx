import { useState, type Ref } from "react";
import {
  Pressable,
  StyleSheet,
  TextInput,
  View,
  type TextInputProps,
} from "react-native";
import { colors, layout, radii, spacing, typography } from "../../../theme";
import { AppText } from "./app-text";
import { Icon } from "./icon";

export type AppInputProps = Omit<TextInputProps, "style"> & {
  label: string;
  error?: string;
  /** Renders a show/hide toggle and hides the text by default. */
  secure?: boolean;
  ref?: Ref<TextInput>;
};

/** Labelled text field with focus, error and password-visibility states. */
export function AppInput({
  label,
  error,
  secure = false,
  ref,
  onFocus,
  onBlur,
  ...rest
}: AppInputProps) {
  const [focused, setFocused] = useState(false);
  const [hidden, setHidden] = useState(secure);

  return (
    <View style={styles.wrapper}>
      <AppText variant="fieldLabel" style={styles.label}>
        {label}
      </AppText>

      <View
        style={[
          styles.field,
          focused && styles.fieldFocused,
          !!error && styles.fieldError,
        ]}
      >
        <TextInput
          ref={ref}
          style={styles.input}
          placeholderTextColor={colors.textTertiary}
          selectionColor={colors.text}
          secureTextEntry={hidden}
          accessibilityLabel={label}
          onFocus={(e) => {
            setFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            onBlur?.(e);
          }}
          {...rest}
        />

        {secure ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={hidden ? "Show password" : "Hide password"}
            hitSlop={spacing.sm}
            onPress={() => setHidden((value) => !value)}
          >
            <Icon
              name={hidden ? "eye-outline" : "eye-off-outline"}
              size={layout.iconSize.md}
              color={colors.textSecondary}
            />
          </Pressable>
        ) : null}
      </View>

      {error ? (
        <AppText
          variant="caption"
          color="danger"
          style={styles.error}
          accessibilityLiveRegion="polite"
        >
          {error}
        </AppText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: spacing.sm,
  },
  label: {
    marginLeft: spacing.xxs,
  },
  field: {
    height: layout.controlHeight.input,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radii.md,
    borderWidth: layout.borderWidth,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  fieldFocused: {
    borderColor: colors.text,
  },
  fieldError: {
    borderColor: colors.danger,
  },
  input: {
    flex: 1,
    height: "100%",
    paddingVertical: 0,
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.md,
    color: colors.text,
  },
  error: {
    marginLeft: spacing.xxs,
  },
});
