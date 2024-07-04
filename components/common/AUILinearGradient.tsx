import { APP_THEME } from "@/constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import { type ViewProps } from "react-native";

export type LinearGradientProps = ViewProps & {
    locations?: number[] | null | undefined;
    colors?: string[];
    start?: any;
    end?: any;
};

export function AUILinearGradient({
    style,
    locations = [0, 1],
    colors = [APP_THEME.primary.first, APP_THEME.secondary.first],
    start,
    end,
    ...otherProps
}: LinearGradientProps) {
    return (
        <LinearGradient
            locations={locations}
            colors={colors}
            style={style}
            start={start || [0, 0]}
            end={end || [1, 1]}
            {...otherProps}
        />
    );
}
