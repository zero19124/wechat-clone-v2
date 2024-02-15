import { useNavigation, useRouter } from "expo-router";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import ChatIcon from "@/icons/tabs/chats.svg";
import ChatActiveIcon from "@/icons/tabs/chats-active.svg";
import CirclePlus from "@/icons/circle-plus.svg";
import * as light from "@/theme/light";
import Tooltip from "react-native-walkthrough-tooltip";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import ConvoList from "./component/ChatList";
const Chats = () => {
  const navigate = useNavigation();
  const router = useRouter();
  useLayoutEffect(() => {
    navigate.setOptions({
      // headerShown: false,

      headerLeft: () => <Entypo name="dots-two-horizontal" size={20} />,
      headerLeftContainerStyle: { paddingLeft: 12 },
      headerTitle: "Weixin(331)",
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            console.log(1111);
            navigate.navigate("pages/chats/screens/code-scanner/index");
          }}
        >
          <CirclePlus />
        </TouchableOpacity>
      ),
      headerRightContainerStyle: { paddingRight: 12 },
      tabBarIcon: ({ size, color, focused }) => {
        if (focused) {
          return <ChatActiveIcon />;
        }
        return <ChatIcon />;
      },
    });
  }, []);
  console.log("chats");
  const [toolTipVisible, setToolTipVisible] = useState(false);

  return (
    <View style={{ backgroundColor: light.themeColor.white, flex: 1 }}>
      {/* <Text>Chats</Text>
      <Tooltip
        isVisible={toolTipVisible}
        content={<Text>Check this out!</Text>}
        placement="top"
        onClose={() => setToolTipVisible(false)}
      >
        <TouchableHighlight onPress={() => setToolTipVisible(true)}>
          <Text>Press me</Text>
        </TouchableHighlight>
      </Tooltip> */}
      <ConvoList />
    </View>
  );
};

export default Chats;
