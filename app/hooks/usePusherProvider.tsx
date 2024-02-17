import { createContext, useEffect, useState } from "react";

import io, { Socket } from "socket.io-client";
import { useUser, userState } from "app/store/user";
export const PusherContext = createContext(
  {} as {
    onlineUsers: any[];
    socket: Socket | undefined;
  }
);

export const PusherProvider = ({ children }) => {
  const { userStore } = useUser();
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [socket, setSocket] = useState<Socket>();

  useEffect(() => {
    const userId = userStore.userInfo?._id;
    if (!userId) {
      return;
    }
    const socketNew = io("http://localhost:4000", {
    // const socketNew = io("https://wechat-server-jhc0.onrender.com", {
      query: {
        userId,
      },
    });
    socketNew?.on("getOnlineUsers", (users) => {
      console.log("getOnlineUsers", users);
      // setOnlineUsers(users);
    });
    // 每一个用户订阅一个频道 userid
    socketNew?.emit("subscribe", userId);

    socketNew?.on("hello", (users) => {
      console.log(users, "--------");
    });
    setSocket(socketNew);

    return () => {
      socketNew?.disconnect();
    };
  }, [userStore]);

  return (
    <PusherContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </PusherContext.Provider>
  );
};
