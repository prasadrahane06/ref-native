import { AUIThemedText } from "@/components/common/AUIThemedText";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import { StyleSheet } from "react-native";

export default function TabTwoScreen() {
  return (
    <AUIThemedView style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
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
