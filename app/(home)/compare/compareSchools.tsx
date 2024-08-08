import AUIAccordion from "@/components/common/AUIAccordion";
import AUIImage from "@/components/common/AUIImage";
import { AUIThemedText } from "@/components/common/AUIThemedText";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import { APP_THEME } from "@/constants/Colors";
import { useLangTransformSelector } from "@/customHooks/useLangTransformSelector";
import { setSelectedSchool1, setSelectedSchool2 } from "@/redux/apiSlice";
import { RootState } from "@/redux/store";
import { Ionicons } from "@expo/vector-icons";
import { Asset } from "expo-asset";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
// import { t } from "i18next";
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";

const CompareSchools: React.FC = () => {
    const { t } = useTranslation();
    // const [date1, setDate1] = useState<Date>(new Date());
    // const [show1, setShow1] = useState<boolean>(false);
    // const [date2, setDate2] = useState<Date>(new Date());
    // const [show2, setShow2] = useState<boolean>(false);
    const compareSchool1 = useLangTransformSelector((state: RootState) => state.api.compareSchool1);
    const compareSchool2 = useLangTransformSelector((state: RootState) => state.api.compareSchool2);
    const dispatch = useDispatch();

    const handleResetcompareSchool1 = () => {
        dispatch(setSelectedSchool1(null));
    };

    const handleResetcompareSchool2 = () => {
        dispatch(setSelectedSchool2(null));
    };

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
                        {compareSchool1 ? (
                            <>
                                <AUIThemedView style={styles.customCard}>
                                    <AUIThemedView style={styles.imageContainer}>
                                        <AUIImage
                                            style={styles.image}
                                            path={compareSchool1?.banner}
                                            contentFit="cover"
                                        />
                                    </AUIThemedView>
                                    <AUIThemedView style={styles.textContainer}>
                                        <AUIThemedText style={styles.cardTitle} numberOfLines={1}>
                                            {compareSchool1?.name}
                                        </AUIThemedText>
                                        {/* <AUIThemedText
                                            style={styles.cardSubtitle}
                                            numberOfLines={3}
                                        >
                                            {compareSchool1?.location?.about}
                                        </AUIThemedText> */}
                                    </AUIThemedView>
                                </AUIThemedView>
                                <TouchableOpacity
                                    style={styles.customShape}
                                    onPress={handleResetcompareSchool1}
                                >
                                    <Ionicons name="close" size={20} color="black" />
                                </TouchableOpacity>
                            </>
                        ) : (
                            <TouchableOpacity
                                style={styles.card}
                                onPress={() =>
                                    router.replace({
                                        pathname: "/(home)/compare/searchSchool",
                                        params: { compareSlot: "compareSchool1" },
                                    })
                                }
                            >
                                <Ionicons
                                    name="add-circle-outline"
                                    size={50}
                                    color={APP_THEME.light.primary.first}
                                />
                                <AUIThemedText style={styles.cardText}>{t("add_school")}</AUIThemedText>
                            </TouchableOpacity>
                        )}

                        {compareSchool2 ? (
                            <>
                                <AUIThemedView style={styles.customCard}>
                                    <AUIThemedView style={styles.imageContainer}>
                                        <AUIImage
                                            style={styles.image}
                                            path={compareSchool2?.banner}
                                            contentFit="cover"
                                        />
                                    </AUIThemedView>
                                    <AUIThemedView style={styles.textContainer}>
                                        <AUIThemedText style={styles.cardTitle} numberOfLines={1}>
                                            {compareSchool2?.name}
                                        </AUIThemedText>
                                        {/* <AUIThemedText
                                            style={styles.cardSubtitle}
                                            numberOfLines={3}
                                        >
                                            {compareSchool2?.location?.about}
                                        </AUIThemedText> */}
                                    </AUIThemedView>
                                </AUIThemedView>
                                <TouchableOpacity
                                    style={styles.customShape1}
                                    onPress={handleResetcompareSchool2}
                                >
                                    <Ionicons name="close" size={20} color="black" />
                                </TouchableOpacity>
                            </>
                        ) : (
                            <TouchableOpacity
                                style={styles.card}
                                onPress={() =>
                                    router.replace({
                                        pathname: "/(home)/compare/searchSchool",
                                        params: { compareSlot: "compareSchool2" },
                                    })
                                }
                            >
                                <Ionicons
                                    name="add-circle-outline"
                                    size={50}
                                    color={APP_THEME.light.primary.first}
                                />
                                <AUIThemedText style={styles.cardText}>{t("add_school")}</AUIThemedText>
                            </TouchableOpacity>
                        )}
                    </AUIThemedView>

                    <AUIThemedView style={styles.accordionSection}>
                        <AUIAccordion
                            title={t("school_information")}
                            style={styles.AUIAccordion}
                            icon={Asset.fromModule(
                                require("@/assets/images/local/group_36763.png")
                            )}
                        >
                            <AUIThemedView>
                                <AUIThemedView style={styles.row}>
                                    <AUIThemedText style={styles.value}>{t("information")}</AUIThemedText>
                                    <AUIThemedView style={styles.rowContainer}>
                                        <AUIThemedText style={styles.label}>
                                            {compareSchool1?.description || "--"}
                                        </AUIThemedText>
                                        <AUIThemedText style={styles.label2}>
                                            {compareSchool2?.description || "--"}
                                        </AUIThemedText>
                                    </AUIThemedView>
                                </AUIThemedView>
                                <AUIThemedView style={styles.row}>
                                    <AUIThemedText style={styles.value}>
                                    {t("have_mail_support")}{" "}
                                    </AUIThemedText>
                                    <AUIThemedView style={styles.rowContainer}>
                                        <AUIThemedText style={styles.label}>
                                            {compareSchool1?.mailSupport === true
                                                ?`${t("true")}`
                                                : `${t("false")}`|| "--"}
                                        </AUIThemedText>
                                        <AUIThemedText style={styles.label2}>
                                            {compareSchool2?.mailSupport === true
                                                ? `${t("true")}`
                                                : `${t("false")}` || "--"}
                                        </AUIThemedText>
                                    </AUIThemedView>
                                </AUIThemedView>
                                <AUIThemedView style={styles.row2}>
                                    <AUIThemedText style={styles.value}>{t("callSupport")}</AUIThemedText>
                                    <AUIThemedView style={styles.rowContainer}>
                                        <AUIThemedText style={styles.label}>
                                            {compareSchool1?.callSupport === true
                                                ? `${t("true")}`
                                                : `${t("false")}` || "--"}
                                        </AUIThemedText>
                                        <AUIThemedText style={styles.label2}>
                                            {compareSchool2?.callSupport === true
                                                ? `${t("true")}`
                                                : `${t("false")}` || "--"}
                                        </AUIThemedText>
                                    </AUIThemedView>
                                </AUIThemedView>
                            </AUIThemedView>
                        </AUIAccordion>
                        <AUIAccordion
                            title={t("academics")}
                            style={styles.AUIAccordion}
                            icon={Asset.fromModule(require("@/assets/images/local/group_2.png"))}
                        >
                            <AUIThemedView>
                                <AUIThemedView style={styles.row2}>
                                    <AUIThemedText style={styles.value}>
                                    {t("language_to_learn")}
                                    </AUIThemedText>
                                    <AUIThemedView style={styles.rowContainer}>
                                        <AUIThemedText style={styles.label}>
                                            {compareSchool1?.location?.language || "--"}
                                        </AUIThemedText>
                                        <AUIThemedText style={styles.label2}>
                                            {compareSchool2?.location?.language || "--"}
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
                            title={t("location")}
                            style={styles.AUIAccordion}
                            icon={Asset.fromModule(require("@/assets/images/local/layer_2.png"))}
                        >
                            <AUIThemedView style={styles.row2}>
                                <AUIThemedText style={styles.value}>{t("school_location")}</AUIThemedText>
                                <AUIThemedView style={styles.rowContainer}>
                                    <AUIThemedText style={styles.label}>
                                        {compareSchool1?.location?.capital || "--"}
                                    </AUIThemedText>
                                    <AUIThemedText style={styles.label2}>
                                        {compareSchool2?.location?.capital || "--"}
                                    </AUIThemedText>
                                </AUIThemedView>
                            </AUIThemedView>
                        </AUIAccordion>
                        <AUIAccordion
                            title={t("fee_structure")}
                            style={styles.AUIAccordion}
                            icon={Asset.fromModule(require("@/assets/images/local/fi_6926264.png"))}
                        >
                            <AUIThemedView>
                                <AUIThemedView style={styles.row}>
                                    <AUIThemedText style={styles.value}>{t("minimum_fee")}</AUIThemedText>
                                    <AUIThemedView style={styles.rowContainer}>
                                        <AUIThemedText style={styles.label}>
                                            {compareSchool1?.minPrice || "--"}
                                        </AUIThemedText>
                                        <AUIThemedText style={styles.label2}>
                                            {compareSchool2?.minPrice || "--"}
                                        </AUIThemedText>
                                    </AUIThemedView>
                                </AUIThemedView>

                                <AUIThemedView style={styles.row2}>
                                    <AUIThemedText style={styles.value}>{t("maximum_fee")}</AUIThemedText>
                                    <AUIThemedView style={styles.rowContainer}>
                                        <AUIThemedText style={styles.label}>
                                            {compareSchool1?.maxPrice || "--"}
                                        </AUIThemedText>
                                        <AUIThemedText style={styles.label2}>
                                            {compareSchool2?.maxPrice || "--"}
                                        </AUIThemedText>
                                    </AUIThemedView>
                                </AUIThemedView>
                            </AUIThemedView>
                        </AUIAccordion>
                        <AUIAccordion
                            title={t("campus_and_facility")}
                            style={styles.AUIAccordion}
                            icon={Asset.fromModule(require("@/assets/images/local/fi_8716577.png"))}
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
                                    {t("total_facilities")}
                                    </AUIThemedText>
                                    <AUIThemedView style={styles.rowContainer}>
                                        <AUIThemedText style={styles.label}>
                                            {compareSchool1?.facilitiesDetails || "--"}
                                        </AUIThemedText>
                                        <AUIThemedText style={styles.label2}>
                                            {compareSchool2?.facilitiesDetails || "--"}
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
                                <AUIThemedView style={styles.row2}>
                                    <AUIThemedText style={styles.value}>
                                    {t("number_of_seats")}
                                    </AUIThemedText>
                                    <AUIThemedView style={styles.rowContainer}>
                                        <AUIThemedText style={styles.label}>
                                            {compareSchool1?.NumberOfSeats || "--"}
                                        </AUIThemedText>
                                        <AUIThemedText style={styles.label2}>
                                            {compareSchool2?.NumberOfSeats || "--"}
                                        </AUIThemedText>
                                    </AUIThemedView>
                                </AUIThemedView>
                                {/* <AUIThemedView style={styles.row2}>
                                    <AUIThemedText style={styles.value}>
                                    {t("form_availability")}
                                    </AUIThemedText>
                                    <AUIThemedView style={styles.rowContainer}>
                                        <AUIThemedText style={styles.label}>
                                            {compareSchool1?.formAvailability || `00`}
                                        </AUIThemedText>
                                        <AUIThemedText style={styles.label2}>
                                            {compareSchool1?.formAvailability ||   `00`}
                                        </AUIThemedText>
                                    </AUIThemedView>
                                </AUIThemedView> */}
                            </AUIThemedView>
                        </AUIAccordion>
                        {/* <AUIAccordion
                        title="Admission Criteria and Eligibility"
                        icon={
                            Asset.fromModule(
                                require("@/assets/images/local/fi_6419828.png")
                            )
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
    },

    outerContainer: {
        flex: 1,
    },

    cardContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        marginBottom: 20,
    },
    customCard: {
        width: "48%",
        height: 160,
        justifyContent: "flex-start",
        alignItems: "center",
        borderWidth: 1,
        borderColor: APP_THEME.light.lightGray,
        borderRadius: 15,
        overflow: "hidden",
        position: "relative",
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
        paddingVertical: 5,
        alignItems: "center",
    },
    cardTitle: {
        fontSize: 13,
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
        bottom: -14,
        left: "18%",
        zIndex: 2,
        width: 30,
        height: 30,
        fontWeight: "700",
        borderWidth: 1,
        borderColor: APP_THEME.light.primary.first,
        backgroundColor: APP_THEME.light.primary.first,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
    },
    customShape1: {
        position: "absolute",
        bottom: -14,
        right: "20%",
        zIndex: 2,
        width: 30,
        height: 30,
        fontWeight: "700",
        borderWidth: 1,
        borderColor: APP_THEME.light.primary.first,
        backgroundColor: APP_THEME.light.primary.first,
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
        borderColor: APP_THEME.light.lightGray,
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
    AUIAccordion: { borderColor: APP_THEME.light.primary.first },
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
        color: APP_THEME.light.primary.first,
        fontSize: 14,
        paddingVertical: 3,
    },
    feeLabelLabelText2: {
        flex: 1,
        textAlign: "center",
        fontWeight: "500",
        color: APP_THEME.light.primary.first,
        fontSize: 14,
        paddingVertical: 3,
    },
    value: {
        textAlign: "center",
        color: APP_THEME.light.lightGray,
        fontWeight: "400",
        fontSize: 14,
    },
    academicsContainer: {
        padding: 3,
        alignItems: "center",
    },
    descriptionText: {
        fontSize: 14,
        marginBottom: 20,
        textAlign: "center",
    },
    locationButton: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: APP_THEME.light.primary.first,
        borderRadius: 8,
    },
    locationButtonText: {
        marginLeft: 10,
        fontSize: 16,
        color: APP_THEME.light.primary.first,
    },
    admissionRow1: {
        flexDirection: "column",
        justifyContent: "space-between",
        borderBottomWidth: 2,
        borderBottomColor: APP_THEME.light.lightGray,
        padding: 5,
        paddingHorizontal: 10,
    },
    row: {
        flexDirection: "column",
        justifyContent: "space-between",
        borderBottomWidth: 2,
        borderBottomColor: APP_THEME.light.lightGray,
        padding: 5,
    },
    row2: {
        flexDirection: "column",
        justifyContent: "space-between",
    },
    acadamicSessionText: {
        textAlign: "center",
        color: APP_THEME.light.lightGray,
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
        borderColor: APP_THEME.light.lightGray,
        borderRadius: 3,
        paddingHorizontal: 7,
        paddingVertical: 1,
        marginTop: 10,
    },
    dateText: {
        color: APP_THEME.light.lightGray,
        fontWeight: "400",
        fontSize: 14,
        paddingHorizontal: 6,
    },
    calenderIcon: { fontSize: 14, color: APP_THEME.light.primary.first },
    feeRow2: {
        flexDirection: "column",
        justifyContent: "space-between",
    },
});
export default CompareSchools;
