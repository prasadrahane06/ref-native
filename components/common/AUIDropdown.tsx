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
import AUIImage from "./AUIImage";

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
}: Props) => {
  const [isFocus, setIsFocus] = useState(false);
  const theme = useSelector(
    (state: RootState) => state.global.theme
  ) as ThemeType;
  // @ts-ignore

  return (
    <AUIThemedView
      style={[{ backgroundColor: "#ffffff" }, style]} //COLOR_THEME[theme].backgound
    >
      {label && (
        <AUIThemedText
          numberOfLines={1}
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
        // itemTextStyle={{ borderWidth: 1, width: "100%" }}
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
        renderLeftIcon={
          renderLeftIcon
            ? () => (
                <AUIImage
                  icon
                  style={{
                    borderRadius: 50,
                    width: 30,
                    height: 30,
                    marginRight: 3,
                  }}
                  path={
                    // @ts-ignore
                    list.find((x: any) => x[valueField] === value)[iconField]
                  }
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
            />
          ) : (
            <RenderDefaultItem item={item} labelField={labelField} />
          )
        }
      />
    </AUIThemedView>
  );
};

export default DropdownComponent;

const RenderItemWithIcon = ({ item, labelField, iconField }: any) => (
  <AUIThemedView
    style={{
      flexDirection: "row",
      alignItems: "center",
      gap: 3,
      marginVertical: 5,
      backgroundColor: "#ffffff",
    }}
  >
    <AUIImage
      icon
      style={{
        borderRadius: 50,
        width: 30,
        height: 30,
        marginRight: 3,
      }}
      path={item[iconField]}
    />
    <AUIThemedText>{item[labelField]}</AUIThemedText>
  </AUIThemedView>
);

const RenderDefaultItem = ({ item, labelField }: any) => item[labelField];
const styles = StyleSheet.create({
  dropdown: {
    height: 50,

    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
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
