import { LinearGradient } from "expo-linear-gradient";
import { ImageBackground, StyleSheet } from "react-native";
import { AUIThemedText } from "./common/AUIThemedText";
import { AUIThemedView } from "./common/AUIThemedView";

const School = ({ title, image, caption }: any) => (
    <AUIThemedView style={styles.schoolContainer}>
        <AUIThemedView style={styles.schoolItem}>
            <ImageBackground style={styles.image} source={image}>
                <LinearGradient
                    colors={[
                        "rgba(10, 21, 47, 0.9)",
                        "rgba(10, 21, 47, 0.6)",
                        "rgba(91, 216, 148, 0.3)",
                        "transparent",
                    ]}
                    style={styles.gradient}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 0, y: 0 }}
                />
                <AUIThemedText style={styles.schoolTitle}>
                    {title}
                </AUIThemedText>
                <AUIThemedText style={styles.schoolCaption}>
                    {caption}
                </AUIThemedText>
            </ImageBackground>
        </AUIThemedView>
    </AUIThemedView>
);

const styles = StyleSheet.create({
    schoolContainer: { paddingVertical: 10, marginRight: 18 },
    schoolItem: {
        width: 270,
        height: 160,
        borderRadius: 10,
        overflow: "hidden",
    },
    schoolTitle: {
        top: 100,
        textAlign: "center",
        color: "white",
        fontSize: 14,
        fontWeight: "600",
    },
    schoolCaption: {
        top: 95,
        textAlign: "center",
        color: "white",
        fontSize: 13,
        fontWeight: "400",
    },
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 7,
    },
    gradient: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        height: "100%",
        borderRadius: 7,
    },
});

export default School;
