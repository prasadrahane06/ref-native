import { AUIThemedView } from "@/components/common/AUIThemedView";
import { StyleSheet, Image } from "react-native";
import { AUIThemedText } from "@/components/common/AUIThemedText";
import { AUISafeAreaView } from "@/components/common/AUISafeAreaView";
import { AUILinearGradient } from "@/components/common/AUILinearGradient";
import { GLOBAL_TEXT } from "@/constants/Properties";
import { APP_THEME } from "@/constants/Colors";
import { initialPageStyles } from "@/constants/Styles";

const InitialPage = () => {
  return (
    <AUISafeAreaView>
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
          <AUILinearGradient
            style={[
              initialPageStyles.circularViewPosition,
              { borderColor: APP_THEME.primary.first },
            ]}
            locations={[0]}
            colors={["#EFFFFA"]}
          >
            <Image
              source={require("../assets/images/initialPage/student.png")}
            />
            <AUIThemedText style={initialPageStyles.optionLabel}>
              {GLOBAL_TEXT.student}
            </AUIThemedText>
          </AUILinearGradient>
          <AUILinearGradient
            style={[
              initialPageStyles.circularViewPosition,
              { borderColor: APP_THEME.primary.first },
            ]}
            locations={[0]}
            colors={["#EFFFFA"]}
          >
            <Image
              source={require("../assets/images/initialPage/school.png")}
            />
            <AUIThemedText style={initialPageStyles.optionLabel}>
              {GLOBAL_TEXT.school}
            </AUIThemedText>
          </AUILinearGradient>
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
