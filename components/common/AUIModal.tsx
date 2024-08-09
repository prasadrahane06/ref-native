import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Modal, StyleSheet, TouchableOpacity } from "react-native";
import { AUIThemedText } from "./AUIThemedText";
import { AUIThemedView } from "./AUIThemedView";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";

interface CustomModalProps {
    visible: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    style?: any;
}

const AUIModal: React.FC<CustomModalProps> = ({ visible, onClose, title, children, style }) => {
    const { top, bottom } = useSafeAreaInsets();
    return (
        <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
            <SafeAreaView
                style={[styles.modalContainer, style, { paddingTop: top, paddingBottom: bottom }]}
            >
                <AUIThemedView style={styles.modalContainer}>
                    <AUIThemedView style={[styles.modalContent, style]}>
                        <AUIThemedView style={styles.headerRow}>
                            <AUIThemedText style={styles.header}>{title}</AUIThemedText>
                            <TouchableOpacity onPress={onClose}>
                                <MaterialIcons name="close" size={28} />
                            </TouchableOpacity>
                        </AUIThemedView>
                        <ScrollView contentContainerStyle={styles.scrollContainer}>
                            {children}
                        </ScrollView>
                    </AUIThemedView>
                </AUIThemedView>
            </SafeAreaView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        width: "90%",
        borderRadius: 10,
        padding: 20,
    },
    headerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    header: {
        fontSize: 20,
        fontWeight: "bold",
    },
    scrollContainer: {
        padding: 20,
    },
});

export default AUIModal;
