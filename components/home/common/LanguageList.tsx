import Flag from "@/components/Flag";
import React from "react";
import { FlatList, StyleSheet } from "react-native";

interface LanguageListProps {
    data: any[];
    selectedLanguage: string;
    setSelectedLanguage: (code: string) => void;
}

const LanguageList: React.FC<LanguageListProps> = ({
    data,
    selectedLanguage,
    setSelectedLanguage,
}) => {
    return (
        <FlatList
            horizontal
            data={data}
            renderItem={({ item }) => (
                <Flag
                    countryName={item.language.name}
                    countryCode={item.code}
                    isSelected={item.code === selectedLanguage}
                    onSelect={() => setSelectedLanguage(item.code)}
                />
            )}
            contentContainerStyle={styles.container}
            keyExtractor={(item) => item.uniqueId}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
    },
});

export default LanguageList;
