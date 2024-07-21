import { get, post } from "@/app/services/botAxiosClient";
import { APP_THEME } from "@/constants/Colors";
import { socket } from "@/webSocket/socket";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { GoogleTranslatorTokenFree } from "@translate-tools/core/translators/GoogleTranslator";
import { Asset } from "expo-asset";
import React, { useEffect, useRef, useState } from "react";
import {
    Animated,
    Dimensions,
    FlatList,
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
import AUIImage from "../common/AUIImage";

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
    consumerId: any;
    user: User;
    config: any;
}

interface Message {
    message: string;
    userId: string;
    username: string;
    createdAt: string;
}

const botBaseUrl = "https://8622-223-233-80-47.ngrok-free.app";

const Chats = ({
    user,
    showSplash,
    consumerId,
    modalVisible,
    isClient,
    roomData,
    onClose,
}: any) => {
    const translator = new GoogleTranslatorTokenFree();

    const { _id: userId, name: userName, client } = user;

    const [incomingMessages, setIncomingMessages] = useState<Message[]>([]);
    const [outgoingMessage, setOutgoingMessage] = useState("");
    const [roomId, setRoomId] = useState("");

    const [isScrollingUp, setIsScrollingUp] = useState(false);
    const lastScrollOffset = useRef(0);

    const resetChatState = () => {
        console.log("---------------------------State Clean Up---------------------------");
        setIncomingMessages([]);
        setOutgoingMessage("");
        setRoomId("");
        setIsScrollingUp(false);
        lastScrollOffset.current = 0;
    };

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

    function sendMessage(message: string) {
        if (outgoingMessage.trim().length > 0) {
            post("/chat", {
                user: userId,
                roomId: roomId,
                message: message,
            })
                .then((res: any) => {
                    console.log("sendMessage in /chat =>", res.data);
                })
                .catch((err: any) => {
                    console.log("Error in sendMessage /chat =>", err);
                });

            setOutgoingMessage("");
        }
    }

    useEffect(() => {
        if (!modalVisible) {
            resetChatState();
        }
    }, [modalVisible]);

    useEffect(() => {
        if (modalVisible) {
            const joinRoom = async () => {
                const res = await post("/room/join", {
                    name: isClient ? roomData?.name : `${userId}-${consumerId}`,
                    username: userName,
                    user: userId,
                    bot: consumerId,
                });

                if (res.status === 200) {
                    console.log("res from /room/join =>", res.data);
                    console.log("setting room id => ", res.data._id);
                    setRoomId(res.data._id);
                    console.log("Room joined successfully");
                } else {
                    console.log("Error in /room/join =>", res);
                }
            };

            joinRoom();
        }
    }, [modalVisible]);

    useEffect(() => {
        if (roomId) {
            const fetchPreviousMessages = async () => {
                console.log("inside previousMessages ");
                console.log("roomId =>", roomId);

                const res = await get(`/chat?room=${roomId}`);

                if (res.status === 200) {
                    console.log("previousMessages from /chat =>", res.data);

                    const translatedMessages = await Promise.all(
                        res.data.map(async (message: any) => {
                            const translatedMessage = await (client
                                ? translator.translate(message.message, "ar", "en")
                                : message.message);
                            return {
                                message: translatedMessage,
                                userId: message?.user?.user,
                                username: message?.user?.name,
                                createdAt: new Date(message.createdAt).toLocaleTimeString([], {
                                    hour: "numeric",
                                    minute: "numeric",
                                    hour12: true,
                                }),
                            };
                        })
                    );

                    setIncomingMessages((prevMessages) => [...prevMessages, ...translatedMessages]);
                } else {
                    console.log("Error in /chat =>", res);
                }
            };

            fetchPreviousMessages();

            console.log("doing socket on previousMessages");
            socket.on("previousMessages", fetchPreviousMessages);

            return () => {
                socket.off("previousMessages", fetchPreviousMessages);
            };
        }
    }, [roomId]);

    useEffect(() => {
        socket.on("message", (data: any) => {
            console.log(`res from message =>`, data);

            if (client) {
                translator.translate(data.message, "ar", "en").then((translatedMessage: any) => {
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
            } else {
                setIncomingMessages((prevMesaages) => [
                    ...prevMesaages,
                    {
                        message: data.message,
                        userId: data?.user?.user,
                        username: data?.user?.name,
                        createdAt: new Date(data.createdAt).toLocaleTimeString([], {
                            hour: "numeric",
                            minute: "numeric",
                            hour12: true,
                        }),
                    },
                ]);
            }
        });

        socket.on("joinMessage", (data: any) => {
            // User Bilal has joined the room school-1-student-1
            // userID from FE
            // Room ID from BE9325826155
            console.log("joinMessage data =>", data);
        });

        return () => {
            socket.off("message");
            socket.off("joinMessage");
        };
    }, [socket]);

    useEffect(() => {
        if (!isScrollingUp && !showSplash) {
            handleScrollDown();
        }
    }, [incomingMessages, showSplash]);

    const scrollViewRef = useRef<ScrollView>(null);

    return (
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
                                    {message.userId === userId
                                        ? `${message.username} (You)`
                                        : message.username}
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
                            <Text style={chatStyles.timeText}>{message.createdAt}</Text>

                            {message.username === "BOT" && (
                                <Image
                                    style={chatStyles.botLogo}
                                    source={{
                                        uri: Asset.fromModule(
                                            require("../../assets/images/chat-logo.png")
                                        ).uri,
                                    }}
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
                            <Entypo name="chevron-small-down" size={24} color="#fff" />
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
                        <Ionicons name="send" size={24} color="#5BD894" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const SchoolChatModal = ({
    animationType,
    transparent,
    modalVisible,
    setModalVisible,
    roomData,
    consumerId,
    user,
}: any) => {
    const closeChat = () => {
        setModalVisible(false);
    };

    return (
        <Modal
            animationType={animationType}
            transparent={transparent}
            visible={modalVisible}
            onRequestClose={closeChat}
        >
            <View style={styles.schoolChatHeader}>
                <TouchableOpacity style={styles.closeButton} onPress={closeChat}>
                    <Text style={styles.buttonText}>
                        <Ionicons name="arrow-back-sharp" size={24} color="black" />
                    </Text>
                </TouchableOpacity>

                <View style={styles.schoolChatText}>
                    <Text style={styles.logoText}>{roomData?.participants[0]?.name}</Text>
                </View>
            </View>
            <Chats
                user={user}
                showSplash={false}
                consumerId={consumerId}
                modalVisible={modalVisible}
                isClient={true}
                roomData={roomData}
                onClose={closeChat}
            />
        </Modal>
    );
};

const StudentsList = ({ consumerId, user }: any) => {
    const [rooms, setRooms] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState(null);

    useEffect(() => {
        const getStudents = async () => {
            const res = await get("/room", { consumerId });
            setRooms(res.data);
        };

        getStudents();
    }, [consumerId]);

    const joinChatRoom = (item: any) => {
        setSelectedRoom(item);
        setModalVisible(true);
    };

    return (
        <View>
            <FlatList
                data={rooms}
                renderItem={({ item }: any) => (
                    <TouchableOpacity
                        key={item?._id}
                        style={{
                            marginTop: 10,
                            paddingHorizontal: 20,
                            paddingVertical: 20,
                            borderWidth: 1,
                            borderRadius: 10,
                        }}
                        onPress={() => joinChatRoom(item)}
                    >
                        <Text>{item?.participants[0]?.name}</Text>
                    </TouchableOpacity>
                )}
                keyExtractor={(item: any) => item?._id}
            />
            <SchoolChatModal
                animationType="slide"
                transparent={false}
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                roomData={selectedRoom}
                consumerId={consumerId}
                user={user}
            />
        </View>
    );
};

// const handleJoinRoom = ({ userId, consumerId, userName, setRoomId }: any) => {
//     post("/room/join", {
//         name: `${userId}-${consumerId}`,
//         // username: "Bilal",
//         username: userName,
//         user: userId,
//         bot: consumerId,
//     })
//         .then((res: any) => {
//             setRoomId(res._id);
//             console.log("Room joined successfully");
//             console.log("res from /room/join =>", res);
//         })
//         .catch((err: any) => {
//             console.log("Error in /room/join =>", err);
//         });
// };

const ChatBot: React.FC<ChatBotProps> = ({ consumerId, user, config }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [showSplash, setShowSplash] = useState(true);
    const fadeAnimation = useRef(new Animated.Value(0)).current;

    // console.log("roomId", roomId);

    const { _id: userId, name: userName, client } = user;

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
                <Image
                    source={{
                        uri: Asset.fromModule(require("../../assets/images/chat-logo.png")).uri,
                    }}
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
                                <Image
                                    source={{
                                        uri: Asset.fromModule(
                                            require("../../assets/images/chat-logo.png")
                                        ).uri,
                                    }}
                                    style={styles.logo}
                                />
                                <Text style={styles.logoText}>Chat Support</Text>
                            </View>
                        </View>
                    )}

                    {showSplash ? (
                        <Animated.View style={[styles.splashScreen, { opacity: fadeAnimation }]}>
                            <Image
                                source={{
                                    uri: Asset.fromModule(
                                        require("../../assets/images/chat-logo.png")
                                    ).uri,
                                }}
                                style={{
                                    width: 45,
                                    height: 30,
                                }}
                            />
                            <Text style={styles.splashText}>Chat Support</Text>
                        </Animated.View>
                    ) : client ? (
                        <StudentsList consumerId={consumerId} user={user} />
                    ) : (
                        <Chats
                            user={user}
                            showSplash={showSplash}
                            consumerId={consumerId}
                            modalVisible={modalVisible}
                            isClient={false}
                            onClose={closeChat}
                        />
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
        backgroundColor: "#5BD894",
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
    schoolChatText: {
        position: "absolute",
        top: "37%",
        left: "20%",
    },
    schoolChatHeader: {
        justifyContent: "center",
        alignItems: "flex-start",
        height: height / 8,
        backgroundColor: "#5BD894",
        borderBottomRightRadius: 15,
        borderBottomLeftRadius: 15,
    },
    headerContainer: {
        justifyContent: "center",
        alignItems: "center",
        height: height / 8,
        backgroundColor: "#5BD894",
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
        backgroundColor: "#5BD894",
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
        backgroundColor: "#5BD894",
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
