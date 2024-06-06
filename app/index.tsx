import { AUIThemedView } from "@/components/common/AUIThemedView";
import {
  TouchableOpacity,
  View,
  Image,
  Platform,
  ActivityIndicator,
} from "react-native";
import { AUIThemedText } from "@/components/common/AUIThemedText";
import { AUISafeAreaView } from "@/components/common/AUISafeAreaView";
import { AUILinearGradient } from "@/components/common/AUILinearGradient";
import { GLOBAL_TEXT } from "@/constants/Properties";
import { APP_THEME, TEXT_THEME } from "@/constants/Colors";
import { initialPageStyles } from "@/constants/Styles";
import AUIButton from "@/components/common/AUIButton";
import { useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { setTheme, setProfile, setSignInType } from "@/redux/globalSlice";
import { RootState } from "@/redux/store";
import { useEffect } from "react";
import axiosClient, { get } from "./services/axiosClient";
import { API_URL } from "@/constants/urlProperties";

const InitialPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const profile = useSelector((state: RootState) => state.global.profile);
  const theme = useSelector((state: RootState) => state.global.theme);

  const themeOptions = [
    { label: "Light", value: "light" },
    { label: "Dark", value: "dark" },
  ];

  const navigateToLogin = () => {
    dispatch(setSignInType("exist"));
    router.navigate("/login");
  };
  const navigateToSignup = () => {
    dispatch(setSignInType("new"));
    router.navigate("/signup");
  };
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

        <AUIThemedView style={initialPageStyles.optionContainer}>
          <TouchableOpacity onPress={() => dispatch(setProfile("student"))}>
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
              <AUIThemedText style={initialPageStyles.optionLabel}>
                {GLOBAL_TEXT.student}
              </AUIThemedText>
            </AUILinearGradient>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => dispatch(setProfile("school"))}>
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
              <AUIThemedText style={initialPageStyles.optionLabel}>
                {GLOBAL_TEXT.school}
              </AUIThemedText>
            </AUILinearGradient>
          </TouchableOpacity>
        </AUIThemedView>

        <ActivityIndicator size="large" color="#5BD894" />

        <AUIThemedView
          style={[initialPageStyles.button, { opacity: profile ? 1 : 0 }]}
        >
          <AUIButton
            style={{ width: "45%" }}
            title="Sign in"
            selected
            onPress={navigateToLogin}
          />
          <AUIButton
            title="Create Account"
            style={{ width: "45%" }}
            onPress={navigateToSignup}
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
