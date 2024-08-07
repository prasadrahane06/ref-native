import { Asset } from "expo-asset";
import { Image } from "expo-image";
import { StyleSheet } from "react-native";

export default function ImageViewer({ selectedImage, style }: any) {
    // const imageSource = selectedImage
    //     ? { uri: selectedImage }
    //     : {
    //           uri: Asset.fromModule(require("@/assets/images/local/no_image.png"))?.uri,
    //       };

    return (
        <Image
            source={{
                uri:
                    selectedImage ||
                    Asset.fromModule(require("@/assets/images/local/no_image.png"))?.uri ||
                    Asset.fromModule(require("@/assets/images/local/no_image.png"))?.localUri,
            }}
            style={[styles.image, style]}
        />
    );
}

const styles = StyleSheet.create({
    image: {
        objectFit: "fill",
        borderRadius: 20,
    },
});
