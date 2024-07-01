import Flag from "@/components/Flag";
import { AUIThemedView } from "@/components/common/AUIThemedView";
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
        <AUIThemedView style={styles.container}>
            <FlatList
                horizontal
                data={data}
                renderItem={({ item }) => {
                    // console.log("item", item.language.name);
                    return (
                        <Flag
                            countryName={item.language.name}
                            countryCode={item.code}
                            isSelected={item.language.name === selectedLanguage}
                            onSelect={() => setSelectedLanguage(item.language.name)}
                        />
                    );
                }}
                keyExtractor={(item) => item.uniqueId.toString()}
            />
        </AUIThemedView>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingLeft: 14,
    },
});

export default LanguageList;
