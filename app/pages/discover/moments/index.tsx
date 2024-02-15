import { useNavigation } from "expo-router";
import { useLayoutEffect, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import CameraOutline from "@/icons/common/camera-outline.svg";
import { useTranslation } from "react-i18next";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import GoBack from "@/component/complex/GoBack";
import MomentsCard from "./components/MomentsCard";
import * as light from "@/theme/light";
const getMock = (type = "img", name = "读书方法") => {
  const Mock = {
    img: "https://placekitten.com/300/300",
    name,
    content:
      type === "img"
        ? "33"
        : "231312213123131221312313122131231312213123131221312313122131231312213123131221312313122131231312213123131221312313122131231312213123131221312313122131231312213123131221312313122131",
    contentType: type,
    time: "3 min",
    imgList: [
      "https://placekitten.com/302/302",
      "https://placekitten.com/301/301",
      "https://placekitten.com/301/301",
      "https://placekitten.com/301/301",
      "https://placekitten.com/301/301",
      "https://placekitten.com/301/301",
      "https://placekitten.com/301/301",
      "https://placekitten.com/301/301",
      "https://placekitten.com/301/301",
    ],
    videoLink:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    likes: [{ name }],
    comments: [
      { name, comment: "432432" },
      { name, comment: "好的" },
    ],
  };
  return Mock;
};
export type IMomentData = ReturnType<typeof getMock>;
const Moments = () => {
  const navigator = useNavigation();
  const { t } = useTranslation();
  const [momentsList, setMomentsList] = useState([
    getMock(),
    getMock(),
    getMock("video", "evan"),
    getMock("video", "evan"),
  ]);

  useLayoutEffect(() => {
    navigator.setOptions({
      title: t("moments"),
      headerLeft: () => <GoBack />,
      headerRight: () => <CameraOutline />,
    } as NativeStackNavigationOptions);
  });
  return (
    <ScrollView style={{ backgroundColor: light.themeColor.white, flex: 1 }}>
      {momentsList.map((item, index) => {
        return <MomentsCard key={index} momentData={item} />;
      })}
    </ScrollView>
  );
};
export default Moments;
