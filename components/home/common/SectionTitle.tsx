import { AUIThemedText } from "@/components/common/AUIThemedText";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import { TEXT_THEME } from "@/constants/Colors";
import { GLOBAL_TRANSLATION_LABEL } from "@/constants/Properties";
import { RootState } from "@/redux/store";
import { Link } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, TextStyle, TouchableOpacity, ViewStyle } from "react-native";
import { useSelector } from "react-redux";

interface SectionTitleProps {
    children: React.ReactNode;
    viewAll?: string;
    onViewAllClick?: () => void | boolean;
    style?: ViewStyle;
    titleStyle?: TextStyle;
    viewAllVisible?: boolean;
    params?: { from: string };
}

const SectionTitle: React.FC<SectionTitleProps> = ({
    children,
    viewAll,
    onViewAllClick,
    style,
    titleStyle,
    viewAllVisible,
    params,
}) => {
    const { t } = useTranslation();
    const isRTL = useSelector((state: RootState) => state.global.isRTL);
    const theme = useSelector((state: RootState) => state.global.theme);
    const [showViewAll, setShowViewAll] = React.useState(false);

    return (
        <AUIThemedView style={[styles.container, isRTL && { flexDirection: "row-reverse" }, style]}>
            <AUIThemedText
                numberOfLines={1}
                ellipsizeMode="tail"
                style={[styles.title, titleStyle]}
            >
                {children}
            </AUIThemedText>
            {viewAll && (
                <Link
                    // @ts-ignore
                    href={{ pathname: viewAll, params: params }}
                    style={[styles.viewAll, { color: TEXT_THEME[theme].primary }]}
                >
                    {t(GLOBAL_TRANSLATION_LABEL.view_all)}
                </Link>
            )}
            {viewAllVisible && onViewAllClick && (
                <TouchableOpacity
                    onPress={() => {
                        onViewAllClick();
                        setShowViewAll((prev) => !prev);
                    }}
                >
                    <AUIThemedText style={styles.viewAll}>
                        {showViewAll ? t("view_less") : t("view_all")}
                    </AUIThemedText>
                </TouchableOpacity>
            )}
        </AUIThemedView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: 15,
        marginTop: 15,
    },
    title: {
        fontWeight: "bold",
        fontSize: 17,
        letterSpacing: 2,
    },
    viewAll: {
        textDecorationLine: "underline",
        fontSize: 14,
        fontWeight: "500",
        marginHorizontal: 8,
    },
});

export default SectionTitle;
