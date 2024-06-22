import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import { AUIThemedText } from "@/components/common/AUIThemedText";
import AUIImage from "@/components/common/AUIImage";
import { Asset } from "expo-asset";
import { router } from "expo-router";

export default function TabThreeScreen(props: any) {
  return (
    <AUIThemedView style={styles.container}>
      <AUIThemedText style={styles.title}>Compare School</AUIThemedText>
      <AUIImage
        style={styles.image}
        path={
          Asset.fromModule(
            require("@/assets/images/compareScreen/Group 36754.png")
          ).uri
        }
        resizeMode="contain"
      />
      <AUIThemedText style={styles.description}>
        Select and compare schools on various parameters to choose the best for
        you
      </AUIThemedText>
      <AUIThemedView style={styles.cardContainer}>
        <TouchableOpacity
          style={styles.card}
          onPress={() =>
            router.push({
              pathname: `(home)/compare/searchSchool`,
            })
          }
        >
          <Ionicons name="add-circle-outline" size={50} color="#5BD894" />
          <AUIThemedText style={styles.cardText}>Add School</AUIThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.card}
          onPress={() =>
            router.push({
              pathname: `(home)/compare/searchSchool`,
            })
          }
        >
          <Ionicons name="add-circle-outline" size={50} color="#5BD894" />
          <AUIThemedText style={styles.cardText}>Add School</AUIThemedText>
        </TouchableOpacity>
      </AUIThemedView>
    </AUIThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 15,
  },
  title: {
    alignSelf: "flex-start",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  image: {
    width: "90%",
    height: 180,
    marginBottom: 20,
  },
  description: {
    fontSize: 17,
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 20,
  },
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  card: {
    width: "48%",
    height: 160,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 10,
  },
  cardText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "400",
  },
});
