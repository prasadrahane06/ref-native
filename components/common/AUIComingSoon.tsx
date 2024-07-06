import React from "react";
import { AUIThemedView } from "./AUIThemedView";
import { AUIThemedText } from "./AUIThemedText";

const AUIComingSoon = () => {
    return (
        <AUIThemedView
            style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 50 }}
        >
            <AUIThemedText style={{ fontSize: 18 }}>Coming soon...</AUIThemedText>
        </AUIThemedView>
    );
};

export default AUIComingSoon;
