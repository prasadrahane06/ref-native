import { splitOTPinputFieldStyle } from "@/constants/Styles";
import React, { useState, useRef } from "react";
import { View, TextInput, StyleSheet, TextInputProps } from "react-native";

interface SplitOTPInputProps {
  length?: number;
  onOTPChange: (otp: string) => void;
}

const AUISplitOTPInput: React.FC<SplitOTPInputProps> = ({
  length = 4,
  onOTPChange,
}) => {
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(""));
  const inputs = useRef<(TextInput | null)[]>([]);

  const handleChange = (text: string, index: number) => {
    let newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    onOTPChange(newOtp.join(""));

    if (text && index < length - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleBackspace = (text: string, index: number) => {
    if (!text && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  return (
    <View style={splitOTPinputFieldStyle.container}>
      {otp.map((digit, index) => (
        <TextInput
          key={index}
          style={splitOTPinputFieldStyle.input}
          value={digit}
          onChangeText={(text) => handleChange(text, index)}
          onKeyPress={({ nativeEvent }) => {
            if (nativeEvent.key === "Backspace") {
              handleBackspace(digit, index);
            }
          }}
          keyboardType="numeric"
          maxLength={1}
          ref={(ref) => (inputs.current[index] = ref)}
        />
      ))}
    </View>
  );
};

export default AUISplitOTPInput;
