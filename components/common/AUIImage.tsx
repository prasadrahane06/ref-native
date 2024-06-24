import { imageStyles } from "@/constants/Styles";
import React from "react";
import { Image } from "react-native";

const AUIImage = ({ path, style, preview, icon, ...props }: any) => {
    //   const url = Asset.fromModule(require(path)).uri;
    return (
        <Image
            source={{ uri: path }}
            style={icon ? [imageStyles.defaultIcon, style] : [imageStyles.defaultPreview, style]}
            {...props}
        />
    );
};

export default AUIImage;
