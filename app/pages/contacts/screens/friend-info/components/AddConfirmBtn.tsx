import BottomWidthDivider from "@/component/complex/BottomWidthDivider";
import { useTheme } from "@/theme/useTheme";
import { useFocusEffect, useNavigation, useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import VideoCallIcon from "@/icons/discover/video-call-outline.svg";
import MessageIcon from "@/icons/discover/message-outline.svg";

import { Text, TouchableOpacity, View } from "react-native";
import { useGetSameApiOfGet } from "@/hooks/useSameApi";
import { useUser } from "app/store/user";
import { useState } from "react";

import { goToMsgChat } from "@/hooks/useSameRouter";
import { useChatList } from "app/store/chatList";
type TAddConfirmBtnProps = {
  status?: string;
  confirm?: boolean;
  friendId?: string;
};

const RequestFriendBtn = ({
  iconComp = () => <View></View>,
  text = "Add",
  onPress = () => {},
}) => {
  const { t } = useTranslation();
  const { themeColor } = useTheme();

  return (
    <TouchableOpacity
      style={{ backgroundColor: themeColor.white, paddingVertical: 14 }}
      onPress={onPress}
    >
      <View className="justify-center flex-row items-center ">
        {iconComp()}
        <Text
          style={{
            marginLeft: 4,
            color: themeColor.textBlue,
            fontSize: 16,
          }}
        >
          {t(text)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
const AddConfirmBtn = ({ status, friendId, confirm }: TAddConfirmBtnProps) => {
  try {
    const navigate = useNavigation();
    const router = useRouter();
    const { chatListStore, setChatListStoreV2 } = useChatList();
    const { t } = useTranslation();
    const { themeColor } = useTheme();
    const [realStatus, setRealStatus] = useState(status || "");
    const { getFriendRequestListByUserId, getConvoIdByCurUserIdAndByFriendId } =
      useGetSameApiOfGet();
    const { userInfo } = useUser().userStore;
    // after added a friend check the friend status. avoiding add again
    useFocusEffect(() => {
      getFriendRequestListByUserId(userInfo?._id + "").then((res) => {
        console.log("getFriendRequestListByUserId", res);
        if (!res.data?.friendRequestList?.length) {
          console.log("!res.data?.length");
          return;
        }
        // 找到这个friend 如何check FriendRequestList 是否存在
        const requestList = res.data?.friendRequestList;
        const requested = requestList.find(
          (item) => item.userId._id === friendId
        );
        // if true then added before
        if (requested) {
          setRealStatus(requested.status);
        }
        console.log(requestList, "requestList");
      });
    });
    if (realStatus === "done") {
      return (
        <View>
          <RequestFriendBtn
            text="Messages"
            iconComp={() => {
              return (
                <MessageIcon
                  width="18"
                  height="18"
                  fill={themeColor.textBlue}
                />
              );
            }}
            onPress={async () => {
              // find the convo and go there

              getConvoIdByCurUserIdAndByFriendId(
                userInfo?._id + "",
                friendId + ""
              ).then((res) => {
                console.log(res, "getConvoByCurUserIdAndByFriendId");
                goToMsgChat(
                  res.data,
                  userInfo?._id + "",
                  navigate,
                  chatListStore,
                  setChatListStoreV2
                );
              });
            }}
          />
          <BottomWidthDivider />
          <RequestFriendBtn
            text="Voice or Video Call"
            iconComp={() => {
              return (
                <VideoCallIcon
                  width="18"
                  height="18"
                  fill={themeColor.textBlue}
                />
              );
            }}
            onPress={() => {
              navigate.navigate(
                "pages/contacts/screens/send-friend-request/index",
                {
                  friendId,
                  sendFriendRequestTitle: "Confirm Friend Request",
                }
              );
            }}
          />
        </View>
      );
    }
    if (confirm) {
      return (
        <RequestFriendBtn
          text="Go Confirm"
          onPress={() => {
            navigate.navigate(
              "pages/contacts/screens/send-friend-request/index",
              {
                friendId,
                sendFriendRequestTitle: "Confirm Friend Request",
              }
            );
          }}
        />
      );
    }
    return (
      <View>
        {realStatus === "requesting" ? (
          <View
            style={{
              backgroundColor: themeColor.white,
              alignItems: "center",
              paddingVertical: 12,
            }}
          >
            <Text style={{ color: themeColor.text2, fontSize: 16 }}>
              {t("Confirmation pending")}
            </Text>
          </View>
        ) : (
          <RequestFriendBtn
            onPress={() => {
              navigate.navigate(
                "pages/contacts/screens/send-friend-request/index",
                {
                  friendId,
                }
              );
            }}
          />
        )}
      </View>
    );
  } catch (e) {
    console.log("error----AddConfirmBtn");
    return null;
  }
};
export default AddConfirmBtn;
