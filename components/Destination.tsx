import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { Alert, StyleSheet, TouchableOpacity } from "react-native";
import AUIBackgroundImage from "./common/AUIBackgroundImage";
import { AUIThemedText } from "./common/AUIThemedText";
import { AUIThemedView } from "./common/AUIThemedView";
import { APP_THEME } from "@/constants/Colors";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import useAxios from "@/app/services/axiosClient";
import { API_URL } from "@/constants/urlProperties";
import { removeFromFavorite } from "@/redux/favoriteSlice";
import { setLoader } from "@/redux/globalSlice";
import { ApiSuccessToast, ApiErrorToast } from "./common/AUIToast";

const Destination = ({ title, image, countryWidth, countryHeight, favorite, id }: any) => {
    const theme = useSelector((state: RootState) => state.global.theme);
    const dispatch = useDispatch();
    const { del } = useAxios();

    const handleRemoveFav = (id: string, type: string) => {
        Alert.alert(
            'Remove Favorite',
            `Are you sure you want to remove ${title} from your favorites?`,
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Remove cancelled'),
                    style: 'cancel',
                },
                {
                    text: 'Remove',
                    onPress: () => {
                        dispatch(setLoader(true));
                        del(API_URL.favorite, { id, type })
                            .then((res: any) => {
                                ApiSuccessToast(res.message);
                                dispatch(removeFromFavorite({ id, type: "countries" }));
                            })
                            .catch((e: any) => {
                                ApiErrorToast(e.response?.data?.message);
                                console.log(e);
                            })
                            .finally(() => dispatch(setLoader(false)));
                    },
                    style: 'destructive',
                },
            ],
            { cancelable: false }
        );
    };

    return (
        <TouchableOpacity
            onPress={() =>
                router.push({
                    pathname: `(home)/cityDetails/${id}`,
                })
            }
        >
            <AUIThemedView
                style={[styles.item, { backgroundColor: APP_THEME[theme].ternary.first }]}
            >
                <AUIThemedView
                    style={[
                        styles.imageContainer,
                        countryWidth && countryHeight
                            ? { width: countryWidth, height: countryHeight }
                            : {},
                    ]}
                >
                    <AUIBackgroundImage style={styles.image} path={image}>
                        <LinearGradient
                            colors={[
                                "rgba(72,77,72, 1)",
                                "rgba(149,207,156, 0.5)",
                                "rgba(149,207,156, 0.3)",
                                "rgba(149,207,156, 0.2)",
                                "transparent",
                            ]}
                            style={styles.gradient}
                            start={{ x: 0, y: 1 }}
                            end={{ x: 0, y: 0 }}
                        />
                        <AUIThemedText style={styles.destinationImageText}>{title}</AUIThemedText>
                        {favorite && (
                            <TouchableOpacity
                                onPress={() => handleRemoveFav(id, "country")}
                                style={styles.iconContainer}
                            >
                                <MaterialCommunityIcons name="delete-forever-outline" size={24} color="red" />
                            </TouchableOpacity>
                        )}
                    </AUIBackgroundImage>
                </AUIThemedView>
            </AUIThemedView>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    item: {
        margin: 10,
        alignItems: "center",
        elevation: 20,
        // shadowColor: APP_THEME.ternary.first,
        shadowOffset: { width: -1, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        borderRadius: 10,
    },
    imageContainer: {
        position: "relative",
        width: 90,
        height: 90,
        borderRadius: 10,
        overflow: "hidden",
    },
    image: {
        width: "100%",
        height: "100%",
        // borderRadius: 7,
    },
    gradient: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        height: "100%",
        // borderRadius: 7,
    },
    destinationImageText: {
        position: "absolute",
        bottom: 10,
        left: 0,
        right: 0,
        color: "white",
        fontWeight: "600",
        fontSize: 16,
        textAlign: "center",
    },
    iconContainer: {
        position: "absolute",
        top: 10,
        right: 10,
        backgroundColor: "rgba(255, 0, 0, 0.2)",
        // borderRadius: 20,
        padding: 5,
    },
    icon: {
        alignSelf: "center",
    },
});

export default Destination;
