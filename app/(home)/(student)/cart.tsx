import Course from "@/components/Course";
import { AUIThemedText } from "@/components/common/AUIThemedText";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import { GLOBAL_TEXT } from "@/constants/Properties";
import { RootState } from "@/redux/store";
import { Dimensions, FlatList, ScrollView, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

export default function TabFourScreen() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  console.log("Cart Items", cartItems);

  if (cartItems.length === 0) {
    return (
      <AUIThemedView style={styles.container}>
        <AUIThemedText style={styles.title}>
          {GLOBAL_TEXT.your_cart_is_empty}
        </AUIThemedText>
      </AUIThemedView>
    );
  }

  return (
    <ScrollView>
      <AUIThemedView style={styles.container}>
        <AUIThemedText style={styles.title}>
          {GLOBAL_TEXT.my_added_courses_in_cart}
        </AUIThemedText>

        <AUIThemedView style={styles.coursesContainer}>
          <FlatList
            data={cartItems}
            renderItem={({ item, index }) => (
              <AUIThemedView style={styles.courseItem}>
                <Course
                  title={item.title}
                  image={item.image}
                  startingDate={item.startingDate}
                  courseId={item.courseId}
                  cart
                />
              </AUIThemedView>
            )}
            keyExtractor={(item) => item.courseId}
            numColumns={2}
            columnWrapperStyle={styles.courseColumnWrapper}
            scrollEnabled={false}
          />
        </AUIThemedView>
      </AUIThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: "#ffffff",
    height: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },

  coursesContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingBottom: 10,
    height: "100%",
  },
  courseItem: {
    width: "48%",
    marginBottom: 10,
  },
  courseColumnWrapper: {
    justifyContent: "space-between",
    marginTop: 10,
  },
});
