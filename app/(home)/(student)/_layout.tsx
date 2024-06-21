import AUIDrawerContent from "@/components/common/AUIDrawerContent";
import { AUILinearGradient } from "@/components/common/AUILinearGradient";
import { AUIThemedText } from "@/components/common/AUIThemedText";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import {
  FontAwesome,
  FontAwesome6,
  Ionicons,
  MaterialIcons
} from "@expo/vector-icons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Asset } from "expo-asset";
import { Tabs } from "expo-router";
import React, { useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import "react-native-gesture-handler";

const ProfileScreen = () => (
  <AUIThemedView>
    <AUIThemedText>Profile Screen</AUIThemedText>
  </AUIThemedView>
);
const CoursesScreen = () => (
  <AUIThemedView>
    <AUIThemedText>Courses Screen</AUIThemedText>
  </AUIThemedView>
);
const AccommodationScreen = () => (
  <AUIThemedView>
    <AUIThemedText>Accommodation Screen</AUIThemedText>
  </AUIThemedView>
);
const ChangePasswordScreen = () => (
  <AUIThemedView>
    <AUIThemedText>Change Password Screen</AUIThemedText>
  </AUIThemedView>
);
const TermsPolicyScreen = () => (
  <AUIThemedView>
    <AUIThemedText>Terms and Policy Screen</AUIThemedText>
  </AUIThemedView>
);
const ShareAppScreen = () => (
  <AUIThemedView>
    <AUIThemedText>Share App Screen</AUIThemedText>
  </AUIThemedView>
);

const DrawerContent = (props: any) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  // const []
  return (
    <>
      <View style={styles.drawerContent}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => props.navigation.closeDrawer()}
        >
          <Ionicons name="close" size={30} color="black" />
        </TouchableOpacity>
        <View style={styles.header}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1562788869-4ed32648eb72?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHByb2Zlc3Npb25hbCUyMG1hbnxlbnwwfHwwfHx8MA%3D%3D",
            }}
            style={styles.avatar}
          />
          <AUIThemedText style={styles.name}>Dinesh Kale</AUIThemedText>
        </View>

        <View style={styles.menuItemContainer}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => props.navigation.navigate("profile")}
          >
            <FontAwesome name="user" style={styles.menuIcon} />
            <AUIThemedText style={styles.menuText}>My Profile</AUIThemedText>
          </TouchableOpacity>
          <View style={styles.separator} />
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => props.navigation.navigate("Courses")}
          >
            <FontAwesome name="book" style={styles.menuIcon} />
            <AUIThemedText style={styles.menuText}>My Courses</AUIThemedText>
          </TouchableOpacity>
          <View style={styles.separator} />
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => props.navigation.navigate("Accommodation")}
          >
            <FontAwesome name="home" style={styles.menuIcon} />
            <AUIThemedText style={styles.menuText}>
              Find Accommodation
            </AUIThemedText>
          </TouchableOpacity>
          <View style={styles.separator} />
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => props.navigation.navigate("ChangePassword")}
          >
            <FontAwesome name="lock" style={styles.menuIcon} />
            <AUIThemedText style={styles.menuText}>
              Change Password
            </AUIThemedText>
          </TouchableOpacity>
          <View style={styles.separator} />
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => props.navigation.navigate("TermsPolicy")}
          >
            <FontAwesome name="file-text" style={styles.menuIcon} />
            <AUIThemedText style={styles.menuText}>
              Terms and Policy
            </AUIThemedText>
          </TouchableOpacity>
          <View style={styles.separator} />
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => props.navigation.navigate("ShareApp")}
          >
            <FontAwesome name="share-alt" style={styles.menuIcon} />
            <AUIThemedText style={styles.menuText}>Share the app</AUIThemedText>
          </TouchableOpacity>
          <View style={styles.separator} />
        </View>
      </View>
      <View style={styles.buttonsMainContainer}>
        {isLoggedIn ? (
          <TouchableOpacity style={styles.logoutButton}>
            <FontAwesome name="sign-out" style={styles.logOutIcon} />
            <AUIThemedText style={styles.logoutText}>Logout</AUIThemedText>
          </TouchableOpacity>
        ) : (
          <AUIThemedView style={styles.signUpLiginButtonContainer}>
            <TouchableOpacity
              style={styles.signUplogInButton}
              onPress={() => {}}
            >
              <AUIThemedText style={styles.signUpText}>Sign Up</AUIThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.signUplogInButton}
              onPress={() => {}}
            >
              <AUIThemedText style={styles.signUpText}>Log In</AUIThemedText>
            </TouchableOpacity>
          </AUIThemedView>
        )}
      </View>
    </>
  );
};

const Drawer = createDrawerNavigator();

const MenuButton = ({ navigation }: any) => (
  <TouchableOpacity onPress={() => navigation.openDrawer()}>
    <Ionicons name="menu" size={25} style={{ marginLeft: 15 }} />
  </TouchableOpacity>
);

const HeaderIcons = () => (
  <View style={{ flexDirection: "row", marginRight: 15 }}>
    <TouchableOpacity onPress={() => alert("Search")}>
      <Ionicons name="search" size={25} style={{ marginRight: 20 }} />
    </TouchableOpacity>
    <TouchableOpacity onPress={() => alert("Notifications")}>
      <Ionicons name="notifications" size={25} />
    </TouchableOpacity>
  </View>
);

const screenOptions = (navigation: any) => ({
  headerBackground: () => (
    <AUILinearGradient
      colors={["rgba(118, 250,178, 1)", "rgba(91, 216,148, 1)"]}
      style={{ flex: 1 }}
    />
  ),
  headerLeft: () => <MenuButton navigation={navigation} />,
  headerRight: () => <HeaderIcons />,
  headerTitle: "",
});

//user Data and School Screen
const user = {
  name: "Yazedd",
  avatarUrl:
    "https://linguest-assets-dev.s3.ap-south-1.amazonaws.com/1718884990288-6296.jpeg",
};

const items = [
  {
    label: "Profile",
    iconPath: Asset.fromModule(
      require("@/assets/images/drawerIcons/profile-icon.png")
    ).uri,
    navigateTo: "profile",
  },
  {
    label: "My Courses",
    iconPath: Asset.fromModule(
      require("@/assets/images/drawerIcons/courses-icon.png")
    ).uri,
    navigateTo: "favourite",
  },
  {
    label: "Find Accommodation",
    iconPath: Asset.fromModule(
      require("@/assets/images/drawerIcons/accommodation-icon.png")
    ).uri,
    navigateTo: "Facilities",
  },
  {
    label: "Change password",
    iconPath: Asset.fromModule(
      require("@/assets/images/drawerIcons/password-icon.png")
    ).uri,
    navigateTo: "Facilities",
  },
  {
    label: "Terms and Policy",
    iconPath: Asset.fromModule(
      require("@/assets/images/drawerIcons/terms-and-policy-icon.png")
    ).uri,
    navigateTo: "Contact",
  },
  {
    label: "Share the app",
    iconPath: Asset.fromModule(
      require("@/assets/images/drawerIcons/share-icon.png")
    ).uri,
    navigateTo: "#",
  },
];

//creating Drawer
export default function AUIDrawer() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={({ navigation }) => screenOptions(navigation)}
      drawerContent={(props) => (
        <AUIDrawerContent
          {...props}
          isLoggedIn={true}
          user={user}
          items={items}
          onLogout={() => {
            // Implement logout logic here
          }}
        />
      )}
    >
      <Drawer.Screen name="Home" component={TabLayout} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="Courses" component={CoursesScreen} />
      <Drawer.Screen name="Accommodation" component={AccommodationScreen} />
      <Drawer.Screen name="ChangePassword" component={ChangePasswordScreen} />
      <Drawer.Screen name="TermsPolicy" component={TermsPolicyScreen} />
      <Drawer.Screen name="ShareApp" component={ShareAppScreen} />
    </Drawer.Navigator>
  );
}

export function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarBackground: () => (
                    <AUILinearGradient
                        colors={[
                            "rgba(118, 250,178, 1)",
                            "rgba(91, 216,148, 1)",
                        ]}
                        style={{ flex: 1 }}
                    />
                ),
                tabBarStyle: { height: 60 },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    tabBarInactiveTintColor: "#0A152F",
                    tabBarActiveTintColor: "white",
                    tabBarLabelStyle: { fontSize: 13 },
                    tabBarIcon: ({ focused }) => (
                        <MaterialIcons
                            name={"home"}
                            color={focused ? "white" : "#0A152F"}
                            size={24}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="favourite"
                options={{
                    title: "Favourite",
                    tabBarInactiveTintColor: "#0A152F",
                    tabBarActiveTintColor: "white",
                    tabBarLabelStyle: { fontSize: 13 },
                    tabBarIcon: ({ focused }) => (
                        <Ionicons
                            name={"heart-sharp"}
                            color={focused ? "white" : "#0A152F"}
                            size={24}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="compare"
                options={{
                    title: "Compare",
                    tabBarInactiveTintColor: "#0A152F",
                    tabBarActiveTintColor: "white",
                    tabBarLabelStyle: { fontSize: 13 },
                    tabBarIcon: ({ focused }) => (
                        <Ionicons
                            name={"swap-horizontal-outline"}
                            color={focused ? "white" : "#0A152F"}
                            size={24}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="cart"
                options={{
                    title: "Cart",
                    tabBarInactiveTintColor: "#0A152F",
                    tabBarActiveTintColor: "white",
                    tabBarLabelStyle: { fontSize: 13 },
                    tabBarIcon: ({ focused }) => (
                        <FontAwesome6
                            name={"cart-shopping"}
                            color={focused ? "white" : "#0A152F"}
                            size={20}
                        />
                    ),
                }}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    padding: 20,
    marginTop: 20,
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 10,
  },
  header: {
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 5,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 65,
  },
  name: {
    fontSize: 18,
    color: "#5BD894",
    fontWeight: "bold",
    marginTop: 5,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#5BD894",
  },
  changePasswordmenuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#5BD894",
  },
  menuText: {
    fontSize: 16,
    color: "black",
    fontWeight: "400",
    marginLeft: 15,
  },
  menuIcon: { color: "#5BD894", fontSize: 23 },
  separator: {
    borderBottomColor: "#5BD894",
    borderBottomWidth: 1,
  },
  buttonsMainContainer: {
    flex: 1,
    position: "relative",
    alignItems: "center",
    marginBottom: 20,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#5BD894",
    borderRadius: 8,
    marginTop: "auto",
    height: 40,
    width: 150,
  },
  logOutIcon: {
    color: "black",
    fontSize: 24,
  },
  logoutText: {
    color: "black",
    marginLeft: 10,
    fontWeight: "500",
    marginBottom: 3,
  },
  signUpLiginButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    marginTop: "auto",
    height: 40,
    width: 150,
    gap: 5,
  },
  signUplogInButton: {
    width: 100,
    height: 40,
    padding: 10,
    borderRadius: 8,
    marginTop: "auto",
    backgroundColor: "#5BD894",
    justifyContent: "center",
    alignItems: "center",
  },
  signUpText: {
    color: "black",
    fontWeight: "500",
    marginBottom: 3,
  },
  menuItemContainer: {},
});
