import { Asset } from "expo-asset";
import { Image, StyleSheet } from "react-native";

export default function ImageViewer({ selectedImage, style }: any) {
    const imageSource = selectedImage
        ? { uri: selectedImage }
        : {
              uri: Asset.fromModule(require("@/assets/images/common/no_image.png")).uri,
          };

    return <Image source={imageSource} style={[styles.image, style]} />;
}

const styles = StyleSheet.create({
    image: {
        objectFit: "fill",
        borderRadius: 20,
    },
});
