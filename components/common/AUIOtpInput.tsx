import React, { useRef, useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";

const AUIOTPInput = ({ length, onChange }: any) => {
  const [otp, setOtp] = useState(Array(length).fill(""));
  const inputs = useRef([]);

  const handleChange = (text: any, index: any) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < length - 1) {
      // @ts-ignore
      inputs.current[index + 1].focus();
    }
    if (onChange) {
      onChange(newOtp.join(""));
    }
  };

  const handleKeyPress = (e: any, index: any) => {
    if (e.nativeEvent.key === "Backspace" && index > 0 && !otp[index]) {
      // @ts-ignore

      inputs.current[index - 1].focus();
    }
  };

  return (
    <View style={styles.container}>
      {otp.map((digit, index) => (
        <TextInput
          key={index}
          // @ts-ignore

          ref={(ref) => (inputs.current[index] = ref)}
          style={styles.input}
          keyboardType="numeric"
          maxLength={1}
          value={digit}
          onChangeText={(text) => handleChange(text, index)}
          onKeyPress={(e) => handleKeyPress(e, index)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between",
  },
  input: {
    width: 80,
    height: 50,
    borderWidth: 1,
    borderColor: "#7A827A",
    textAlign: "center",
    fontSize: 18,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    elevation: 5,
    // IOS
    shadowColor: "#7A827A",
    shadowOffset: { width: 0, height: 0.5 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
  },
});

export default AUIOTPInput;