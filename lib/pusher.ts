const cluster = "ap3";
import { Pusher, PusherChannel } from "@pusher/pusher-websocket-react-native";
export const pusherClient = async () => {
  const pusher = Pusher.getInstance();
  const onSubscriptionSucceeded = (channelName: string, data: any) => {
    console.log(
      `onSubscriptionSucceeded: ${channelName} data: ${JSON.stringify(data)}`
    );
    const channel: PusherChannel | undefined = pusher.getChannel(channelName);

    if (!channel) {
      return;
    }

    const me = channel.me;
    // onChangeMembers([...channel.members.values()]);
    // log(`Me: ${me}`);
  };
  await pusher.init({
    apiKey: "ap",
    cluster,onSubscriptionSucceeded
  });

  await pusher.connect();
  console.log('pusher connected');
  return pusher
};
