import { StyleSheet, Image } from "react-native";
import AUIImage from "./common/AUIImage";
import { Asset } from "expo-asset";

export default function ImageViewer({ placeholderImageSource, selectedImage, style }: any) {
    const imageSource = selectedImage ? { uri: selectedImage } : placeholderImageSource;

    return <Image source={imageSource} style={[styles.image, style]} />;
}

const styles = StyleSheet.create({
    image: {
        objectFit: "fill",
        borderRadius: 20,
    },
});
