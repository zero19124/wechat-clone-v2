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
import { MutableRefObject, useContext, useEffect } from "react";
import { I18nextProvider, initReactI18next } from "react-i18next";
import i18n from "i18next";
import io from "socket.io-client";
import React from "react";
import { PortalService } from "./component/base/ConfigProvider/ConfigProvider";
import { View, Text } from "react-native";
import { PusherContext } from "@/hooks/usePusherProvider";

export const PortalRef =
  React.createRef<PortalService>() as MutableRefObject<PortalService>;

const Layout = () => {
  console.log(" top-level component");
  if (__DEV__) {
    console.log("App is running in development mode");
  } else {
    console.log("App is running in production mode");
  }
  const pusherContext = useContext(PusherContext);
  const socket = pusherContext.socket;
  const navigate = useNavigation();
  // Translations
  const resources = {
    en: {
      translation: {
        greeting: "Hello!",
        like: "Like",
        comment: "Comment",
        Chats: "Chats",
        Contacts: "Contacts",
        Discover: "Discover",
        Me: "Me",
        moments: "Moments",
        setting: "setting",
        "change the theme": "change the theme",
        "change language to chinese": "change language to chinese",
      },
    },
    cn: {
      translation: {
        like: "赞",
        comment: "评论",
        Chats: "微信",
        Contacts: "通讯录",
        Discover: "发现",
        Me: "我",
        greeting: "Bonjour!",
        setting: "设置",
        moments: "朋友圈",
        "change the theme": "切换主题",
        "change language to chinese": "切换到英文",
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

  const InitializePortalRef = () => {
    const portal = usePortal();
    PortalRef.current = portal;
    return null;
  };
  useEffect(() => {

    // navigate.navigate("pages/contacts/screens/send-friend-request/index");
  }, []);
  // return (
  //   <View style={{ backgroundColor: "blue" }}>
  //     <Text>3</Text>
  //   </View>
  // );
  return (
    <ThemeProvider>
      <PortalProvider>
        <InitializePortalRef />
        <RecoilRoot>
          <PusherProvider>
            <I18nextProvider i18n={i18n}>
              <BottomSheetModalProvider>
                <ActionSheetProvider>
                  <RootSiblingParent>
                    <Stack
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
                      <Stack.Screen name="pages/contacts/screens/friend-info/index" />
                      <Stack.Screen name="pages/contacts/screens/send-friend-request/index" />
                      {/* discover  */}
                      <Stack.Screen
                        name="pages/discover/moments/index"
                        options={{
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
                      {/* my qrcode */}
                      <Stack.Screen
                        name="pages/me/screens/wallet/index"
                        options={{
                          title: "wallet",
                        }}
                      />
                      {/* comomns  */}
                      <Stack.Screen
                        name="individual-payment/index"
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
                  </RootSiblingParent>
                </ActionSheetProvider>
              </BottomSheetModalProvider>
            </I18nextProvider>
          </PusherProvider>
        </RecoilRoot>
      </PortalProvider>
    </ThemeProvider>
  );
};
export default Layout;
