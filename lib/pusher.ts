const cluster = "ap3";
import { Pusher } from "@pusher/pusher-websocket-react-native";
export const pusherClient = async () => {
  const pusher = Pusher.getInstance();
  await pusher.init({
    apiKey: "f9e1ab46abdff9fa95bb",
    cluster,
  });

  await pusher.connect();
  console.log('pusher connected');
  return pusher
};
