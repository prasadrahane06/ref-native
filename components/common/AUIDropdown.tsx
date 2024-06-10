import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import { AUIThemedText } from "./AUIThemedText";
import { AUIThemedView } from "./AUIThemedView";
import {
  APP_THEME,
  COLOR_THEME,
  TEXT_THEME,
  ThemeType,
} from "@/constants/Colors";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

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
};

const DropdownComponent = ({
  label,
  list,
  value,
  setValue,
  labelField,
  valueField,
  style,
  placeholder,
  position = "bottom",
}: Props) => {
  const [isFocus, setIsFocus] = useState(false);
  const theme = useSelector(
    (state: RootState) => state.global.theme
  ) as ThemeType;

  return (
    <AUIThemedView
      style={[{ backgroundColor: "#ffffff" }, style]} //COLOR_THEME[theme].backgound
    >
      {label && (
        <AUIThemedText
          style={[
            styles.label,
            // isFocus && { color: TEXT_THEME[theme].primary },
          ]}
        >
          {label}
        </AUIThemedText>
      )}
      <Dropdown
        style={[
          styles.dropdown,
          isFocus && { borderColor: TEXT_THEME[theme].primary },
        ]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={list}
        search
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
        // renderLeftIcon={() => (
        //   <AntDesign
        //     style={styles.icon}
        //     color={isFocus ? "blue" : "black"}
        //     name="Safety"
        //     size={20}
        //   />
        // )}
      />
    </AUIThemedView>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  dropdown: {
    height: 50,

    borderColor: "#ccc",
    borderWidth: 2,
    borderRadius: 5,
    paddingHorizontal: 10,
  },

  icon: {
    marginRight: 5,
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: -0.32,
    color: APP_THEME.gray,
  },
  placeholderStyle: {
    fontSize: 16,
    color: "gray",
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
});
