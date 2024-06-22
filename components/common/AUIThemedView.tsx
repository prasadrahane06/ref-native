import { COLOR_THEME, TEXT_THEME } from "@/constants/Colors";
import { RootState } from "@/redux/store";
import { View, type ViewProps } from "react-native";
import { useSelector } from "react-redux";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function AUIThemedView({
  style,
  lightColor,
  darkColor,
  ...otherProps
}: ThemedViewProps) {
  const theme = useSelector((state: RootState) => state.global.theme);

  return (
    <View
      style={[
        {
          backgroundColor: COLOR_THEME[theme].backgound,
        },
        style,
      ]}
      {...otherProps}
    />
  );
}
