import { useFocusEffect, useNavigation } from "expo-router";
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import eventBus from "@/utils/eventBus";

import { getSize } from "utils";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useContext, useEffect, useMemo, useState } from "react";
import { useUser } from "app/store/user";
import { formatDateToString } from "@/utils/date";
import { useChatList } from "app/store/chatList";
import { PusherContext } from "@/hooks/usePusherProvider";
import DeviceInfo from "react-native-device-info";
import { TThemeType, useTheme } from "@/theme/useTheme";
import { goToMsgChat } from "@/hooks/useSameRouter";
import UserAvatar from "@/component/complex/UserAvatar";
import axios from "axios";
const ConvoList = () => {
  const navigate = useNavigation();
  const { userStore } = useUser();
  const { onlineUsers } = useContext(PusherContext);

  const { themeColor } = useTheme();
  const { chatListStore, setChatListStoreV2 } = useChatList();
  const userId = useMemo(() => userStore.userInfo?._id, [userStore]);
  const style = getStyle(themeColor);
  // useEffect(() => {
  //   console.log(chatListStore.chatListState?.length, "chatListStore-chatlist");
  //   console.log(chatListStore.chatListState?.[0], "chatListStore-chatlist");
  // }, [chatListStore]);
  const deviceModel = DeviceInfo.getModel();
  useFocusEffect(() => {
    if (!userId) return;
  });

  useEffect(() => {
    // console.log(onlineUsers, "onlineUsers");
    // console.log(onlineUsers[userStore.userInfo?._id + ""]);
  }, [onlineUsers]);

  const renderItem = ({ item }: { item: any }) => {
    // console.log(item._id, item.isGroup, "ConvoList");
    {
      /* 头像 */
    }
    let chatUsers;

    if (item.isGroup) {
      chatUsers = userStore.userInfo;
    } else {
      chatUsers = item.participants?.filter(
        (user) => user._id !== userStore.userInfo?._id
      )[0];
    }

    const LeftPart = () => {
      // console.log(item?.seenIds, "item.seenId?");
      const OnlineDot = (props: {
        width: number;
        height: number;
        children?: any;
      }) => {
        const { width, height, children } = props;
        const isOnline = item.participants
          ?.filter((item) => item._id !== userStore.userInfo?._id)
          .find((item) => {
            return onlineUsers[item?._id + ""];
          });
        return (
          <View
            style={{
              width,
              height,
              backgroundColor: isOnline ? themeColor.green5 : themeColor.text3,
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
              backgroundColor: themeColor.danger5,
              borderRadius: width,
              position: "absolute",
              top: -(width / 3),
              left: 0,
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
          <UserAvatar
            rounded={item.isGroup}
            source={
              item.isGroup
                ? require("@/assets/group-chat.jpg")
                : {
                    uri: chatUsers?.image,
                  }
            }
            style={style.itemContainerAvatar}
          />

          <OnlineDot width={10} height={10} />
          {item?.seenIds?.find((item) => item === userStore.userInfo?._id) ? (
            <></>
          ) : (
            <MarkUnReadDot width={12} height={12}>
              {/* {item.unReadCount} */}
            </MarkUnReadDot>
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
            {item.groupName || chatUsers?.act}
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
        onPress={async () => {
          // console.log(
          //   item?.seenIds,
          //   item?.seenIds?.find((item) => item === userStore.userInfo?._id),
          //   userStore.userInfo?._id,
          //   "TouchableOpacity-seenIds"
          // );

          goToMsgChat(
            item,
            userId + "",
            navigate,
            chatListStore,
            setChatListStoreV2
          );
          await axios.post("api/convo/updateConvoSeenIdsById", {
            convoId: item._id,
            userId,
          });
          eventBus.emit("jump-to-msg-page");
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
