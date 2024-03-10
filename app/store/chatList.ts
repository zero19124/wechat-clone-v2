import { atom, selector, useRecoilState, useRecoilValue } from "recoil";
import config from "../config";
import DeviceInfo from "react-native-device-info";
export interface IUser {
  __v: number;
  _id: string;
  act: string;
  image: string;
  psw: string;
}
interface IConvo {
  curConvo:
    | { convoMember: number; convoId: string; curReceiverInfo?: IUser }
    | undefined;
  chatListState?: any[] | undefined;
}
export const chatListState = atom<IConvo>({
  key: "chatList",
  default: {
    curConvo: undefined,
    // token: storage.get("token") || "",
    chatListState: undefined,
  },
});

export const useChatList = () => {
  const deviceModel = DeviceInfo.getModel();
  const setChatListStoreV2 = (val: any) => {
    // console.log(val, "setChatListStoreV2-log");
    setChatListStore(val);
  };
  const [chatListStore, setChatListStore] = useRecoilState(chatListState);
  const getChatList = (userId: string) => {
    return fetch(
      config.apiDomain + `/api/convo/getConvoByUserId?userId=${userId}`
    )
      .then((res) => res.json())
      .then((res) => {
        if (res?.code === 200) {
          setChatListStoreV2({ ...chatListStore, chatListState: res.data });
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
    setChatListStoreV2,
    getChatList,
  };
};
