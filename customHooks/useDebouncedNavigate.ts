import { router } from "expo-router";
import { useRef } from "react";

/**
 * Returns a function that debounces navigation actions by a specified delay.
 *
 * @param {number} delay - The delay in milliseconds.
 * @return {(path: string) => void} - The debounced navigation function.
 */
const useDebouncedNavigate = (delay: number) => {
    const lastClickTime = useRef(0);

    const handlePress = (path: string) => {
        const now = Date.now();
        if (now - lastClickTime.current > delay) {
            lastClickTime.current = now;
            router.push(path);
        }
    };

    return handlePress;
};

export default useDebouncedNavigate;
