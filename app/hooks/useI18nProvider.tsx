import { Pusher, PusherEvent } from "@pusher/pusher-websocket-react-native";
import { I18n } from "i18n-js";
import {
  Children,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
interface IPusherProvider {
  pusher: Pusher;
  event: { [eventName: string]: (event: PusherEvent) => void };
}
export const I18nContext = createContext(
  {} as {
    contextData: IPusherProvider;
    setContextData: React.Dispatch<React.SetStateAction<IPusherProvider>>;
  }
);

export const PusherProvider = ({ children }) => {
  const i18n = new I18n(
    {
      en: { welcome: "Hello", moments: "Moments" },
      cn: { welcome: "你好", moments: "朋友圈" },
    },
    { locale: locale }
  );
  i18n.tra
  const [contextData, setContextData] = useState({
    pusher,
    event: {},
  } as IPusherProvider);
  const pusherContext = useContext(PusherContext);
  useEffect(() => {
    // console.log(pusherContext, "pusherContextpusherContextpusherContext");
  }, [contextData]);
  useEffect(() => {}, []);
  return (
    <I18nContext.Provider value={{ contextData, setContextData }}>
      {children}
    </I18nContext.Provider>
  );
};
