import { useFocusEffect, useNavigation } from "expo-router";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
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
import { TImageIns, uploadImages } from "@/hooks/useImagePicker";
import { TextInput } from "react-native-gesture-handler";
import eventBus from "@/utils/eventBus";
import { getSize } from "utils";
import { useLoadingStore } from "app/store/globalLoading";
type TMomentsComment = { sendHandler: (comment: string) => Promise<any> };
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
  const [momentsList, setMomentsList] = useState([]);
  const [visible, setVisible] = useState(false);
  const [commentVisible, setCommentVisible] = useState(false);
  const { setLoadingStore } = useLoadingStore();

  const pickImages = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });
    console.log("pickImages.log");

    if (!result.canceled) {
      console.log(result, "result");
      const selectedImages = result?.assets?.map((image) => {
        return {
          uri: image.uri,
          type: image.type,
          // no fileName property on android
          // name: image.fileName,
          name: image.assetId,
        };
      });
      console.log(selectedImages.length, "selectedImages.length");

      // return;
      const uploadedImgs = await uploadImages(selectedImages);
      console.log(uploadedImgs, "uploadedImgs", 100);
      if (uploadedImgs?.length) {
        navigator.navigate(
          "pages/discover/moments/screens/post-moments/index",
          {
            uploadedImgs,
          }
        );
      } else {
        Toast.fail(t("upload failed"));
      }
    }
  };

  const defaultActions: ActionSheetAction[] = [
    {
      name: t("Camera"),
      subname: "Take a photo or video",
      callback: () => {
        useType: "moments",
          navigator.navigate("pages/chats/msg-chats/screens/camera/index", {
            useType: "moments",
          });
      },
    },
    {
      name: t("Choose from Album"),
      callback: () => {
        setTimeout(async () => {
          await pickImages();
        }, 600);
      },
    },
  ];

  const onClose = () => {
    setVisible(false);
  };
  const getMomentsList = () => {
    setLoadingStore({ loading: true });
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
      })
      .finally(() => {
        setLoadingStore({ loading: false });
      });
  };
  const curCommentData = useRef<TMomentsComment>();
  useEffect(() => {
    eventBus?.on?.("moments-comment", (data: TMomentsComment) => {
      setCommentVisible(true);
      console.log(data, "moments-comment");
      curCommentData.current = data;
    });
    eventBus?.on?.("moments-liked", () => {
      getMomentsList();
    });
  }, []);
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
  // after post need refresh
  useFocusEffect(
    useCallback(() => {
      getMomentsList();
    }, [])
  );
  // useEffect(() => {
  //       getMomentsList();
  // }, []);
  return (
    <KeyboardAvoidingView
      style={{
        // backgroundColor: "yellow",
        flex: 1,
      }}
      keyboardVerticalOffset={100}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView style={{ backgroundColor: themeColor.white, flex: 1 }}>
        <ActionSheet
          style={{
            flex: 1,
            backgroundColor: themeColor.white,
            borderRadius: 8,
          }}
          visible={visible}
          actions={defaultActions}
          onClose={onClose}
          cancelText={t("Cancel")}
          onCancel={onClose}
        />
        <Pressable
          style={{ flex: 1 }}
          onPress={() => {
            console.log("KeyboardAvoidingView-moments");
            setCommentVisible(false);
          }}
        >
          {momentsList?.map((item, index) => {
            // console.log(item, "item");
            return (
              <View key={index}>
                <MomentsCard momentData={item} />
              </View>
            );
          })}
        </Pressable>
        {commentVisible && (
          <View style={{ backgroundColor: themeColor.fillColor, padding: 4 }}>
            <TextInput
              onSubmitEditing={async (event) => {
                const text = event.nativeEvent.text;
                curCommentData.current?.sendHandler?.(text).then(() => {
                  // refresh list
                  setCommentVisible(false);
                  getMomentsList();
                });
              }}
              returnKeyType="send"
              autoFocus
              selectionColor={themeColor.primary}
              style={{
                borderRadius: 4,
                height: getSize(38),
                paddingLeft: 8,
                fontSize: 18,
                backgroundColor: themeColor.white,
              }}
            />
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
export default Moments;
