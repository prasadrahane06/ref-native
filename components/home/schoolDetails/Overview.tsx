import AUIInfoCard from "@/components/AUIInfoCard";
import AUIButton from "@/components/common/AUIButton";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import SectionTitle from "@/components/home/common/SectionTitle";
import { EventsList } from "@/components/home/schoolDetails/EventsList";
import { FacilitiesList } from "@/components/home/schoolDetails/FacilitiesList";
import { ReviewList } from "@/components/home/schoolDetails/ReviewList";
import { APP_THEME } from "@/constants/Colors";
import { GLOBAL_TEXT } from "@/constants/Properties";
import { eventsData } from "@/constants/dummy data/eventsData";
import { facilitiesData } from "@/constants/dummy data/facilitiesData";
import { reviewsData } from "@/constants/dummy data/reviewsData";
import React from "react";
import { FlatList, ScrollView } from "react-native";

const courseInfoData = [
    {
        id: "1",
        title: "380+",
        subtitle: "Courses",
    },
    {
        id: "2",
        title: "5+",
        subtitle: "Total Language",
    },
    {
        id: "3",
        title: "180+",
        subtitle: "Total admission",
    },
    {
        id: "4",
        title: "180+",
        subtitle: "Total admission",
    },
    // {
    //     id: '4',
    //     title: 'International Students%',
    //     subtitle: 'Courses',
    // },
];

export default function OverviewTab() {
    return (
        <AUIThemedView>
            <AUIThemedView style={{ alignItems: "center", marginTop: 15 }}>
                <FlatList
                    scrollEnabled={false}
                    data={courseInfoData}
                    numColumns={2}
                    renderItem={({ item }) => (
                        <AUIInfoCard
                            titleStyle={{ fontSize: 21 }}
                            subtitleStyle={{
                                fontSize: 14,
                                color: APP_THEME.gray,
                            }}
                            title={item.title}
                            subtitle={item.subtitle}
                        />
                    )}
                    keyExtractor={(item) => item.id}
                />
            </AUIThemedView>

            <AUIThemedView>
                <SectionTitle>{GLOBAL_TEXT.latest_events}</SectionTitle>
                <EventsList data={eventsData} />
            </AUIThemedView>

            <AUIThemedView>
                <SectionTitle>{GLOBAL_TEXT.facilities}</SectionTitle>
                <FacilitiesList data={facilitiesData} />
            </AUIThemedView>

            <AUIThemedView>
                <AUIButton
                    title={GLOBAL_TEXT.enquire_now}
                    selected
                    style={{ paddingHorizontal: 15 }}
                />
            </AUIThemedView>

            <AUIThemedView>
                <SectionTitle viewAll="#">
                    {GLOBAL_TEXT.ratings_and_review}
                </SectionTitle>
                <ReviewList data={reviewsData} />
            </AUIThemedView>
        </AUIThemedView>
    );
}
