import { APP_THEME } from "@/constants/Colors";
import { Entypo, Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import {
    Animated,
    Dimensions,
    Image,
    Modal,
    NativeScrollEvent,
    NativeSyntheticEvent,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { socket } from "@/webSocket/socket";
import AUIImage from "../common/AUIImage";
import { Asset } from "expo-asset";
import { get, post } from "@/app/services/botAxiosClient";
import { GoogleTranslatorTokenFree } from "@translate-tools/core/translators/GoogleTranslator";
// "@translate-tools/core": "^1.0.0",

interface User {
    _id: string;
    academicSession: string;
    city: string;
    client: null;
    country: string;
    createdAt: string;
    dob: string;
    email: string;
    language: string;
    name: string;
    phone: string;
    qualification: string;
    state: string;
    status: number;
    type: string;
    updatedAt: string;
}

interface ChatBotProps {
    consumerId: string;
    user: User;
    config: object;
}

interface Message {
    message: string;
    userId: string;
    username: string;
    createdAt: string;
}

const ChatBot: React.FC<ChatBotProps> = ({ consumerId, user, config }) => {
    const translator = new GoogleTranslatorTokenFree();

    const [modalVisible, setModalVisible] = useState(false);
    const [showSplash, setShowSplash] = useState(true);
    const fadeAnimation = useRef(new Animated.Value(0)).current;
    const [outgoingMessage, setOutgoingMessage] = useState("");
    const [incomingMessages, setIncomingMessages] = useState<Message[]>([]);

    const roomId = "6686af041d2e9b25dfcda4ba";

    const [isScrollingUp, setIsScrollingUp] = useState(false);
    const scrollViewRef = useRef<ScrollView>(null);
    const lastScrollOffset = useRef(0);

    const { _id: userId, name: userName } = user;

    console.log("userId :::::", userId, userName);
    // console.log("consumerId :::::", consumerId);
    // console.log("outgoingMessage :::::", outgoingMessage);
    // console.log("incomingMessages :::::", incomingMessages);
    // console.log("isScrollingUp :::::", isScrollingUp);

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const currentOffset = event.nativeEvent.contentOffset.y;
        const direction = currentOffset > lastScrollOffset.current ? "down" : "up";
        setIsScrollingUp(direction === "up");
        lastScrollOffset.current = currentOffset;
    };

    const handleScrollDown = () => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollToEnd({ animated: true });
        }
    };

    useEffect(() => {
        if (!isScrollingUp && !showSplash) {
            handleScrollDown();
        }
    }, [incomingMessages, showSplash]);

    useEffect(() => {
        if (modalVisible) {
            post("/room/join", {
                name: "school-1-student-1",
                // username: "Bilal",
                username: userName,
                user: userId,
            })
                .then((res) => {
                    console.log("Room joined successfully");
                    console.log("res from /room/join =>", res);
                })
                .catch((err) => {
                    console.log("Error in /room/join =>", err);
                });

            // return {
            //     message: message.message,
            //     user: message.user,
            //     createdAt: new Date(message.createdAt).toLocaleTimeString([], {
            //         hour: "numeric",
            //         minute: "numeric",
            //         hour12: true,
            //     }),
            // };

            socket.on("previousMessages", async () => {
                const res = await get(`/chat?room=${roomId}`);
                console.log("previousMessages from /chat =>", res);
                const translatedMessages = await Promise.all(
                    res.map(async (message: any) => ({
                        message: await translator.translate(message.message, "ar", "en"),
                        userId: message?.user?.user,
                        username: message?.user?.name,
                        createdAt: new Date(message.createdAt).toLocaleTimeString([], {
                            hour: "numeric",
                            minute: "numeric",
                            hour12: true,
                        }),
                    }))
                );

                setIncomingMessages((prevMesaages) => [...prevMesaages, ...translatedMessages]);
            });

            return () => {
                socket.off("previousMessages");
            };
        }
    }, [modalVisible]);

    // useEffect(() => {
    // 	socket.on('recieve_message', (data) => {
    // 		if (data.username === '🤖 BOT') {
    // 			console.log(data.message);
    // 			return <IonToast message={data.message} duration={3000} position="top"></IonToast>;
    // 		} else if (username === 'School') {
    // 			translator.translate(data.message, 'ar', 'en').then((translatedMessage) => {
    // 				setIncomingMessages((prevMesaages) => [
    // 					...prevMesaages,
    // 					{
    // 						message: translatedMessage,
    // 						username: data.username,
    // 						time: data.time,
    // 					},
    // 				]);
    // 			});
    // 		} else {
    // 			setIncomingMessages((prevMesaages) => [
    // 				...prevMesaages,
    // 				{
    // 					message: data.message,
    // 					username: data.username,
    // 					time: data.time,
    // 				},
    // 			]);
    // 		}
    // 	});

    useEffect(() => {
        socket.on("message", (data) => {
            console.log(`res from message =>`, data);

            translator.translate(data.message, "ar", "en").then((translatedMessage : any ) => {
                // setIncomingMessages((prevMesaages) => [
                //     ...prevMesaages,
                //     {
                //         message: translatedMessage,
                //         username: data.username,
                //         time: data.time,
                //     },
                // ]);

                setIncomingMessages((prevMesaages) => [
                    ...prevMesaages,
                    {
                        message: translatedMessage,
                        userId: data?.user?.user,
                        username: data?.user?.name,
                        createdAt: new Date(data.createdAt).toLocaleTimeString([], {
                            hour: "numeric",
                            minute: "numeric",
                            hour12: true,
                        }),
                    },
                ]);
            });

            // setIncomingMessages((prevMesaages) => [
            //     ...prevMesaages,
            //     {
            //         message: data.message,
            //         userId: data?.user?.user,
            //         username: data?.user?.name,
            //         createdAt: new Date(data.createdAt).toLocaleTimeString([], {
            //             hour: "numeric",
            //             minute: "numeric",
            //             hour12: true,
            //         }),
            //     },
            // ]);
        });

        socket.on("joinMessage", (data) => {
            // User Bilal has joined the room school-1-student-1
            // userID from FE
            // Room ID from BE
            console.log("joinMessage data =>", data);
        });

        return () => {
            socket.off("message");
            socket.off("joinMessage");
        };
    }, [socket]);

    function sendMessage(message: string) {
        if (outgoingMessage.trim().length > 0) {
            post("/chat", {
                user: userId,
                roomId: roomId,
                message: message,
            })
                .then((res) => {
                    console.log("sendMessage in /chat =>", res);
                })
                .catch((err) => {
                    console.log("Error in sendMessage /chat =>", err);
                });

            setOutgoingMessage("");
        }
    }

    const fadeIn = () => {
        Animated.timing(fadeAnimation, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    };

    const fadeOut = () => {
        Animated.timing(fadeAnimation, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
        }).start(() => setShowSplash(false));
    };

    const openChat = () => {
        setModalVisible(true);

        setShowSplash(true);
        fadeIn();
        setTimeout(() => {
            fadeOut();
        }, 2000);
    };

    const closeChat = () => {
        setModalVisible(false);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.floatingButton} onPress={openChat}>
                <AUIImage
                    path={Asset.fromModule(require("@/assets/images/chat-logo.png")).uri}
                    style={styles.floatingButtonLogo}
                />
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
                onRequestClose={closeChat}
            >
                <View style={styles.fullScreenContainer}>
                    {!showSplash && (
                        <View style={styles.headerContainer}>
                            <TouchableOpacity style={styles.closeButton} onPress={closeChat}>
                                <Text style={styles.buttonText}>
                                    <Ionicons name="arrow-back-sharp" size={24} color="black" />
                                </Text>
                            </TouchableOpacity>

                            <View style={styles.logoContainer}>
                                <AUIImage
                                    path={
                                        Asset.fromModule(require("@/assets/images/chat-logo.png"))
                                            .uri
                                    }
                                    style={styles.logo}
                                />
                                <Text style={styles.logoText}>Chat Support</Text>
                            </View>
                        </View>
                    )}

                    {showSplash ? (
                        <Animated.View style={[styles.splashScreen, { opacity: fadeAnimation }]}>
                            <AUIImage
                                path={
                                    Asset.fromModule(require("@/assets/images/chat-logo.png")).uri
                                }
                                style={{
                                    width: 45,
                                    height: 30,
                                }}
                            />
                            <Text style={styles.splashText}>Chat Support</Text>
                        </Animated.View>
                    ) : (
                        <View style={styles.chatContainer}>
                            <ScrollView ref={scrollViewRef} onScroll={handleScroll}>
                                <View style={chatStyles.container}>
                                    {incomingMessages.map((message, index) => (
                                        <View
                                            key={index}
                                            style={[
                                                chatStyles.messageContainer,
                                                message.userId === userId
                                                    ? chatStyles.messageRight
                                                    : chatStyles.messageLeft,
                                            ]}
                                        >
                                            <View style={chatStyles.userContainer}>
                                                <Text style={chatStyles.userText}>
                                                    {message.username}
                                                </Text>
                                            </View>
                                            <Text
                                                style={
                                                    message.userId === userId
                                                        ? chatStyles.messageTextRight
                                                        : chatStyles.messageTextLeft
                                                }
                                            >
                                                {message.message}
                                            </Text>
                                            <Text style={chatStyles.timeText}>
                                                {message.createdAt}
                                            </Text>

                                            {message.username === "BOT" && (
                                                <Image
                                                    style={chatStyles.botLogo}
                                                    source={require("@/assets/images/chat-logo.png")}
                                                />
                                            )}
                                        </View>
                                    ))}
                                    {/* <View style={{ height: 10 }} /> */}
                                </View>
                            </ScrollView>

                            <View>
                                {isScrollingUp && (
                                    <View style={chatStyles.scrollButtonContainer}>
                                        <TouchableOpacity
                                            style={chatStyles.scrollButton}
                                            onPress={handleScrollDown}
                                        >
                                            <Entypo
                                                name="chevron-small-down"
                                                size={24}
                                                color="#fff"
                                            />
                                        </TouchableOpacity>
                                    </View>
                                )}
                                <View style={styles.inputContainer}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Write your message"
                                        value={outgoingMessage}
                                        onChangeText={setOutgoingMessage}
                                    />
                                    <TouchableOpacity onPress={() => sendMessage(outgoingMessage)}>
                                        <Ionicons
                                            name="send"
                                            size={24}
                                            color={APP_THEME.primary.first}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                        // <View
                        //     style={{
                        //         flex: 1,
                        //         backgroundColor: "#fff",
                        //         alignItems: "center",
                        //         justifyContent: "center",
                        //     }}
                        // >
                        //     <Text>Status: {isConnected ? "connected" : "disconnected"}</Text>
                        //     <Text>Transport: {transport}</Text>
                        // </View>
                    )}
                </View>
            </Modal>
        </View>
    );
};

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const chatStyles = StyleSheet.create({
    userContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 5,
    },
    userText: {
        fontWeight: "bold",
        marginRight: 5,
    },
    scrollButtonContainer: {
        position: "absolute",
        bottom: height / 9,
        right: "5%",
    },
    scrollButton: {
        backgroundColor: APP_THEME.primary.first,
        borderRadius: 25,
        width: 40,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    container: {
        padding: 15,
    },
    messageContainer: {
        marginVertical: 5,
        padding: 10,
        borderRadius: 10,
        maxWidth: "80%",
    },
    messageLeft: {
        alignSelf: "flex-start",
        backgroundColor: "#f1f0f0",
    },
    messageRight: {
        alignSelf: "flex-end",
        backgroundColor: "#D3FFE7",
    },
    messageTextLeft: {
        color: "#000",
    },
    messageTextRight: {
        color: "#000",
    },
    timeText: {
        fontSize: 10,
        color: "#888",
        textAlign: "right",
        marginTop: 5,
    },
    botLogo: {
        position: "absolute",
        bottom: "20%",
        left: "2%",
        width: 20,
        height: 15,
    },
});

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        bottom: 20,
        right: 20,
        zIndex: 1000,
    },
    headerContainer: {
        justifyContent: "center",
        alignItems: "center",
        height: height / 8,
        backgroundColor: APP_THEME.primary.first,
        borderBottomRightRadius: 15,
        borderBottomLeftRadius: 15,
    },
    logoContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    logo: {
        width: 45,
        height: 30,
    },
    logoText: {
        fontSize: 21,
        fontWeight: "bold",
    },
    floatingButton: {
        backgroundColor: APP_THEME.primary.first,
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    floatingButtonLogo: {
        width: 40,
        height: 25,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
    },
    fullScreenContainer: {
        flex: 1,
        backgroundColor: "#fff",
    },
    closeButton: {
        padding: 10,
        position: "absolute",
        top: "30%",
        left: 20,
    },
    splashScreen: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: APP_THEME.primary.first,
        gap: 10,
    },
    splashText: {
        fontSize: 24,
        fontWeight: "bold",
    },
    chatContainer: {
        flex: 1,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderTopColor: "#ddd",
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginRight: 10,
        backgroundColor: "#f9f9f9",
    },
});

export default ChatBot;
