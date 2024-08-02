import { BACKGROUND_THEME, TEXT_THEME, ThemeType } from "@/constants/Colors";
import { RootState } from "@/redux/store";
import React, { useState } from "react";
import { StyleSheet, TextStyle } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { useSelector } from "react-redux";
import AUIImage from "./AUIImage";
import { AUIThemedText } from "./AUIThemedText";
import { AUIThemedView } from "./AUIThemedView";
import { Image } from "expo-image";

interface DropdownItem {
    label: string;
    value: string | number;
}
type Props = {
    label: string;
    list: DropdownItem[];
    value: string | number | any | null | undefined;
    setValue: Function;
    labelField?: string;
    valueField?: string;
    style?: any;
    placeholder?: string;
    position?: "auto" | "bottom" | "top";
    listWithIcon?: boolean;
    iconField?: string;
    renderLeftIcon?: any;
    labelStyles?: TextStyle;
    itemLabelStyle?: TextStyle;
    isSearchable?: boolean;
};

const DropdownComponent = ({
    label,
    list,
    value,
    setValue,
    labelField = "label",
    valueField = "value",
    style,
    listWithIcon,
    placeholder,
    position = "bottom",
    iconField = "iconUri",
    renderLeftIcon,
    labelStyles,
    itemLabelStyle,
    isSearchable = true,
}: Props) => {
    const [isFocus, setIsFocus] = useState(false);
    const theme = useSelector((state: RootState) => state.global.theme) as ThemeType;

    return (
        <AUIThemedView style={style}>
            {label && (
                <AUIThemedText
                    numberOfLines={1}
                    style={[
                        styles.label,
                        labelStyles,
                        // isFocus && { color: TEXT_THEME[theme].primary },
                    ]}
                >
                    {label}
                </AUIThemedText>
            )}
            <Dropdown
                style={[
                    styles.dropdown,
                    { backgroundColor: BACKGROUND_THEME[theme].background },
                    isFocus && { borderColor: TEXT_THEME[theme].primary },
                ]}
                placeholderStyle={[styles.placeholderStyle, { color: TEXT_THEME[theme].primary }]}
                selectedTextStyle={[styles.selectedTextStyle, { color: TEXT_THEME[theme].primary }]}
                inputSearchStyle={[
                    styles.inputSearchStyle,
                    {
                        backgroundColor: BACKGROUND_THEME[theme].background,
                        color: TEXT_THEME[theme].primary,
                    },
                ]}
                // itemTextStyle={{ borderWidth: 1, width: "100%" }}
                iconStyle={styles.iconStyle}
                data={list}
                search={isSearchable}
                maxHeight={300}
                labelField={labelField || "label"}
                valueField={valueField || "value"}
                placeholder={!isFocus ? placeholder || "Select item" : "..."}
                searchPlaceholder="Search..."
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={(item: any) => {
                    setValue(item);
                    setIsFocus(false);
                }}
                dropdownPosition={position}
                renderLeftIcon={
                    renderLeftIcon
                        ? () => (
                              <Image
                                  style={{
                                      borderRadius: 50,
                                      width: 30,
                                      height: 30,
                                      marginRight: 3,
                                  }}
                                  source={{
                                      // @ts-ignore
                                      uri: list.find((x: any) => x[valueField] === value)[
                                          iconField
                                      ],
                                  }}
                              />
                          )
                        : () => null
                }
                renderItem={(item) =>
                    listWithIcon ? (
                        <RenderItemWithIcon
                            item={item}
                            labelField={labelField}
                            iconField={iconField}
                            itemLabelStyle={itemLabelStyle}
                            theme={theme}
                        />
                    ) : (
                        <RenderDefaultItem item={item} labelField={labelField} />
                    )
                }
                containerStyle={{ backgroundColor: BACKGROUND_THEME[theme].background }}
            />
        </AUIThemedView>
    );
};

export default DropdownComponent;

interface RenderItemWithIconProps {
    item: any;
    labelField: any;
    iconField: any;
    itemLabelStyle: any;
    theme: ThemeType;
}

const RenderItemWithIcon = ({
    item,
    labelField,
    iconField,
    itemLabelStyle,
    theme,
}: RenderItemWithIconProps) => (
    <AUIThemedView
        style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 3,
            // marginVertical: 5,
            paddingVertical: 5,
            backgroundColor: BACKGROUND_THEME[theme].background,
        }}
    >
        <Image
            style={{
                borderRadius: 50,
                width: 30,
                height: 30,
                marginRight: 3,
            }}
            source={item[iconField]}
        />
        <AUIThemedText style={[itemLabelStyle]}>{item[labelField]}</AUIThemedText>
    </AUIThemedView>
);

const RenderDefaultItem = ({ item, labelField }: any) => (
    <AUIThemedText style={styles.renderDefaultItem}>{item[labelField]}</AUIThemedText>
);
const styles = StyleSheet.create({
    dropdown: {
        height: 50,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 4,
        paddingHorizontal: 5,
    },

    icon: {
        marginRight: 5,
    },
    label: {
        marginBottom: 5,
        fontSize: 16,
        fontWeight: "500",
        letterSpacing: -0.32,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    renderDefaultItem: {
        paddingVertical: 12,
        paddingHorizontal: 5,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
});
