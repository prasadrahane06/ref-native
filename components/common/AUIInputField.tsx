import { APP_THEME, TEXT_THEME } from "@/constants/Colors";
import { inputFieldStyle } from "@/constants/Styles";
import { RootState } from "@/redux/store";
import React from "react";
import { Text, TextInput, TextInputProps, View } from "react-native";
import { useSelector } from "react-redux";
import { AUIThemedText } from "./AUIThemedText";

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
    const theme = useSelector((state: RootState) => state.global.theme);

    return (
        <View style={[inputFieldStyle.container, style]}>
            {label && (
                <AUIThemedText
                    style={[inputFieldStyle.label, { color: TEXT_THEME[theme].primary }]}
                >
                    {label}
                </AUIThemedText>
            )}
            <TextInput
                style={[
                    inputFieldStyle.input,
                    // @ts-ignore
                    error && { borderWidth: 1, borderColor: "red" },
                    inputStyle,
                    { color: TEXT_THEME[theme].primary },
                ]}
                placeholder={placeholder}
                placeholderTextColor={APP_THEME[theme].gray}
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
