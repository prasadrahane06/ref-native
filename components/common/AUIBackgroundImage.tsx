import { imageStyles } from "@/constants/Styles";
import { Asset } from "expo-asset";
import React from "react";
import { ImageBackground } from "react-native";

const AUIBackgroundImage = ({ path, style, ...props }: any) => {
    //   const url = Asset.fromModule(require(path)).uri;
    return (
        <ImageBackground
            source={{
                uri: path || Asset.fromModule(require("@/assets/images/common/no_image.png")).uri,
            }}
            style={[imageStyles.defaultPreview, style]}
            {...props}
        />
    );
};

export default AUIBackgroundImage;
