import { createContext, useEffect, useState } from "react";

import io, { Socket } from "socket.io-client";
import { useUser, userState } from "app/store/user";
import config from "../config";
import { useChatList } from "app/store/chatList";
export const PusherContext = createContext(
  {} as {
    onlineUsers: { [key: string]: string };
    socket: Socket | undefined;
  }
);

export const PusherProvider = ({ children }) => {
  const { userStore } = useUser();
  const [onlineUsers, setOnlineUsers] = useState({});
  const [socket, setSocket] = useState<Socket>();

  useEffect(() => {
    const userId = userStore.userInfo?._id;
    if (!userId) {
      return;
    }
    const socketNew = io(config.apiDomain, {
      // const socketNew = io("https://wechat-server-jhc0.onrender.com", {
      query: {
        userId,
      },
    });
    socketNew?.on("getOfflineUsers", (users) => {
      console.log("getOfflineUsers-socketNew", users);
      setOnlineUsers(users);
    });
    socketNew?.on("getOnlineUsers", (users) => {
      console.log("getOnlineUsers-socketNew", users);
      setOnlineUsers(users);
      // setOnlineUsers(users);
    });
    // 每一个用户订阅一个频道 userid
    socketNew?.emit("subscribe", userId);

    socketNew?.on("hello", (users) => {
      console.log(users, "------------------------------------------------");
    });
    setSocket(socketNew);

    return () => {
      if (!userStore?.userInfo?._id) {
        socketNew?.disconnect();
      }
      socketNew?.disconnect();
    };
  }, [userStore]);

  return (
    <PusherContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </PusherContext.Provider>
  );
};
