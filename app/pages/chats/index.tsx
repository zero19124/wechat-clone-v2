import { useNavigation, useRouter } from "expo-router";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import ChatIcon from "@/icons/tabs/chats.svg";
import ChatActiveIcon from "@/icons/tabs/chats-active.svg";
import CirclePlus from "@/icons/circle-plus.svg";
import AddContactsFilled from "@/icons/chats/add-contacts-filled.svg";
import ChatFilled from "@/icons/chats/chat-filled.svg";
import MoneyFilled from "@/icons/chats/money-filled.svg";
import ScanFilled from "@/icons/chats/scan-filled.svg";
import * as light from "@/theme/light";
import { Entypo } from "@expo/vector-icons";
import ConvoList from "./component/ChatList";
import { useTranslation } from "react-i18next";
import Toast from "@/component/base/Toast";
import {
  Popover,
  PopoverAction,
  PopoverInstance,
} from "@/component/base/Popover";
import { useTheme } from "@/theme/useTheme";
const Chats = () => {
  const navigate = useNavigation();
  const { t } = useTranslation();
  const { themeColor } = useTheme();
  const popover = useRef<PopoverInstance>(null);
  const iconActions: PopoverAction[] = [
    {
      text: t("New Chat"),
      icon: (
        <ChatFilled style={{ width: 22, height: 22 }} fill={themeColor.white} />
      ),
    },
    {
      text: t("Add Contacts"),
      icon: (
        <AddContactsFilled
          style={{ width: 22, height: 22 }}
          fill={themeColor.white}
        />
      ),
    },
    {
      text: t("Scan"),
      icon: (
        <ScanFilled style={{ width: 22, height: 22 }} fill={themeColor.white} />
      ),
    },
    {
      text: t("Money"),
      icon: (
        <MoneyFilled
          style={{ width: 22, height: 22 }}
          fill={themeColor.white}
        />
      ),
    },
  ];
  const select = (option: PopoverAction) => {
    if (option.text === "Scan") {
      navigate.navigate("pages/chats/screens/code-scanner/index");
    }
    popover.current?.hide();
    Toast.info(option.text);
  };

  useLayoutEffect(() => {
    navigate.setOptions({
      // headerShown: false,

      headerLeft: () => <Entypo name="dots-two-horizontal" size={20} />,
      headerLeftContainerStyle: { paddingLeft: 12 },
      headerTitle: "Weixin(331)",
      headerRight: () => (
        <Popover ref={popover} theme="dark" reference={<CirclePlus />}>
          <View>
            {iconActions.map((action) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    select(action);
                  }}
                  key={action.text}
                  style={{
                    padding: 12,
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  {action.icon}
                  <Text
                    style={{
                      fontSize: 16,
                      marginLeft: 8,
                      color: themeColor.white,
                    }}
                  >
                    {action.text}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </Popover>
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
