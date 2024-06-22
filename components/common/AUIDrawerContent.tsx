import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Switch,
} from "react-native";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { AUIThemedText } from "@/components/common/AUIThemedText";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { APP_THEME } from "@/constants/Colors";
import AUIImage from "./AUIImage";
import { Asset } from "expo-asset";
import { AUIThemedView } from "./AUIThemedView";
import { GLOBAL_TEXT } from "@/constants/Properties";
import AUIBackgroundImage from "./AUIBackgroundImage";
import { removeUserData } from "@/constants/RNAsyncStore";
import { useNavigation, useRouter } from "expo-router";

//interface
export interface DrawerItem {
  label: string;
  iconPath: any;
  navigateTo: string;
}

export interface DrawerProps {
  isLoggedIn: boolean;
  user: {
    name: string;
    avatarUrl: string;
  };
  items: DrawerItem[];
  onLogout: () => void;
  school?: boolean;
}

// const AUIDrawerContent: React.FC<DrawerProps & DrawerContentComponentProps> = ({
//   //   isLoggedIn,
//   //   user,
//   //   items,
//   //   onLogout,
//   //   navigation,
//   //     school,
//   ...props
// }) => {
const AUIDrawerContent = (props: any) => {
  const [isThemeEnabled, setIsEnabled] = useState(false);
  const [isPositionEnabled, setIsPositionEnabled] = useState(false);
  const router = useRouter();
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const togglePositionSwitch = () =>
    setIsPositionEnabled((previousState) => !previousState);
  const onLogout = () => {
    removeUserData();
    router.push({ pathname: "/" });
  };
  return (
    <AUIThemedView style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{
          marginTop: -55,
          zIndex: 10,
        }}
      >
        <AUIThemedView style={styles.header}>
          {/* <TouchableOpacity style={styles.closeButton}>
            <Ionicons name="close" size={30} color="black" />
          </TouchableOpacity> */}
          <View style={styles.avatarContainer}>
            <AUIImage
              path={
                Asset.fromModule(
                  require("@/assets/images/user.png")

                  // "https://linguest-assets-dev.s3.ap-south-1.amazonaws.com/1718884990288-6296.jpeg"
                ).uri
              }
              style={styles.avatar}
            />
            <View style={styles.nameContainer}>
              <AUIThemedText style={styles.name}>{"Hii, Yazeed"}</AUIThemedText>
              <AUIThemedText style={styles.welcome}>
                {"Welcome back"}
              </AUIThemedText>
            </View>
          </View>
        </AUIThemedView>
        {/* </AUIBackgroundImage> */}
        <View style={{ flex: 1, backgroundColor: "#fff", paddingTop: 10 }}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View
        style={{
          borderTopWidth: 1,
          borderTopColor: "#ccc",
          // backgroundColor: colors.cardbackground,
        }}
      >
        <AUIThemedText style={styles.preferences}>Preferences</AUIThemedText>
        <AUIThemedView style={styles.switchTextContainer}>
          <Switch
            trackColor={{ false: "#767577", true: APP_THEME.primary.first }}
            thumbColor={"#ffffff"}
            ios_backgroundColor={APP_THEME.ternary.first}
            onValueChange={toggleSwitch}
            value={isThemeEnabled}
            style={{ transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }] }}
          />
          <AUIThemedText
            style={{
              fontSize: 15,
            }}
          >
            {isThemeEnabled ? "Light Mode" : "Dark Mode"}
          </AUIThemedText>
        </AUIThemedView>
        <AUIThemedView style={styles.switchTextContainer}>
          <Switch
            trackColor={{ false: "#767577", true: APP_THEME.primary.first }}
            thumbColor={"#ffffff"}
            ios_backgroundColor={APP_THEME.ternary.first}
            onValueChange={togglePositionSwitch}
            value={isPositionEnabled}
            style={{ transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }] }}
          />
          <AUIThemedText
            style={{
              fontSize: 15,
            }}
          >
            {isPositionEnabled ? "Standard" : "RTL"}
          </AUIThemedText>
        </AUIThemedView>
      </View>
      <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: "#ccc" }}>
        <TouchableOpacity onPress={() => {}} style={{ paddingVertical: 15 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="share-social-outline" size={22} />
            <AUIThemedText
              style={{
                fontSize: 15,

                marginLeft: 5,
              }}
            >
              Tell a Friend
            </AUIThemedText>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
          <FontAwesome name="sign-out" style={styles.logOutIcon} />

          <AUIThemedText style={styles.logoutText}>
            {GLOBAL_TEXT.logout}
          </AUIThemedText>
        </TouchableOpacity>
      </View>
    </AUIThemedView>
  );
  //   return (
  //     <AUIThemedView style={styles.drawerContent}>
  //       <TouchableOpacity
  //         style={styles.closeButton}
  //         onPress={() => navigation.closeDrawer()}
  //       >
  //         <Ionicons name="close" size={30} color="black" />
  //       </TouchableOpacity>
  //       <AUIThemedView style={styles.menuItemMainContainer}>
  //         <AUIThemedView style={styles.header}>
  //           <Image source={{ uri: user.avatarUrl }} style={styles.avatar} />
  //           <AUIThemedText style={styles.name}>{user.name}</AUIThemedText>
  //           {school && (
  //             <AUIThemedView>
  //               <AUIThemedView style={styles.separator} />
  //               <AUIThemedText style={styles.schoolName}>
  //                 Gunnersbury House , 1 Chapel Hill, London, A11 B12
  //               </AUIThemedText>
  //             </AUIThemedView>
  //           )}
  //         </AUIThemedView>
  //         <AUIThemedView style={styles.menuItemContainer}>
  //           {items.map((item, index) => (
  //             <React.Fragment key={index}>
  //               {school && <AUIThemedView style={styles.separator} />}
  //               <TouchableOpacity
  //                 style={styles.menuItem}
  //                 onPress={
  //                   () => null
  //                   // navigation.navigate(item.navigateTo)
  //                 }
  //               >
  //                 <AUIImage
  //                   path={item.iconPath}
  //                   style={{ width: 26, height: 30 }}
  //                 />

  //                 <AUIThemedText style={styles.menuText}>
  //                   {item.label}
  //                 </AUIThemedText>
  //               </TouchableOpacity>
  //               <AUIThemedView style={styles.separator} />
  //             </React.Fragment>
  //           ))}
  //         </AUIThemedView>
  //       </AUIThemedView>
  //       <AUIThemedView style={styles.buttonsMainContainer}>
  //         {isLoggedIn ? (
  //           <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
  //             <FontAwesome name="sign-out" style={styles.logOutIcon} />
  //             <AUIThemedText style={styles.logoutText}>
  //               {GLOBAL_TEXT.logout}
  //             </AUIThemedText>
  //           </TouchableOpacity>
  //         ) : (
  //           <AUIThemedView style={styles.signUpLiginButtonContainer}>
  //             <TouchableOpacity
  //               style={styles.signUplogInButton}
  //               onPress={() => {}}
  //             >
  //               <AUIThemedText style={styles.signUpText}>
  //                 {GLOBAL_TEXT.singup}
  //               </AUIThemedText>
  //             </TouchableOpacity>
  //             <TouchableOpacity
  //               style={styles.signUplogInButton}
  //               onPress={() => {}}
  //             >
  //               <AUIThemedText style={styles.signUpText}>
  //                 {GLOBAL_TEXT.login}
  //               </AUIThemedText>
  //             </TouchableOpacity>
  //           </AUIThemedView>
  //         )}
  //       </AUIThemedView>
  //     </AUIThemedView>
  //   );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    // paddingTop: 18,
  },
  closeButton: {
    alignSelf: "flex-end",
    marginRight: 20,
  },
  menuItemMainContainer: {
    justifyContent: "center",
  },
  header: {
    // alignItems: "center",
    justifyContent: "flex-end",
    height: 200,
    backgroundColor: "rgba(91, 216, 148, 0.2)",
    paddingBottom: 15,
    // borderRadius: 16,
    // boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
  },
  avatarContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 20,
    paddingLeft: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    // marginBottom: 10,
  },
  nameContainer: {
    paddingTop: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: APP_THEME.primary.first,
    // color: APP_THEME.ternary.first,
  },
  welcome: {
    fontSize: 15,
    color: APP_THEME.gray,
  },
  menuItemContainer: {
    marginTop: 20,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  menuIcon: {
    fontSize: 25,
    marginRight: 20,
  },
  menuText: {
    fontSize: 16,
    paddingLeft: 15,
  },
  separator: {
    height: 1,
    backgroundColor: APP_THEME.primary.first,
    marginHorizontal: 20,
  },
  buttonsMainContainer: {
    position: "absolute",
    bottom: 50,
    left: "10%",
    right: "10%",
  },
  logoutButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: APP_THEME.primary.first,
    // marginHorizontal: 20,
    borderRadius: 15,
  },
  logOutIcon: {
    fontSize: 20,
    marginRight: 10,
    color: "white",
  },
  logoutText: {
    fontSize: 16,
    color: "white",
  },
  signUpLiginButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
  },
  signUplogInButton: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: "#3498DB",
    borderRadius: 5,
  },
  signUpText: {
    fontSize: 16,
    color: "white",
  },
  schoolName: {
    textAlign: "center",
    // paddingTop: 10,
    fontSize: 12,
    color: "#9DA1AC",
    width: 200,
  },
  userAvatar: {
    height: 67.5,
    width: 67.5,
    borderRadius: 40,
    marginBottom: 10,
    marginTop: 30,
  },
  switchTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 7,
    paddingVertical: 5,
  },
  preferences: {
    fontSize: 16,
    color: APP_THEME.gray,
    paddingTop: 10,
    fontWeight: "500",
    paddingLeft: 12,
  },
  switchText: {
    fontSize: 17,
    color: "",
    paddingTop: 10,
    fontWeight: "bold",
  },
});

export default AUIDrawerContent;
