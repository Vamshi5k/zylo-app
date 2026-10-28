import { Ionicons } from "@expo/vector-icons";
import type { ComponentProps } from "react";
import type { ColorValue } from "react-native";
import { colors, layout } from "../../../theme";

export type IconName = ComponentProps<typeof Ionicons>["name"];

type IconProps = {
  name: IconName;
  size?: number;
  color?: ColorValue;
};

/** Single icon entry point for the app, so size and color default to theme tokens. */
export function Icon({
  name,
  size = layout.iconSize.lg,
  color = colors.text,
}: IconProps) {
  return <Ionicons name={name} size={size} color={color} />;
}
