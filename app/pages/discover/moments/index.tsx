import { useNavigation } from "expo-router";
import { useLayoutEffect, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import CameraOutline from "@/icons/common/camera-outline.svg";
import { useTranslation } from "react-i18next";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import GoBack from "@/component/complex/GoBack";
import MomentsCard from "./components/MomentsCard";
import ActionSheet, { ActionSheetAction } from "@/component/base/ActionSheet";
import { useTheme } from "@/theme/useTheme";
import Toast from "@/component/base/Toast";
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
  const { themeColor } = useTheme();
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
      headerRight: () => (
        <Pressable
          onPress={() => {
            Toast.success("成功文案");
            return;
            setVisible(true);
          }}
        >
          <CameraOutline />
        </Pressable>
      ),
    } as NativeStackNavigationOptions);
  });
  const defaultActions: ActionSheetAction[] = [
    { name: t("Camera"), subname: "Take a photo or video" },
    { name: t("Choose from Album") },
  ];
  const [visible, setVisible] = useState(false);

  const onClose = () => {
    setVisible(false);
  };
  return (
    <ScrollView style={{ backgroundColor: themeColor.white, flex: 1 }}>
      <ActionSheet
        style={{ backgroundColor: themeColor.white, borderRadius: 8 }}
        visible={visible}
        actions={defaultActions}
        onClose={onClose}
        cancelText={t("Cancel")}
        onCancel={onClose}
      />
      {momentsList.map((item, index) => {
        return <MomentsCard key={index} momentData={item} />;
      })}
    </ScrollView>
  );
};
export default Moments;
