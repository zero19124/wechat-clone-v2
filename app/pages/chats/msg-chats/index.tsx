import {
  Animated,
  Button,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as light from "@/theme/light";
import { useNavigation } from "expo-router";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import ChatIcon from "@/icons/tabs/chats.svg";
import ChatActiveIcon from "@/icons/tabs/chats-active.svg";
import ThreeDot from "@/icons/three-dot.svg";
import CirclePlus from "@/icons/circle-plus.svg";
import Toast from "react-native-root-toast";
// import switchTheme from "react-native-theme-switch-animation";
const Page = () => {
  const navigate = useNavigation();
  useLayoutEffect(() => {
    navigate.setOptions({
      // headerShown: false,
      headerLeft: () => <ThreeDot />,
      headerLeftContainerStyle: { paddingLeft: 12 },
      headerTitle: "Bella",
      headerRight: () => <CirclePlus />,
      headerRightContainerStyle: { paddingRight: 12 },
      tabBarIcon: ({ size, color, focused }) => {
        if (focused) {
          return <ChatActiveIcon />;
        }
        return <ChatIcon />;
      },
    });
  }, []);

  const [theme, setTheme] = useState("light");
  const [height, setHeight] = useState(10);
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
            backgroundColor: "purple",
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
          }}
        >
          <Text>pressing any of part of purple area dismiss the keyboard</Text>
        </View>
      </TouchableWithoutFeedback>

      <Button
        title="Switch Theme"
        onPress={() => {
          setH();
        }}
      />
      <TextInput
        value="3"
        style={{
          // position: "absolute",
          // bottom: -410,
          fontSize: 32,
          backgroundColor: "red",
        }}
      ></TextInput>

      {heightValue !== 0 && (
        <Animated.View
          style={{
            backgroundColor: "blue",
            height: heightValue,
            width: "100%",
            // position: "absolute",
            bottom: 0,
          }}
        ></Animated.View>
      )}
    </KeyboardAvoidingView>
  );
};
export default Page;
