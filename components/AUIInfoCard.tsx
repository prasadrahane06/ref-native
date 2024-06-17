import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
    Dimensions,
    StyleSheet,
    TextStyle,
    TouchableOpacity,
    ViewStyle,
} from "react-native";
import { AUIThemedText } from "./common/AUIThemedText";
import { AUIThemedView } from "./common/AUIThemedView";

interface AUIInfoCardProps {
    title: string;
    subtitle: string;
    navigation?: string;
    cardStyle?: ViewStyle;
    titleStyle?: TextStyle;
    subtitleStyle?: TextStyle;
}

const AUIInfoCard: React.FC<AUIInfoCardProps> = ({
    title,
    subtitle,
    navigation,
    cardStyle,
    titleStyle,
    subtitleStyle,
}) => {
    const nav = useNavigation();

    const handlePress = () => {
        if (navigation) {
            nav.navigate(navigation);
        }
    };

    return (
        <AUIThemedView>
            <TouchableOpacity
                style={[
                    styles.card,
                    { width: Dimensions.get("window").width / 2 - 24 },
                    cardStyle,
                ]}
                onPress={handlePress}
                activeOpacity={navigation ? 0.7 : 1}
                disabled={!navigation}
            >
                <AUIThemedText style={[styles.title, titleStyle]}>
                    {title}
                </AUIThemedText>
                <AUIThemedText style={[styles.subtitle, subtitleStyle]}>
                    {subtitle}
                </AUIThemedText>
            </TouchableOpacity>
        </AUIThemedView>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#e5fff1",
        padding: 20,
        borderRadius: 10,
        margin: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
    },
    subtitle: {
        fontSize: 16,
    },
});

export default AUIInfoCard;