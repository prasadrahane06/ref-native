// CustomTooltip.js
import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
import { AUIThemedView } from "./AUIThemedView";
import { AUIThemedText } from "./AUIThemedText";

const CustomTooltip = ({ children, text, tooltipStyle = {}, textStyle = {} }: any) => {
    const [visible, setVisible] = useState(false);

    const toggleTooltip = () => {
        setVisible(!visible);
    };

    return (
        <AUIThemedView>
            <TouchableOpacity onPress={toggleTooltip}>{children}</TouchableOpacity>

            {visible && (
                <Modal
                    transparent={true}
                    visible={visible}
                    animationType="fade"
                    onRequestClose={toggleTooltip}
                >
                    <TouchableOpacity style={styles.tooltipOverlay} onPress={toggleTooltip}>
                        <AUIThemedView style={[styles.tooltipContainer, tooltipStyle]}>
                            <AUIThemedText style={[styles.tooltipText, textStyle]}>
                                {text}
                            </AUIThemedText>
                        </AUIThemedView>
                    </TouchableOpacity>
                </Modal>
            )}
        </AUIThemedView>
    );
};

const styles = StyleSheet.create({
    tooltipOverlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    tooltipContainer: {
        padding: 10,
        borderRadius: 5,
        maxWidth: 350,
    },
    tooltipText: {
        fontSize: 16,
    },
});

export default CustomTooltip;
