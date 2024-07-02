import AUIImage from "@/components/common/AUIImage";
import { RootState } from "@/redux/store";
import { FontAwesome } from "@expo/vector-icons";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { Asset } from "expo-asset";
import React, { useState } from "react";
import {
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useSelector } from "react-redux";

const Profile: React.FC = () => {
    const userProfileData = useSelector((state: RootState) => state.api.userProfileData);
    console.log("userProfileData in profile", userProfileData);

    const [date, setDate] = useState<Date>(new Date());
    const [show, setShow] = useState<boolean>(false);

    const [name, setName] = useState<string>(userProfileData?.name);
    const [phoneNumber, setPhoneNumber] = useState<string>(userProfileData?.phone);
    const [mailID, setMailID] = useState<string>(userProfileData?.email);
    const [gender, setGender] = useState<string>("");
    const [qualification, setQualification] = useState<string>("");
    const [academicSession, setAcademicSession] = useState<string>("");
    const [selectedLanguage, setSelectedLanguage] = useState<string>("");

    const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === "ios");
        setDate(currentDate);
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>My Profile</Text>
                </View>

                <View style={styles.profileImageContainer}>
                    <AUIImage
                        icon
                        path={
                            Asset.fromModule(
                                require("@/assets/images/user.png")
                                // "https://linguest-assets-dev.s3.ap-south-1.amazonaws.com/1718884990288-6296.jpeg"
                            ).uri
                        }
                        style={styles.profileImage}
                    />
                </View>
                <Text style={styles.label}>Enter your name</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Your Name"
                    value={name}
                    onChangeText={(text) => setName(text)}
                />

                <Text style={styles.label}>Phone Number</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter You Mobile Number"
                    value={phoneNumber}
                    onChangeText={(text) => setPhoneNumber(text)}
                />

                <Text style={styles.label}>Mail ID</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Your Mail ID"
                    value={mailID}
                    onChangeText={(text) => setMailID(text)}
                />

                <Text style={styles.label}>Date of Birth</Text>
                <TouchableOpacity onPress={() => setShow(true)} style={styles.datePicker}>
                    <Text>{date.toLocaleDateString()}</Text>
                    <FontAwesome name="calendar" size={20} color="#5BD894" />
                </TouchableOpacity>

                {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode="date"
                        display="default"
                        onChange={onDateChange}
                    />
                )}

                <Text style={styles.label}>Select your gender</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Please specify"
                    value={gender}
                    onChangeText={(text) => setGender(text)}
                />

                <Text style={styles.label}>My Qualification is</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Certificate/ Diploma"
                    value={qualification}
                    onChangeText={(text) => setQualification(text)}
                />

                <Text style={styles.label}>Academic Session</Text>
                <TextInput
                    style={styles.input}
                    placeholder="2023-2024"
                    value={academicSession}
                    onChangeText={(text) => setAcademicSession(text)}
                />
                <Text style={styles.label}>Select Language</Text>
                <TextInput
                    style={styles.input}
                    placeholder="2023-2024"
                    value={selectedLanguage}
                    onChangeText={(text) => setSelectedLanguage(text)}
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
    headerText: {
        fontSize: 18,
        fontWeight: "bold",
    },
    editIcon: {
        top: 8,
    },
    profileImageContainer: {
        alignItems: "flex-start",
        marginBottom: 20,
    },
    profileImage: {
        height: 100,
        width: 100,
        borderRadius: 50,
    },
    label: {
        fontSize: 13,
        fontWeight: "500",
        marginBottom: 5,
        color: "#333",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        padding: 7,
        marginBottom: 15,
    },
    datePicker: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        padding: 10,
        marginBottom: 20,
    },
});

export default Profile;
