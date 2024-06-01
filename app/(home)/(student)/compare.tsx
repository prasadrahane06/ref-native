import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Image, Platform } from "react-native";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import { AUIThemedText } from "@/components/common/AUIThemedText";

export default function TabThreeScreen() {
  return (
    <AUIThemedView style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
      <AUIThemedText>compare</AUIThemedText>
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
