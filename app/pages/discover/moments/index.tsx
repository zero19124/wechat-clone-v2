import { useNavigation } from "expo-router";
import { useLayoutEffect, useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import CameraOutline from "@/icons/common/camera-outline.svg";
import { useTranslation } from "react-i18next";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import GoBack from "@/component/complex/GoBack";
import MomentsCard from "./components/MomentsCard";
import ActionSheet, { ActionSheetAction } from "@/component/base/ActionSheet";
import { useTheme } from "@/theme/useTheme";
import Toast from "@/component/base/Toast";
import * as ImagePicker from "expo-image-picker";
import { useCommonNavigateProps } from "@/component/complex/CommonNavigateTitle";

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
    const navigatorProps = useCommonNavigateProps({
      title: t("Moments"),
      rightComp: () => <CameraOutline />,
      rightHandler: () => {
        setVisible(true);
        // Toast.success('Toast')
      },
    });
    navigator.setOptions(navigatorProps as NativeStackNavigationOptions);
  });

  const [image, setImage] = useState(null);
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result, "result");

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      navigator.navigate("pages/discover/moments/screens/post-moments/index");
    }
  };
  const defaultActions: ActionSheetAction[] = [
    { name: t("Camera"), subname: "Take a photo or video" },
    {
      name: t("Choose from Album"),
      callback: () => {
        setTimeout(async () => {
          await pickImage();
        }, 600);
      },
    },
  ];
  const [visible, setVisible] = useState(false);

  const onClose = () => {
    setVisible(false);
  };
  return (
    <ScrollView style={{ backgroundColor: themeColor.white, flex: 1 }}>
      <Image style={{ width: 50, height: 50 }} source={{ uri: image }} />
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
