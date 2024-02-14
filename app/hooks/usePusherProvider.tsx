import { Pusher, PusherEvent } from "@pusher/pusher-websocket-react-native";
import {
  Children,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import usePusher from "./usePusher";
interface IPusherProvider {
  pusher: Pusher;
  event: { [eventName: string]: (event: PusherEvent) => void };
}
export const PusherContext = createContext(
  {} as {
    contextData: IPusherProvider;
    setContextData: React.Dispatch<React.SetStateAction<IPusherProvider>>;
  }
);

export const PusherProvider = ({ children }) => {
  const { pusher, connect } = usePusher();
  const [contextData, setContextData] = useState({
    pusher,
    event: {},
  } as IPusherProvider);
  const pusherContext = useContext(PusherContext);
  useEffect(() => {
    // console.log(pusherContext, "pusherContextpusherContextpusherContext");
  }, [contextData]);
  useEffect(() => {
    connect().then(async (testChannel) => {
      // console.log("connected-13", testChannel);
      if (testChannel) {
        testChannel.onEvent = (event: PusherEvent) => {
          console.log(contextData, "pusherContext-provider");
          for (let key in contextData.event) {
            contextData.event[key]?.(event);
          }
          // console.log(event, "event");
          const data = JSON.parse(event.data);
          // console.log(data, "subscribe-data-vcos");
        };
      }
    });
  }, []);
  return (
    <PusherContext.Provider value={{ contextData, setContextData }}>
      {children}
    </PusherContext.Provider>
  );
};
