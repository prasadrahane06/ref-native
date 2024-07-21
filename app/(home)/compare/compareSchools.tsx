import useAxios from "@/app/services/axiosClient";
import AUIAccordion from "@/components/common/AUIAccordion";
import AUIImage from "@/components/common/AUIImage";
import { AUIThemedText } from "@/components/common/AUIThemedText";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import { API_URL } from "@/constants/urlProperties";
import { useLangTransformSelector } from "@/customHooks/useLangTransformSelector";
import { RootState } from "@/redux/store";
import { Ionicons } from "@expo/vector-icons";
import { Asset } from "expo-asset";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Platform, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
const CompareSchools: React.FC = () => {
    // const [date1, setDate1] = useState<Date>(new Date());
    // const [show1, setShow1] = useState<boolean>(false);
    // const [date2, setDate2] = useState<Date>(new Date());
    // const [show2, setShow2] = useState<boolean>(false);
    const compareSchool1 = useLangTransformSelector((state: RootState) => state.api.compareSchool1);
    const compareSchool2 = useLangTransformSelector((state: RootState) => state.api.compareSchool2);
    const [school1, setSchool1] = useState<any>();
    const [school2, setSchool2] = useState<any>();
    const { post } = useAxios();
    useEffect(() => {
        // Check if both compareSchool1 and compareSchool2 have IDs before making the API call
        if (compareSchool1 && compareSchool1.id && compareSchool2 && compareSchool2.id) {
            post(API_URL.schoolComparison, {
                schoolId1: compareSchool1.id,
                schoolId2: compareSchool2.id,
            })
                .then((response) => {
                    // Handle response
                    setSchool1(response.docs[0]);
                    setSchool2(response.docs[1]);
                    // Update state or perform other actions based on response
                })
                .catch((error) => {
                    // Handle error
                    console.error("Comparison API error:", error);
                    // Handle error state or show error message
                });
        } else {
            console.log("Missing school ID(s), cannot compare.");
            // Handle case where one or both school IDs are missing
        }
    }, [compareSchool1, compareSchool2]); // useEffect will trigger whenever compareSchool1 or compareSchool2 changes
    // const onChange1 = (event: any, selectedDate: Date | undefined) => {
    //     const currentDate = selectedDate || date1;
    //     setShow1(Platform.OS === "ios");
    //     setDate1(currentDate);
    // };
    // const onChange2 = (event: any, selectedDate: Date | undefined) => {
    //     const currentDate = selectedDate || date2;
    //     setShow2(Platform.OS === "ios");
    //     setDate2(currentDate);
    // };
    return (
        <AUIThemedView style={styles.outerContainer}>
            <ScrollView>
                <AUIThemedView style={styles.container}>
                    <AUIThemedView style={styles.cardContainer}>
                        <TouchableOpacity style={styles.customCard}>
                            <View style={styles.imageContainer}>
                                <AUIImage
                                    style={styles.image}
                                    path={
                                        school1?.banner ||
                                        Asset.fromModule(
                                            require("@/assets/images/compareScreen/compareSchoolsPage/rectangle_155.png")
                                        ).uri
                                    }
                                    resizeMode="cover"
                                />
                            </View>
                            <View style={styles.textContainer}>
                                <AUIThemedText style={styles.cardTitle}>
                                    {school1?.name}
                                </AUIThemedText>
                            </View>
                            {/* <View style={styles.customShape}>
              <Ionicons name="close" size={20} color="#5BD894" />
            </View> */}
                        </TouchableOpacity>
                        {compareSchool2 ? (
                            <TouchableOpacity style={styles.customCard}>
                                <View style={styles.imageContainer}>
                                    <AUIImage
                                        style={styles.image}
                                        path={
                                            school2?.banner ||
                                            Asset.fromModule(
                                                require("@/assets/images/compareScreen/compareSchoolsPage/rectangle_155.png")
                                            ).uri
                                        }
                                        resizeMode="cover"
                                    />
                                </View>
                                <View style={styles.textContainer}>
                                    <AUIThemedText style={styles.cardTitle}>
                                        {school2?.name}
                                    </AUIThemedText>
                                </View>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity
                                style={styles.card}
                                onPress={() =>
                                    router.push({
                                        pathname: "(home)/compare/searchSchool",
                                    })
                                }
                            >
                                <Ionicons name="add-circle-outline" size={50} color="#5BD894" />
                                <AUIThemedText style={styles.cardText}>Add School</AUIThemedText>
                            </TouchableOpacity>
                        )}
                    </AUIThemedView>
                    <AUIThemedView style={styles.accordionSection}>
                        <AUIAccordion
                            title="School Infomtion"
                            style={styles.AUIAccordion}
                            icon={
                                Asset.fromModule(
                                    require("@/assets/images/compareScreen/compareSchoolsPage/group_36763.png")
                                ).uri
                            }
                        >
                            <AUIThemedView>
                                <AUIThemedView style={styles.row}>
                                    <AUIThemedText style={styles.value}>information</AUIThemedText>
                                    <AUIThemedView style={styles.rowContainer}>
                                        <AUIThemedText style={styles.label}>
                                            {school1?.description || "--"}
                                        </AUIThemedText>
                                        <AUIThemedText style={styles.label2}>
                                            {school2?.description || "--"}
                                        </AUIThemedText>
                                    </AUIThemedView>
                                </AUIThemedView>
                                <AUIThemedView style={styles.row}>
                                    <AUIThemedText style={styles.value}>
                                        have Mail support{" "}
                                    </AUIThemedText>
                                    <AUIThemedView style={styles.rowContainer}>
                                        <AUIThemedText style={styles.label}>
                                            {school1?.mailSupport === true
                                                ? "true"
                                                : "false" || "--"}
                                        </AUIThemedText>
                                        <AUIThemedText style={styles.label2}>
                                            {school2?.mailSupport === true
                                                ? "true"
                                                : "false" || "--"}
                                        </AUIThemedText>
                                    </AUIThemedView>
                                </AUIThemedView>
                                <AUIThemedView style={styles.row2}>
                                    <AUIThemedText style={styles.value}>callSupport</AUIThemedText>
                                    <AUIThemedView style={styles.rowContainer}>
                                        <AUIThemedText style={styles.label}>
                                            {school1?.callSupport === true
                                                ? "true"
                                                : "false" || "--"}
                                        </AUIThemedText>
                                        <AUIThemedText style={styles.label2}>
                                            {school2?.callSupport === true
                                                ? "true"
                                                : "false" || "--"}
                                        </AUIThemedText>
                                    </AUIThemedView>
                                </AUIThemedView>
                            </AUIThemedView>
                        </AUIAccordion>
                        <AUIAccordion
                            title="Academics"
                            icon={
                                Asset.fromModule(
                                    require("@/assets/images/compareScreen/compareSchoolsPage/group_2.png")
                                ).uri
                            }
                        >
                            <AUIThemedView>
                                <AUIThemedView style={styles.row2}>
                                    <AUIThemedText style={styles.value}>
                                        Language to learn
                                    </AUIThemedText>
                                    <AUIThemedView style={styles.rowContainer}>
                                        <AUIThemedText style={styles.label}>
                                            {school1?.languages?.join(", ") || "--"}
                                        </AUIThemedText>
                                        <AUIThemedText style={styles.label2}>
                                            {school2?.languages?.join(", ") || "--"}
                                        </AUIThemedText>
                                    </AUIThemedView>
                                </AUIThemedView>
                                {/* <AUIThemedView style={styles.row2}>
                                <AUIThemedText style={styles.value}>
                                    {" "}
                                    Acadamic Session
                                </AUIThemedText>
                                <AUIThemedView style={styles.rowContainer}>
                                    <AUIThemedText style={styles.label}>
                                        {compareSchool1?.acadamicSession || "--"}
                                    </AUIThemedText>
                                    <AUIThemedText style={styles.label2}>
                                        {compareSchool1?.acadamicSession || "--"}
                                    </AUIThemedText>
                                </AUIThemedView>
                            </AUIThemedView> */}
                            </AUIThemedView>
                        </AUIAccordion>
                        <AUIAccordion
                            title="Location"
                            icon={
                                Asset.fromModule(
                                    require("@/assets/images/compareScreen/compareSchoolsPage/layer_2.png")
                                ).uri
                            }
                        >
                            <AUIThemedView style={styles.row2}>
                                <AUIThemedText style={styles.value}>School Location</AUIThemedText>
                                <AUIThemedView style={styles.rowContainer}>
                                    <AUIThemedText style={styles.label}>
                                        {school1?.locationDetails[0]?.name?.en || "--"}
                                    </AUIThemedText>
                                    <AUIThemedText style={styles.label2}>
                                        {school2?.locationDetails[0]?.name?.en || "--"}
                                    </AUIThemedText>
                                </AUIThemedView>
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
                                    <AUIThemedText style={styles.value}>Minimum Fee</AUIThemedText>
                                    <AUIThemedView style={styles.rowContainer}>
                                        <AUIThemedText style={styles.label}>
                                            {school1?.minPrice || "--"}
                                        </AUIThemedText>
                                        <AUIThemedText style={styles.label2}>
                                            {school2?.minPrice || "--"}
                                        </AUIThemedText>
                                    </AUIThemedView>
                                </AUIThemedView>

                                <AUIThemedView style={styles.row2}>
                                    <AUIThemedText style={styles.value}>Maximum Fee</AUIThemedText>
                                    <AUIThemedView style={styles.rowContainer}>
                                        <AUIThemedText style={styles.label}>
                                            {school1?.maxPrice || "--"}
                                        </AUIThemedText>
                                        <AUIThemedText style={styles.label2}>
                                            {school2?.maxPrice || "--"}
                                        </AUIThemedText>
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
                                {/* <AUIThemedView style={styles.row}>
                                <AUIThemedText style={styles.value}>Campus type</AUIThemedText>
                                <AUIThemedView style={styles.rowContainer}>
                                    <AUIThemedText style={styles.label}>
                                        {compareSchool1?.campusType || "--"}
                                    </AUIThemedText>
                                    <AUIThemedText style={styles.label2}>
                                        {compareSchool1?.campusType || "--"}
                                    </AUIThemedText>
                                </AUIThemedView>
                            </AUIThemedView> */}
                                <AUIThemedView style={styles.row}>
                                    <AUIThemedText style={styles.value}>
                                        Total facilities
                                    </AUIThemedText>
                                    <AUIThemedView style={styles.rowContainer}>
                                        <AUIThemedText style={styles.label}>
                                            {school1?.facilitiesDetails.length || "--"}
                                        </AUIThemedText>
                                        <AUIThemedText style={styles.label2}>
                                            {school2?.facilitiesDetails.length || "--"}
                                        </AUIThemedText>
                                    </AUIThemedView>
                                </AUIThemedView>
                                {/* <AUIThemedView style={styles.row}>
                                <AUIThemedText style={styles.value}>Total Faculty</AUIThemedText>
                                <AUIThemedView style={styles.rowContainer}>
                                    <AUIThemedText style={styles.label}>
                                        {compareSchool1?.totalFaculty || "--"}
                                    </AUIThemedText>
                                    <AUIThemedText style={styles.label2}>
                                        {compareSchool1?.totalFaculty || "--"}
                                    </AUIThemedText>
                                </AUIThemedView>
                            </AUIThemedView> */}
                                <AUIThemedView style={styles.row}>
                                    <AUIThemedText style={styles.value}>
                                        Number of Seats
                                    </AUIThemedText>
                                    <AUIThemedView style={styles.rowContainer}>
                                        <AUIThemedText style={styles.label}>
                                            {school1?.totalNumberOfSeats || "--"}
                                        </AUIThemedText>
                                        <AUIThemedText style={styles.label2}>
                                            {school2?.totalNumberOfSeats || "--"}
                                        </AUIThemedText>
                                    </AUIThemedView>
                                </AUIThemedView>
                                <AUIThemedView style={styles.row2}>
                                    <AUIThemedText style={styles.value}>
                                        Form availability
                                    </AUIThemedText>
                                    <AUIThemedView style={styles.rowContainer}>
                                        <AUIThemedText style={styles.label}>
                                            {compareSchool1?.formAvailability || "80"}
                                        </AUIThemedText>
                                        <AUIThemedText style={styles.label2}>
                                            {compareSchool1?.formAvailability || "90"}
                                        </AUIThemedText>
                                    </AUIThemedView>
                                </AUIThemedView>
                            </AUIThemedView>
                        </AUIAccordion>
                        {/* <AUIAccordion
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
                                        onPress={() => setShow1(true)}
                                        style={styles.datePickerContainer}
                                    >
                                        <AUIThemedText style={styles.dateText}>
                                            {date1.toLocaleDateString()}
                                        </AUIThemedText>
                                        <FontAwesome name="calendar" style={styles.calenderIcon} />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => setShow2(true)}
                                        style={styles.datePickerContainer}
                                    >
                                        <AUIThemedText style={styles.dateText}>
                                            {date2.toLocaleDateString()}
                                        </AUIThemedText>
                                        <FontAwesome name="calendar" style={styles.calenderIcon} />
                                    </TouchableOpacity>
                                </AUIThemedView>
                                {show1 && (
                                    <DateTimePicker
                                        value={date1}
                                        mode="date"
                                        display="default"
                                        onChange={onChange1}
                                    />
                                )}
                                {show2 && (
                                    <DateTimePicker
                                        value={date2}
                                        mode="date"
                                        display="default"
                                        onChange={onChange2}
                                    />
                                )}
                                <AUIThemedText style={styles.label2}></AUIThemedText>
                            </AUIThemedView>
                            <AUIThemedView style={styles.row}>
                                <AUIThemedText style={styles.value}>Age eligibility</AUIThemedText>
                                <AUIThemedView style={styles.rowContainer}>
                                    <AUIThemedText style={styles.label}>
                                        {compareSchool1?.ageEligibility || "--"}
                                    </AUIThemedText>
                                    <AUIThemedText style={styles.label2}>
                                        {compareSchool1?.ageEligibility || "--"}
                                    </AUIThemedText>
                                </AUIThemedView>
                            </AUIThemedView>
                            <AUIThemedView style={styles.row}>
                                <AUIThemedText style={styles.value}>Total Faculty</AUIThemedText>
                                <AUIThemedView style={styles.rowContainer}>
                                    <AUIThemedText style={styles.label}>
                                        {compareSchool1?.totalFaculty || "--"}
                                    </AUIThemedText>
                                    <AUIThemedText style={styles.label2}>
                                        {compareSchool1?.totalFaculty || "--"}
                                    </AUIThemedText>
                                </AUIThemedView>
                            </AUIThemedView>
                            <AUIThemedView style={styles.row2}>
                                <AUIThemedText style={styles.value}>Number of seats</AUIThemedText>
                                <AUIThemedView style={styles.rowContainer}>
                                    <AUIThemedText style={styles.label}>
                                        {compareSchool1?.numberOfSeats || "--"}
                                    </AUIThemedText>
                                    <AUIThemedText style={styles.label2}>
                                        {compareSchool1?.numberOfSeats || "--"}
                                    </AUIThemedText>
                                </AUIThemedView>
                            </AUIThemedView>
                        </AUIThemedView>
                    </AUIAccordion> */}
                    </AUIThemedView>
                </AUIThemedView>
            </ScrollView>
        </AUIThemedView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        padding: 15,
        // backgroundColor: APP_THEME.background,
        // height: windowHeight,
    },

    outerContainer: {
        flex: 1,
        // backgroundColor: APP_THEME.background,
    },

    cardContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        marginBottom: 20,
        // backgroundColor: APP_THEME.background,
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
        // backgroundColor: "#fff",
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
        // backgroundColor: "#fff",
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
    AUIAccordion: { borderColor: "#5BD894" },
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
        // color: "#000",
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
