import { Image } from "react-native";
import React from "react";
import { Asset } from "expo-asset";
import { imageStyles } from "@/constants/Styles";

const AUIImage = ({ path, style, preview, icon, ...props }: any) => {
  //   const url = Asset.fromModule(require(path)).uri;
  return (
    <Image
      source={{ uri: path }}
      style={
        icon
          ? [imageStyles.defaultIcon, style]
          : [imageStyles.defaultPreview, style]
      }
      {...props}
    />
  );
};

export default AUIImage;
