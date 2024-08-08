import { TEXT_THEME, ThemeType } from "@/constants/Colors";
import { RootState } from "@/redux/store";
import { StyleSheet, Text, type TextProps } from "react-native";
import { useSelector } from "react-redux";

export type ThemedTextProps = TextProps & {
    type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
};

export function AUIThemedText({ style, type = "default", ...rest }: ThemedTextProps) {
    const theme = useSelector((state: RootState) => state.global.theme) as ThemeType;

    return (
        <Text
            style={[
                type === "default" ? styles.default : undefined,
                type === "title" ? styles.title : undefined,
                type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
                type === "subtitle" ? styles.subtitle : undefined,
                type === "link" ? styles.link : undefined,
                { fontFamily: "Inter-Black" },
                style,
            ]}
            {...rest}
        />
    );
}

const styles = StyleSheet.create({
    default: {
        fontSize: 16,
        lineHeight: 24,
    },
    defaultSemiBold: {
        fontSize: 16,
        lineHeight: 24,
        fontWeight: "600",
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        lineHeight: 32,
    },
    subtitle: {
        fontSize: 20,
        fontWeight: "bold",
    },
    link: {
        lineHeight: 30,
        fontSize: 16,
        color: "#0a7ea4",
    },
});
