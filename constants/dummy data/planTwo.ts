import { Asset } from "expo-asset";

export const planTwo = {
    id: "2",
    name: "Plan 2",
    duration: "2 - 4 Weeks",
    fee: "£ 199.99",
    book: "£ 80",
    rating: "2.3",
    facilities: [
        {
            id: "af2d7c2a-8dsdsa3e-4e49-b5b5-5d34b7a1d1a3",
            title: "Travel Facility",
            image: Asset.fromModule(
                require("@/assets/images/schoolDetailsPage/overview/facilities/facilities-1.png")
            ).uri,
        },
        {
            id: "d4f5a8e7-5d5sdsddawdwa-43b6-926a-2f1d2d2e4b5f",
            title: "Hostel",
            image: Asset.fromModule(
                require("@/assets/images/schoolDetailsPage/overview/facilities/facilities-2.png")
            ).uri,
        },
        {
            id: "d4f5a8e7-5d5sdsasdawdda-43b6-926a-2f1d2d2e4b5f",
            title: "Hotel",
            image: Asset.fromModule(
                require("@/assets/images/schoolDetailsPage/overview/facilities/facilities-3.png")
            ).uri,
        },
        {
            id: "d4f5a8e7-5d5sdsddawdwa-43b6-926a-2f1d2d2e4b5f",
            title: "Hostel",
            image: Asset.fromModule(
                require("@/assets/images/schoolDetailsPage/overview/facilities/facilities-4.png")
            ).uri,
        },
    ],
};
