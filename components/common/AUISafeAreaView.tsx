import { defaultStyles } from "@/constants/Styles";
import { type ViewProps } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export type ThemedViewProps = ViewProps & {
    style?: any;
    edges?: any;
};

export function AUISafeAreaView({ style, edges = [], ...otherProps }: ThemedViewProps) {
    return (
        <SafeAreaView
            style={[defaultStyles.safeAreaView, style]}
            edges={["left", "right", ...edges]}
            {...otherProps}
        />
    );
}
