import { AUIThemedText } from "@/components/common/AUIThemedText";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import { GLOBAL_TEXT } from "@/constants/Properties";
import { loginPageStyles } from "@/constants/Styles";
import { KeyboardAvoidingView, Platform } from "react-native";

const LoginPage = () => {
  const keyboardVerticalOffset = Platform.OS === "ios" ? 80 : 0;

  return (
    <AUIThemedView style={loginPageStyles.container}>
      <AUIThemedText style={loginPageStyles.heading}>
        {GLOBAL_TEXT.login_to_continue}
      </AUIThemedText>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior="padding"
        keyboardVerticalOffset={keyboardVerticalOffset}
      >
        <AUIThemedView>
          <AUIThemedText>Login</AUIThemedText>
        </AUIThemedView>
      </KeyboardAvoidingView>
    </AUIThemedView>
  );
};

export default LoginPage;
