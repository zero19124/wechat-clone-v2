import { useFocusEffect, useNavigation } from "expo-router";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
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
import config from "@/config/index";
import { useUser } from "app/store/user";
import { TImageIns } from "@/hooks/useImagePicker";
import { TextInput } from "react-native-gesture-handler";

const getMock = (type = "img", name = "读书方法") => {
  const Mock = {
    image: "https://placekitten.com/300/300",
    act: name,
    user: { act: "", img: "" },
    contentText:
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
  const { userStore } = useUser();
  const { themeColor } = useTheme();
  const [momentsList, setMomentsList] = useState([
    // getMock(),
    // getMock(),
    // getMock("video", "evan"),
    // getMock("video", "evan"),
  ]);

  useLayoutEffect(() => {
    const navigatorProps = useCommonNavigateProps({
      title: t("Moments"),
      rightComp: () => <CameraOutline />,
      rightHandler: () => {
        setVisible(true);
      },
    });
    navigator.setOptions(navigatorProps as NativeStackNavigationOptions);
  });

  const pickImages = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        quality: 1,
      });

      if (!result.canceled) {
        console.log(result, "result");
        const selectedImages = result?.assets?.map((image) => {
          return {
            uri: image.uri,
            type: image.type,
            name: image.fileName,
          };
        });
        console.log(selectedImages.length, "selectedImages.length");

        // setImages(selectedImages);
        // console.log(selectedImages, "selectedImages");

        // const uploadedImgs = await uploadImages(selectedImages);
        if (true) {
          setTimeout(() => {
            navigator.navigate("pages/discover/screens/nearBy/index", {
              uploadedImgs: [],
            });
          }, 1000);
        } else {
          Toast.fail(t("upload failed"));
        }
      }
    } catch (e) {
      console.log(e, "error-moment post");
    }
  };
  const uploadImages = async (images: TImageIns[]) => {
    const formData = new FormData();
    console.log(images.length, "images.length");
    images.forEach((image, index) => {
      formData.append(`files`, {
        uri: image.uri,
        name: image.name,
        type: image.type,
      } as any);
    });
    console.log(formData, "formData");
    try {
      const response = await fetch(config.apiDomain + "/api/utils/upload", {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.code === 200) {
        console.log("ok");
        return data.data;
      } else {
        Toast.fail("upload failed");
        return [];
      }
    } catch (error) {
      console.error("Error:", error);
      return [];
    }
  };
  const defaultActions: ActionSheetAction[] = [
    { name: t("Camera"), subname: "Take a photo or video" },
    {
      name: t("Choose from Album"),
      callback: () => {
        setTimeout(() => {
          navigator.navigate("pages/discover/screens/nearBy/index");
        }, 1000);
        return;
        setTimeout(async () => {
          await pickImages();
        }, 600);
      },
    },
  ];
  const [visible, setVisible] = useState(false);

  const onClose = () => {
    setVisible(false);
  };
  const getMomentsList = () => {
    fetch(
      config.apiDomain +
        "/api/moments/getFriendMomentsByUserId?userId=" +
        userStore.userInfo?._id
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res, "getMomentsByUserId");
        if (res?.code === 200) {
          setMomentsList(res.data.momentsList);
        } else {
          console.log(res.data);
        }
      });
  };
  useFocusEffect(
    useCallback(() => {
      getMomentsList();
    }, [])
  );

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={90}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView style={{ backgroundColor: themeColor.white, flex: 1 }}>
        <ActionSheet
          style={{ backgroundColor: themeColor.white, borderRadius: 8 }}
          visible={visible}
          actions={defaultActions}
          onClose={onClose}
          cancelText={t("Cancel")}
          onCancel={onClose}
        />
        {momentsList?.map((item, index) => {
          // console.log(item, "item");
          return <MomentsCard key={index} momentData={item} />;
        })}
      </ScrollView>
      {/* <TextInput style={{ width: 50, height: 50, backgroundColor: "red" }} /> */}
    </KeyboardAvoidingView>
  );
};
export default Moments;
