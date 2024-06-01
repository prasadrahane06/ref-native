import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Image, Platform } from "react-native";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import { AUIThemedText } from "@/components/common/AUIThemedText";

export default function TabTwoScreen() {
  return (
    <AUIThemedView>
      <AUIThemedText>favourite</AUIThemedText>
    </AUIThemedView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});