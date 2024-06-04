import React from "react";
import {
  TouchableOpacity,
  Text,
  TouchableOpacityProps,
  View,
  Pressable,
} from "react-native";
import { buttonStyle } from "@/constants/Styles";
import { AUILinearGradient } from "./AUILinearGradient";
import { APP_THEME, BUTTON_THEME } from "@/constants/Colors";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  background?: string;
  selected?: boolean;
  disabled?: boolean;
}
/**
 *AUIPrimaryButton is a custom button component that displays a title and an icon.
 *
 * @param {string} props.title
 * @param {Function} [props.onPress]
 * @returns {React.ReactElement}
 */

const AUIButton: React.FC<ButtonProps> = ({
  title,
  onPress,
  background,
  selected,
  style,
  disabled,
}) => {
  return (
    <Pressable
      style={[buttonStyle.button, style]}
      onPress={disabled ? () => null : onPress}
    >
      {selected ? (
        <HighlightedBtn disabled={disabled} title={title} />
      ) : (
        <DefaultBtn disabled={disabled} title={title} />
      )}
    </Pressable>
  );
};

const HighlightedBtn = ({ disabled, title }: any) => (
  <AUILinearGradient
    style={buttonStyle.buttonInner}
    colors={
      disabled
        ? ["#dcdcdd", "#dcdcdd"]
        : [APP_THEME.primary.first, APP_THEME.secondary.first]
    }
  >
    <Text style={buttonStyle.buttonText}>{title}</Text>
  </AUILinearGradient>
);
const DefaultBtn = ({ disabled, title }: any) => (
  <AUILinearGradient
    style={[buttonStyle.buttonInner, !disabled && { borderWidth: 1 }]}
    colors={
      disabled
        ? ["#dcdcdd", "#dcdcdd"]
        : [BUTTON_THEME.primary.color, BUTTON_THEME.primary.color]
    }
  >
    <Text style={[buttonStyle.buttonText, !disabled && { color: "#000" }]}>
      {title}
    </Text>
  </AUILinearGradient>
);
export default AUIButton;
