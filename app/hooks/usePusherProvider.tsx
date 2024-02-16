import {
  Children,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import usePusher from "./usePusher";

import io, { Socket } from "socket.io-client";
import { useUser } from "app/store/user";

export const PusherContext = createContext(
  {} as {
    socket: Socket;
  }
);

export const PusherProvider = ({ children }) => {
  const { userStore } = useUser();
  const userId = userStore.userInfo?._id;
  const socket = io("http://localhost:4000", {
    // const socket = io("https://wechat-server-jhc0.onrender.com", {
    query: {
      userId,
    },
  });
  socket.on("getOnlineUsers", (users) => {
    console.log("getOnlineUsers");
  });
  // 每一个用户订阅一个频道 userid
  socket.emit("subscribe", userId);

  socket.on("hello", (users) => {
    console.log(users, "--------");
  });
  const [contextData, setContextData] = useState({
    socket,
  });
  useEffect(() => {}, [contextData]);

  return (
    <PusherContext.Provider value={{ socket }}>
      {children}
    </PusherContext.Provider>
  );
};
