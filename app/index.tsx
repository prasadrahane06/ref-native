import { AUIThemedView } from "@/components/common/AUIThemedView";
import { Image, TouchableOpacity } from "react-native";
import { AUIThemedText } from "@/components/common/AUIThemedText";
import { AUISafeAreaView } from "@/components/common/AUISafeAreaView";
import { AUILinearGradient } from "@/components/common/AUILinearGradient";
import { GLOBAL_TEXT } from "@/constants/Properties";
import { APP_THEME } from "@/constants/Colors";
import { initialPageStyles } from "@/constants/Styles";
import { useState } from "react";
import AUIPrimaryButton from "@/components/AUIPrimaryButton";
import { useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { setProfile } from "@/redux/globalSlice";
import { RootState } from "@/redux/store";

const InitialPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const profile = useSelector((state: RootState) => state.global.profile);

  return (
    <AUISafeAreaView edges={["bottom"]}>
      <AUIThemedView style={initialPageStyles.container}>
        <AUILinearGradient
          style={[
            initialPageStyles.loginScreenInner,
            initialPageStyles.rectangleViewPosition,
          ]}
        >
          <AUIThemedText style={initialPageStyles.title}>
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
                  borderWidth: 1,
                  // borderRadius: 200,
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
                  borderRadius: 200,
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

        <AUIThemedView style={initialPageStyles.button}>
          <AUIPrimaryButton
            title="Continue"
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
