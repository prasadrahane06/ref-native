import { AUIThemedView } from "@/components/common/AUIThemedView";
import { TouchableOpacity, View, Image, Platform } from "react-native";
import { AUIThemedText } from "@/components/common/AUIThemedText";
import { AUISafeAreaView } from "@/components/common/AUISafeAreaView";
import { AUILinearGradient } from "@/components/common/AUILinearGradient";
import { GLOBAL_TEXT } from "@/constants/Properties";
import { APP_THEME, TEXT_THEME } from "@/constants/Colors";
import { initialPageStyles } from "@/constants/Styles";
import AUIButton from "@/components/common/AUIButton";
import { useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { setTheme, setProfile } from "@/redux/globalSlice";
import { RootState } from "@/redux/store";
import DropdownComponent from "@/components/common/AUIDropdown";
import { Dropdown } from "react-native-element-dropdown";

const InitialPage = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const profile = useSelector((state: RootState) => state.global.profile);
    const theme = useSelector((state: RootState) => state.global.theme);
    const themeOptions = [
        { label: "Light", value: "light" },
        { label: "Dark", value: "dark" },
    ];

    return (
        <AUISafeAreaView edges={["bottom"]}>
            <AUIThemedView style={initialPageStyles.container}>
                <AUILinearGradient
                    style={
                        Platform.OS === "ios"
                            ? initialPageStyles.iosIndexHeader
                            : initialPageStyles.indexHeader
                    }
                >
                    <AUIThemedText
                        style={
                            Platform.OS === "ios"
                                ? initialPageStyles.iosTitle
                                : initialPageStyles.title
                        }
                    >
                        {GLOBAL_TEXT.create_your_profile}
                    </AUIThemedText>
                </AUILinearGradient>

                {/* Theme Toggle Dropdown */}
                {/* <Dropdown
                    style={{
                        borderWidth: 1,
                        borderColor: "#ccc",
                        borderRadius: 8,
                        padding: 4,
                        maxWidth: 80,
                    }}
                    renderRightIcon={() => null}
                    data={themeOptions}
                    labelField="label"
                    valueField="value"
                    value={theme === "dark" ? "🌙" : "☀️"}
                    placeholder={theme === "dark" ? "🌙" : "☀️"}
                    //@ts-ignore
                    onChange={(item) => dispatch(setTheme(item.value))}
                /> */}

                <AUIThemedView style={initialPageStyles.optionContainer}>
                    <TouchableOpacity
                        onPress={() => dispatch(setProfile("student"))}
                    >
                        <AUILinearGradient
                            style={[
                                initialPageStyles.circularViewPosition,
                                profile === "student" && {
                                    borderColor: APP_THEME.primary.first,
                                    borderWidth: 5,
                                },
                            ]}
                            locations={[0, 1]}
                            colors={["#EFFFFA", "#EFFFFA"]}
                        >
                            <Image
                                source={require("../assets/images/initialPage/student.png")}
                            />
                            <AUIThemedText
                                style={initialPageStyles.optionLabel}
                            >
                                {GLOBAL_TEXT.student}
                            </AUIThemedText>
                        </AUILinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => dispatch(setProfile("school"))}
                    >
                        <AUILinearGradient
                            style={[
                                initialPageStyles.circularViewPosition,
                                profile === "school" && {
                                    borderColor: APP_THEME.primary.first,
                                    borderWidth: 5,
                                },
                            ]}
                            locations={[0, 1]}
                            colors={["#EFFFFA", "#EFFFFA"]}
                        >
                            <Image
                                source={require("../assets/images/initialPage/school.png")}
                            />
                            <AUIThemedText
                                style={initialPageStyles.optionLabel}
                            >
                                {GLOBAL_TEXT.school}
                            </AUIThemedText>
                        </AUILinearGradient>
                    </TouchableOpacity>
                </AUIThemedView>

                <AUIThemedView style={initialPageStyles.button}>
                    <AUIButton
                        title="Continue"
                        disabled={!profile}
                        selected={Boolean(profile)}
                        onPress={() => router.navigate("/signup")}
                    />
                </AUIThemedView>

                <AUIThemedView style={initialPageStyles.imageContainer}>
                    <Image
                        resizeMode="contain"
                        source={require("../assets/images/initialPage/home.png")}
                    />
                </AUIThemedView>
                <AUIThemedView style={initialPageStyles.bottomLayout} />
            </AUIThemedView>
        </AUISafeAreaView>
    );
};

export default InitialPage;
