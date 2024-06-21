import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ScrollView,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import AUIImage from "@/components/common/AUIImage";

const Profile: React.FC = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [show, setShow] = useState<boolean>(false);

  const [name, setName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [mailID, setMailID] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [qualification, setQualification] = useState<string>("");
  const [academicSession, setAcademicSession] = useState<string>("");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>My Profile</Text>
          <TouchableOpacity style={styles.editIcon}>
            <FontAwesome name="edit" size={20} color="#5BD894" />
          </TouchableOpacity>
        </View>

        <View style={styles.profileImageContainer}>
          <AUIImage
            icon
            path={
              "https://linguest-assets-dev.s3.ap-south-1.amazonaws.com/1718884990288-6296.jpeg"
            }
            style={styles.profileImage}
          />
        </View>
        <Text style={styles.label}>Enter your name</Text>
        <TextInput
          style={styles.input}
          placeholder="Yazeed"
          value={name}
          onChangeText={(text) => setName(text)}
        />

        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          placeholder="+44-395 335 2894"
          value={phoneNumber}
          onChangeText={(text) => setPhoneNumber(text)}
        />

        <Text style={styles.label}>Mail ID</Text>
        <TextInput
          style={styles.input}
          placeholder="yazeed652@gmail.com"
          value={mailID}
          onChangeText={(text) => setMailID(text)}
        />

        <Text style={styles.label}>Date of Birth</Text>
        <TouchableOpacity
          onPress={() => setShow(true)}
          style={styles.datePicker}
        >
          <Text>{date.toLocaleDateString()}</Text>
          <FontAwesome name="calendar" size={20} color="#5BD894" />
        </TouchableOpacity>

        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="date"
            display="default"
            onChange={onChange}
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
