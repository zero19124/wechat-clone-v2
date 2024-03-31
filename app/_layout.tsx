import { Stack, useNavigation } from "expo-router";
import * as light from "@/theme/light";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { RootSiblingParent } from "react-native-root-siblings";
import "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { PortalProvider, usePortal } from "./component/business/Portal";
import { ThemeProvider } from "@/theme/useTheme";
import { RecoilRoot } from "recoil";
import { PusherProvider } from "./hooks/usePusherProvider";
import { useUser } from "./store/user";
import * as Location from "expo-location";
import { Audio } from "expo-av";
import * as MediaLibrary from "expo-media-library";
import { BarCodeScanner } from "expo-barcode-scanner";
import * as Notifications from "expo-notifications";
import { MutableRefObject, useContext, useEffect } from "react";
import { I18nextProvider, initReactI18next } from "react-i18next";
import cnResource from "../i18n/cn/resource.json";
import enResource from "../i18n/en/resource.json";
import i18n from "i18next";
import io from "socket.io-client";
import React from "react";
import { PortalService } from "./component/base/ConfigProvider/ConfigProvider";
import { View, Text, LogBox } from "react-native";
import { PusherContext } from "@/hooks/usePusherProvider";
import setShortCut from "lib/setShortCut";
import axios from "axios";
import Overlay from "./component/base/Overlay";
import Loading from "./component/base/Loading";
// import { useLoading } from "./store/globalLoading";
import GlobalLoading from "./component/complex/GlobalLoading";

export const PortalRef =
  React.createRef<PortalService>() as MutableRefObject<PortalService>;

const Layout = () => {
  const navigate = useNavigation();
  // const { userStore } = useUser();

  // set the quickActionItem

  console.log(" top-level component");
  if (__DEV__) {
    console.log("App is running in development mode");
  } else {
    console.log("App is running in production mode");
  }

  const pusherContext = useContext(PusherContext);
  const socket = pusherContext.socket;
  // Translations
  const resources = {
    en: {
      translation: {
        greeting: "Hello!",
        "Receive Money": "Receive Money",
        like: "Like",
        comment: "Comment",
        Chats: "Chats",
        Contacts: "Contacts",
        Discover: "Discover",
        Me: "Me",
        moments: "Moments",
        setting: "setting",
        ...(cnResource as any),
      },
    },
    cn: {
      translation: {
        "Receive Money": "收钱码",
        like: "赞",
        comment: "评论",
        // Chats: "微信",
        Contacts: "通讯录",
        Discover: "发现",
        Me: "我",
        greeting: "Bonjour!",
        setting: "设置",
        moments: "朋友圈",
        ...(enResource as any),
      },
    },
  };

  // Initialize i18n
  i18n.use(initReactI18next).init({
    compatibilityJSON: "v3",
    resources,
    lng: "en", // Default language
    fallbackLng: "en", // Fallback language
    interpolation: {
      escapeValue: false,
    },
  });
  // const { t } = useTranslation();
  const InitializePortalRef = () => {
    const portal = usePortal();
    PortalRef.current = portal;
    return null;
  };

  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
  const initPermit = async () => {
    await Notifications.getPermissionsAsync();
    // map
    await Location.requestForegroundPermissionsAsync();
    // init audio
    await Audio.requestPermissionsAsync();
    // camera
    await BarCodeScanner.requestPermissionsAsync();
    Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
    });
    // album

    requestPermission();
  };
  setShortCut(navigate);

  useEffect(() => {
    // init permit
    initPermit();
    LogBox.ignoreAllLogs();
    // navigate.navigate("pages/contacts/screens/send-friend-request/index");
  }, []);
  // return (
  //   <View style={{ backgroundColor: "blue" }}>
  //     <Text>3</Text>
  //   </View>
  // );

  return (
    <ThemeProvider>
      <RecoilRoot>
        <PortalProvider>
          <InitializePortalRef />
          <PusherProvider>
            <I18nextProvider i18n={i18n}>
              <BottomSheetModalProvider>
                <ActionSheetProvider>
                  <RootSiblingParent>
                    <GlobalLoading>
                      <Stack
                        initialRouteName="(tabs)"
                        screenOptions={{
                          headerStyle: {
                            backgroundColor: light.themeColor.fillColor,
                          },
                          // headerTintColor: "#fff",
                          headerTitleStyle: {
                            fontWeight: "bold",
                          },
                        }}
                      >
                        <Stack.Screen
                          name="(tabs)"
                          options={{
                            headerShown: false,
                          }}
                        />
                        {/* chats  */}
                        <Stack.Screen
                          name="pages/chats/msg-chats/index"
                          options={{
                            headerShown: false,
                            title: "msg-chats",
                          }}
                        />
                        <Stack.Screen
                          name="pages/chats/msg-chats/screens/camera/index"
                          options={{
                            headerShown: false,
                          }}
                        />
                        <Stack.Screen
                          name="pages/chats/msg-chats/screens/location/index"
                          options={{
                            headerShown: false,
                          }}
                        />
                        <Stack.Screen
                          name="pages/chats/msg-chats/screens/real-time-location/index"
                          options={{
                            headerShown: false,
                          }}
                        />
                        <Stack.Screen
                          name="pages/chats/screens/video-call-rec/index"
                          options={{
                            headerShown: false,
                          }}
                        />
                        <Stack.Screen
                          name="pages/chats/screens/video-call-send/index"
                          options={{
                            headerShown: false,
                          }}
                        />

                        <Stack.Screen
                          name="pages/chats/screens/code-scanner/index"
                          options={{ headerShown: false }}
                        />
                        <Stack.Screen name="pages/chats/screens/transfer-receive/index" />
                        <Stack.Screen name="pages/chats/screens/money-qrcode/index" />

                        {/* contacts  */}
                        <Stack.Screen
                          name="pages/contacts/screens/new-friends/index"
                          options={{ headerShadowVisible: false }}
                        />
                        <Stack.Screen
                          name="pages/contacts/screens/add-contacts/index"
                          options={{}}
                        />
                        <Stack.Screen
                          name="pages/contacts/screens/add-contacts-search/index"
                          options={{
                            headerShown: false,
                          }}
                        />
                        <Stack.Screen
                          name="pages/discover/screens/nearBy/index"
                          options={{
                            headerShown: false,
                          }}
                        />
                        <Stack.Screen name="pages/contacts/screens/friend-info/index" />
                        <Stack.Screen name="pages/contacts/screens/send-friend-request/index" />
                        {/* discover  */}
                        <Stack.Screen
                          name="pages/discover/moments/index"
                          options={{
                            headerShown: false,
                            title: "moments",
                          }}
                        />
                        <Stack.Screen
                          name="pages/discover/moments/screens/post-moments/index"
                          options={{
                            headerShown: false,
                            presentation: "fullScreenModal",
                            title: "post-moments",
                          }}
                        />

                        {/* me  */}
                        <Stack.Screen
                          name="pages/me/setting/index"
                          options={{
                            title: "setting",
                          }}
                        />
                        {/* my qrcode */}
                        <Stack.Screen
                          name="pages/me/screens/my-qrcode/index"
                          options={{
                            title: "qrcode",
                            presentation: "fullScreenModal",
                          }}
                        />
                        <Stack.Screen
                          name="pages/me/screens/lading/index"
                          options={{
                            headerShown: false,
                          }}
                        />
                        <Stack.Screen
                          name="pages/me/components/PushTest"
                          options={{
                            title: "PushTest",
                          }}
                        />

                        {/* register  */}
                        <Stack.Screen
                          name="pages/me/screens/register/index"
                          options={{
                            title: "register",
                          }}
                        />
                        <Stack.Screen
                          name="pages/me/components/SimpleLogin"
                          options={{
                            title: "Login",
                          }}
                        />
                        <Stack.Screen
                          name="pages/map/src/App"
                          options={{
                            title: "map",
                          }}
                        />
                        {/* my qrcode */}
                        <Stack.Screen
                          name="pages/me/screens/wallet/index"
                          options={{
                            title: "wallet",
                          }}
                        />
                        {/* comomns  */}
                        <Stack.Screen
                          name="component/business/individual-payment/index"
                          options={{
                            headerShadowVisible: false,
                            title: "Payment",
                          }}
                        />
                        <Stack.Screen
                          name="component/business/PayDone/index"
                          options={{
                            headerShown: false,
                          }}
                        />
                      </Stack>
                    </GlobalLoading>
                  </RootSiblingParent>
                </ActionSheetProvider>
              </BottomSheetModalProvider>
            </I18nextProvider>
          </PusherProvider>
        </PortalProvider>
      </RecoilRoot>
    </ThemeProvider>
  );
};
export default Layout;
