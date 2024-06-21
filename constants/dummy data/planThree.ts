import { Asset } from "expo-asset";

export const planThree = {
    id: 1,
    name: "Plan Three",
    duration: "4 - 5 years",
    fee: 29.99,
    book: "50$",
    rating: 9.7,
    facilities: [
        {
            id: "e1a72a2b-d5ddd1f-4a37-a9a3-2d78f6743c78",
            title: "Library",
            image: Asset.fromModule(
                require("@/assets/images/schoolDetailsPage/overview/facilities/facilities-1.png")
            ).uri,
        },
        {
            id: "b7c3e6ea-80bsss5-4f76-8a8f-f28d93f7d396",
            title: "Visa apply",
            image: Asset.fromModule(
                require("@/assets/images/schoolDetailsPage/overview/facilities/facilities-2.png")
            ).uri,
        },
        {
            id: "af2d7c2a-8dsdsa3e-4e49-b5b5-5d34b7a1d1a3",
            title: "Travel Facility",
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
        {
            id: "d4f5a8e7-5d5sdsasdawdda-43b6-926a-2f1d2d2e4b5f",
            title: "Hotel",
            image: Asset.fromModule(
                require("@/assets/images/schoolDetailsPage/overview/facilities/facilities-5.png")
            ).uri,
        },
        {
            id: "d4f5a8e7-5d5sdsasdada-43b6-926a-2f1d2d2e4b5f",
            title: "More",
            image: Asset.fromModule(
                require("@/assets/images/schoolDetailsPage/overview/facilities/facilities-6.png")
            ).uri,
        },
    ],
};
