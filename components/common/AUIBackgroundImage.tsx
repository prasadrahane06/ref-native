import { imageStyles } from "@/constants/Styles";
import { Asset } from "expo-asset";
import React from "react";
import { ImageBackground } from "react-native";

const AUIBackgroundImage = ({ path, style, ...props }: any) => {
    let source = null;

    if (typeof path === "object") {
        if (path?.uri) {
            source = path?.uri;
        } else if (path?.localUri) {
            source = path?.localUri;
        } else {
            source = null;
        }
    } else {
        source = path;
    }

    return (
        <ImageBackground
            source={{
                uri:
                    source ||
                    Asset.fromModule(require("@/assets/images/local/no_image.png"))?.uri ||
                    Asset.fromModule(require("@/assets/images/local/no_image.png"))?.localUri,
            }}
            style={[imageStyles.defaultPreview, style]}
            {...props}
        />
    );
};

export default AUIBackgroundImage;
