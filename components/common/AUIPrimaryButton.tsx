import React from "react";
import {
  TouchableOpacity,
  Text,
  TouchableOpacityProps,
  View,
} from "react-native";
import { buttonStyle } from "@/constants/Styles";
import { AUILinearGradient } from "./AUILinearGradient";
import { APP_THEME } from "@/constants/Colors";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  background?: string;
  selected?: boolean;
}
/**
 *AUIPrimaryButton is a custom button component that displays a title and an icon.
 *
 * @param {string} props.title
 * @param {Function} [props.onPress]
 * @returns {React.ReactElement}
 */

const AUIPrimaryButton: React.FC<ButtonProps> = ({
  title,
  onPress,
  background,
  selected,
}) => {
  return (
    <TouchableOpacity style={[buttonStyle.button]} onPress={onPress}>
      <AUILinearGradient
        style={buttonStyle.buttonInner}
        colors={
          selected
            ? [APP_THEME.primary.first, APP_THEME.primary.first]
            : background
            ? [background, background]
            : [APP_THEME.ternary.second, APP_THEME.ternary.second]
        }
      >
        <Text style={buttonStyle.buttonText}>{title}</Text>
      </AUILinearGradient>
    </TouchableOpacity>
  );
};

export default AUIPrimaryButton;
