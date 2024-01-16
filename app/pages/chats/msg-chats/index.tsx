import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as light from "@/theme/light";
import { useNavigation } from "expo-router";
import { useLayoutEffect } from "react";
import ChatIcon from "@/icons/tabs/chats.svg";
import ChatActiveIcon from "@/icons/tabs/chats-active.svg";
import ThreeDot from "@/icons/three-dot.svg";
import CirclePlus from "@/icons/circle-plus.svg";
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
  return (
    <View style={{ backgroundColor: light.themeColor.white, flex: 1 }}>
      <Text style={{}}>msg-chats</Text>
    </View>
  );
};
export default Page;
