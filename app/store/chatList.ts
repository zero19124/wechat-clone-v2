import { atom, selector, useRecoilState, useRecoilValue } from "recoil";
import config from "../config";
import DeviceInfo from "react-native-device-info";
import { useLoadingStore } from "./globalLoading";

export interface IUser {
  __v: number;
  _id: string;
  act: string;
  image: string;
  psw: string;
}
interface IConvo {
  curConvo:
    | { convoMember: IUser[]; convoId: string; curReceiverInfo?: IUser }
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
  const { globalLoading, setLoadingStore } = useLoadingStore();

  const deviceModel = DeviceInfo.getModel();
  const setChatListStoreV2 = (val: any) => {
    console.log(val?.curConvo, "setChatListStoreV2-log", val.type);
    setChatListStore(val);
  };
  const [chatListStore, setChatListStore] = useRecoilState(chatListState);
  const getChatList = (userId: string, type = "getChatList-requesting") => {
    console.log("getChatList-requesting------" + type, userId, "userId");
    return fetch(
      config.apiDomain + `/api/convo/getConvoByUserId?userId=${userId}`
    )
      .then((res) => res.json())
      .then((res) => {
        if (res?.code === 200) {
          // console.log(chatListStore, "getConvoByUserId-chatListStore");
          setChatListStore((pre) => {
            // console.log(pre, "getConvoByUserId-chatListStore-pre");

            return {
              ...pre,
              chatListState: res.data,
              type: "getConvoByUserId",
            };
          });
          return res.data;
        } else {
          console.log(res?.msg);
        }
      })
      .finally(() => {
        setLoadingStore({ loading: false });
      });
  };
  return {
    chatListStore,
    setChatListStoreV2,
    getChatList,
  };
};
