import {
  Animated,
  Button,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as light from "@/theme/light";
import { router, useNavigation } from "expo-router";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import ChatIcon from "@/icons/tabs/chats.svg";
import ChatActiveIcon from "@/icons/tabs/chats-active.svg";
import ThreeDot from "@/icons/three-dot.svg";
import CirclePlus from "@/icons/circle-plus.svg";
import GoBack from "@/icons/common/go-back.svg";
import Emoji from "@/icons/keyboard-panel/emoji-icon.svg";
import Toast from "react-native-root-toast";
import { CameraSvg, CouponsSvg } from "@/icons/utils/svgs";
import FnKeyBoard from "@/component/business/FnKeyBoard";
const Page = () => {
  const navigate = useNavigation();
  useLayoutEffect(() => {
    navigate.setOptions({
      // headerShown: false,
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
                backgroundColor: light.themeColor.text2,
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

  const [theme, setTheme] = useState("light");
  const [height, setHeight] = useState(10);
  const [mgs, setMsg] = useState("");
  const heightValue = useRef(new Animated.Value(10)).current;
  const cH = useRef(0);
  const startAnimation = (toValue) => {
    Animated.timing(heightValue, {
      toValue,
      duration: toValue === 0 ? 0 : 100, // 动画持续时间
      useNativeDriver: false, // 在 Android 上需要设置为 false
    }).start();
  };
  Keyboard.addListener("keyboardWillShow", () => {
    startAnimation(0);
    cH.current = 0;
  });
  const setH = () => {
    console.log(cH.current, "cH.current");
    Keyboard.dismiss();
    if (cH.current === 270) {
      startAnimation(0);
      cH.current = 0;
      return;
    }
    cH.current = 270;
    startAnimation(270);
  };
  useEffect(() => {
    console.log(heightValue, "heightValue._value");
  });
  return (
    <KeyboardAvoidingView
      style={{
        backgroundColor: "yellow",
        flex: 1,
        justifyContent: "flex-end",
      }}
      keyboardVerticalOffset={100}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback
        style={{
          backgroundColor: "purple",
        }}
        onPress={() => {
          startAnimation(0);
          cH.current = 0;
          Keyboard.dismiss();
        }}
      >
        <View
          style={{
            backgroundColor: light.themeColor.fillColor,
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
          }}
        >
          {/* <CameraSvg /> */}
          {/* <CouponsSvg /> */}
          <Text>pressing any of part of purple area dismiss the keyboard</Text>
        </View>
      </TouchableWithoutFeedback>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          columnGap: 4,
          padding: 8,
          paddingBottom: 0,
        }}
      >
        <TouchableOpacity>
          <ChatIcon />
        </TouchableOpacity>
        <TextInput
          value={mgs}
          onChangeText={(text) => {
            setMsg(text);
          }}
          style={{
            borderRadius: 4,
            // position: "absolute",
            // bottom: -410,
            paddingLeft: 4,
            paddingVertical: 8,
            flex: 1,
            // fontSize: 22,
            backgroundColor: light.themeColor.white,
          }}
        ></TextInput>
        <TouchableOpacity>
          <Emoji />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setH();
          }}
        >
          <CirclePlus />
        </TouchableOpacity>
      </View>

      {heightValue !== 0 && <FnKeyBoard heightValue={heightValue} />}
    </KeyboardAvoidingView>
  );
};
export default Page;
