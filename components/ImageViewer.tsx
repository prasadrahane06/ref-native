import { StyleSheet, Image } from "react-native";
import AUIImage from "./common/AUIImage";
import { Asset } from "expo-asset";

export default function ImageViewer({ placeholderImageSource, selectedImage }: any) {
    const imageSource = selectedImage ? { uri: selectedImage } : placeholderImageSource;

    return <Image source={imageSource} style={styles.image} />;
}

const styles = StyleSheet.create({
    image: {
        width: 100,
        height: 100,
        objectFit: "contain",
        borderRadius: 18,
    },
});
