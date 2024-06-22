import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { Component } from "react";
import { AUIThemedView } from "../common/AUIThemedView";
import AUIImage from "../common/AUIImage";
import { Asset } from "expo-asset";
import { AUIThemedText } from "../common/AUIThemedText";
import { APP_THEME } from "@/constants/Colors";
import {
  AntDesign,
  Feather,
  FontAwesome,
  FontAwesome6,
  Fontisto,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useNavigation } from "expo-router";

function Profile() {
  const navigation = useNavigation();
  const array = [
    {
      id: 1,
      icon: (
        <FontAwesome6
          name="user-circle"
          size={24}
          color={APP_THEME.primary.first}
        />
      ),
      label: "Profile Information",
    },
    {
      id: 2,
      icon: (
        <Feather name="help-circle" size={24} color={APP_THEME.primary.first} />
      ),
      label: "Help",
    },
    {
      id: 3,
      icon: (
        <Fontisto name="wallet" size={24} color={APP_THEME.primary.first} />
      ),
      label: "Transaction history",
    },
    {
      id: 4,
      icon: <Ionicons name="cart" size={24} color={APP_THEME.primary.first} />,
      label: "My courses",
    },
    {
      id: 5,
      icon: <AntDesign name="poweroff" size={24} color={"red"} />,
      label: "Delete Account",
    },
  ];
  return (
    <AUIThemedView style={styles.root}>
      <AUIThemedView style={styles.banner}>
        <View style={styles.header}>
          <Pressable
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Ionicons
              name="arrow-back-circle-outline"
              size={30}
              color={APP_THEME.ternary.first}
            />
          </Pressable>
          <FontAwesome name="edit" size={30} color={APP_THEME.ternary.first} />
        </View>
        <View style={styles.avatarContainer}>
          <AUIImage
            path={
              Asset.fromModule(
                "https://linguest-assets-dev.s3.ap-south-1.amazonaws.com/1718884990288-6296.jpeg"
              ).uri
            }
            style={styles.avatar}
          />
          <AUIThemedText style={styles.name}>Yazeed</AUIThemedText>
          <AUIThemedText style={styles.email}>yazeed@gmail.com</AUIThemedText>
        </View>
      </AUIThemedView>

      <AUIThemedView style={styles.container}>
        {array.map((item) => (
          <AUIThemedView style={styles.layout} key={item.id}>
            <View style={styles.labelContainer}>
              {item.icon}
              <AUIThemedText>{item.label}</AUIThemedText>
            </View>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={24}
              color="black"
            />
          </AUIThemedView>
        ))}
      </AUIThemedView>
    </AUIThemedView>
  );
}

export default Profile;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  header: {
    marginTop: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  banner: {
    height: 150,
    backgroundColor: "rgba(91, 216, 148, 0.5)",
    elevation: 20,
    shadowColor: APP_THEME.ternary.first,
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    position: "relative",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    // marginBottom: 10,
  },
  avatarContainer: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 100,
    left: 130,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    paddingTop: 5,
  },
  email: {
    paddingTop: 5,
  },
  container: {
    marginTop: 150,
    padding: 10,
  },
  labelContainer: {
    flexDirection: "row",
    gap: 10,
  },
  layout: {
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 20,
    shadowColor: APP_THEME.ternary.first,
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    borderRadius: 10,
    marginBottom: 10,
  },
});
