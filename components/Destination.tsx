import { LinearGradient } from "expo-linear-gradient";
import { ImageBackground, StyleSheet, TouchableOpacity } from "react-native";
import { AUIThemedText } from "./common/AUIThemedText";
import { AUIThemedView } from "./common/AUIThemedView";
import { MaterialIcons } from "@expo/vector-icons";
import AUIBackgroundImage from "./common/AUIBackgroundImage";
import { router } from "expo-router";

const Destination = ({
  title,
  image,
  countryWidth,
  countryHeight,
  countryTopPosition,
  favorite,
}: any) => {
  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: `(home)/cityDetails/1`,
        })
      }
    >
      <AUIThemedView style={styles.item}>
        <AUIThemedView
          style={[
            styles.imageContainer,
            countryWidth && countryHeight && countryTopPosition
              ? { width: countryWidth, height: countryHeight }
              : {},
          ]}
        >
          <AUIBackgroundImage style={styles.image} path={image}>
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
            <AUIThemedText
              style={[
                styles.destinationImageText,
                countryTopPosition ? { top: countryTopPosition } : {},
              ]}
            >
              {title}
            </AUIThemedText>
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
          </AUIBackgroundImage>
        </AUIThemedView>
      </AUIThemedView>
    </TouchableOpacity>
  );
};

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

export default Destination;
