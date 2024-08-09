
import AUICopyAndPay from "@/components/AUICopyAndPay";
import { useLocalSearchParams } from "expo-router";
import "react-native-gesture-handler";

const Payment = () => {
    const { checkoutId, paymentMode } = useLocalSearchParams<{
        checkoutId: string;
        paymentMode: string;
    }>();
    return <AUICopyAndPay paymentMode={paymentMode} checkoutId={checkoutId} />;
};

export default Payment;
