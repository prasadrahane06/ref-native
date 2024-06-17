import { AUIThemedText } from "@/components/common/AUIThemedText";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import { ImageBackground, StyleSheet } from "react-native";

interface CarouselSlideProps {
    imageSource: any;
    text: string;
}

const CarouselSlide: React.FC<CarouselSlideProps> = ({ imageSource, text }) => {
    return (
        <AUIThemedView>
            <ImageBackground source={imageSource} style={styles.carouselImage}>
                <AUIThemedText style={styles.imageText}>{text}</AUIThemedText>
            </ImageBackground>
        </AUIThemedView>
    );
};

const styles = StyleSheet.create({
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