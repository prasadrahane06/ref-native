import { imageStyles } from "@/constants/Styles";
import React from "react";
import { Image } from "react-native";
import { Asset } from "expo-asset";

const AUIImage = ({ path, style, preview, icon, ...props }: any) => {
    //   const url = Asset.fromModule(require(path)).uri;
    return (
        <Image
            source={{ uri: path || Asset.fromModule(
                require("@/assets/images/common/no_image.png")

                // "https://linguest-assets-dev.s3.ap-south-1.amazonaws.com/1718884990288-6296.jpeg"
            ).uri }}
            style={icon ? [imageStyles.defaultIcon, style] : [imageStyles.defaultPreview, style]}
            {...props}
        />
    );
};

export default AUIImage;
