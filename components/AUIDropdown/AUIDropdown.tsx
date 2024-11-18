import React from "react";
import { View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import styles from "./style";

/**
 * AUIDropdown is a custom component for displaying a dropdown menu.
 *
 * @param {DropdownItem[]} items - Array of items to display in the dropdown. Each item must have a `label` and `value`.
 * @param {(value: string) => void} onValueChange - A callback function that is called when the selected value changes.
 * @param {string} [placeholder] - A placeholder text to display when no item is selected.
 * @param {string} [value] - The currently selected value.
 */

interface DropdownItem {
    label: string;
    value: string;
}

interface CustomDropdownProps {
    items: DropdownItem[];
    onValueChange: (value: string) => void;
    placeholder?: string;
    value?: string;
}

const AUIDropdown: React.FC<CustomDropdownProps> = ({
    items,
    onValueChange,
    placeholder,
    value,
}) => {
    return (
        <View style={styles.container}>
            <Picker
                selectedValue={value}
                onValueChange={(itemValue) => onValueChange(itemValue)}
                style={styles.picker}
            >
                <Picker.Item label={placeholder} value={null} />
                {items.map((item) => (
                    <Picker.Item key={item.value} label={item.label} value={item.value} />
                ))}
            </Picker>
        </View>
    );
};

export default AUIDropdown;
