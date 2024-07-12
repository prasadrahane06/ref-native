import { BACKGOUND_THEME } from "@/constants/Colors";
import { RootState } from "@/redux/store";
import { View, type ViewProps } from "react-native";
import { useSelector } from "react-redux";

export type ThemedViewProps = ViewProps & {};

export function AUIThemedView({ style, ...otherProps }: ThemedViewProps) {
    const theme = useSelector((state: RootState) => state.global.theme);

    return (
        <View
            style={[
                {
                    backgroundColor: BACKGOUND_THEME[theme].backgound,
                },
                style,
            ]}
            {...otherProps}
        />
    );
}
