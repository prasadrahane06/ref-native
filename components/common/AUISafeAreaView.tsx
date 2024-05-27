import { defaultStyles } from "@/constants/Styles";
import { View, type ViewProps } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export type ThemedViewProps = ViewProps & {
  style?: any;
};

export function AUISafeAreaView({ style, ...otherProps }: ThemedViewProps) {
  return (
    <SafeAreaView
      style={[defaultStyles.safeAreaView, style]}
      edges={["left", "right"]}
      {...otherProps}
    />
  );
}
