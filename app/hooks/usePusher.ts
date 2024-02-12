import { Pusher } from "@pusher/pusher-websocket-react-native";
import { useState } from "react";

export default () => {
  const pusher = Pusher.getInstance();
  const [apiKey, onChangeApiKey] = useState("f9e1ab46abdff9fa95bb");
  const [cluster, onChangeCluster] = useState("ap3");
  const connect = async () => {
    try {
      await pusher.init({
        apiKey,
        cluster,
      });

      await pusher.connect();
      // new channel
      // await pusher.subscribe({
      //   channelName: "test",
      //   onEvent: (event: PusherEvent) => {
      //     console.log(event);
      //   },
      // });
    } catch (e) {
      console.log("ERROR: " + e);
    }
  };
  return {
    pusher,
    connect,
  };
};
