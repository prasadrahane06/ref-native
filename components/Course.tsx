import { APP_THEME } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { AUIThemedText } from "./common/AUIThemedText";
import { AUIThemedView } from "./common/AUIThemedView";
import AUIImage from "./common/AUIImage";

interface CourseProps {
  title: string;
  image: any;
  favorite?: boolean;
}

const Course: React.FC<CourseProps> = ({ title, image, favorite }) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: `(home)/courseDetails/1`,
        })
      }
    >
      <AUIThemedView>
        <AUIImage style={styles.courseImage} path={image} />
        <AUIThemedView style={styles.courseItemContainer}>
          <Text style={styles.courseTitle}>{title}</Text>
          <AUIThemedText style={{ fontSize: 12 }}>
            <AUIThemedText style={styles.courseCaption}>
              Starting from:{" "}
            </AUIThemedText>
            20-04-2024
          </AUIThemedText>
        </AUIThemedView>
        {favorite && (
          <AUIThemedView style={styles.iconContainer}>
            <MaterialIcons
              name="favorite"
              size={18}
              color="red"
              style={styles.icon}
            />
          </AUIThemedView>
        )}
      </AUIThemedView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  courseItemContainer: {
    paddingLeft: 10,
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderColor: APP_THEME.primary.first,
  },
  courseImage: {
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    width: "100%",
    height: 100,
  },
  courseTitle: {
    fontSize: 13,
    fontWeight: "700",
  },
  courseCaption: {
    fontSize: 12,
    fontWeight: "bold",
  },
  iconContainer: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(255, 0, 0, 0.2)",
    borderRadius: 20,
    padding: 5,
  },
  icon: {
    alignSelf: "center",
  },
});

export default Course;
