import { Platform } from "react-native";
import publicIP from "react-native-public-ip";
// import * as Network from "expo-network";
import { useState } from "react";

const ipAlert = async () => {
  // const ip = await Network.getIpAddressAsync();
  // alert(ip);
  // setApiDomainnpm install react@latest react-dom@latest
};
ipAlert();
const env = "dev1";
// const apiDomain = "http://localhost:4000";
// const [apiDomain, setApiDomain] = useState("http://localhost:4000");
// const apiDomain = "http://192.168.200.146:4000";
const apiDomain = "https://wechat-server-jhc0.onrender.com";
// const prodUrl = "https://wechat-server-jhc0.onrender.com";

// const apiDomain =
//   process.env.NODE_ENV === "development"
//     // ? prodUrl
//     ? "http://172.20.10.3:4000"
//     : prodUrl;
// bella
// const apiDomain = "http://192.168.3.10:4000";
// const apiDomain = "https://wechat-server-jhc0.onrender.com";
// const devConfig = {
//   env: env as NativeConfig["Env"],
//   envType: env?.replace(/\d+/, "") as NativeConfig["EnvType"],
//   domain: `https://${env}.mcisaas.com`,
//   apiDomain,
//   kcDomain: `https://${env}-kc.mcisaas.com`,
//   iosFinClipSdkKey: "0W9c9RDxkvH3M/HNmGK1e5TLrr+mAftW6Vl6Ccef4JE=",
//   iosFinClipSdkSecret: "1c5e6ea730413050",
//   androidFinClipSdkKey: "rhJVssQjQuHNIIyalXqC+fyf4yH7CfXiN9Ut6BRumx4=",
//   androidFinClipSdkSecret: "4871c146b16f5601",
//   finClipApiServer: "https://api.finclip.com",
//   iosCodePushDeploymentKey: Config.IosCodePushDeploymentKey,
//   androidCodePushDeploymentKey: Config.AndroidCodePushDeploymentKey,
//   codePushDeploymentKey:
//     Platform.OS === "ios"
//       ? Config.IosCodePushDeploymentKey
//       : Config.AndroidCodePushDeploymentKey,
// };

// export const releaseConfig = {
//   env: Config.Env,
//   envType: Config.EnvType?.replace(/\d+/, "") as NativeConfig["EnvType"],
//   domain: Config.Domain,
//   apiDomain: Config.ApiDomain,
//   kcDomain: Config.KcDomain,
//   iosFinClipSdkKey: Config.IosFinClipSdkKey,
//   iosFinClipSdkSecret: Config.IosFinClipSdkSecret,
//   androidFinClipSdkKey: Config.AndroidFinClipSdkKey,
//   androidFinClipSdkSecret: Config.AndroidFinClipSdkSecret,
//   finClipApiServer: Config.FinClipApiServer,
//   iosCodePushDeploymentKey: Config.IosCodePushDeploymentKey,
//   androidCodePushDeploymentKey: Config.AndroidCodePushDeploymentKey,
//   codePushDeploymentKey:
//     Platform.OS === "ios"
//       ? Config.IosCodePushDeploymentKey
//       : Config.AndroidCodePushDeploymentKey,
// };

// const customConfig = storage.get<typeof releaseConfig>('god-config');
// export default process.env.NODE_ENV === "development"
//   ? devConfig
//   : releaseConfig;

export default { apiDomain };
