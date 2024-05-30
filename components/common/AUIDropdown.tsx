import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import { AUIThemedText } from "./AUIThemedText";
import { AUIThemedView } from "./AUIThemedView";

interface DropdownItem {
  label: string;
  value: string | number;
}
type Props = {
  label: string;
  list: DropdownItem[];
  value: string | number | any | null | undefined;
  setValue: Function;
};

const DropdownComponent = ({ label, list, value, setValue }: Props) => {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <AUIThemedView style={styles.container}>
      <AUIThemedText style={[styles.label, isFocus && { color: "blue" }]}>
        {label}
      </AUIThemedText>
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={list}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? "Select item" : "..."}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item: any) => {
          setValue(item);
          setIsFocus(false);
        }}
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
  container: {
    backgroundColor: "white",
    // padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },

  icon: {
    marginRight: 5,
  },
  label: {
    paddingBottom: 5,
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
});
