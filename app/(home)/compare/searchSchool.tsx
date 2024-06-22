import React, { useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import { AUIThemedText } from "@/components/common/AUIThemedText";
import AUIInputField from "@/components/common/AUIInputField";
import { APP_THEME } from "@/constants/Colors";
import AUIImage from "@/components/common/AUIImage";
import { Asset } from "expo-asset";
import { router } from "expo-router";

interface School {
  id: string;
  name: string;
  address: string;
}

const SearchSchool: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [recentSearches, setRecentSearches] = useState<School[]>([
    {
      id: "1",
      name: "The Manchester Schools",
      address:
        "East, Academy The East, 60 Grey Mare Ln, Greater, Beswick, Manchester M11 3DS, United Kingdom",
    },
    {
      id: "2",
      name: "Henley Business School",
      address:
        "East, Academy The East, 60 Grey Mare Ln, Greater, Beswick, Manchester M11 3DS, United Kingdom",
    },
  ]);

  const renderItem = ({ item }: { item: School }) => (
    <AUIThemedView style={styles.recentItem}>
      <AUIImage
        style={styles.schoolImage}
        path={
          Asset.fromModule(
            require("@/assets/images/compareScreen/Group (1).png")
          ).uri
        }
        resizeMode="contain"
      />
      <AUIThemedView style={styles.recentItemText}>
        <AUIThemedText style={styles.recentItemName}>{item.name}</AUIThemedText>
        <AUIThemedText style={styles.recentItemAddress}>
          {item.address}
        </AUIThemedText>
      </AUIThemedView>
    </AUIThemedView>
  );

  return (
    <AUIThemedView style={styles.container}>
      <AUIThemedText style={styles.searchschoolText}>
        Search school
      </AUIThemedText>
      <AUIThemedView style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={26}
          color="#5BD894"
          style={styles.searchIcon}
        />
        <AUIInputField
          placeholder="Which school are you looking?"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onPress={() =>
            router.push({
              pathname: `(home)/compare/compareSchools`,
            })
          }
          style={styles.searchInput}
          inputStyle={styles.inputField}
        />
        <TouchableOpacity>
          <FontAwesome name="microphone" size={24} color="black" />
        </TouchableOpacity>
      </AUIThemedView>

      <AUIThemedView style={styles.orContainer}>
        <AUIThemedView style={styles.line} />
        <AUIThemedText style={styles.orText}>OR</AUIThemedText>
        <AUIThemedView style={styles.line} />
      </AUIThemedView>

      <TouchableOpacity style={styles.favoriteContainer}>
        <Ionicons
          name="heart-outline"
          style={styles.favoriteIcon}
          size={24}
          color="#9DA1AC"
        />
        <AUIThemedText style={styles.favoriteText}>
          Choose from your favorite...
        </AUIThemedText>
        <Ionicons name="chevron-down-outline" size={24} color="#0A152F" />
      </TouchableOpacity>

      <AUIThemedText style={styles.recentText}>
        Recently searched schools
      </AUIThemedText>

      <FlatList
        data={recentSearches}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </AUIThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#ffffff",
  },
  searchschoolText: {
    fontWeight: "500",
    marginBottom: 6,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#9DA1AC",
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: "#F5F5F5",
  },
  searchIcon: {
    // marginRight: 8,
  },
  searchInput: {
    flex: 1,
  },
  inputField: {
    height: 40,
    borderWidth: 0,
    // paddingVertical: 8,
    // padding: 8,
    backgroundColor: "#F5F5F5",
  },
  orContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 16,
    backgroundColor: APP_THEME.background,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#5BD894",
  },
  orText: {
    marginHorizontal: 8,
    color: "#0A152F",
  },
  favoriteContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#9DA1AC",
    borderRadius: 8,
    padding: 8,
    backgroundColor: "#F5F5F5",
  },
  favoriteText: {
    flex: 1,
    paddingLeft: 8,
    color: "grey",
  },
  favoriteIcon: {
    marginRight: 5,
  },
  recentText: {
    marginTop: 30,
    marginBottom: 8,
    fontSize: 16,
    fontWeight: "bold",
  },
  recentItem: {
    flexDirection: "row",
    // alignItems: "center",
    marginVertical: 8,
    marginTop: 15,
    backgroundColor: APP_THEME.background,
  },
  schoolImage: {
    width: 25,
    height: 25,
    marginRight: 5,
  },
  recentItemText: {
    marginLeft: 8,
    backgroundColor: APP_THEME.background,
  },
  recentItemName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  recentItemAddress: {
    color: "#000000",
  },
});

export default SearchSchool;
