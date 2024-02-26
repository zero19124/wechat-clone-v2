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
import { PusherEvent } from "@pusher/pusher-websocket-react-native";
import { useUser } from "app/store/user";
import config from "@/config/index";
import { useChatList } from "app/store/chatList";
import { PusherContext } from "@/hooks/usePusherProvider";
import useSendMsg from "@/hooks/useSendMsg";
import { useTranslation } from "react-i18next";
import ActionSheet, { ActionSheetAction } from "@/component/base/ActionSheet";
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
  console.log(convoId, "paramsparams");
  const [dataOut, setDataOut] = useState<any[]>([]);
  useLayoutEffect(() => {
    navigate.setOptions({
      // headerShown: false,
      headerShadowVisible: false,
      headerRight: () => <ThreeDot />,
      headerLeftContainerStyle: { paddingLeft: 12 },
      headerTitle: userInfo?.act,
      headerLeft: () => (
        <View>
          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center" }}
            onPress={() => {
              router.back();
            }}
          >
            <GoBack />
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
              <Text>3</Text>
            </View>
          </TouchableOpacity>
        </View>
      ),
      headerRightContainerStyle: { paddingRight: 12 },
    });
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

  const _270 = 220;
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
    pusherContext.socket?.on("messages", (data) => {
      console.log(data, "msgList");
      try {
        const latestMessage = data.msg;
        //     // 这里会重新调对话窗口列表
        updateConvoLatestMsgById(convoId + "", latestMessage);
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

  useEffect(() => {
    console.log(heightValue, "heightValue._value");

    fetch(config.apiDomain + `/api/msg/allMsgByConvoId?convoId=${convoId}`)
      .then((res) => res.json())
      .then((res) => {
        if (res?.code === 200) {
          // console.log(res.data, "dadad");
          setDataOut([
            ...res.data?.map((item) => {
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
  }, []);
  const { t } = useTranslation();
  const defaultActions: ActionSheetAction[] = [
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
          <PrivateChatList dataOut={dataOut} flatListRef={flatListRef} />
        </TouchableWithoutFeedback>
        {/* keyboard 内容 */}
        <ChatInput
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
          emojiPress={() => {
            console.log("e");
          }}
          plusPress={() => {
            console.log("p");
            setH();
          }}
        />

        {
          <FnKeyBoard
            heightValue={heightValue}
            handlers={({ type, val }: { type: string; val: any }) => {
              console.log(type, val, "handlers");

              if (type === FN_TYPE_MAPS.Album) {
                sendMsgHandler({
                  val,
                  userId: userInfo?._id + "",
                  type: "img",
                  convoId: convoId + "",
                  doneHandler: () => {},
                });
              } else if (type === FN_TYPE_MAPS.VideoCall) {
                console.log(123);
                setVisible(!visible);
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
