import React, { useEffect, useRef } from "react";
import { Animated } from "react-native";

 const BlinkingText = ({ text, style }: any) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const fadeInOut = () => {
            Animated.sequence([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true,
                }),
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: true,
                }),
            ]).start(() => fadeInOut());
        };

        fadeInOut();
    }, [fadeAnim]);

    return <Animated.Text style={[style, { opacity: fadeAnim }]}>{text}</Animated.Text>;
};
export default BlinkingText;