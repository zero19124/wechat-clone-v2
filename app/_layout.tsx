import { Stack } from "expo-router";
import * as light from "@/theme/light";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { RootSiblingParent } from "react-native-root-siblings";
import Toast from "react-native-root-toast";
import "react-native-gesture-handler";
import { ToastProvider } from "react-native-toast-notifications";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { PortalProvider, usePortal } from "./component/business/Portal";
import { ThemeProvider } from "@/theme/useTheme";
import { RecoilRoot } from "recoil";
import { PusherProvider } from "./hooks/usePusherProvider";
import { useUser } from "./store/user";
import { MutableRefObject, useEffect } from "react";
import { I18nextProvider, initReactI18next } from "react-i18next";
import i18n from "i18next";
import io from "socket.io-client";
import React from "react";
import { PortalService } from "./component/base/ConfigProvider/ConfigProvider";
export const PortalRef =
  React.createRef<PortalService>() as MutableRefObject<PortalService>;

const Layout = () => {
  console.log(" top-level component");

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
  return (
    <PortalProvider>
      <InitializePortalRef />
      <RecoilRoot>
        <PusherProvider>
          <ThemeProvider>
            <I18nextProvider i18n={i18n}>
              <ToastProvider>
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
                        {/* chats  */}
                        <Stack.Screen
                          name="pages/chats/screens/code-scanner/index"
                          options={{
                            headerShown: false,
                          }}
                        />
                        <Stack.Screen
                          name="(tabs)"
                          options={{
                            headerShown: false,
                          }}
                        />

                        <Stack.Screen
                          name="individual-payment/index"
                          options={{
                            headerShadowVisible: false,
                            title: "Payment",
                          }}
                        />
                        <Stack.Screen
                          name="pages/chats/msg-chats/index"
                          options={{
                            title: "msg-chats",
                          }}
                        />
                        <Stack.Screen
                          name="pages/discover/moments/index"
                          options={{
                            title: "moments",
                          }}
                        />
                        <Stack.Screen
                          name="component/business/PayDone/index"
                          options={{
                            headerShown: false,
                          }}
                        />
                        {/* me  */}
                        <Stack.Screen
                          name="pages/me/setting/index"
                          options={{
                            title: "setting",
                          }}
                        />
                      </Stack>
                      <Toast />
                    </RootSiblingParent>
                  </ActionSheetProvider>
                </BottomSheetModalProvider>
              </ToastProvider>
            </I18nextProvider>
          </ThemeProvider>
        </PusherProvider>
      </RecoilRoot>
    </PortalProvider>
  );
};
export default Layout;
