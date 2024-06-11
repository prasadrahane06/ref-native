import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import { AUIThemedText } from "@/components/common/AUIThemedText";

interface CourseCardProps {
  title: string;
  startDate: string;
  image: any;
}

const FavoritesCourseCard: React.FC<CourseCardProps> = ({
  title,
  startDate,
  image,
}) => {
  return (
    <AUIThemedView style={styles.card}>
      <Image source={image} style={styles.image} />
      <AUIThemedView style={styles.info}>
        <AUIThemedText style={styles.title}>{title}</AUIThemedText>
        <AUIThemedView style={styles.startDateContainer}>
          <AUIThemedText style={styles.boldText}>Starting from: </AUIThemedText>
          <AUIThemedText style={styles.startDate}>{startDate}</AUIThemedText>
        </AUIThemedView>
      </AUIThemedView>
      <View style={styles.iconContainer}>
        <MaterialIcons
          name="favorite"
          size={18}
          color="red"
          style={styles.icon}
        />
      </View>
    </AUIThemedView>
  );
};

export default FavoritesCourseCard;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: "column",
    borderWidth: 1,
    borderColor: "#5BD894",
    borderRadius: 10,
    margin: 7,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 60,
    backgroundColor: "#808080",
  },
  info: {
    paddingHorizontal: 4,
    paddingVertical: 3,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
  },
  startDateContainer: {
    flexDirection: "row",
  },
  boldText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  startDate: {
    fontSize: 14,
    color: "#808080",
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
