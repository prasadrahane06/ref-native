import { APP_THEME } from "@/constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import { View, type ViewProps } from "react-native";

export type LinearGradientProps = ViewProps & {
  locations?: number[] | null | undefined;
  colors?: string[];
};

export function AUILinearGradient({
  style,
  locations = [0, 1],
  colors = [APP_THEME.primary.first, APP_THEME.secondary.first],
  ...otherProps
}: LinearGradientProps) {
  return (
    <LinearGradient
      locations={locations}
      colors={colors}
      style={style}
      start={[0, 0]}
      end={[1, 1]}
      {...otherProps}
    />
  );
}
