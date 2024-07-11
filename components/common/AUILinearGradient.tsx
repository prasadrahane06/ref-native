import { APP_THEME } from "@/constants/Colors";
import { RootState } from "@/redux/store";
import { LinearGradient } from "expo-linear-gradient";
import { type ViewProps } from "react-native";
import { useSelector } from "react-redux";

export type LinearGradientProps = ViewProps & {
    locations?: number[] | null | undefined;
    colors?: string[];
    start?: any;
    end?: any;
};

export function AUILinearGradient({
    style,
    locations = [0, 1],
    start,
    end,
    ...otherProps
}: LinearGradientProps) {
    const theme = useSelector((state: RootState) => state.global.theme);

    return (
        <LinearGradient
            locations={locations}
            colors={[APP_THEME[theme].primary.first, APP_THEME[theme].secondary.first]}
            style={style}
            start={start || [0, 0]}
            end={end || [1, 1]}
            {...otherProps}
        />
    );
}
