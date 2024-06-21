import { Asset } from "expo-asset";

export const reviewsData = [
    {
        id: "a1",
        name: "Sasha Perry",
        image: Asset.fromModule(
            require("@/assets/images/studentDetailsPage/overview/reviews/pic-1.png")
        ).uri,
        role: "Student",
        comment:
            "Nisi vivamus neque elementum, at pharetra. Cras gravida congue in tincidunt neque, ipsum egestas. Duis risus ipsum dis commodo.",
    },
    {
        id: "a2",
        name: "Jane Doe",
        image: Asset.fromModule(
            require("@/assets/images/studentDetailsPage/overview/reviews/pic-2.png")
        ).uri,
        role: "Student",
        comment:
            "Nisi vivamus neque elementum, at pharetra. Cras gravida congue in tincidunt neque, ipsum egestas. Duis risus ipsum dis commodo.",
    },
];
