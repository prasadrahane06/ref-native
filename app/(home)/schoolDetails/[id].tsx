import { AUIThemedText } from "@/components/common/AUIThemedText";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import { APP_THEME } from "@/constants/Colors";
import { GLOBAL_TEXT } from "@/constants/Properties";
import {
    FontAwesome,
    Ionicons,
    MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Image, ScrollView, StyleSheet } from "react-native";
import StudentDetailsTabs from "./(tabs)/_layout";

export default function SchoolDetails() {
    const { id } = useLocalSearchParams<{ id: string }>();
    console.log(id);

    return (
        <AUIThemedView>
            <ScrollView>
                <AUIThemedView style={styles.container}>
                    <Image
                        source={require("@/assets/images/studentHomePage/popularSchools/school-1.png")}
                        style={[styles.image]}
                        resizeMode="cover"
                    />

                    <AUIThemedView style={styles.infoContainer}>
                        <AUIThemedText style={styles.name}>
                            The Manchester School
                        </AUIThemedText>

                        <AUIThemedView style={styles.ratingsContainer}>
                            <Ionicons
                                name="star"
                                size={20}
                                color={APP_THEME.primary.first}
                            />
                            <AUIThemedText style={styles.ratingsText}>
                                4.0
                            </AUIThemedText>
                            <AUIThemedText style={styles.viewsText}>
                                150 Views
                            </AUIThemedText>
                        </AUIThemedView>

                        <AUIThemedView style={styles.contactsContainer}>
                            <AUIThemedText style={styles.contact}>
                                {GLOBAL_TEXT.contact_details}
                            </AUIThemedText>

                            <AUIThemedView
                                style={{
                                    paddingVertical: 5,
                                    backgroundColor: APP_THEME.background,
                                }}
                            >
                                <AUIThemedView style={styles.contacts}>
                                    <FontAwesome
                                        name="phone"
                                        size={20}
                                        color={APP_THEME.primary.first}
                                    />
                                    <AUIThemedText
                                        style={[
                                            styles.contactText,
                                            { fontWeight: "bold" },
                                        ]}
                                    >
                                        +44 987-986-5443
                                    </AUIThemedText>
                                </AUIThemedView>

                                <AUIThemedView style={styles.contacts}>
                                    <MaterialCommunityIcons
                                        name="email"
                                        size={20}
                                        color={APP_THEME.primary.first}
                                    />
                                    <AUIThemedText style={styles.contactText}>
                                        connecto@mancha.com
                                    </AUIThemedText>
                                </AUIThemedView>

                                <AUIThemedView style={styles.contacts}>
                                    <Ionicons
                                        name="globe-outline"
                                        size={20}
                                        color={APP_THEME.primary.first}
                                    />
                                    <AUIThemedText style={styles.contactText}>
                                        www.manchesterschool.com
                                    </AUIThemedText>
                                </AUIThemedView>
                            </AUIThemedView>
                        </AUIThemedView>
                    </AUIThemedView>
                    <StudentDetailsTabs />

                    {/* used for testing */}
                    {/* <AUIThemedView style={styles.infoContainer}>
                        <AUIThemedText style={styles.name}>
                            The Manchester SchoolThe Manchester SchoolThe
                            Manchester SchoolThe Manchester SchoolThe Manchester
                            SchoolThe Manchester SchoolThe Manchester SchoolThe
                            Manchester SchoolThe Manchester SchoolThe Manchester
                            SchoolThe Manchester SchoolThe Manchester SchoolThe
                            Manchester SchoolThe Manchester SchoolThe Manchester
                            SchoolThe Manchester SchoolThe Manchester SchoolThe
                            Manchester SchoolThe Manchester SchoolThe Manchester
                            SchoolThe Manchester SchoolThe Manchester SchoolThe
                            Manchester SchoolThe Manchester SchoolThe Manchester
                            SchoolThe Manchester SchoolThe Manchester SchoolThe
                            Manchester SchoolThe Manchester SchoolThe Manchester
                            SchoolThe Manchester SchoolThe Manchester SchoolThe
                            Manchester SchoolThe Manchester SchoolThe Manchester
                            SchoolThe Manchester SchoolThe Manchester SchoolThe
                            Manchester SchoolThe Manchester SchoolThe Manchester
                            SchoolThe Manchester SchoolThe Manchester SchoolThe
                            Manchester SchoolThe Manchester SchoolThe Manchester
                            SchoolThe Manchester SchoolThe Manchester SchoolThe
                            Manchester SchoolThe Manchester SchoolThe Manchester
                            SchoolThe Manchester SchoolThe Manchester SchoolThe
                            Manchester SchoolThe Manchester SchoolThe Manchester
                            SchoolThe Manchester SchoolThe Manchester SchoolThe
                            Manchester SchoolThe Manchester SchoolThe Manchester
                            SchoolThe Manchester SchoolThe Manchester SchoolThe
                            Manchester SchoolThe Manchester SchoolThe Manchester
                            SchoolThe Manchester School
                        </AUIThemedText>
                    </AUIThemedView> */}
                </AUIThemedView>
            </ScrollView>
        </AUIThemedView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    image: {
        height: 200,
        width: "auto",
    },
    infoContainer: {
        paddingVertical: 5,
        paddingHorizontal: 15,
        backgroundColor: APP_THEME.background,
    },
    name: {
        fontSize: 20,
        fontWeight: "bold",
    },
    contactsContainer: {
        paddingTop: 10,
        backgroundColor: APP_THEME.background,
    },
    contact: {
        fontSize: 15,
        fontWeight: "bold",
    },
    contacts: {
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
        backgroundColor: APP_THEME.background,
    },
    contactText: {
        fontSize: 13,
    },
    ratingsContainer: {
        flexDirection: "row",
        gap: 8,
        marginTop: 5,
        alignItems: "center",
        backgroundColor: APP_THEME.background,
    },
    ratingsText: {
        fontSize: 16,
        fontWeight: "600",
    },
    viewsText: {
        fontSize: 16,
        textDecorationLine: "underline",
        color: APP_THEME.gray,
    },
});
