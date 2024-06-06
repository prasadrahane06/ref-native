import { LinearGradient } from "expo-linear-gradient";
import { ImageBackground, StyleSheet } from "react-native";
import { AUIThemedText } from "./common/AUIThemedText";
import { AUIThemedView } from "./common/AUIThemedView";

const Destination = ({ title, image }: any) => (
  <AUIThemedView style={styles.item}>
    <AUIThemedView style={styles.imageContainer}>
      <ImageBackground style={styles.image} source={image}>
        <LinearGradient
          colors={[
            "rgba(72,77,72, 1)",
            "rgba(149,207,156, 0.5)",
            "rgba(149,207,156, 0.3)",
            "rgba(149,207,156, 0.2)",
            "transparent",
          ]}
          style={styles.gradient}
          start={{ x: 0, y: 1 }}
          end={{ x: 0, y: 0 }}
        />
        <AUIThemedText style={styles.destinationImageText}>
          {title}
        </AUIThemedText>
      </ImageBackground>
    </AUIThemedView>
  </AUIThemedView>
);

const styles = StyleSheet.create({
  item: {
    paddingVertical: 10,
    marginRight: 18,
  },
  imageContainer: {
    position: "relative",
    width: 90,
    height: 90,
    borderRadius: 7,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 7,
  },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "100%",
    borderRadius: 7,
  },
  destinationImageText: {
    color: "white",
    top: 60,
    textAlign: "center",
    fontSize: 15,
    fontWeight: "600",
  },
});

export default Destination;
