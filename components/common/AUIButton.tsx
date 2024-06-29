import { APP_THEME, BUTTON_THEME } from "@/constants/Colors";
import { buttonStyle } from "@/constants/Styles";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text, TouchableOpacityProps } from "react-native";
import { AUILinearGradient } from "./AUILinearGradient";

interface ButtonProps extends TouchableOpacityProps {
    title: string;
    background?: string;
    selected?: boolean;
    disabled?: boolean;
    icon?: any;
    regularText?: boolean;
    borderColor?: string;
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
    regularText,
    borderColor,
}) => {
    return (
        <Pressable style={[buttonStyle.button, style]} onPress={disabled ? () => null : onPress}>
            {selected ? (
                <HighlightedBtn
                    disabled={disabled}
                    title={title}
                    icon={icon}
                    regularText={regularText}
                />
            ) : (
                <DefaultBtn
                    disabled={disabled}
                    title={title}
                    icon={icon}
                    borderColor={borderColor}
                />
            )}
        </Pressable>
    );
};

const HighlightedBtn = ({ disabled, title, icon, regularText }: any) => (
    <AUILinearGradient
        style={buttonStyle.buttonInner}
        colors={
            disabled ? ["#dcdcdd", "#dcdcdd"] : [APP_THEME.primary.first, APP_THEME.primary.first]
        }
    >
        <Text style={[buttonStyle.buttonText, regularText && buttonStyle.regularText]}>
            {title}
        </Text>
        {icon && <AntDesign name={icon} size={24} color="#ffffff" />}
    </AUILinearGradient>
);
const DefaultBtn = ({ disabled, title, icon, borderColor }: any) => (
    <AUILinearGradient
        style={[
            buttonStyle.buttonInner,
            !disabled && { borderWidth: 1, borderColor: borderColor || APP_THEME.gray },
        ]}
        colors={
            disabled
                ? ["#dcdcdd", "#dcdcdd"]
                : [BUTTON_THEME.primary.color, BUTTON_THEME.primary.color]
        }
    >
        <Text style={[buttonStyle.buttonText, !disabled && { color: APP_THEME.gray }]}>
            {title}
        </Text>
        {icon && <AntDesign name={icon} size={24} color="#ffffff" />}
    </AUILinearGradient>
);
export default AUIButton;
