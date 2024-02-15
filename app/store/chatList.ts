import { atom, selector, useRecoilState, useRecoilValue } from "recoil";
import config from "../config";
import DeviceInfo from "react-native-device-info";

interface IUser {}
export const chatListState = atom<IUser>({
  key: "chatList",
  default: {
    // token: storage.get("token") || "",
    chatListState: undefined,
  },
});

export const useChatList = () => {
  const deviceModel = DeviceInfo.getModel();

  const [chatListStore, setChatListStore] = useRecoilState(chatListState);
  const getChatList = (userId: string) => {
    return fetch(
      config.apiDomain + `/api/convo/getConvoByUserId?userId=${userId}`
    )
      .then((res) => res.json())
      .then((res) => {
        if (res?.code === 200) {
          setChatListStore({ chatListState: res.data });
          res.data.forEach((item) => {
            console.log(
              "chatListStore fetch",
              item.latestMessage,
              userId,
              deviceModel
            );
          });

          return res.data;
        } else {
          console.log(res?.msg);
        }
      });
  };
  return {
    chatListStore,
    setChatListStore,
    getChatList,
  };
};