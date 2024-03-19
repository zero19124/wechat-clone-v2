import { themeColor } from "@/theme/light";
import MsgReceiver from "app/component/business/MsgReceiver";
import UserAvatar from "app/component/complex/UserAvatar";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import data from "@/mocks/msgList.json";
import { useUser } from "app/store/user";
import { getSize } from "utils";
import { Text } from "react-native";
import {
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
} from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/theme/useTheme";
import Dialog from "@/component/base/Dialog";
import axios from "axios";
import config from "@/config/index";
import { useChatList } from "app/store/chatList";
import DeviceInfo from "react-native-device-info";
import modelLog from "@/utils/modelLog";
import { PusherContext } from "@/hooks/usePusherProvider";
import { useLoadingStore } from "app/store/globalLoading";
const PrivateChatList = memo(
  (props: {
    // flatListRef: React.MutableRefObject<FlatList<any> | undefined>;
  }) => {
    const { t } = useTranslation();
    const { onPress } = props;
    const { userInfo } = useUser().userStore;
    const { themeColor } = useTheme();
    const { chatListStore, getChatList } = useChatList();
    const deviceModel = DeviceInfo.getModel();
    const [dataOut, setDataOut] = useState<any[]>([]);
    const convoId = useMemo(() => {
      console.log("chatListStore.curConvo-msg-chat", chatListStore.curConvo);
      return chatListStore.curConvo?.convoId;
    }, [chatListStore.curConvo]);

    const getMsgList = () => {
      fetch(config.apiDomain + `/api/msg/allMsgByConvoId?convoId=${convoId}`)
        .then((res) => res.json())
        .then((res) => {
          if (res?.code === 200) {
            // console.log(res.data, "dadad");
            [
              ...res.data.map((item) => {
                return {
                  type: item.type,
                  userName: item.user.act,
                  userId: item.userId,
                  msgId: item._id,
                  image: item.user.image,
                  latestMessage: item.msg,
                };
              }),
            ]
              .reverse()
              .forEach((item) => {
                setList((pre) => {
                  pre.push(<RenderItem item={item} key={item.msgId} />);
                  return pre;
                });
              });
            // setDataOut(
            //   [
            //     ...res.data.map((item) => {
            //       return {
            //         type: item.type,
            //         userName: item.user.act,
            //         userId: item.userId,
            //         msgId: item._id,
            //         image: item.user.image,
            //         latestMessage: item.msg,
            //       };
            //     }),
            //   ].reverse()
            // );
          } else {
            console.log(res?.msg);
          }
        })
        .finally(() => {
          setLoadingStore({ loading: false });
        });
    };
    const { setLoadingStore } = useLoadingStore();

    const pusherContext = useContext(PusherContext);
    useEffect(() => {
      // 有新消息就更新会话列表
      pusherContext.socket?.on("messages", (messagesData) => {
        const data = messagesData.newMsgData;
        const type = messagesData.type;
        modelLog("iPhone 15", () => {
          console.log(data, "messagesData-context");
        });
        try {
          const latestMessage = data.msg;
          //     // 这里会重新调对话窗口列表
          // update  when chatpage focus and get the latest
          // updateConvoLatestMsgById(convoId + "", latestMessage);
          // 如果有转账的 更新对应的信息转账状态
          // 直接重新拉新数据 后面再优化状态更新问题
          if (data.type === "recallMsg") {
            getMsgList();
            return;
          }
          if (type && type === "isTransferAccepted") {
            getMsgList();
            return;
          }
          // 插入信息列表
          let newMsg = {};
          try {
            newMsg = {
              userId: data?.user?._id || "undefined-msg-chat",
              userName: data?.user?.act || "undefined-msg-chat",
              msgId: data?._id,
              type: data.type,
              image: data?.user?.image || "undefined-msg-chat",
              latestMessage,
              ...data,
            };
          } catch (e) {
            console.log(e, "newMsg destruct fail", data);
          }
          if (!Object.keys(newMsg).length) {
            console.log("newMsg is null!!!");
            return;
          }
          setList((pre) => {
            console.log(dataOut, dataOut.length, "dataOut[dataOut.length]");
            pre.push(<RenderItem item={newMsg} key={newMsg.msgId} />);
            return [...pre];
          });
          // setDataOut((pre) => [...pre, newMsg]);
          // setDataOut((pre) => [newMsg, ...pre]);
        } catch (e) {
          console.error(e, "mgsList-error");
        }
      });
    }, [pusherContext.socket]);
    const isGroup = useMemo(() => {
      return chatListStore.curConvo?.isGroup;
    }, [chatListStore.curConvo]);

    modelLog("iPhone 15", () => {
      // console.log(dataOut, "dataOut");
    });

    const ItemWrapper = memo(({ isMe, item, isGroup }) => {
      return (
        <View
          style={{
            marginBottom: 16,
            flexDirection: "row",
          }}
        >
          {isMe ? (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                flex: 1,
              }}
            >
              <MsgReceiver
                msgId={item.msgId}
                msgType={item.type}
                msgSenderId={item.userId}
                type="right"
                text={item.latestMessage}
              />
              <UserAvatar
                source={{ uri: userInfo?.image }}
                style={{
                  marginLeft: 8,
                  width: getSize(45),
                  height: getSize(45),
                }}
              />
            </View>
          ) : (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                flex: 1,
              }}
            >
              <TouchableOpacity
                onLongPress={async () => {
                  console.log(item, "do u want to kick out this member");
                  // if(groupOwnerId === curID){}
                  await Dialog.confirm({
                    cancelButtonText: t("kick out"),
                    confirmButtonText: t("cancel"),
                    title: t("warning"),
                    message: t(
                      `do u want to kick out this member ${item.userName}?`
                    ),
                  })
                    .then(() => {
                      axios
                        .post(
                          config.apiDomain + "/api/convo/updateConvoMemberById",
                          {
                            convoId: chatListStore.curConvo?.convoId,
                            attendId: item.userId,
                            type: "kick-out",
                          }
                        )
                        .then(() => {
                          console.log("updateConvoMemberById-kickout");
                        });
                    })
                    .catch(() => {});
                }}
              >
                <UserAvatar
                  source={{ uri: item.image }}
                  style={{
                    marginRight: 8,
                    width: getSize(45),
                    height: getSize(45),
                  }}
                />
              </TouchableOpacity>
              <MsgReceiver
                userName={isGroup ? item.userName : ""}
                msgId={item.msgId}
                msgSenderId={item.userId}
                msgType={item.type}
                text={item.latestMessage}
              ></MsgReceiver>
            </View>
          )}
        </View>
      );
    });
    const [list, setList] = useState<any[]>([]);
    // console.log(2222233333);
    const RenderItem = memo(
      ({ item }: { item: (typeof data)[0] }) => {
        console.log("memo-RenderItem");
        // item = dataOut.find((data) => data.msgId === msgId);
        // console.log('RenderItem-re-render');
        // only me hava
        // console.log(item.image, "item.image----");
        const isJoinedGroupChat = item.type === "joinedGroupChat";
        if (item.type === "recalledMsg") {
          return <></>;
        }

        if (item.type === "recallMsg" || isJoinedGroupChat) {
          return (
            <View
              style={{
                marginVertical: 24,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  backgroundColor: isJoinedGroupChat
                    ? themeColor.bg1
                    : themeColor.overlay1,
                  padding: 12,
                  borderRadius: 2,
                  paddingVertical: 4,
                  margin: "auto",
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                  }}
                >
                  {isJoinedGroupChat
                    ? item.latestMessage
                    : t("you recalled a message")}
                </Text>
              </View>
            </View>
          );
        }
        const isMe = item.userId === userInfo?._id;

        return <ItemWrapper isMe={isMe} item={item} isGroup={isGroup} />;
      },
      (pre, next) => {
        console.log("RenderItemRenderItemRenderItemRenderItem", pre, next);
        return true;
      }
    );
    console.log("--------ChatList-----------");
    const Test = memo((msgId) => {
      return <></>;
    });
    // useEffect(() => {
    //   setTimeout(() => {
    //     reList.current?.scrollTo({ y: 1000 });
    //   }, 500);
    //   if (list.length) {
    //     setList((pre) => {
    //       console.log(dataOut, dataOut.length, "dataOut[dataOut.length]");
    //       pre.push(
    //         <RenderItem
    //           item={dataOut[dataOut.length - 1]}
    //           key={dataOut[dataOut.length - 1].msgId}
    //         />
    //       );
    //       return pre;
    //     });
    //     return;
    //   }
    //   dataOut.forEach((item) => {
    //     setList((pre) => {
    //       pre.push(<RenderItem item={item} key={item.msgId} />);
    //       return pre;
    //     });
    //   });
    // }, [dataOut]);
    // console.log(
    //   dataOut.map((item) => {
    //     return <RenderItem item={item} key={item.msgId} />;
    //   }),
    //   "2222223232"
    // );
    // console.log(list, "setlistsetlistsetlistsetlist+", list.length);
    const reList = useRef<ScrollView>();
    useEffect(() => {
      reList.current?.scrollTo({ y: 2000 });
    }, [list]);
    useEffect(() => {
      getMsgList();
      setLoadingStore({ loading: true });
      setTimeout(() => {
        reList.current?.scrollTo({ y: 2000 });
      }, 600);
    }, []);
    return (
      // <KeyboardAvoidingView
      //   style={{
      //     // backgroundColor: "yellow",
      //     flex: 1,
      //   }}
      //   keyboardVerticalOffset={90}
      //   behavior={Platform.OS === "ios" ? "padding" : "height"}
      // >
      <ScrollView
        ref={reList}
        onLayout={(e) => {
          setTimeout(() => {
            reList.current?.scrollTo({ y: 2000 });
          }, 10);
          e.nativeEvent.layout.height;
          console.log(
            e.nativeEvent.layout.height,
            "e.nativeEvent.layout.height"
          );
        }}
      >
        <Pressable
          onPress={() => {
            onPress?.();
          }}
        >
          {list.map((Item) => {
            return Item;
          })}
        </Pressable>
      </ScrollView>
    );
    return (
      <FlatList
        // style={{ paddingBottom: 58 }}
        // ref={flatListRef}
        inverted
        contentContainerStyle={{
          backgroundColor: themeColor.fillColor,
          padding: 12,
          // dont give flex:1  it will strict the list on the sreen and cant scroll up everytime u scroll up it will automaticly bounce back
          // flex: 1,
        }}
        data={dataOut}
        keyExtractor={(item) => item._id}
        renderItem={({ item, index }) => {
          return <RenderItem item={item} />;
        }}
      />
    );
  }
);
export default PrivateChatList;
