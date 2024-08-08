import Flag from "@/components/Flag";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import React from "react";
import { FlatList, StyleSheet } from "react-native";

interface LanguageListProps {
    data: any[];
    selectedLanguage: string;
    setSelectedLanguage: any;
}

const LanguageList: React.FC<LanguageListProps> = ({
    data,
    selectedLanguage,
    setSelectedLanguage,
}) => {
    const sortedData = data?.filter((item) => item.name !== selectedLanguage) || [];
    const selectedItem = data?.find((item) => item.name === selectedLanguage);

    const modifiedData = [{ name: selectedLanguage, ...(selectedItem || {}) }, ...sortedData];
    
    return (
        <AUIThemedView style={styles.container}>
            <FlatList
                horizontal
                data={modifiedData}
                renderItem={({ item }) => {
                    return (
                        <Flag
                            countryName={item?.name}
                            flag={item?.image}
                            countryCode={item.code}
                            isSelected={item.name === selectedLanguage}
                            onSelect={() => setSelectedLanguage(item.name)}
                        />
                    );
                }}
                keyExtractor={(item) => item?._id}
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
