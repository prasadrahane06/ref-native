import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  Pressable,
} from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { AUIThemedText } from "@/components/common/AUIThemedText";
import { AUIThemedView } from "@/components/common/AUIThemedView";

const { height: screenHeight } = Dimensions.get("window");

type InfoRowProps = {
  iconType:
    | "email"
    | "phone"
    | "qualification"
    | "year"
    | "language"
    | "country"
    | "city"
    | "state";
  text: string;
  value: string;
};

const InfoRow: React.FC<InfoRowProps> = ({ iconType, text, value }) => {
  let icon = null;

  switch (iconType) {
    case "email":
      icon = <FontAwesome name="envelope" size={24} color="#5BD894" />;
      break;
    case "phone":
      icon = <Ionicons name="call" size={24} color="#5BD894" />;
      break;
    case "qualification":
      icon = <Ionicons name="document-text" size={24} color="#5BD894" />;
      break;
    case "year":
      icon = <Ionicons name="calendar" size={24} color="#5BD894" />;
      break;
    case "language":
      icon = <Ionicons name="language" size={24} color="#5BD894" />;
      break;
    case "country":
      icon = <Ionicons name="earth" size={24} color="#5BD894" />;
      break;
    case "city":
      icon = <Ionicons name="location" size={24} color="#5BD894" />;
      break;
    case "state":
      icon = <Ionicons name="map" size={24} color="#5BD894" />;
      break;
    default:
      icon = null;
      break;
  }

  return (
    <AUIThemedView style={styles.infoRowContainer}>
      <View style={styles.infoRow}>
        {icon}
        <AUIThemedText style={styles.infoText}>{text}</AUIThemedText>
      </View>
      <AUIThemedText style={styles.infoValue} numberOfLines={1}>
        {value}
      </AUIThemedText>
    </AUIThemedView>
  );
};

const Profile: React.FC = () => {
  return (
    <AUIThemedView style={styles.container}>
      <AUIThemedView style={styles.profileContainer}>
        <View style={styles.header}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1562788869-4ed32648eb72?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHByb2Zlc3Npb25hbCUyMG1hbnxlbnwwfHwwfHx8MA%3D%3D",
            }}
            style={styles.avatar}
          />
          <AUIThemedText style={styles.name}>Dinesh Kale</AUIThemedText>
        </View>

        <Pressable style={styles.editIconContainer}>
          <Ionicons
            name="pencil"
            style={styles.editIcon}
            size={16}
            color="#5BD894"
          />
          <AUIThemedText style={styles.editText}>Edit</AUIThemedText>
        </Pressable>
      </AUIThemedView>

      <AUIThemedView
        style={[styles.infoContainer, { height: screenHeight * 0.7 }]}
      >
        <InfoRow iconType="email" text="Email" value="email@gmail.com" />
        <InfoRow iconType="phone" text="Phone" value="1234567890" />
        <InfoRow iconType="qualification" text="Qualification" value="B.com" />
        <InfoRow iconType="year" text="Academic year" value="2024" />
        <InfoRow iconType="language" text="Language" value="English" />
        <InfoRow iconType="country" text="Country" value="India" />
        <InfoRow iconType="state" text="State" value="Maharashtra" />
        <InfoRow iconType="city" text="City" value="Mumbai" />
      </AUIThemedView>
    </AUIThemedView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    alignItems: "center",
    // marginTop: 25,
    height: 100,
  },
  profileContainer: {
    alignItems: "center",
    position: "relative",
  },
  header: {
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 5,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 65,
    // marginBottom: 10,
  },
  name: {
    fontSize: 18,
    color: "#5BD894",
    fontWeight: "bold",
    marginTop: 5,
  },
  editIconContainer: {
    position: "absolute",
    bottom: 0,
    left: 155,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 15,
    padding: 5,
    cursor: "pointer",
  },
  editText: {
    marginLeft: 5,
    fontWeight: "500",
    color: "blue",
  },
  editIcon: { color: "blue" },
  infoContainer: {
    marginTop: 10,
    height: 500,
    width: 300,
  },
  infoRowContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#DCDCDC",
    paddingHorizontal: 10,
    borderRadius: 8,
    marginVertical: 3,
  },
  infoRow: { flexDirection: "row", alignItems: "center", flexShrink: 1 },
  infoText: {
    marginLeft: 10,
    marginRight: 20,
  },
  infoValue: {
    marginLeft: 10,
    fontWeight: "700",
    flex: 1,
    flexShrink: 1,
    flexWrap: "wrap",
    textAlign: "right",
  },
});
