import { useNavigation, useRouter } from "expo-router";
import {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
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
import AppText from "./screens/code-scanner/index";
import Dialog from "@/component/base/Dialog";
import { PusherContext } from "@/hooks/usePusherProvider";
const Chats = () => {
  // return <AppText />;
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
      text: t("rec"),
      icon: (
        <ScanFilled style={{ width: 22, height: 22 }} fill={themeColor.white} />
      ),
    },
    {
      text: t("send"),
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
  const router = useRouter();
  const select = (option: PopoverAction) => {
    if (option.text === "rec") {
      // router.push('/pages/chats/screens/code-scanner/')
      // router.push("pages/chats/screens/code-scanner/index");
      navigate.navigate("pages/chats/screens/video-call-rec/index");
    }
    if (option.text === "send") {
      // router.push('/pages/chats/screens/code-scanner/')
      // router.push("pages/chats/screens/code-scanner/index");
      navigate.navigate("pages/chats/screens/video-call-send/index");
    }
    if (option.text === "Scan") {
      // router.push('/pages/chats/screens/code-scanner/')
      // router.push("pages/chats/screens/code-scanner/index");
      navigate.navigate("pages/chats/screens/code-scanner/index");
    }
    if (option.text === "Add Contacts") {
      navigate.navigate("pages/contacts/screens/add-contacts/index");
    }
    if (option.text === "Money") {
      navigate.navigate("pages/chats/screens/money-qrcode/index");
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
  const pusherContext = useContext(PusherContext);
  const socket = pusherContext.socket;
  useEffect(() => {
    console.log(Dialog.confirm, "Dialog");
    socket?.on("pre-call", async (preCallData) => {
      console.log("pre-call", preCallData);
      await Dialog.confirm({
        cancelButtonText: "拒接",
        confirmButtonText: "接听",
        title: "from" + preCallData?.from,
        message: "to" + preCallData?.to,
      })
        .then(() => {
          navigate.navigate("pages/chats/screens/video-call-rec/index");

          setTimeout(() => {
            socket?.emit("pre-call-answer", {
              answer: true,
              to: preCallData?.from,
              from: preCallData?.to,
            });
          }, 400);

          // on confirm
        })
        .catch(() => {
          socket?.emit("pre-call-answer", {
            answer: false,
            to: preCallData?.from,
            from: preCallData?.to,
          });

          // on cancel
        });
    });
    // navigate.navigate("pages/contacts/screens/send-friend-request/index");
  }, [socket]);
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
