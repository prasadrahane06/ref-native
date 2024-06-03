import { AUIThemedText } from "@/components/common/AUIThemedText";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import { StyleSheet } from "react-native";

export default function HomeScreen() {
  return (
    <AUIThemedView style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
      <AUIThemedText>inside home</AUIThemedText>
    </AUIThemedView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
