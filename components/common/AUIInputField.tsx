import { inputFieldStyle } from "@/constants/Styles";
import React from "react";
import { Text, TextInput, TextInputProps, View } from "react-native";

/**
 * AUIInputField is a custom component of input field.
 * @param {string} [label]
 * @param {string} [placeholder]
 * @param {string} value
 * @param {string} onChangeText
 * @param {string} [error]
 * @param {boolean} [autoFocus]
 * @param {string} [keyboardType]
 */

interface CustomInputProps extends TextInputProps {
    label?: string;
    error?: string;
    inputStyle?: object;
    autoFocus?: boolean;
}

const AUIInputField: React.FC<CustomInputProps> = ({
    label,
    placeholder,
    value,
    onChangeText,
    error,
    style,
    inputStyle,
    autoFocus,
    keyboardType,
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
                autoFocus={autoFocus}
                keyboardType={keyboardType}
                {...props}
            />
            {error && <Text style={inputFieldStyle.error}>{error}</Text>}
        </View>
    );
};

export default AUIInputField;
