import {
  Animated,
  Dimensions,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import EmojiPicker from "rn-emoji-keyboard";
import DeviceInfo from "react-native-device-info";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { useLayoutEffect, useMemo, useRef, useState } from "react";
import ThreeDot from "@/icons/three-dot.svg";
import GoBack from "@/icons/common/go-back.svg";
import FnKeyBoard, { FN_TYPE_MAPS } from "@/component/business/FnKeyBoard";
import PrivateChatList from "./component/ChatList";
import ChatInput from "./component/ChatInput";
import { useTheme } from "@/theme/useTheme";
import { useUser } from "app/store/user";
import { useChatList } from "app/store/chatList";
import useSendMsg from "@/hooks/useSendMsg";
import { useTranslation } from "react-i18next";
import ActionSheet, { ActionSheetAction } from "@/component/base/ActionSheet";
import { TNavigationOptions } from "@/component/complex/CommonNavigateTitle";
import { getSize } from "utils";
import { uploadImages } from "@/hooks/useImagePicker";
import MemberList from "./component/MemberList";
import Toast from "@/component/base/Toast";
import { useLoadingStore } from "app/store/globalLoading";
const _270 = getSize(220);

const Page = () => {
  const screenHeight = Dimensions.get("screen").height - 300;
  const navigate = useNavigation();
  // 获取设备型号
  const deviceModel = DeviceInfo.getModel();
  const [visible, setVisible] = useState(false);
  const [memberListVisible, setMemberListVisible] = useState(false);
  const { themeColor } = useTheme();
  const [msg, setMsg] = useState("");
  const heightValue = useRef(new Animated.Value(10)).current;
  const screenHeightValue = useRef(new Animated.Value(screenHeight)).current;
  const height = useRef(0);
  const { sendMsgHandler } = useSendMsg();
  const flatListRef = useRef<FlatList>();
  const { userInfo } = useUser().userStore;
  const { setLoadingStore } = useLoadingStore();
  const { chatListStore } = useChatList();
  const params = useLocalSearchParams<{ convoId: string; chatType: string }>();
  const convoId = useMemo(() => {
    console.log("chatListStore.curConvo-msg-chat", chatListStore.curConvo);
    return chatListStore.curConvo?.convoId;
  }, [chatListStore.curConvo]);
  const { t } = useTranslation();
  const curReceiverInfo = useMemo(() => {
    return chatListStore.curConvo?.curReceiverInfo;
  }, [chatListStore]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const title = useMemo(() => {
    if (params.chatType === "isGroup") {
      const groupName = chatListStore.curConvo?.groupName;
      return t(
        (groupName ? groupName : "Group chat") +
          "(" +
          chatListStore.curConvo?.convoMember?.length +
          ")"
      );
    }
    return curReceiverInfo?.act;
  }, [params, curReceiverInfo]);

  const startAnimation = (toValue) => {
    Animated.timing(heightValue, {
      toValue,
      duration: toValue === 0 ? 0 : 100, // 动画持续时间
      useNativeDriver: false, // 在 Android 上需要设置为 false
    }).start();
  };

  Keyboard.addListener("keyboardWillShow", () => {
    startAnimation(0);
    setChatListHeight(300);
  });

  const setH = () => {
    console.log(heightValue, "cH.current");
    Keyboard.dismiss();
    if (height.current === _270) {
      startAnimation(0);
      height.current = 0;
      return;
    }

    height.current = _270;
    startAnimation(_270);
  };

  const VideoCallActions = [
    {
      name: t("📹 Video Call"),
      callback: () => {
        console.log("Video");
        navigate.navigate("pages/chats/screens/video-call-send/index", {
          autoCall: true,
        });
      },
    },
    {
      name: t("🔊 Voice Call"),
      callback: () => {
        console.log("Voice");
        router.push("pages/chats/screens/video-call-send");
        // navigate.navigate("pages/chats/screens/video-call-send/index");
      },
    },
  ];
  const LocationActions = [
    {
      name: t("Send Location"),
      callback: () => {
        if (Platform.OS === "android") {
          Toast.info("android not support this");
          return;
        }
        console.log("Location");
        navigate.navigate("pages/chats/msg-chats/screens/location/index");
      },
    },
    {
      name: t("Real-time Location"),
      callback: () => {
        if (Platform.OS === "android") {
          Toast.info("android not support this");
          return;
        }
        console.log("Location2");
        setLoadingStore({ loading: true });

        sendMsgHandler({
          val:
            "realTimeLocation+" + "sharing real time location+" + userInfo?._id,
          userId: userInfo?._id + "",
          type: "realTimeLocation",
          convoId: convoId + "",
          doneHandler: (res: any) => {
            setLoadingStore({ loading: false });

            if (res.code !== 200) {
              Toast.info("sth went wrong in Real-time Location");
              return;
            }
            const data = res.data;
            console.log(data, "latest-data-Real-time-Location");

            navigate.navigate(
              "pages/chats/msg-chats/screens/real-time-location/index",
              { messageIdForRoom: data._id }
            );
          },
        });
      },
    },
  ];
  const [defaultActions, setDefaultActions] =
    useState<ActionSheetAction[]>(VideoCallActions);

  const onClose = () => {
    setVisible(false);
  };
  useLayoutEffect(() => {
    navigate.setOptions({
      headerShown: true,
      headerShadowVisible: false,
      headerRight: () => <ThreeDot />,
      headerLeftContainerStyle: { paddingLeft: 12 },
      headerTitle: () => {
        return (
          <TouchableOpacity
            onPress={() => {
              setMemberListVisible(true);
            }}
          >
            <Text
              style={{
                color: themeColor.bg5,
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              {title}
            </Text>
          </TouchableOpacity>
        );
      },
      headerTitleAlign: "center",
      headerLeft: () => {
        if (Platform.OS === "android") {
          return null;
        }
        return (
          <View>
            <TouchableOpacity
              style={{ flexDirection: "row", alignItems: "center" }}
              onPress={() => {
                router.back();
              }}
            >
              <GoBack width={24} height={24} />
              <View
                style={{
                  marginLeft: 4,
                  backgroundColor: themeColor.text2,
                  width: 22,
                  height: 22,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 22,
                }}
              >
                <Text>{parseInt(Math.random() * 10 + "")}</Text>
              </View>
            </TouchableOpacity>
          </View>
        );
      },
      headerRightContainerStyle: { paddingRight: 12 },
    } as TNavigationOptions);
  }, []);
  const setChatListHeight = (toValue: number) => {
    Animated.timing(screenHeightValue, {
      toValue,
      duration: 100, // 动画持续时间
      useNativeDriver: false, // 在 Android 上需要设置为 false
    }).start();
  };
  console.log("PrivateChatLis-outside-with-input-render");
  return (
    <SafeAreaView
      style={{
        backgroundColor: themeColor.fillColor,
        flex: 1,
      }}
      edges={["bottom"]}
    >
      <MemberList
        memberListVisible={memberListVisible}
        onClose={() => {
          setMemberListVisible(false);
        }}
      />
      <ActionSheet
        style={{
          backgroundColor: themeColor.white,
          borderRadius: 8,
        }}
        visible={visible}
        actions={defaultActions}
        onClose={onClose}
        cancelText={t("Cancel")}
        onCancel={onClose}
      />
      <KeyboardAvoidingView
        style={{
          backgroundColor: "yellow",
          flex: 1,
        }}
        keyboardVerticalOffset={90}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {/* 聊天content  */}
        {/* 聊天列表 */}
        <View
          
          style={{ flex: 1, backgroundColor: "red", overflow: "scroll" }}
        >
          <PrivateChatList
            onPress={() => {
              console.log(444);
              startAnimation(0);
              setChatListHeight(screenHeight);
              setH();
              Keyboard.dismiss();
            }}
          />
        </View>
        {/* <View
          style={{ width: "100%", height: 10, backgroundColor: "purple" }}
        ></View> */}
        {/* keyboard 内容 */}
        <ChatInput
          emojiPress={() => {
            // console.log("333");
            setIsOpen(true);
          }}
          onVoiceEnd={async (uri) => {
            console.log(111, uri);
            // upload the audio
            const uploadedphotos = await uploadImages([
              {
                uri: uri,
                name: "audio-" + Math.random() + ".m4a",
                type: "audio/mpeg",
              },
            ]);
            console.log(uploadedphotos, "uploadedphotos");
            sendMsgHandler({
              val: uploadedphotos[0],
              userId: userInfo?._id + "",
              type: "voice",
              convoId: convoId + "",
              doneHandler: () => {
                // setMsg("");
              },
            });
          }}
          value={msg}
          onChangeText={(val: string) => {
            setMsg(() => val);
          }}
          onFocus={() => {
            // console.log(flatListRef.current?.props, "flatListRef");
            // flatListRef.current?.scrollToIndex({ animated: true, index: 0 });
          }}
          onEndEditing={() => {
            if (!convoId) {
              console.log("convoId is null onEndEditing");
              return;
            }
            sendMsgHandler({
              val: msg,
              userId: userInfo?._id + "",
              type: "text",
              convoId: convoId + "",
              doneHandler: () => {
                setMsg("");
              },
            });
          }}
          chatPress={() => {
            console.log("c");
          }}
          plusPress={() => {
            console.log("p");
            setH();
          }}
        />
        <EmojiPicker
          disabledCategories={[]}
          defaultHeight={"30%"}
          categoryPosition={"top"}
          height={30}
          onEmojiSelected={(emojiSelectedData) => {
            // {"emoji": "🤗", "name": "smiling face with open hands",
            //  "slug": "smiling_face_with_open_hands",
            //   "toneEnabled": false, "unicode_version": "1.0"}
            // console.log(emojiSelectedData, "emojiSelectedData");
            setMsg((val: string) => (val += emojiSelectedData.emoji + ""));
          }}
          open={isOpen}
          onClose={() => setIsOpen(false)}
        />
        {
          <FnKeyBoard
            heightValue={heightValue}
            handlers={({ type, val }: { type: string; val: any }) => {
              console.log(type, val, "handlers");

              if (type === FN_TYPE_MAPS.Album) {
                console.log("Album");
                sendMsgHandler({
                  val,
                  userId: userInfo?._id + "",
                  type: "img",
                  convoId: convoId + "",
                  doneHandler: () => {},
                });
              } else if (type === FN_TYPE_MAPS.VideoCall) {
                console.log("VideoCall");
                setVisible(!visible);
                setDefaultActions(VideoCallActions);

                setH();
              } else if (type === FN_TYPE_MAPS.Location) {
                console.log("Location");
                setVisible(!visible);
                setDefaultActions(LocationActions);
                setH();
              }
            }}
          />
        }
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
export default Page;
