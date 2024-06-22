import React from "react";
import { View, TextInput, Text, TextInputProps, Platform } from "react-native";
import { inputFieldStyle } from "@/constants/Styles";

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
  inputStyle?: object;
}

const AUIInputField: React.FC<CustomInputProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  error,
  style,
  inputStyle,
  ...props
}) => {
  return (
    <View style={[inputFieldStyle.container, style]}>
      {label && <Text style={inputFieldStyle.label}>{label}</Text>}
      <TextInput
        style={[
          inputFieldStyle.input,
          // @ts-ignore
          error && { borderWidth: 1, borderColor: "red" },
          inputStyle,
        ]}
        placeholder={placeholder}
        placeholderTextColor={"gray"}
        value={value}
        onChangeText={onChangeText}
        {...props}
      />
      {error && <Text style={inputFieldStyle.error}>{error}</Text>}
    </View>
  );
};

export default AUIInputField;
