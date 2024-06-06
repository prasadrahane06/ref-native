import { APP_THEME } from "@/constants/Colors";
import { Octicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";

interface DotIndicatorProps {
    selected: boolean;
}

const DotIndicator: React.FC<DotIndicatorProps> = ({ selected }) => {
    return (
        <Octicons
            style={[styles.dot]}
            name="dash"
            size={40}
            color={selected ? APP_THEME.primary.first : APP_THEME.background}
        />
    );
};

const styles = StyleSheet.create({
    dot: {
        marginHorizontal: 5,
    },
});

export default DotIndicator;
