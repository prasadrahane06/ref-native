import { AUIThemedText } from "@/components/common/AUIThemedText";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import { GLOBAL_TRANSLATION_LABEL } from "@/constants/Properties";
import { RootState } from "@/redux/store";
import { Link } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { I18nManager, StyleSheet, TouchableOpacity, ViewStyle } from "react-native";
import { useSelector } from "react-redux";

interface SectionTitleProps {
    children: React.ReactNode;
    viewAll?: string;
    onViewAllClick?: () => void | boolean;
    style?: ViewStyle;
    titleStyle?: ViewStyle;
}

const SectionTitle: React.FC<SectionTitleProps> = ({
    children,
    viewAll,
    onViewAllClick,
    style,
    titleStyle,
}) => {
    const { t, i18n } = useTranslation();
    const isRTL = useSelector((state: RootState) => state.global.isRTL);

    return (
        <AUIThemedView style={[styles.container, isRTL && { flexDirection: "row-reverse" }, style]}>
            <AUIThemedText style={[styles.title, titleStyle]}>{children}</AUIThemedText>
            {viewAll && (
                <Link href={viewAll} style={styles.viewAll}>
                    {t(GLOBAL_TRANSLATION_LABEL.view_all)}
                </Link>
            )}
            {onViewAllClick && (
                <TouchableOpacity onPress={onViewAllClick}>
                    <AUIThemedText style={styles.viewAll}>
                        {t(GLOBAL_TRANSLATION_LABEL.view_all)}
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
        paddingHorizontal: 15,
        paddingTop: 15,
    },
    title: {
        fontWeight: "bold",
        fontSize: 17,
        letterSpacing: 2,
    },
    viewAll: {
        textDecorationLine: "underline",
        fontSize: 14,
        fontWeight: "300",
        fontFamily: "GilroyMedium",
    },
});

export default SectionTitle;
