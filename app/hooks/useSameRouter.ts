import { useChatList } from "app/store/chatList";
import config from "../config";
import { useNavigation } from "expo-router";
import Toast from "@/component/base/Toast";

const goToMsgChat = (
  convoData: any,
  curUserId: string,
  navigator: any,
  chatListStore: any,
  setChatListStoreV2: any
) => {
  // console.log(convoData, "convoData");
  if (!convoData) {
    Toast.fail("convoData null");
    return;
  }
  const convoId = convoData._id + "";
  let curReceiverInfo;
  if (convoData.isGroup) {
  } else {
    curReceiverInfo =
      convoData.participants?.filter(
        (userItem) => userItem._id !== curUserId
      )?.[0] || null;
  }
  console.log(curReceiverInfo, "curReceiverInfo");
  setChatListStoreV2({
    chatListState: chatListStore.chatListState,
    curConvo: {
      convoId,
      curReceiverInfo,
      convoMember: convoData.participants,
      ...convoData,
    },
  });

  navigator.navigate("pages/chats/msg-chats/index", {
    isGroup: convoData?.isGroup,
    convoId,
  });
};
export { goToMsgChat };
