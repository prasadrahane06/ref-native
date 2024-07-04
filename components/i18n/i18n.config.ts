import { ar, en } from "@/constants/dummy data/translations";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
    en: {
        translation: en,
    },
    ar: {
        translation: ar,
    },
};

i18next.use(initReactI18next).init({
    debug: true,
    fallbackLng: "en",
    interpolation: {
        escapeValue: false,
    },
    compatibilityJSON: "v3",
    lng: "en",
    resources,
});

export default i18next;
