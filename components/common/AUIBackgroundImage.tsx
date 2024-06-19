import { Image, ImageBackground } from "react-native";
import React from "react";
import { Asset } from "expo-asset";
import { imageStyles } from "@/constants/Styles";

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
