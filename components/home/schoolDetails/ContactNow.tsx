import React from "react";
import { StyleSheet, TouchableOpacity, GestureResponderEvent } from "react-native";

interface IconComponentProps {
    name: string;
    onPress: (event: GestureResponderEvent) => void;
    IconComponent: any;
}

const ContactNow: React.FC<IconComponentProps> = ({ name, onPress, IconComponent }) => {
    return (
        <TouchableOpacity style={styles.iconContainer} onPress={onPress}>
            <IconComponent name={name} size={24} color="#5BD894" />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    iconContainer: {
        width: 57,
        height: 57,
        borderRadius: 30,
        backgroundColor: "#D3FFE7",
        justifyContent: "center",
        alignItems: "center",
        margin: 10,
        borderColor: "#5BD894",
        borderWidth: 2,
    },
});

export default ContactNow;
