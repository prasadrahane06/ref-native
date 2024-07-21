import { APP_THEME, TEXT_THEME } from "@/constants/Colors";
import { RootState } from "@/redux/store";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";

interface HeaderIconsProps {
    onNotificationPress: () => void;
}

const HeaderIcons: React.FC<HeaderIconsProps> = ({ onNotificationPress }) => {
    const theme = useSelector((state: RootState) => state.global.theme);

    return (
        <View style={{ flexDirection: "row", marginRight: 15 }}>
            <TouchableOpacity onPress={() => alert("Search")}>
                <Ionicons
                    name="search"
                    size={25}
                    style={{ marginRight: 20 }}
                    color={APP_THEME.light.primary.first}
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={onNotificationPress}>
                <Ionicons name="notifications" size={25} color={APP_THEME.light.primary.first} />
            </TouchableOpacity>
        </View>
    );
};

export default HeaderIcons;
