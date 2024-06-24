import AUIAccordion from "@/components/common/AUIAccordion";
import AUIImage from "@/components/common/AUIImage";
import { AUIThemedText } from "@/components/common/AUIThemedText";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import { APP_THEME } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Asset } from "expo-asset";
import { router } from "expo-router";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";

const CompareSchools: React.FC = () => {
    return (
        <ScrollView>
            <AUIThemedView style={styles.container}>
                <AUIThemedView style={styles.cardContainer}>
                    <TouchableOpacity style={styles.customCard}>
                        <View style={styles.imageContainer}>
                            <AUIImage
                                style={styles.image}
                                path={
                                    Asset.fromModule(
                                        require("@/assets/images/compareScreen/compareSchoolsPage/Rectangle 155.png")
                                    ).uri
                                }
                                resizeMode="cover"
                            />
                        </View>
                        <View style={styles.textContainer}>
                            <AUIThemedText style={styles.cardTitle}>
                                The Manchester Schools
                            </AUIThemedText>
                            <AUIThemedText style={styles.cardSubtitle}>
                                East, Academy The East, 60 Grey Mare Ln, ...
                            </AUIThemedText>
                        </View>
                        <View style={styles.customShape}>
                            <Ionicons name="close" size={20} color="#5BD894" />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.card}
                        onPress={() =>
                            router.push({
                                pathname: `(home)/compare/searchSchool`,
                            })
                        }
                    >
                        <Ionicons name="add-circle-outline" size={50} color="#5BD894" />
                        <AUIThemedText style={styles.cardText}>Add School</AUIThemedText>
                    </TouchableOpacity>
                </AUIThemedView>

                <AUIThemedView style={styles.accordionSection}>
                    <AUIAccordion
                        title="School Type"
                        icon={
                            Asset.fromModule(
                                require("@/assets/images/compareScreen/compareSchoolsPage/Group 36763.png")
                            ).uri
                        }
                    >
                        <AUIThemedView style={styles.schoolTypelabelContainer}>
                            <AUIThemedView style={styles.row}>
                                <AUIThemedText style={styles.label}>Private</AUIThemedText>
                                <AUIThemedText style={styles.value}>Ownership</AUIThemedText>
                                <AUIThemedText style={styles.label2}>Private</AUIThemedText>
                            </AUIThemedView>
                            <AUIThemedView style={styles.row}>
                                <AUIThemedText style={styles.label}>Day School</AUIThemedText>
                                <AUIThemedText style={styles.value}>School Time</AUIThemedText>
                                <AUIThemedText style={styles.label2}>Day School</AUIThemedText>
                            </AUIThemedView>
                            <AUIThemedView style={styles.row3}>
                                <AUIThemedText style={styles.label}>Co-Education</AUIThemedText>
                                <AUIThemedText style={styles.value}>Co-Ed status</AUIThemedText>
                                <AUIThemedText style={styles.label2}>Co-Education</AUIThemedText>
                            </AUIThemedView>
                        </AUIThemedView>
                    </AUIAccordion>

                    <AUIAccordion
                        title="Academics"
                        icon={
                            Asset.fromModule(
                                require("@/assets/images/compareScreen/compareSchoolsPage/Group (2).png")
                            ).uri
                        }
                    >
                        <AUIThemedView style={styles.schoolTypelabelContainer}>
                            <AUIThemedView style={styles.row}>
                                <AUIThemedText style={styles.label}>English, French</AUIThemedText>
                                <AUIThemedText style={styles.value}>
                                    Language to learn
                                </AUIThemedText>
                                <AUIThemedText style={styles.label2}>
                                    English, French and Dutch
                                </AUIThemedText>
                            </AUIThemedView>
                            <AUIThemedView style={styles.row3}>
                                <AUIThemedText style={styles.label}>April to march</AUIThemedText>
                                <AUIThemedText style={styles.value}>Acadamic Session</AUIThemedText>
                                <AUIThemedText style={styles.academicsLabel2}>
                                    June to May
                                </AUIThemedText>
                            </AUIThemedView>
                            {/* <AUIThemedView style={styles.row3}>
                <AUIThemedText style={styles.label}>Co-Education</AUIThemedText>
                <AUIThemedText style={styles.value}>Co-Ed status</AUIThemedText>
                <AUIThemedText style={styles.label2}>
                  Co-Education
                </AUIThemedText>
              </AUIThemedView> */}
                        </AUIThemedView>
                    </AUIAccordion>

                    <AUIAccordion
                        title="Distance"
                        icon={
                            Asset.fromModule(
                                require("@/assets/images/compareScreen/compareSchoolsPage/Layer 2.png")
                            ).uri
                        }
                    >
                        <AUIThemedView style={styles.academicsContainer}>
                            <AUIThemedText style={styles.descriptionText}>
                                Please select your location to calculate the distance
                            </AUIThemedText>
                            <TouchableOpacity style={styles.locationButton}>
                                <Ionicons name="locate-outline" size={24} color="#5BD894" />
                                <AUIThemedText style={styles.locationButtonText}>
                                    Use my current location
                                </AUIThemedText>
                            </TouchableOpacity>
                        </AUIThemedView>
                    </AUIAccordion>

                    <AUIAccordion title="Fee Structure">
                        <AUIThemedView style={styles.schoolTypelabelContainer}>
                            <AUIThemedView style={styles.row}>
                                <AUIThemedText style={styles.label}>€ 500</AUIThemedText>
                                <AUIThemedText style={styles.value}>
                                    Total cost of new admission
                                </AUIThemedText>
                                <AUIThemedText style={styles.label2}>€ 700</AUIThemedText>
                            </AUIThemedView>
                            <AUIThemedView style={styles.row3}>
                                <AUIThemedText style={styles.label}></AUIThemedText>
                                <AUIThemedText style={styles.value}>
                                    Total monthly cost
                                </AUIThemedText>
                                <AUIThemedText style={styles.label2}>€ 700</AUIThemedText>
                            </AUIThemedView>
                        </AUIThemedView>
                    </AUIAccordion>

                    <AUIAccordion
                        title="Campus and Facility"
                        icon={
                            Asset.fromModule(
                                require("@/assets/images/compareScreen/compareSchoolsPage/fi_8716577.png")
                            ).uri
                        }
                    >
                        <AUIThemedView style={styles.schoolTypelabelContainer}>
                            <AUIThemedView style={styles.row}>
                                <AUIThemedText style={styles.label}>Private</AUIThemedText>
                                <AUIThemedText style={styles.value}>Ownership</AUIThemedText>
                                <AUIThemedText style={styles.label2}>Private</AUIThemedText>
                            </AUIThemedView>
                            <AUIThemedView style={styles.row}>
                                <AUIThemedText style={styles.label}>Day School</AUIThemedText>
                                <AUIThemedText style={styles.value}>School Time</AUIThemedText>
                                <AUIThemedText style={styles.label2}>Day School</AUIThemedText>
                            </AUIThemedView>
                            <AUIThemedView style={styles.row3}>
                                <AUIThemedText style={styles.label}>Co-Education</AUIThemedText>
                                <AUIThemedText style={styles.value}>Co-Ed status</AUIThemedText>
                                <AUIThemedText style={styles.label2}>Co-Education</AUIThemedText>
                            </AUIThemedView>
                        </AUIThemedView>
                    </AUIAccordion>

                    <AUIAccordion
                        title="Admission Criteria and Eligibility"
                        icon={
                            Asset.fromModule(
                                require("@/assets/images/compareScreen/compareSchoolsPage/fi_6419828.png")
                            ).uri
                        }
                    >
                        <AUIThemedView style={styles.schoolTypelabelContainer}>
                            <AUIThemedView style={styles.row}>
                                <AUIThemedText style={styles.label}>Private</AUIThemedText>
                                <AUIThemedText style={styles.value}>Ownership</AUIThemedText>
                                <AUIThemedText style={styles.label2}>Private</AUIThemedText>
                            </AUIThemedView>
                            <AUIThemedView style={styles.row}>
                                <AUIThemedText style={styles.label}>Day School</AUIThemedText>
                                <AUIThemedText style={styles.value}>School Time</AUIThemedText>
                                <AUIThemedText style={styles.label2}>Day School</AUIThemedText>
                            </AUIThemedView>
                            <AUIThemedView style={styles.row3}>
                                <AUIThemedText style={styles.label}>Co-Education</AUIThemedText>
                                <AUIThemedText style={styles.value}>Co-Ed status</AUIThemedText>
                                <AUIThemedText style={styles.label2}>Co-Education</AUIThemedText>
                            </AUIThemedView>
                        </AUIThemedView>
                    </AUIAccordion>
                </AUIThemedView>
            </AUIThemedView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        padding: 15,
        backgroundColor: APP_THEME.background,
    },
    cardContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        marginBottom: 20,
        backgroundColor: APP_THEME.background,
    },
    customCard: {
        width: "48%",
        height: 160,
        justifyContent: "flex-start",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 15,
        overflow: "hidden",
        backgroundColor: "#fff",
    },
    imageContainer: {
        width: "100%",
        height: "60%",
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        width: "100%",
        height: "100%",
    },
    textContainer: {
        width: "100%",
        padding: 5,
        alignItems: "center",
    },
    cardTitle: {
        fontSize: 12,
        fontWeight: "bold",
        textAlign: "center",
    },
    cardSubtitle: {
        fontSize: 14,
        fontWeight: "400",
        lineHeight: 15,
        color: "#666",
        textAlign: "center",
    },
    customShape: {
        position: "absolute",
        bottom: -10,
        zIndex: 2,
        width: 30,
        height: 30,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#5BD894",
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
    },
    card: {
        width: "48%",
        height: 160,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 10,
        padding: 10,
    },
    cardText: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: "400",
    },
    accordionSection: {
        width: "100%",
    },
    schoolTypelabelContainer: {
        width: "100%",
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 10,
        borderBottomWidth: 2,
        borderBottomColor: "#ddd",
    },
    row3: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 10,
    },
    label: {
        flex: 1,
        textAlign: "left",
        fontWeight: "500",
        fontSize: 12,
    },
    value: {
        textAlign: "center",
        color: "#9DA1AC",
        fontWeight: "500",
        fontSize: 12,
    },
    label2: { flex: 1, textAlign: "right", fontWeight: "500", fontSize: 12 },
    academicsLabel2: {
        flex: 1,
        textAlign: "right",
        fontWeight: "500",
        fontSize: 12,
    },
    academicsContainer: {
        padding: 3,
        alignItems: "center",
    },
    descriptionText: {
        fontSize: 14,
        color: "#000",
        marginBottom: 20,
        textAlign: "center",
    },
    locationButton: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: "#5BD894",
        borderRadius: 8,
    },
    locationButtonText: {
        marginLeft: 10,
        fontSize: 16,
        color: "#5BD894",
    },
});

export default CompareSchools;
