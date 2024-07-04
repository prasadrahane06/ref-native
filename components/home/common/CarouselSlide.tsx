import AUIBackgroundImage from "@/components/common/AUIBackgroundImage";
import { AUIThemedText } from "@/components/common/AUIThemedText";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import { APP_THEME } from "@/constants/Colors";
import { StyleSheet } from "react-native";

interface CarouselSlideProps {
    imageSource: any;
    text: string;
}

const CarouselSlide: React.FC<CarouselSlideProps> = ({ imageSource, text }) => {
    return (
        <AUIThemedView style={styles.container}>
            <AUIBackgroundImage path={imageSource} style={styles.carouselImage}>
                <AUIThemedText style={styles.imageText}>{text}</AUIThemedText>
            </AUIBackgroundImage>
        </AUIThemedView>
    );
};

const styles = StyleSheet.create({
    container: {
        // elevation: 20,
        // shadowColor: APP_THEME.ternary.first,
        // // shadowOffset: { width: -2, height: 4 },
        // shadowOpacity: 0.5,
        // shadowRadius: 3,
        // borderBottomWidth: 1,
    },
    carouselImage: {
        width: "100%",
        height: 200,
    },
    imageText: {
        textAlign: "center",
        top: "70%",
        color: "white",
        fontWeight: "900",
        fontSize: 18,
    },
});

export default CarouselSlide;
