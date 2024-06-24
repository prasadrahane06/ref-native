import { imageStyles } from "@/constants/Styles";
import React from "react";
import { ImageBackground } from "react-native";

const AUIBackgroundImage = ({ path, style, ...props }: any) => {
    //   const url = Asset.fromModule(require(path)).uri;
    return (
        <ImageBackground
            source={{ uri: path }}
            style={[imageStyles.defaultPreview, style]}
            {...props}
        />
    );
};

export default AUIBackgroundImage;
