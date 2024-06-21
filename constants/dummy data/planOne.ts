import { Asset } from "expo-asset";

export const planOne = {
    name: "Plan 1",
    duration: "1 - 2 years",
    fee: "9.99$",
    book: "50$",
    rating: "4.5",
    facilities: [
        {
            id: "d4f5a8e7-5d5sdsddawdwa-43b6-926a-2f1d2d2e4b5f",
            title: "Hostel",
            image: Asset.fromModule(
                require("@/assets/images/schoolDetailsPage/overview/facilities/facilities-4.png")
            ).uri,
        },
        {
            id: "d4f5a8e7-5d5sdsasdawdda-43b6-926a-2f1d2d2e4b5f",
            title: "Hotel",
            image: Asset.fromModule(
                require("@/assets/images/schoolDetailsPage/overview/facilities/facilities-5.png")
            ).uri,
        },
    ],
};
