import { Pressable, StyleSheet, TextInput, View } from "react-native";
import { colors, layout, radii, spacing, typography } from "../../../theme";
import { Icon } from "./icon";

type SearchInputProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  autoFocus?: boolean;
};

/** Editable counterpart of `SearchPill`, with a clear button. */
export function SearchInput({ value, onChangeText, placeholder, autoFocus }: SearchInputProps) {
  return (
    <View style={styles.pill}>
      <Icon name="search-outline" size={layout.iconSize.md} color={colors.textSecondary} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textTertiary}
        selectionColor={colors.text}
        autoFocus={autoFocus}
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="search"
        accessibilityLabel="Search"
        style={styles.input}
      />
      {value ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Clear search"
          hitSlop={spacing.sm}
          onPress={() => onChangeText("")}
        >
          <Icon name="close-circle" size={layout.iconSize.md} color={colors.textTertiary} />
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    height: layout.controlHeight.input,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radii.pill,
    borderWidth: layout.borderWidth,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  input: {
    flex: 1,
    height: "100%",
    paddingVertical: 0,
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.md,
    color: colors.text,
  },
});
