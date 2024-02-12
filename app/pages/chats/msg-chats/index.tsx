import {
  Animated,
  Button,
  FlatList,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import DeviceInfo from "react-native-device-info";

import { SafeAreaView } from "react-native-safe-area-context";
import { router, useNavigation } from "expo-router";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import ThreeDot from "@/icons/three-dot.svg";
import GoBack from "@/icons/common/go-back.svg";
import FnKeyBoard from "@/component/business/FnKeyBoard";
import PrivateChatList from "./component/ChatList";
import ChatInput from "./component/ChatInput";
import { useTheme } from "@/theme/useTheme";
import usePusher from "@/hooks/usePusher";
import { PusherEvent } from "@pusher/pusher-websocket-react-native";
const Page = () => {
  const navigate = useNavigation();
  // 获取设备型号
  const deviceModel = DeviceInfo.getModel();
  console.log("Device Model:", deviceModel);
  const [dataOut, setDataOut] = useState<any[]>([]);
  useLayoutEffect(() => {
    navigate.setOptions({
      // headerShown: false,
      headerShadowVisible: false,
      headerRight: () => <ThreeDot />,
      headerLeftContainerStyle: { paddingLeft: 12 },
      headerTitle: "Bella",
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
  const { pusher, connect } = usePusher();
  const [msg, setMsg] = useState("");
  const heightValue = useRef(new Animated.Value(10)).current;
  const height = useRef(0);
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
  useEffect(() => {
    console.log(heightValue, "heightValue._value");
    connect().then(async () => {
      console.log("connected");
      await pusher.subscribe({
        channelName: "test",
        onEvent: (event: PusherEvent) => {
          console.log(event);
          const data = JSON.parse(event.data);
          console.log(data, "data");
          dataOut.push({
            userId: data.userId,
            latestMessage: data.message,
          });
          setDataOut([...dataOut]);
        },
      });
    });
  }, []);

  return (
    <SafeAreaView
      style={{
        backgroundColor: themeColor.fillColor,
        flex: 1,
      }}
      edges={["bottom"]}
    >
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
          <PrivateChatList dataOut={dataOut} />
        </TouchableWithoutFeedback>
        {/* keyboard 内容 */}
        <ChatInput
          value={msg}
          onChangeText={(val: string) => {
            console.log("change", val);
            setMsg(val);
            fetch(
              `http://localhost:4000/api/user/hello?msg=${val}&userId=${deviceModel}`
            ).then(async (res) => {
              console.log("emit11339");
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

        {<FnKeyBoard heightValue={heightValue} />}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
export default Page;
