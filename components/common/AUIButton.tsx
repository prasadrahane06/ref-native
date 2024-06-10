import React from "react";
import {
  TouchableOpacity,
  Text,
  TouchableOpacityProps,
  View,
  Pressable,
  Image,
} from "react-native";
import { buttonStyle } from "@/constants/Styles";
import { AUILinearGradient } from "./AUILinearGradient";
import { APP_THEME, BUTTON_THEME } from "@/constants/Colors";
import { AntDesign } from "@expo/vector-icons";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  background?: string;
  selected?: boolean;
  disabled?: boolean;
  icon?: any;
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
  icon,
  disabled,
}) => {
  return (
    <Pressable
      style={[buttonStyle.button, style]}
      onPress={disabled ? () => null : onPress}
    >
      {selected ? (
        <HighlightedBtn disabled={disabled} title={title} icon={icon} />
      ) : (
        <DefaultBtn disabled={disabled} title={title} icon={icon} />
      )}
    </Pressable>
  );
};

const HighlightedBtn = ({ disabled, title, icon }: any) => (
  <AUILinearGradient
    style={buttonStyle.buttonInner}
    colors={
      disabled
        ? ["#dcdcdd", "#dcdcdd"]
        : [APP_THEME.primary.first, APP_THEME.primary.first]
    }
  >
    <Text style={buttonStyle.buttonText}>{title}</Text>
    {icon && <AntDesign name={icon} size={24} color="#ffffff" />}
  </AUILinearGradient>
);
const DefaultBtn = ({ disabled, title, icon }: any) => (
  <AUILinearGradient
    style={[
      buttonStyle.buttonInner,
      !disabled && { borderWidth: 1, borderColor: APP_THEME.gray },
    ]}
    colors={
      disabled
        ? ["#dcdcdd", "#dcdcdd"]
        : [BUTTON_THEME.primary.color, BUTTON_THEME.primary.color]
    }
  >
    <Text
      style={[buttonStyle.buttonText, !disabled && { color: APP_THEME.gray }]}
    >
      {title}
    </Text>
    {icon && <AntDesign name={icon} size={24} color="#ffffff" />}
  </AUILinearGradient>
);
export default AUIButton;
