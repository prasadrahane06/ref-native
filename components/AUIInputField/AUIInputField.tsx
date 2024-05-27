import React from "react";
import { View, TextInput, Text, TextInputProps } from "react-native";
import styles from "./style";

/**
 * AUIInputField is a custom component of input field.
 *@param {string} [label]
 * @param {string} [placeholder]
 * @param {string} value
 * @param {string} onChangeText
 *@param {string} [error]
 *
 */

interface CustomInputProps extends TextInputProps {
  label?: string;
  error?: string;
}

const AUIInputField: React.FC<CustomInputProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  error,
  style,
  ...props
}) => {
  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[styles.input]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        {...props}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

export default AUIInputField;
