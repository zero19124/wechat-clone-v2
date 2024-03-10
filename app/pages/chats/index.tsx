import { useNavigation, useRouter } from "expo-router";
import {
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
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
import axios from "axios";
import config from "@/config/index";
import { useUser } from "app/store/user";
import { useChatList } from "app/store/chatList";
const Chats = (prop) => {
  console.log(prop, "prop,proppropprop");
  // return <AppText />;
  const navigate = useNavigation();
  const { userStore, setUserStore } = useUser();
  useEffect(() => {
    console.log(userStore, "userStoreuserStoreuserStore");
  }, [userStore]);
  const temU = useMemo(() => {
    return userStore;
  }, [userStore]);
  // const router = useRouter();
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
      text: t("Join Group Chat"),
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
    // {
    //   text: t("rec"),
    //   icon: (
    //     <ScanFilled style={{ width: 22, height: 22 }} fill={themeColor.white} />
    //   ),
    // },
    // {
    //   text: t("send"),
    //   icon: (
    //     <ScanFilled style={{ width: 22, height: 22 }} fill={themeColor.white} />
    //   ),
    // },
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
  const { chatListStore, getChatList, setChatListStoreV2 } = useChatList();

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
    if (option.text === "New Chat") {
      axios
        .post(config.apiDomain + "/api/convo/add-convo", {
          type: "new-chat",
          participants: [userStore.userInfo?._id],
        })
        .then(() => {
          // create new group chat
          navigate.navigate("pages/chats/msg-chats/index", {
            chatType: "isGroup",
          });
          console.log("add-convo-123");
        });
    }
    if (option.text === "Join Group Chat") {
      setUserStore((pre) => {
        console.log(pre, "pre");
        return pre;
      });
      // if user already in the group then cant join
      console.log(temU, "userStore.userInfo", userStore);
      if (!userStore.userInfo?._id) {
        Toast.info("userId is null");
        return;
      }
      axios
        .post(config.apiDomain + "/api/convo/updateConvoMemberById", {
          convoId: "65edd5b3ebab61a59bf5d730" || chatListStore.curConvo,
          attendId: userStore.userInfo?._id,
        })
        .then(() => {
          navigate.navigate("pages/chats/msg-chats/index", {
            chatType: "isGroup",
          });
          console.log("add-convo-123");
        });
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
        <View style={{}}>
          <Popover
            ref={popover}
            theme="dark"
            reference={
              <TouchableOpacity
                style={{ padding: 12, paddingBottom: 6, paddingRight: 6 }}
              >
                <CirclePlus />
              </TouchableOpacity>
            }
          >
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
        </View>
      ),
      headerRightContainerStyle: { paddingRight: 12 },
      tabBarIcon: ({ size, color, focused }) => {
        if (focused) {
          return <ChatActiveIcon />;
        }
        return <ChatIcon />;
      },
    });
  }, [userStore]);
  console.log("chats");
  const pusherContext = useContext(PusherContext);
  const socket = pusherContext.socket;
  useEffect(() => {
    console.log(Dialog.confirm, "Dialog");
    socket?.on(
      "pre-call",
      async (preCallData: { to: string; from: string }) => {
        console.log("pre-call", preCallData);
        const { to, from } = preCallData;
        await Dialog.confirm({
          cancelButtonText: "拒接",
          confirmButtonText: "接听",
          title: "from" + preCallData?.from,
          message: "to" + preCallData?.to,
        })
          .then(() => {
            navigate.navigate("pages/chats/screens/video-call-rec/index", {
              answer: true,
              to,
              from,
            });
            // pre-call-answer 需要交换 to=被叫人 from=发起人
            setTimeout(() => {
              socket?.emit("pre-call-answer", {
                answer: true,
                to: from,
                from: to,
              });
            }, 400);

            // on confirm
          })
          .catch(() => {
            socket?.emit("pre-call-answer", {
              answer: false,
              to: from,
              from: to,
            });

            // on cancel
          });
      }
    );

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
