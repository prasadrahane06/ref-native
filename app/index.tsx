// import AUIButton from "@/components/common/AUIButton";
// import AUIImage from "@/components/common/AUIImage";
// import { AUILinearGradient } from "@/components/common/AUILinearGradient";
// import { AUISafeAreaView } from "@/components/common/AUISafeAreaView";
// import { AUIThemedText } from "@/components/common/AUIThemedText";
// import { AUIThemedView } from "@/components/common/AUIThemedView";
// import { APP_THEME } from "@/constants/Colors";
// import { GLOBAL_TEXT } from "@/constants/Properties";
// import { getUserData } from "@/constants/RNAsyncStore";
// import { initialPageStyles } from "@/constants/Styles";
// import { setProfile, setSignInType, setToken, setUser } from "@/redux/globalSlice";
// import { RootState } from "@/redux/store";
// import { Asset } from "expo-asset";
// import { useRouter } from "expo-router";
// import { useEffect } from "react";
// import { Platform, TouchableOpacity } from "react-native";
// import { useDispatch, useSelector } from "react-redux";

// const InitialPage = () => {
//     const router = useRouter();
//     const dispatch = useDispatch();
//     const profile = useSelector((state: RootState) => state.global.profile);
//     const theme = useSelector((state: RootState) => state.global.theme);

//     const themeOptions = [
//         { label: "Light", value: "light" },
//         { label: "Dark", value: "dark" },
//     ];
//     useEffect(() => {
//         getUserData().then((data) => {
//             console.log("user-data", data);
//             if (data && Object.keys(data).length > 0) {
//                 if (data?.profile === "student") {
//                     // saving token in redux
//                     dispatch(setToken(data?.data?.accessToken));

//                     // saving user in redux
//                     dispatch(setUser(data?.data?.user));

//                     router.replace("/(home)/(student)");
//                 }
//                 if (data?.profile === "school") {
//                     router.replace("/(home)/(school)");
//                 }
//             }
//         });
//     }, []);
//     const navigateToLogin = () => {
//         dispatch(setSignInType("exist"));
//         router.navigate("/login");
//     };
//     // const navigateToSignup = () => {
//     //     dispatch(setSignInType("new"));
//     //     router.navigate(profile === "school" ? "/details" : "/signup");
//     // };
//     return (
//         <AUISafeAreaView
//         // edges={["bottom"]}
//         >
//             <AUIThemedView style={initialPageStyles.container}>
//                 <AUILinearGradient
//                     style={
//                         Platform.OS === "ios"
//                             ? initialPageStyles.iosIndexHeader
//                             : initialPageStyles.indexHeader
//                     }
//                 >
//                     <AUIThemedText
//                         style={
//                             Platform.OS === "ios"
//                                 ? initialPageStyles.iosTitle
//                                 : initialPageStyles.title
//                         }
//                     >
//                         {GLOBAL_TEXT.create_your_profile}
//                     </AUIThemedText>
//                 </AUILinearGradient>

//                 <AUIThemedView style={initialPageStyles.optionContainer}>
//                     <TouchableOpacity onPress={() => dispatch(setProfile("student"))}>
//                         <AUILinearGradient
//                             style={[
//                                 initialPageStyles.circularViewPosition,
//                                 {
//                                     borderColor: APP_THEME.primary.first,
//                                     borderWidth: 5,
//                                 },
//                             ]}
//                             locations={[0, 1]}
//                             colors={
//                                 profile === "student"
//                                     ? ["#5BD894", "#5BD894"]
//                                     : ["#EFFFFA", "#EFFFFA"]
//                             }
//                         >
//                             <AUIImage
//                                 icon
//                                 path={
//                                     profile === "student"
//                                         ? Asset.fromModule(
//                                               require("@/assets/images/initialPage/fi_3135773 (1).png")
//                                           ).uri
//                                         : Asset.fromModule(
//                                               require("@/assets/images/initialPage/student.png")
//                                           ).uri
//                                 }
//                             />

//                             <AUIThemedText
//                                 style={[
//                                     initialPageStyles.optionLabel,
//                                     {
//                                         color:
//                                             profile === "student"
//                                                 ? "#fff"
//                                                 : APP_THEME.primary.first,
//                                     },
//                                 ]}
//                             >
//                                 {GLOBAL_TEXT.student}
//                             </AUIThemedText>
//                         </AUILinearGradient>
//                     </TouchableOpacity>
//                     <TouchableOpacity onPress={() => dispatch(setProfile("school"))}>
//                         <AUILinearGradient
//                             style={[
//                                 initialPageStyles.circularViewPosition,
//                                 {
//                                     borderColor: APP_THEME.primary.first,
//                                     borderWidth: 5,
//                                 },
//                             ]}
//                             locations={[0, 1]}
//                             colors={
//                                 profile === "school"
//                                     ? ["#5BD894", "#5BD894"]
//                                     : ["#EFFFFA", "#EFFFFA"]
//                             }
//                         >
//                             <AUIImage
//                                 icon
//                                 path={
//                                     profile === "school"
//                                         ? Asset.fromModule(
//                                               require("@/assets/images/initialPage/school-white.png")
//                                           ).uri
//                                         : Asset.fromModule(
//                                               require("@/assets/images/initialPage/school.png")
//                                           ).uri
//                                 }
//                             />

//                             <AUIThemedText
//                                 style={[
//                                     initialPageStyles.optionLabel,
//                                     {
//                                         color:
//                                             profile === "school" ? "#fff" : APP_THEME.primary.first,
//                                     },
//                                 ]}
//                             >
//                                 {GLOBAL_TEXT.school}
//                             </AUIThemedText>
//                         </AUILinearGradient>
//                     </TouchableOpacity>
//                 </AUIThemedView>

//                 <AUIThemedView style={[initialPageStyles.button, { opacity: profile ? 1 : 0 }]}>
//                     <AUIButton
//                         style={{ width: "45%" }}
//                         title="Sign in"
//                         selected
//                         onPress={profile ? navigateToLogin : () => null}
//                     />
//                     <AUIButton
//                         title="Create Account"
//                         style={{ width: "45%" }}
//                         onPress={profile ? navigateToSignup : () => null}
//                     />
//                 </AUIThemedView>

//                 <AUIThemedView style={initialPageStyles.imageContainer}>
//                     <AUIImage
//                         path={Asset.fromModule(require("@/assets/images/initialPage/home.png")).uri}
//                     />
//                 </AUIThemedView>
//                 <AUIThemedView style={initialPageStyles.bottomLayout} />
//             </AUIThemedView>
//         </AUISafeAreaView>
//     );
// };

// export default InitialPage;

import AUIButton from "@/components/common/AUIButton";
import AUIImage from "@/components/common/AUIImage";
import { AUILinearGradient } from "@/components/common/AUILinearGradient";
import { AUISafeAreaView } from "@/components/common/AUISafeAreaView";
import { AUIThemedText } from "@/components/common/AUIThemedText";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import { APP_THEME, BACKGOUND_THEME } from "@/constants/Colors";
import { GLOBAL_TEXT } from "@/constants/Properties";
import { getUserData } from "@/constants/RNAsyncStore";
import { initialPageStyles } from "@/constants/Styles";
import { setProfile, setSignInType, setToken, setUser } from "@/redux/globalSlice";
import { RootState } from "@/redux/store";
import { Asset } from "expo-asset";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Platform, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";

const InitialPage = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const profile = useSelector((state: RootState) => state.global.profile);
    const theme = useSelector((state: RootState) => state.global.theme);

    const themeOptions = [
        { label: "Light", value: "light" },
        { label: "Dark", value: "dark" },
    ];
    useEffect(() => {
        getUserData().then((data) => {
            console.log("user-data", data);
            if (data && Object.keys(data).length > 0) {
                if (data?.profile === "student") {
                    // saving token in redux
                    dispatch(setToken(data?.data?.accessToken));

                    // saving user in redux
                    dispatch(setUser(data?.data?.user));

                    router.replace("/(home)/(student)");
                }
                if (data?.profile === "school") {
                    router.replace("/(home)/(school)");
                }
            }
        });
    }, []);
    const navigateToLogin = () => {
        dispatch(setSignInType("exist"));
        router.navigate("/login");
    };
    const navigateToSignup = () => {
        dispatch(setSignInType("new"));
        router.navigate("/signup");
    };
    return (
        <AUISafeAreaView
        // edges={["bottom"]}
        >
            <AUIThemedView style={initialPageStyles.container}>
                <AUILinearGradient
                    style={
                        Platform.OS === "ios"
                            ? initialPageStyles.iosIndexHeader
                            : initialPageStyles.indexHeader
                    }
                >
                    <AUIThemedText
                        style={
                            Platform.OS === "ios"
                                ? [initialPageStyles.iosTitle, { color: "#fff" }]
                                : [initialPageStyles.title, { color: "#fff" }]
                        }
                    >
                        {GLOBAL_TEXT.create_your_profile}
                    </AUIThemedText>
                </AUILinearGradient>

                <AUIThemedView style={initialPageStyles.optionContainer}>
                    <TouchableOpacity onPress={() => dispatch(setProfile("student"))}>
                        <AUILinearGradient
                            style={[
                                initialPageStyles.circularViewPosition,
                                {
                                    borderColor: APP_THEME[theme].primary.first,
                                    borderWidth: 5,
                                },
                            ]}
                            locations={[0, 1]}
                            colors={
                                profile === "student"
                                    ? [
                                          APP_THEME[theme].primary.first,
                                          APP_THEME[theme].primary.first,
                                      ]
                                    : [
                                          BACKGOUND_THEME[theme].backgound,
                                          BACKGOUND_THEME[theme].backgound,
                                      ]
                            }
                        >
                            <AUIImage
                                icon
                                path={
                                    profile === "student"
                                        ? Asset.fromModule(
                                              require("@/assets/images/initialPage/fi_3135773 (1).png")
                                          ).uri
                                        : Asset.fromModule(
                                              require("@/assets/images/initialPage/student.png")
                                          ).uri
                                }
                            />

                            <AUIThemedText
                                style={[
                                    initialPageStyles.optionLabel,
                                    {
                                        color:
                                            profile === "student"
                                                ? "#fff"
                                                : APP_THEME[theme].primary.first,
                                    },
                                ]}
                            >
                                {GLOBAL_TEXT.student}
                            </AUIThemedText>
                        </AUILinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => dispatch(setProfile("school"))}>
                        <AUILinearGradient
                            style={[
                                initialPageStyles.circularViewPosition,
                                {
                                    borderColor: APP_THEME[theme].primary.first,
                                    borderWidth: 5,
                                },
                            ]}
                            locations={[0, 1]}
                            colors={
                                profile === "school"
                                    ? [
                                          APP_THEME[theme].primary.first,
                                          APP_THEME[theme].primary.first,
                                      ]
                                    : [
                                          BACKGOUND_THEME[theme].backgound,
                                          BACKGOUND_THEME[theme].backgound,
                                      ]
                            }
                        >
                            <AUIImage
                                icon
                                path={
                                    profile === "school"
                                        ? Asset.fromModule(
                                              require("@/assets/images/initialPage/school-white.png")
                                          ).uri
                                        : Asset.fromModule(
                                              require("@/assets/images/initialPage/school.png")
                                          ).uri
                                }
                            />

                            <AUIThemedText
                                style={[
                                    initialPageStyles.optionLabel,
                                    {
                                        color:
                                            profile === "school"
                                                ? "#fff"
                                                : APP_THEME[theme].primary.first,
                                    },
                                ]}
                            >
                                {GLOBAL_TEXT.school}
                            </AUIThemedText>
                        </AUILinearGradient>
                    </TouchableOpacity>
                </AUIThemedView>

                <AUIThemedView style={[initialPageStyles.button, { opacity: profile ? 1 : 0 }]}>
                    <AUIButton
                        style={{ width: "45%" }}
                        title="Sign in"
                        selected
                        onPress={profile ? navigateToLogin : () => null}
                    />
                    <AUIButton
                        title="Create Account"
                        style={{ width: "45%" }}
                        onPress={profile ? navigateToSignup : () => null}
                    />
                </AUIThemedView>

                <AUIThemedView style={initialPageStyles.imageContainer}>
                    {theme === "dark" ? (
                        <AUIImage
                            path={
                                Asset.fromModule(
                                    require("@/assets/images/initialPage/homeDark.png")
                                ).uri
                            }
                        />
                    ) : (
                        <AUIImage
                            path={
                                Asset.fromModule(
                                    require("@/assets/images/initialPage/homeLight.png")
                                ).uri
                            }
                        />
                    )}
                </AUIThemedView>
                <AUIThemedView style={initialPageStyles.bottomLayout} />
            </AUIThemedView>
        </AUISafeAreaView>
    );
};

export default InitialPage;
