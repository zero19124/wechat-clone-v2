import { Pusher, PusherChannel } from "@pusher/pusher-websocket-react-native";
import { useState } from "react";
let testChannel: PusherChannel;
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
      testChannel = await pusher.subscribe({
        channelName: "test",
      });
      console.log('pusher connected');
      return testChannel;
    } catch (e) {
      console.log("ERROR: " + e);
    }
  };
  return {
    testChannel,
    pusher,
    connect,
  };
};
