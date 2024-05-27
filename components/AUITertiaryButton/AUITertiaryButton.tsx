import React from "react";
import { TouchableOpacity, Text, TouchableOpacityProps } from "react-native";
import styles from "./style";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
}
/**
 *AUITertiaryButton is a custom button component that displays a title and an icon.
 *
 * @param {string} props.title
 * @param {Function} [props.onPress]
 * @returns {React.ReactElement}
 */
const AUITertiaryButton: React.FC<ButtonProps> = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={[styles.button]} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default AUITertiaryButton;
