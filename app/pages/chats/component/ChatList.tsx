import { useNavigation } from "expo-router";
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
} from "react-native";
import { getSize } from "utils";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useContext, useEffect, useMemo, useState } from "react";
import config from "@/config/index";
import { useUser } from "app/store/user";
import { formatDateToString } from "@/utils/date";
import { useChatList } from "app/store/chatList";
import { PusherEvent } from "@pusher/pusher-websocket-react-native";
import { PusherContext } from "@/hooks/usePusherProvider";
import DeviceInfo from "react-native-device-info";
import { TThemeType, useTheme } from "@/theme/useTheme";
// const data = [
//   {
//     id: 1,
//     isSticky: false,
//     avatar: "@/assets/avatar.png",
//     userName: "Bella111",
//     unReadCount: 1,
//     latestMessage: "latestMessage",
//     time: "00:00",
//   },
//   {
//     id: 12,
//     isSticky: false,
//     avatar: "@/assets/avatar.png",
//     userName: "3",
//     unReadCount: 12,
//     latestMessage: "latestMessage",
//     time: "00:00",
//   },
//   {
//     id: 13,
//     isSticky: false,
//     avatar: "@/assets/avatar.png",
//     userName: "Bella",
//     unReadCount: 0,
//     latestMessage: "latestMessage",
//     time: "12:00",
//   },
// ];
const ConvoList = () => {
  const navigate = useNavigation();
  const { userStore } = useUser();
  const { themeColor } = useTheme();
  const { chatListStore, getChatList, setChatListStore } = useChatList();
  const userId = useMemo(() => userStore.userInfo?._id, [userStore]);
  const style = getStyle(themeColor);
  useEffect(() => {
    console.log(chatListStore, "chatListStore");
  }, [chatListStore]);

  const pusherContext = useContext(PusherContext);
  const deviceModel = DeviceInfo.getModel();

  useEffect(() => {
    if (!userId) return;
    getChatList(userId);
    // 有新消息就更新会话列表
    pusherContext.socket?.on("convo:update", (data) => {
      console.log(data, "getChatList");
      if (!userId) return;
      getChatList(userId);
    });
  }, [pusherContext.socket, userId]);
  const renderItem = ({ item }: { item: any }) => {
    {
      /* 头像 */
    }
    const chatUsers = item.participants?.filter(
      (user) => user._id !== userStore.userInfo?._id
    );

    const LeftPart = () => {
      const MarkUnReadDot = (props: {
        width: number;
        height: number;
        children?: any;
      }) => {
        const { width, height, children } = props;

        return (
          <View
            style={{
              width,
              height,
              backgroundColor: "red",
              borderRadius: width,
              position: "absolute",
              top: -(width / 3),
              right: width / 2,
            }}
          >
            <Text
              style={{
                color: themeColor.white,
                fontSize: 10,
                fontWeight: "bold",
                textAlign: "center",
                lineHeight: width,
              }}
            >
              {children}
            </Text>
          </View>
        );
      };
      return (
        <View>
          <Image
            source={{
              uri: chatUsers[0].image,
            }}
            style={style.itemContainerAvatar}
          />
          {item.unReadCount > 0 ? (
            <MarkUnReadDot width={16} height={16}>
              {item.unReadCount}
            </MarkUnReadDot>
          ) : (
            <MarkUnReadDot width={10} height={10} />
          )}
        </View>
      );
    };
    const RightPart = () => (
      <View style={style.itemContainerRight}>
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          {/* groupName */}
          <Text style={{ fontSize: 16, marginVertical: 4 }}>
            {chatUsers[0].act}
          </Text>
          <Text
            style={{
              width: getSize(50),
              fontSize: 12,
              color: themeColor.text1,
            }}
          >
            {formatDateToString(item.latestMessageTime, "hh:mm")}
          </Text>
        </View>
        {/* time */}
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            paddingRight: 16,
          }}
        >
          <Text style={{ color: themeColor.text1 }}>{item.latestMessage}</Text>
          <MaterialCommunityIcons
            size={16}
            color={themeColor.text1}
            name="bell-off-outline"
          />
        </View>
      </View>
    );
    return (
      <TouchableOpacity
        onPress={() => {
          const convoId = item._id + "";
          setChatListStore({
            chatListState: chatListStore.chatListState,
            curConvo: { convoId },
          });

          navigate.navigate("pages/chats/msg-chats/index", {
            convoId,
          });
        }}
      >
        <View style={style.itemContainer}>
          <LeftPart />
          <RightPart />
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <FlatList
      data={chatListStore.chatListState}
      keyExtractor={(item) => item._id + ""}
      renderItem={renderItem}
    />
  );
};

const getStyle = (themeColor: TThemeType["themeColor"]) => {
  const style = StyleSheet.create({
    itemContainer: {
      backgroundColor: "#FFF",
      flexDirection: "row",
      margin: 12,
      marginBottom: 0,
      marginRight: 0,
    },
    itemContainerLeft: { flexDirection: "row" },
    itemContainerRight: {
      // backgroundColor: "red",
      paddingBottom: 16,
      // alignItems: "center",
      justifyContent: "space-between",
      // flexDirection: "row",
      flex: 1,
      borderBottomColor: themeColor.fillColor,
      borderBottomWidth: 1,
    },
    itemContainerAvatar: {
      borderRadius: 4,
      borderColor: themeColor.fillColor,
      borderWidth: 1,
      width: getSize(50),
      height: getSize(50),
      marginRight: 12,
    },
  });
  return style;
};
export default ConvoList;
