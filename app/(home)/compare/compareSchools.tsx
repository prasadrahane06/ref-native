import AUIAccordion from "@/components/common/AUIAccordion";
import AUIImage from "@/components/common/AUIImage";
import { AUIThemedText } from "@/components/common/AUIThemedText";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import { APP_THEME } from "@/constants/Colors";
import { FontAwesome, FontAwesome6, Ionicons } from "@expo/vector-icons";
import { Asset } from "expo-asset";
import { router } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";

const CompareSchools: React.FC = () => {
    const [date, setDate] = useState<Date>(new Date());
    const [show, setShow] = useState<boolean>(false);

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
                        {/* <View style={styles.customShape}>
              <Ionicons name="close" size={20} color="#5BD894" />
            </View> */}
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
                        <AUIThemedView>
                            <AUIThemedView style={styles.row}>
                                <AUIThemedText style={styles.value}>Ownership</AUIThemedText>
                                <AUIThemedView style={styles.rowContainer}>
                                    <AUIThemedText style={styles.label}>Private</AUIThemedText>
                                    <AUIThemedText style={styles.label2}>Private</AUIThemedText>
                                </AUIThemedView>
                            </AUIThemedView>
                            <AUIThemedView style={styles.row}>
                                <AUIThemedText style={styles.value}>School Time</AUIThemedText>
                                <AUIThemedView style={styles.rowContainer}>
                                    <AUIThemedText style={styles.label}>Day School</AUIThemedText>
                                    <AUIThemedText style={styles.label2}>Day School</AUIThemedText>
                                </AUIThemedView>
                            </AUIThemedView>
                            <AUIThemedView style={styles.row2}>
                                <AUIThemedText style={styles.value}>Co-Ed status</AUIThemedText>
                                <AUIThemedView style={styles.rowContainer}>
                                    <AUIThemedText style={styles.label}>Co-Education</AUIThemedText>
                                    <AUIThemedText style={styles.label2}>
                                        Co-Education
                                    </AUIThemedText>
                                </AUIThemedView>
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
                        <AUIThemedView>
                            <AUIThemedView style={styles.row}>
                                <AUIThemedText style={styles.value}>
                                    Language to learn
                                </AUIThemedText>
                                <AUIThemedView style={styles.rowContainer}>
                                    <AUIThemedText style={styles.label}>
                                        English, French
                                    </AUIThemedText>
                                    <AUIThemedText style={styles.label2}>
                                        English, French and Dutch
                                    </AUIThemedText>
                                </AUIThemedView>
                            </AUIThemedView>

                            <AUIThemedView style={styles.row2}>
                                <AUIThemedText style={styles.value}>
                                    {" "}
                                    Acadamic Session
                                </AUIThemedText>
                                <AUIThemedView style={styles.rowContainer}>
                                    <AUIThemedText style={styles.label}>
                                        April to march
                                    </AUIThemedText>
                                    <AUIThemedText style={styles.label2}>June to May</AUIThemedText>
                                </AUIThemedView>
                            </AUIThemedView>
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
                                <FontAwesome6
                                    name="location-crosshairs"
                                    size={30}
                                    color="#5BD894"
                                />
                                <AUIThemedText style={styles.locationButtonText}>
                                    Use my current location
                                </AUIThemedText>
                            </TouchableOpacity>
                        </AUIThemedView>
                    </AUIAccordion>

                    <AUIAccordion
                        title="Fee Structure"
                        icon={
                            Asset.fromModule(
                                require("@/assets/images/compareScreen/compareSchoolsPage/fi_6926264.png")
                            ).uri
                        }
                    >
                        <AUIThemedView>
                            <AUIThemedView style={styles.row}>
                                <AUIThemedText style={styles.value}>
                                    Total cost of new admission
                                </AUIThemedText>
                                <AUIThemedView style={styles.rowContainer}>
                                    <AUIThemedView style={styles.feeLabelContainer}>
                                        <AUIThemedText style={styles.label}>£ 500</AUIThemedText>
                                        <AUIThemedText style={styles.feeLabelLabelText}>
                                            Check Calculation
                                        </AUIThemedText>
                                    </AUIThemedView>
                                    <AUIThemedView style={styles.feeLabelContaine2}>
                                        <AUIThemedText style={styles.label}>£ 700</AUIThemedText>
                                        <AUIThemedText style={styles.feeLabelLabelText2}>
                                            Check Calculation
                                        </AUIThemedText>
                                    </AUIThemedView>
                                </AUIThemedView>
                            </AUIThemedView>

                            <AUIThemedView style={styles.feeRow2}>
                                <AUIThemedText style={styles.value}>
                                    Total Monthly Cost
                                </AUIThemedText>
                                <AUIThemedView style={styles.rowContainer}>
                                    <AUIThemedView style={styles.feeLabelContainer}>
                                        <AUIThemedText style={styles.label}>£ 500</AUIThemedText>
                                        <AUIThemedText style={styles.feeLabelLabelText}>
                                            Check Calculation
                                        </AUIThemedText>
                                    </AUIThemedView>
                                    <AUIThemedView style={styles.feeLabelContaine2}>
                                        <AUIThemedText style={styles.label}>£ 700</AUIThemedText>
                                        <AUIThemedText style={styles.feeLabelLabelText2}>
                                            Check Calculation
                                        </AUIThemedText>
                                    </AUIThemedView>
                                </AUIThemedView>
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
                        <AUIThemedView>
                            <AUIThemedView style={styles.row}>
                                <AUIThemedText style={styles.value}>Campus type</AUIThemedText>
                                <AUIThemedView style={styles.rowContainer}>
                                    <AUIThemedText style={styles.label}>Urban</AUIThemedText>
                                    <AUIThemedText style={styles.label2}>Urban</AUIThemedText>
                                </AUIThemedView>
                            </AUIThemedView>

                            <AUIThemedView style={styles.row}>
                                <AUIThemedText style={styles.value}>Total facilities</AUIThemedText>
                                <AUIThemedView style={styles.rowContainer}>
                                    <AUIThemedText style={styles.label}>3</AUIThemedText>
                                    <AUIThemedText style={styles.label2}>5</AUIThemedText>
                                </AUIThemedView>
                            </AUIThemedView>

                            <AUIThemedView style={styles.row}>
                                <AUIThemedText style={styles.value}>Total Faculty</AUIThemedText>
                                <AUIThemedView style={styles.rowContainer}>
                                    <AUIThemedText style={styles.label}>4</AUIThemedText>
                                    <AUIThemedText style={styles.label2}>6</AUIThemedText>
                                </AUIThemedView>
                            </AUIThemedView>

                            <AUIThemedView style={styles.row}>
                                <AUIThemedText style={styles.value}>Number of Seats</AUIThemedText>
                                <AUIThemedView style={styles.rowContainer}>
                                    <AUIThemedText style={styles.label}>40</AUIThemedText>
                                    <AUIThemedText style={styles.label2}>70</AUIThemedText>
                                </AUIThemedView>
                            </AUIThemedView>

                            <AUIThemedView style={styles.row2}>
                                <AUIThemedText style={styles.value}>
                                    Form availability
                                </AUIThemedText>
                                <AUIThemedView style={styles.rowContainer}>
                                    <AUIThemedText style={styles.label}>Online</AUIThemedText>
                                    <AUIThemedText style={styles.label2}>Online</AUIThemedText>
                                </AUIThemedView>
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
                        <AUIThemedView>
                            <AUIThemedView style={styles.admissionRow1}>
                                <AUIThemedText style={styles.acadamicSessionText}>
                                    Select your acadamic session
                                </AUIThemedText>
                                <AUIThemedView style={styles.datePickerRowContainer}>
                                    <TouchableOpacity
                                        onPress={() => setShow(true)}
                                        style={styles.datePickerContainer}
                                    >
                                        <AUIThemedText style={styles.dateText}>
                                            {date.toLocaleDateString()}
                                        </AUIThemedText>
                                        <FontAwesome name="calendar" style={styles.calenderIcon} />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => setShow(true)}
                                        style={styles.datePickerContainer}
                                    >
                                        <AUIThemedText style={styles.dateText}>
                                            {date.toLocaleDateString()}
                                        </AUIThemedText>
                                        <FontAwesome name="calendar" style={styles.calenderIcon} />
                                    </TouchableOpacity>
                                </AUIThemedView>
                                <AUIThemedText style={styles.label2}></AUIThemedText>
                            </AUIThemedView>
                            <AUIThemedView style={styles.row}>
                                <AUIThemedText style={styles.value}>Age eligibility</AUIThemedText>
                                <AUIThemedView style={styles.rowContainer}>
                                    <AUIThemedText style={styles.label}>12 to 40</AUIThemedText>
                                    <AUIThemedText style={styles.label2}>12 to 40+</AUIThemedText>
                                </AUIThemedView>
                            </AUIThemedView>

                            <AUIThemedView style={styles.row}>
                                <AUIThemedText style={styles.value}>Total Faculty</AUIThemedText>
                                <AUIThemedView style={styles.rowContainer}>
                                    <AUIThemedText style={styles.label}>4</AUIThemedText>
                                    <AUIThemedText style={styles.label2}>6</AUIThemedText>
                                </AUIThemedView>
                            </AUIThemedView>

                            <AUIThemedView style={styles.row2}>
                                <AUIThemedText style={styles.value}>Number of seats</AUIThemedText>
                                <AUIThemedView style={styles.rowContainer}>
                                    <AUIThemedText style={styles.label}>40</AUIThemedText>
                                    <AUIThemedText style={styles.label2}>70</AUIThemedText>
                                </AUIThemedView>
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
        // padding: 4,
        paddingVertical: 5,
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
    rowContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    label: {
        flex: 1,
        textAlign: "center",
        fontWeight: "500",
        fontSize: 14,
        marginRight: 50,
        paddingVertical: 3,
    },
    label2: {
        flex: 1,
        textAlign: "center",
        fontWeight: "500",
        fontSize: 14,
        marginLeft: 50,
        paddingVertical: 3,
    },
    feeLabelContainer: {
        flex: 1,
        flexDirection: "column",
        textAlign: "center",
        fontWeight: "500",
        fontSize: 14,
        marginRight: 50,
        paddingVertical: 3,
    },
    feeLabelContaine2: {
        flex: 1,
        flexDirection: "column",
        textAlign: "center",
        fontWeight: "500",
        fontSize: 14,
        marginLeft: 50,
        paddingVertical: 3,
    },
    feeLabelLabelText: {
        flex: 1,
        textAlign: "center",
        fontWeight: "500",
        color: "#5BD894",
        fontSize: 14,
        // marginRight: 50,
        paddingVertical: 3,
    },
    feeLabelLabelText2: {
        flex: 1,
        textAlign: "center",
        fontWeight: "500",
        color: "#5BD894",
        fontSize: 14,
        // marginRight: 50,
        paddingVertical: 3,
    },
    value: {
        textAlign: "center",
        color: "#9DA1AC",
        fontWeight: "400",
        fontSize: 14,
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
    admissionRow1: {
        flexDirection: "column",
        justifyContent: "space-between",
        borderBottomWidth: 2,
        borderBottomColor: "#ddd",
        padding: 5,
        paddingHorizontal: 10,
    },
    row: {
        flexDirection: "column",
        justifyContent: "space-between",
        borderBottomWidth: 2,
        borderBottomColor: "#ddd",
        padding: 5,
    },
    row2: {
        flexDirection: "column",
        justifyContent: "space-between",
    },
    acadamicSessionText: {
        textAlign: "center",
        color: "#9DA1AC",
        fontWeight: "400",
        fontSize: 14,
    },
    datePickerRowContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    datePickerContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderWidth: 1,
        borderColor: "#9DA1AC",
        borderRadius: 3,
        paddingHorizontal: 7,
        paddingVertical: 1,
        marginTop: 10,
    },
    dateText: {
        color: "#9DA1AC",
        fontWeight: "400",
        fontSize: 14,
        paddingHorizontal: 6,
    },
    calenderIcon: { fontSize: 14, color: "#5BD894" },
    feeRow2: {
        flexDirection: "column",
        justifyContent: "space-between",
    },
});

export default CompareSchools;
