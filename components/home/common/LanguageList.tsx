import Flag from "@/components/Flag";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import React from "react";
import { FlatList, StyleSheet } from "react-native";

interface LanguageListProps {
    data: any[];
    selectedLanguage : string 
    setSelectedLanguage: any;
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
                    return (
                        <Flag
                            countryName={item.language.name}
                            flag = {item.flag}
                            countryCode={item.code}
                            isSelected={item.language === selectedLanguage}
                            onSelect={() => setSelectedLanguage(item.language)}
                        />
                    );
                }}
                keyExtractor={(item) => item._id}
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
