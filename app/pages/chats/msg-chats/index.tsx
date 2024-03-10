import {
  Animated,
  Button,
  FlatList,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  NativeSyntheticEvent,
  Platform,
  Text,
  TextInput,
  TextInputSubmitEditingEventData,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import EmojiPicker from "rn-emoji-keyboard";
import DeviceInfo from "react-native-device-info";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import {
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import ThreeDot from "@/icons/three-dot.svg";
import GoBack from "@/icons/common/go-back.svg";
import FnKeyBoard, { FN_TYPE_MAPS } from "@/component/business/FnKeyBoard";
import PrivateChatList from "./component/ChatList";
import ChatInput from "./component/ChatInput";
import { useTheme } from "@/theme/useTheme";
import { useUser } from "app/store/user";
import config from "@/config/index";
import { useChatList } from "app/store/chatList";
import { PusherContext } from "@/hooks/usePusherProvider";
import useSendMsg from "@/hooks/useSendMsg";
import { useTranslation } from "react-i18next";
import ActionSheet, { ActionSheetAction } from "@/component/base/ActionSheet";
import { TNavigationOptions } from "@/component/complex/CommonNavigateTitle";
import { getHeight, getSize } from "utils";
import { uploadImages } from "@/hooks/useImagePicker";
const Page = () => {
  const navigate = useNavigation();
  // 获取设备型号
  const deviceModel = DeviceInfo.getModel();
  const { userInfo } = useUser().userStore;
  const { getChatList, chatListStore } = useChatList();

  const params = useLocalSearchParams();
  const convoId = useMemo(() => {
    return chatListStore.curConvo?.convoId;
  }, [params]);
  const curReceiverInfo = useMemo(() => {
    return chatListStore.curConvo?.curReceiverInfo;
  }, [chatListStore]);
  const [dataOut, setDataOut] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  useLayoutEffect(() => {
    navigate.setOptions({
      // headerShown: false,
      headerShadowVisible: false,
      headerRight: () => <ThreeDot />,
      headerLeftContainerStyle: { paddingLeft: 12 },
      title: curReceiverInfo?.act,
      headerTitleAlign: "center",
      headerLeft: () => (
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
      ),
      headerRightContainerStyle: { paddingRight: 12 },
    } as TNavigationOptions);
  }, []);
  const { toggleTheme, themeColor, themeName } = useTheme();
  const [msg, setMsg] = useState("");
  const heightValue = useRef(new Animated.Value(10)).current;
  const height = useRef(0);
  const { sendMsgHandler } = useSendMsg();
  const flatListRef = useRef<FlatList>();
  const startAnimation = (toValue) => {
    Animated.timing(heightValue, {
      toValue,
      duration: toValue === 0 ? 0 : 100, // 动画持续时间
      useNativeDriver: false, // 在 Android 上需要设置为 false
    }).start();
  };

  Keyboard.addListener("keyboardWillShow", () => {
    startAnimation(0);
  });

  const _270 = getSize(220);
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

  const updateConvoLatestMsgById = (convoId: string, latestMessage: string) => {
    if (!convoId) {
      console.log("convoId is null updateConvoLatestMsgById ");
      return;
    }
    fetch(config.apiDomain + "/api/convo/updateConvoLatestMsgById", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        convoId,
        latestMessage,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res, "res");
        if (res?.code === 200) {
          getChatList(userInfo?._id + "");
        } else {
          console.log(res?.msg);
        }
      });
  };
  const pusherContext = useContext(PusherContext);
  useEffect(() => {
    // 有新消息就更新会话列表
    pusherContext.socket?.on("messages", (messagesData) => {
      const data = messagesData.newMsgData;
      const type = messagesData.type;
      console.log(data, "messagesData-context");

      try {
        const latestMessage = data.msg;
        //     // 这里会重新调对话窗口列表
        updateConvoLatestMsgById(convoId + "", latestMessage);
        // 如果有转账的 更新对应的信息转账状态
        // 直接重新拉新数据 后面再优化状态更新问题
        if (data.type === "recallMsg") {
          getMsgList();
          return;
        }
        if (type && type === "isTransferAccepted") {
          getMsgList();
          return;
        }
        // 插入信息列表
        const newMsg = {
          userId: data.user._id,
          msgId: data._id,
          type: data.type,
          image: data.user.image,
          latestMessage,
        };
        setDataOut((pre) => [newMsg, ...pre]);
      } catch (e) {
        console.error(e, "mgsList-error");
      }
    });
  }, [pusherContext.socket]);
  const getMsgList = () => {
    fetch(config.apiDomain + `/api/msg/allMsgByConvoId?convoId=${convoId}`)
      .then((res) => res.json())
      .then((res) => {
        if (res?.code === 200) {
          // console.log(res.data, "dadad");
          setDataOut([
            ...res.data
              // ?.filter((item) => {
              //   return item.type !== "recalledMsg";
              // })
              .map((item) => {
                return {
                  type: item.type,
                  userId: item.userId,
                  msgId: item._id,
                  image: item.user.image,
                  latestMessage: item.msg,
                };
              }),
          ]);
          // 接受完后 清空输入框
          setMsg("");
        } else {
          console.log(res?.msg);
        }
      });
  };
  useEffect(() => {
    console.log(heightValue, "heightValue._value");

    getMsgList();
  }, []);
  const { t } = useTranslation();

  const VideoCallActions = [
    {
      name: t("Video Call"),
      callback: () => {
        console.log("Video");
        navigate.navigate("pages/chats/screens/video-call-send/index", {
          autoCall: true,
        });
      },
    },
    {
      name: t("Voice Call"),
      callback: () => {
        console.log("Voice");
        navigate.navigate("pages/chats/screens/video-call-send/index");
      },
    },
  ];
  const LocationActions = [
    {
      name: t("Send Location"),
      callback: () => {
        console.log("Location");
        navigate.navigate("pages/chats/msg-chats/screens/location/index");
      },
    },
    {
      name: t("Real-time Location"),
      callback: () => {
        console.log("Location2");
        sendMsgHandler({
          val:
            "realTimeLocation+" + "sharing real time location+" + userInfo?._id,
          userId: userInfo?._id + "",
          type: "realTimeLocation",
          convoId: chatListStore.curConvo?.convoId + "",
          doneHandler: (data: any) => {
            console.log(data, "latest data");
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

  const [visible, setVisible] = useState(false);

  const onClose = () => {
    setVisible(false);
  };
  return (
    <SafeAreaView
      style={{
        backgroundColor: themeColor.fillColor,
        flex: 1,
      }}
      edges={["bottom"]}
    >
      <ActionSheet
        style={{ backgroundColor: themeColor.white, borderRadius: 8 }}
        visible={visible}
        actions={defaultActions}
        onClose={onClose}
        cancelText={t("Cancel")}
        onCancel={onClose}
      />
      <KeyboardAvoidingView
        style={{
          // backgroundColor: "yellow",
          flex: 1,
        }}
        keyboardVerticalOffset={90}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {/* 聊天content  */}
        <TouchableWithoutFeedback
          style={{
            backgroundColor: "purple",
          }}
          onPress={() => {
            startAnimation(0);
            setH();
            Keyboard.dismiss();
          }}
        >
          {/* 聊天列表 */}
          <View style={{ flex: 1 }}>
            {dataOut.length ? (
              <PrivateChatList dataOut={dataOut} flatListRef={flatListRef} />
            ) : (
              <></>
            )}
          </View>
        </TouchableWithoutFeedback>
        {/* keyboard 内容 */}
        <ChatInput
          emojiPress={() => {
            // console.log("333");
            setIsOpen(true);
          }}
          onVoiceEnd={async (uri) => {
            console.log(111, uri);
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
