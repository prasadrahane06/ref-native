import { imageStyles } from "@/constants/Styles";
import React from "react";
import { Image } from "expo-image";
import { Asset } from "expo-asset";

const AUIImage = ({ path, style, preview, icon, ...props }: any) => {
    let source = "";

    if (typeof path === "object") {
        if (path.uri) {
            source = path.uri;
        } else if (path.localUri) {
            source = path.localUri;
        } else {
            return null;
        }
    } else {
        source = path;
    }

    return (
        <Image
            source={{
                uri:
                    source ||
                    Asset.fromModule(require("@/assets/images/local/no_image.png"))?.uri ||
                    Asset.fromModule(require("@/assets/images/local/no_image.png"))?.localUri,
            }}
            style={icon ? [imageStyles.defaultIcon, style] : [imageStyles.defaultPreview, style]}
            {...props}
        />
    );
};

export default AUIImage;
