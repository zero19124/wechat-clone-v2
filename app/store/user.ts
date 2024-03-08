import { atom, selector, useRecoilState, useRecoilValue } from "recoil";

interface IUser {
  token?: string;
  refreshToken?: string;
  userInfo?: {
    act: string;
    psw: string;
    _id: string;
    image: string;
    location: {
      coordinates: number[];
    };
  };
}
export const userState = atom<IUser>({
  key: "userState",
  default: {
    // token: storage.get("token") || "",
    userInfo: undefined,
  },
});

export const useUser = () => {
  const [userStore, setUserStore] = useRecoilState(userState);

  const getInfo = async () => {
    // setUserInfoLoading(true);
    try {
      // const data = ;
      // if (!userStore?.userInfo) {
      //   setUserStore((prev) => ({ ...prev, userInfo: data }));
      // }
      // return data;
    } finally {
    }
  };

  const getUserInfo = async () => {
    // const token = storage.get("token");
    // if (!token) {
    //   return null;
    // }
    return getInfo();
  };

  return {
    setUserStore,
    userStore,
    getInfo,
  };
};
