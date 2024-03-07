import QuickActions from "react-native-quick-actions";
import { DeviceEventEmitter } from "react-native";

export default (navigate: any) => {
  DeviceEventEmitter.addListener(
    "quickActionShortcut",
    (data: {
      title: string;
      type: "Scan Qrcode" | "Money" | "My QR Code";
      userInfo: { url: string };
    }) => {
      const { title, type, userInfo } = data;
      console.log(data, "data");
      navigate.navigate(userInfo.url);
    }
  );
  QuickActions.setShortcutItems([
    {
      type: "Money", // Required
      title: "Money", // Optional, if empty, `type` will be used instead
      icon: "compose", // Icons instructions below
      userInfo: {
        url: "pages/chats/screens/money-qrcode/index",
      },
    },
    {
      type: "Scan Qrcode", // Required
      title: "Scan Qrcode", // Optional, if empty, `type` will be used instead
      subtitle: "add friend or pay",
      icon: "play", // Icons instructions below
      userInfo: {
        url: "pages/chats/screens/code-scanner/index",
      },
    },
    {
      type: "My QR Code", // Required
      title: "My QR Code", // Optional, if empty, `type` will be used instead
      icon: "play", // Icons instructions below
      userInfo: {
        url: "pages/me/screens/my-qrcode/index",
      },
    },
  ]);
};
