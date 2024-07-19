import AUIImage from "@/components/common/AUIImage";
import { APP_THEME, TEXT_THEME } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { ReactNode, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { AUIThemedText } from "./AUIThemedText";
import { AUIThemedView } from "./AUIThemedView";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

interface AccordionProps {
    title: string;
    children: ReactNode;
    icon?: string;
    style?: any;
    innerStyle?: any;
}

const AUIAccordion: React.FC<AccordionProps> = ({ title, children, icon, style, innerStyle }) => {
    const theme = useSelector((state: RootState) => state.global.theme);
    const [expanded, setExpanded] = useState(false);

    return (
        <AUIThemedView style={[styles.accordionContainer, style]}>
            <TouchableOpacity
                style={[
                    styles.accordionHeader,
                    expanded && styles.accordionHeaderExpanded,
                    innerStyle,
                ]}
                onPress={() => setExpanded(!expanded)}
            >
                <AUIThemedView style={styles.accordionTitle}>
                    {icon && <AUIImage style={styles.icon} path={icon} resizeMode="cover" />}
                    <AUIThemedText style={styles.accordionTitleText}>{title}</AUIThemedText>
                </AUIThemedView>

                <Ionicons
                    name={expanded ? "chevron-up-outline" : "chevron-down-outline"}
                    size={24}
                    color={TEXT_THEME[theme].primary}
                />
            </TouchableOpacity>
            {expanded && <AUIThemedView style={styles.accordionContent}>{children}</AUIThemedView>}
        </AUIThemedView>
    );
};

const styles = StyleSheet.create({
    accordionContainer: {
        borderWidth: 1,
        // borderColor: "#5BD894",
        borderRadius: 10,
        marginBottom: 12,
        overflow: "hidden",
        // backgroundColor: APP_THEME.background,
    },
    accordionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 15,
    },
    accordionHeaderExpanded: {
        borderBottomWidth: 2,
        borderBottomColor: "#ddd",
    },
    accordionTitle: {
        flexDirection: "row",
        alignItems: "center",
        // backgroundColor: APP_THEME.background,
    },
    accordionTitleText: {
        marginLeft: 10,
        fontSize: 16,
        fontWeight: "600",
    },
    accordionContent: {
        paddingBottom: 10,
        // backgroundColor: "#f9f9f9",
    },
    icon: {
        width: 24,
        height: 24,
    },
});
export default AUIAccordion;
