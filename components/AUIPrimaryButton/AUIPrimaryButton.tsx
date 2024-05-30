import React from "react";
import { TouchableOpacity, Text, TouchableOpacityProps } from "react-native";
import styles from "./style";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  style?: any;
  background?: string;
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
  style,
  background,
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, style, { backgroundColor: background }]}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default AUIPrimaryButton;
