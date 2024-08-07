import React from "react";
import { AUIThemedView } from "./AUIThemedView";
import { AUIThemedText } from "./AUIThemedText";
import { useTranslation } from "react-i18next";
// import { t } from "i18next";

const AUIComingSoon = () => {
    const { t } = useTranslation();
    return (
        <AUIThemedView
            style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 50 }}
        >
            <AUIThemedText style={{ fontSize: 18 }}> {t("coming_soon")}...</AUIThemedText>
        </AUIThemedView>
    );
};

export default AUIComingSoon;
