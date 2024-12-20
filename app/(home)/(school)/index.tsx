import useAxios from "@/app/services/axiosClient";
import AUIInfoCard from "@/components/AUIInfoCard";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import CourseList from "@/components/home/common/CourseList";
import ChartComponent from "@/components/home/common/LinearChart";
import SectionTitle from "@/components/home/common/SectionTitle";
import { GLOBAL_TEXT } from "@/constants/Properties";
import { API_URL } from "@/constants/urlProperties";
import useApiRequest from "@/customHooks/useApiRequest";
import { useLangTransformSelector } from "@/customHooks/useLangTransformSelector";
import { RootState } from "@/redux/store";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, ScrollView, StyleSheet } from "react-native";
import "react-native-gesture-handler";
import formatNumberWithComma from "@/utils/numberFomatter";
import { BACKGROUND_THEME } from "@/constants/Colors";
import { useSelector } from "react-redux";
import { useAxiosClient as useBotAxios } from "at-chatbot-native";

export default function HomeScreen() {
    const { requestFn } = useApiRequest();
    const { patch } = useAxios();
    const { botPost } = useBotAxios();
    const { t } = useTranslation();

    const theme = useSelector((state: RootState) => state.global.theme);
    const taxAmount = useSelector((state: RootState) => state.api.taxAmount);
    const user = useLangTransformSelector((state: RootState) => state.global.user);
    const myCourse = useLangTransformSelector((state: RootState) => state.api.myCourse);
    const mySchoolDetails = useLangTransformSelector(
        (state: RootState) => state.api.MySchoolDetails
    );

    const [newInfo, setNewInfo] = useState<any>(null);

    useEffect(() => {
        requestFn(API_URL.schoolAnalytics, "MySchoolDetails", { client: true });
        requestFn(API_URL.course, "myCourse", { client: true });
        requestFn(API_URL.country, "countryDataForSchool");
        requestFn(API_URL.tax, "taxAmount");
    }, []);
    useEffect(() => {
        // create bot
        botPost("/bot", {
            name: user.name,
            consumer: user.client,
            config: {
                color: "green",
                language: "English",
            },
        })
            .then((res) => {
                console.log("school bot created =>", res.data);
                patch(API_URL.school, {
                    botId: res.data?._id,
                })
                    .then((res) => {
                        console.log("school bot updated =>", res);
                        // ApiSuccessToast(res.message);
                    })
                    .catch((e) => {
                        console.log("Error in update school =>", e);
                    });
            })
            .catch((e) => {
                console.log("Error in create bot =>", e);
            });
    }, []);

    const specificDummyData = {
        labels: ["month"],
        pendingData: [0],
        doneData: [0],
    };

    const validateData = (data: any) => {
        return data.map((value: any) => (isNaN(value) || !isFinite(value) ? 0 : value));
    };

    useEffect(() => {
        if (taxAmount) {
            const updatedInfo = mySchoolDetails?.schoolInfoData?.map((item: any) => {
                if (item.id === "4" && !item.title.includes("undefined")) {
                    const array = item.title.split(" ");

                    const amount = parseFloat(array[1].replace(/[^0-9.-]+/g, ""));

                    const amountAfterTax = amount - amount * (taxAmount[0].value / 100);

                    console.log("amountAfterTax", amountAfterTax);

                    return {
                        ...item,
                        title: `SAR ${amountAfterTax.toFixed(0)} + `,
                    };
                }

                return {
                    ...item,
                };
            });

            setNewInfo(updatedInfo);

            console.log("updatedInfo", updatedInfo);
        }
    }, [taxAmount, mySchoolDetails]);

    return (
        <AUIThemedView>
            <ScrollView>
                <AUIThemedView style={styles.section}>
                    <SectionTitle>{mySchoolDetails?.name}</SectionTitle>
                    <AUIThemedView style={{ alignItems: "center", marginTop: 15 }}>
                        {mySchoolDetails?.schoolInfoData && (
                            <FlatList
                                scrollEnabled={false}
                                data={newInfo}
                                numColumns={2}
                                renderItem={({ item }) => (
                                    <AUIInfoCard
                                        titleStyle={{ fontSize: 21 }}
                                        subtitleStyle={{
                                            fontSize: 14,
                                            color: "#777",
                                        }}
                                        title={formatNumberWithComma(
                                            item?.title &&
                                                item?.title.toLowerCase().includes("undefined")
                                                ? 0
                                                : item?.title
                                        )}
                                        subtitle={item?.subtitle}
                                    />
                                )}
                                keyExtractor={(item) => item.id}
                            />
                        )}
                    </AUIThemedView>

                    <ChartComponent
                        title={t(GLOBAL_TEXT.my_earnings)}
                        labels={mySchoolDetails?.graphData?.labels || specificDummyData.labels}
                        pendingData={
                            mySchoolDetails?.graphData?.pendingData || specificDummyData.pendingData
                        }
                        doneData={
                            mySchoolDetails?.graphData?.doneData || specificDummyData.doneData
                        }
                        // yAxisLabel="$"
                        yAxisInterval={10}
                    />

                    <AUIThemedView style={styles.section}>
                        <SectionTitle style={{ paddingBottom: 10 }}>
                            {t("ongoing_courses")}
                        </SectionTitle>
                        <CourseList data={myCourse?.docs?.slice(0, 4) || []} />
                    </AUIThemedView>
                </AUIThemedView>
            </ScrollView>
        </AUIThemedView>
    );
}

const styles = StyleSheet.create({
    container2: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    infoCardRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 16,
    },
    section: {
        marginBottom: 16,
    },
});
