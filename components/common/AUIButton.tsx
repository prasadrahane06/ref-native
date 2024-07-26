import {
    APP_THEME,
    BACKGROUND_THEME,
    BUTTON_THEME,
    TEXT_THEME,
    ThemeType,
} from "@/constants/Colors";
import { buttonStyle } from "@/constants/Styles";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text, TouchableOpacityProps } from "react-native";
import { AUILinearGradient } from "./AUILinearGradient";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { AUIThemedText } from "./AUIThemedText";

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
    const theme = useSelector((state: RootState) => state.global.theme);

    return (
        <Pressable style={[buttonStyle.button, style]} onPress={disabled ? () => null : onPress}>
            {selected ? (
                <HighlightedBtn
                    disabled={disabled}
                    title={title}
                    icon={icon}
                    regularText={regularText}
                    theme={theme}
                    background={background}
                />
            ) : (
                <DefaultBtn
                    disabled={disabled}
                    title={title}
                    icon={icon}
                    borderColor={borderColor}
                    theme={theme}
                />
            )}
        </Pressable>
    );
};

interface HighlightedBtnProps {
    disabled: any;
    title: any;
    icon?: any;
    regularText?: any;
    theme: ThemeType;
    background?: string;
}

const HighlightedBtn = ({
    disabled,
    title,
    icon,
    regularText,
    theme,
    background,
}: HighlightedBtnProps) => (
    <AUILinearGradient
        style={buttonStyle.buttonInner}
        colors={
            disabled
                ? [BUTTON_THEME[theme].disabled.background, BUTTON_THEME[theme].disabled.background]
                : [
                      background || APP_THEME[theme].primary.first,
                      background || APP_THEME[theme].primary.first,
                  ]
        }
    >
        <AUIThemedText
            style={[
                buttonStyle.buttonText,
                { color: BUTTON_THEME[theme].disabled.color },
                regularText && buttonStyle.regularText,
            ]}
        >
            {title}
        </AUIThemedText>
        {icon && <AntDesign name={icon} size={24} color="#ffffff" />}
    </AUILinearGradient>
);

interface DefaultBtnProps {
    disabled: any;
    title: any;
    icon?: any;
    borderColor?: any;
    theme: ThemeType;
    background?: string;
}

const DefaultBtn = ({ disabled, title, icon, borderColor, theme }: DefaultBtnProps) => (
    <AUILinearGradient
        style={[
            buttonStyle.buttonInner,
            !disabled && { borderWidth: 1, borderColor: borderColor || APP_THEME[theme].gray },
        ]}
        colors={
            disabled
                ? [BUTTON_THEME[theme].disabled.background, BUTTON_THEME[theme].disabled.background]
                : [BACKGROUND_THEME[theme].background, BACKGROUND_THEME[theme].background]
        }
    >
        <Text style={[buttonStyle.buttonText, !disabled && { color: TEXT_THEME[theme].primary }]}>
            {title}
        </Text>
        {icon && <AntDesign name={icon} size={24} color="#ffffff" />}
    </AUILinearGradient>
);
export default AUIButton;
