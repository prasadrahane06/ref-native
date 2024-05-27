import { AUIThemedText } from "@/components/common/AUIThemedText";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import { KeyboardAvoidingView, Platform } from "react-native";

const SignupPage = () => {
  const keyboardVerticalOffset = Platform.OS === "ios" ? 80 : 0;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      <AUIThemedView>
        <AUIThemedText>Signup</AUIThemedText>
      </AUIThemedView>
    </KeyboardAvoidingView>
  );
};

export default SignupPage;
