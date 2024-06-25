import { Asset } from "expo-asset";

export const carouselData = [
  {
    id: "1",
    imageSource: Asset.fromModule(
      require("@/assets/images/studentHomePage/carouselImages/carousel-1.png")
    ).uri,
    text: "LEARN A LANGUAGE ABROAD",
  },
  {
    id: "2",
    imageSource: Asset.fromModule(
      require("@/assets/images/studentHomePage/carouselImages/carousel-2.png")
    ).uri,
    text: "EXPLORE NEW LANGUAGES",
  },
  {
    id: "3",
    imageSource: Asset.fromModule(
      require("@/assets/images/studentHomePage/carouselImages/carousel-3.png")
    ).uri,
    text: "EMBRACE MULTILINGUALISM",
  },
];
