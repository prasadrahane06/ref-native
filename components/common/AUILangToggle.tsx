import { BACKGROUND_THEME, BUTTON_THEME, ThemeType } from '@/constants/Colors'; // Assuming ThemeType is defined here
import { RootState } from '@/redux/store';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';

const AUILangToggle: React.FC = () => {
    const [selectedLang, setSelectedLang] = useState<'EN' | 'AR'>('EN');
    const { i18n } = useTranslation();
    const theme = useSelector((state: RootState) => state.global.theme) as ThemeType;

    const handleToggle = (lang: 'EN' | 'AR') => {
        i18n.changeLanguage(lang === "EN" ? "en" : "ar");
        setSelectedLang(lang);
    };

    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 20,
            borderWidth: 1,
            borderColor: BUTTON_THEME[theme].toggle.borderColor
        },
        buttonLeft: {
            paddingVertical: 10,
            paddingHorizontal: 20,
            backgroundColor: 'transparent',
            borderTopLeftRadius: 20,
            borderBottomLeftRadius: 20,
            borderColor: BUTTON_THEME[theme].toggle.borderColor,
        },
        buttonRight: {
            paddingVertical: 10,
            paddingHorizontal: 20,
            backgroundColor: 'transparent',
            borderTopRightRadius: 20,
            borderBottomRightRadius: 20,
            borderColor: BUTTON_THEME[theme].toggle.borderColor,
        },
        selectedButton: {
            backgroundColor: BUTTON_THEME[theme].toggle.selected_background,
        },
        buttonText: {
            fontSize: 16,
            color: BUTTON_THEME[theme].toggle.textColor,
        },
    });

    return (
        <View style={[styles.container, { backgroundColor: BACKGROUND_THEME[theme].background }]}>
            <TouchableOpacity
                style={[
                    styles.buttonLeft,
                    selectedLang === 'EN' ? styles.selectedButton : null,
                ]}
                onPress={() => handleToggle('EN')}
            >
                <Text style={[styles.buttonText]}>
                    EN
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[
                    styles.buttonRight,
                    selectedLang === 'AR' ? styles.selectedButton : null,
                ]}
                onPress={() => handleToggle('AR')}
            >
                <Text style={[styles.buttonText]}>
                    AR
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default AUILangToggle;
