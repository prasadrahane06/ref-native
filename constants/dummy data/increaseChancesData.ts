import { Asset } from "expo-asset";

export const increaseChancesData = [
    {
        id: "a1",
        courseName: "Last 2 Days to remaining",
        schoolName: "English Learning Course",
        image: Asset.fromModule(
            require("@/assets/images/studentHomePage/increaseChance/image_1.png")
        ).uri,
        daysRemaining: "2",
    },
    {
        id: "a2",
        courseName: "Last 5 Days to remaining",
        schoolName: "Intensive English course",
        image: Asset.fromModule(
            require("@/assets/images/studentHomePage/increaseChance/image_2.png")
        ).uri,
        daysRemaining: "2",
    },
];
