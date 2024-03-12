import { useNavigation, useRouter } from "expo-router";
import {
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { TouchableOpacity, View, Text, TextInput } from "react-native";
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
import Overlay from "@/component/base/Overlay";
import Button from "@/component/base/Button/Button";
import { PortalHost } from "@/component/business/Portal";
const Chats = () => {
  const pusherContext = useContext(PusherContext);
  const socket = pusherContext.socket;
  const [visible, setVisible] = useState(false);
  const [isNewRoom, setIsNewRoom] = useState(false);
  const roomName = useRef("");
  const navigate = useNavigation();
  const { userStore, setUserStore } = useUser();

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
      // navigate.navigate("pages/chats/screens/video-call-send/index");
      router.push("/pages/chats/screens/video-call-send/");
    }
    if (option.text === "Scan") {
      navigate.navigate("pages/chats/screens/code-scanner/index");
    }
    if (option.text === "Add Contacts") {
      navigate.navigate("pages/contacts/screens/add-contacts/index");
    }
    if (option.text === "Money") {
      navigate.navigate("pages/chats/screens/money-qrcode/index");
    }
    if (option.text === "New Chat") {
      popover.current?.hide();
      setIsNewRoom(true);
      setTimeout(() => {
        setVisible(true);
      }, 600);
    }
    if (option.text === "Join Group Chat") {
      setIsNewRoom(false);
      popover.current?.hide();
      setTimeout(() => {
        setVisible(true);
      }, 600);
    }
    Toast.info(option.text);
  };
  const joinRoomHandler = async () => {
    console.log(roomName.current, "joinRoomHandler");

    // if user already in the group then cant join
    if (!userStore.userInfo?._id) {
      Toast.info("userId is null");
      return;
    }
    const convoName = await axios.get(
      config.apiDomain +
        "/api/convo/getConvoByGroupName?groupName=" +
        roomName.current
    );
    const resultByGroupName = convoName.data.data;
    console.log(resultByGroupName, "convoName");
    if (!resultByGroupName) {
      setVisible(false);
      roomName.current = "";
      setTimeout(() => {
        Toast.fail("no room called " + roomName.current);
        roomName.current = "";
      }, 300);
    }
    const setJoinRoom = () => {
      setChatListStoreV2({
        type: "joinRoomHandler",
        chatListState: chatListStore.chatListState,
        curConvo: {
          convoId: resultByGroupName._id,
          curReceiverInfo: { act: "group chat" },
          convoMember: resultByGroupName.participants,
          ...resultByGroupName,
        },
      });
      setTimeout(() => {
        navigate.navigate("pages/chats/msg-chats/index", {
          chatType: "isGroup",
        });
      }, 300);
      setVisible(false);
      roomName.current = "";
    };
    if (
      resultByGroupName?.participants?.find(
        (item) => item._id === userStore.userInfo?._id
      )
    ) {
      console.log(2222222, resultByGroupName);
      setVisible(false);
      roomName.current = "";
      setChatListStoreV2({
        type: "joinRoomHandler",
        chatListState: chatListStore.chatListState,
        curConvo: {
          convoId: resultByGroupName._id,
          curReceiverInfo: { act: "group chat" },
          convoMember: resultByGroupName.participants,
          ...resultByGroupName,
        },
      });
      setTimeout(() => {
        navigate.navigate("pages/chats/msg-chats/index", {
          chatType: "isGroup",
        });
      }, 300);
      return;
    }
    axios
      .post(config.apiDomain + "/api/convo/updateConvoMemberById", {
        convoId: resultByGroupName._id,
        attendId: userStore.userInfo?._id,
        type: "add",
      })
      .then(() => {
        setJoinRoom();
      });
  };
  const newRoomHandle = async () => {
    console.log(roomName.current, "newRoomHandle");
    // will emit socket
    if (!userStore.userInfo?._id) {
      Toast.info("userId is null");
      return;
    }
    axios
      .post(config.apiDomain + "/api/convo/add-convo", {
        groupName: roomName.current,
        type: "new-chat",
        participants: [userStore.userInfo?._id],
      })
      .then((res) => {
        if (res.data.code === 400) {
          console.log(111111);
          setVisible(false);
          roomName.current = "";
          setTimeout(() => {
            Toast.fail(res.data.data);
          }, 300);
          return;
        }
        const resultByGroupName = res.data.data;
        console.log(resultByGroupName, "convoName,newRoomHandle");
        // create new group chat
        setChatListStoreV2({
          type: "newRoomHandle",
          chatListState: chatListStore.chatListState,
          curConvo: {
            convoId: resultByGroupName._id,
            curReceiverInfo: { act: "group chat" },
            convoMember: resultByGroupName.participants,
            ...resultByGroupName,
            convoMember: [userStore.userInfo],
          },
        });
        setVisible(false);
        roomName.current = "";
        setTimeout(() => {
          navigate.navigate("pages/chats/msg-chats/index", {
            chatType: "isGroup",
          });
          console.log("newRoomHandle");
        }, 300);
      });
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
  useEffect(() => {
    // console.log(userStore, "userStoreuserStoreuserStore");
  }, [userStore]);
  useEffect(() => {
    console.log(Dialog.confirm, "Dialog");
    socket?.on(
      "pre-call",
      async (preCallData: { to: string; from: string }) => {
        console.log("pre-call", preCallData);
        const { to, from } = preCallData;
        await Dialog.confirm({
          overlay: true,
          cancelButtonText: "拒接",
          confirmButtonText: "接听",
          title: "from：" + preCallData?.from,
          message: "to：" + preCallData?.to,
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
    <>
      {visible && (
        <Overlay
          key={visible + ""}
          visible={visible}
          onBackdropPress={() => setVisible(false)}
        >
          <View
            style={{
              width: "90%",
              backgroundColor: "#fff",
              borderRadius: 4,
              padding: 24,
            }}
          >
            <Text style={{ textAlign: "center", marginHorizontal: 24 }}>
              {isNewRoom
                ? "Enter the RoomName and create new room"
                : t("Enter the RoomName")}
            </Text>
            <TextInput
              autoFocus
              selectionColor={themeColor.primary}
              style={{
                paddingHorizontal: 8,
                backgroundColor: themeColor.bg3,
                borderRadius: 8,
                height: 30,
                margin: 12,
              }}
              onChangeText={(val: string) => {
                console.log(val, "set");
                roomName.current = val;
              }}
            />
            <Button
              key={roomName.current}
              style={{ marginBottom: 24 }}
              onPress={() => {
                if (isNewRoom) {
                  newRoomHandle();
                  return;
                }
                joinRoomHandler();
              }}
            >
              {isNewRoom ? t("Create a Room") : t("Join")}
            </Button>
          </View>
        </Overlay>
      )}
      <View style={{ backgroundColor: light.themeColor.white, flex: 1 }}>
        <ConvoList />
      </View>
    </>
  );
};

export default Chats;
