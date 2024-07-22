import AUIInfoCard from "@/components/AUIInfoCard";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import CourseList from "@/components/home/common/CourseList";
import ChartComponent from "@/components/home/common/LinearChart";
import SectionTitle from "@/components/home/common/SectionTitle";
import { APP_THEME } from "@/constants/Colors";
import { GLOBAL_TEXT } from "@/constants/Properties";
import { API_URL } from "@/constants/urlProperties";
import useApiRequest from "@/customHooks/useApiRequest";
import { useLangTransformSelector } from "@/customHooks/useLangTransformSelector";
import { RootState } from "@/redux/store";
import formatNumberWithComma from "@/utils/numberFomatter";
import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { FlatList, ScrollView, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import useAxios from "@/app/services/axiosClient";
import { ApiSuccessToast } from "@/components/common/AUIToast";

import { ChatBot, useAxiosClient as useBotAxios } from "at-chatbot-native";
// import { post as botPost } from "@/app/services/botAxiosClient";
// import ChatBot from "@/components/chatbot/ChatBot";

export default function HomeScreen() {
    const { requestFn } = useApiRequest();
    const { patch } = useAxios();
    const { botPost } = useBotAxios();

    const user = useLangTransformSelector((state: RootState) => state.global.user);
    const school = useLangTransformSelector((state: RootState) => state.api.individualSchool || {});
    const theme = useSelector((state: RootState) => state.global.theme);
    const MySchoolDetails = useLangTransformSelector(
        (state: RootState) => state.api.MySchoolDetails
    );
    const myCourse = useLangTransformSelector((state: RootState) => state.api.myCourse);

    useEffect(() => {
        requestFn(API_URL.schoolAnalytics, "MySchoolDetails", { client: true });
        requestFn(API_URL.course, "myCourse", { client: true });
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
                patch(API_URL.school, {
                    botId: res.data._id,
                })
                    .then((res) => {
                        ApiSuccessToast(res.message);
                    })
                    .catch((e) => {
                        console.log("Error in update school =>", e);
                    });
            })
            .catch((e) => {
                console.log("Error in create bot =>", e);
            });
    }, []);

    // chatbot code below
    const [config, setConfig] = useState({});
    // const consumerId: string = "667276fdb4001407af7aa8a2";

    // Keep it for future chatbot use
    // Bilal : 66683f4f7a4338e3c14339ab
    // Agent : 667278245b62c3824a62e12f
    // const userId = "667278245b62c3824a62e12f";

    // useEffect(() => {
    //     get("https://example.com") // get bot configs
    //         .then((res) => {
    //             console.log(res);

    //             // dummy configs
    //             const botConfigs = {
    //                 _id: "667276fdb4001407af7aa8a2",
    //                 name: "School 1",
    //                 owner: "School 1",
    //                 config: {
    //                     color: "green",
    //                     language: "english",
    //                 },
    //             };

    //             setConfig(botConfigs);
    //         })
    //         .catch((err) => {
    //             console.log("Error in get /bot =>", err);
    //         });
    // }, []);

    return (
        <AUIThemedView>
            <ScrollView>
                <AUIThemedView style={styles.section}>
                    <SectionTitle>{MySchoolDetails?.name || "School Name"}</SectionTitle>
                    <AUIThemedView style={{ alignItems: "center", marginTop: 15 }}>
                        {MySchoolDetails?.schoolInfoData && (
                            <FlatList
                                scrollEnabled={false}
                                data={MySchoolDetails?.schoolInfoData}
                                numColumns={2}
                                renderItem={({ item }) => (
                                    <AUIInfoCard
                                        titleStyle={{ fontSize: 21 }}
                                        subtitleStyle={{
                                            fontSize: 14,
                                            color: APP_THEME[theme].gray,
                                        }}
                                        title={formatNumberWithComma(item.title)}
                                        subtitle={item.subtitle}
                                    />
                                )}
                                keyExtractor={(item) => item.id}
                            />
                        )}
                    </AUIThemedView>

                    <ChartComponent
                        title="Earnings"
                        labels={MySchoolDetails?.graphData?.labels || []}
                        pendingData={MySchoolDetails?.graphData?.pendingData || []}
                        doneData={MySchoolDetails?.graphData?.doneData || []}
                        yAxisLabel="$"
                        yAxisInterval={10}
                    />

                    <AUIThemedView style={styles.section}>
                        <SectionTitle style={{ paddingBottom: 10 }}>
                            {GLOBAL_TEXT.ongoing_courses}
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
