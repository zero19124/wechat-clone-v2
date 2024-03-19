import { Tabs } from "expo-router";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import * as light from "@/theme/light";

import ContactsIcon from "@/icons/tabs/contacts.svg";
import ContactsActiveIcon from "@/icons/tabs/contacts-active.svg";
import DiscoverActiveIcon from "@/icons/tabs/discover.svg";
import DiscoverIcon from "@/icons/tabs/discover-active.svg";
import MeActiveIcon from "@/icons/tabs/me-active.svg";
import MeIcon from "@/icons/tabs/me.svg";

import { RootSiblingParent } from "react-native-root-siblings";
import { useTranslation } from "react-i18next";

// import Slot from "expo-router/Slot";

// Import your global CSS file
import "../../global.css";
import { useUser } from "app/store/user";
import { useContext, useEffect, useState } from "react";
import SimpleLogin from "@/pages/me/components/SimpleLogin";
import { useTheme } from "@/theme/useTheme";
import { PusherContext } from "@/hooks/usePusherProvider";

// export default Slot

const Layout = () => {
  console.log("tabs");
  const [friendRed, setFriendRed] = useState(false);
  const { t } = useTranslation();
  const { userStore } = useUser();
  const { themeColor } = useTheme();
  if (!userStore.userInfo?._id) {
    // return (
    //   <SafeAreaView style={{ backgroundColor: "yellow", flex: 1 }}>
    //     <SimpleLogin />
    //   </SafeAreaView>
    // );
  }
  const TabText = ({ children, color }) => {
    return <Text style={{ fontSize: 12, color }}>{children}</Text>;
  };
  const pusherContext = useContext(PusherContext);

  useEffect(() => {
    if (!pusherContext.socket) return;
    // 有新消息就更新会话列表
    pusherContext.socket?.on("friend:new", (data) => {
      console.log("friend:new-layout");
      setFriendRed(true);
    });
  }, [pusherContext.socket]);
  return (
    <Tabs
      initialRouteName="Contacts"
      screenOptions={{
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: themeColor.fillColor,
        },
        tabBarActiveTintColor: themeColor.primary,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          // headerShown: false,
          tabBarLabel: ({ color }) => {
            return <TabText color={color}>{"Chats"}</TabText>;
          },
        }}
      ></Tabs.Screen>
      <Tabs.Screen
        name="contacts"
        options={{
          tabBarLabel: ({ color }) => {
            return <TabText color={color}>{t("Contacts")}</TabText>;
          },

          headerTitle: "Contacts",
          tabBarIcon: ({ size, color, focused }) => {
            const cancelRed = () => {
              setFriendRed(false);
            };
            const newFriendDot = (
              <View
                style={{
                  borderRadius: 10,
                  position: "absolute",
                  top: -8,
                  right: -8,
                  backgroundColor: themeColor.danger5,
                  width: 10,
                  height: 10,
                }}
              ></View>
            );
            if (focused) {
              return (
                <TouchableOpacity onPress={cancelRed}>
                  {friendRed && newFriendDot}
                  <ContactsActiveIcon />
                </TouchableOpacity>
              );
            }
            return (
              <TouchableOpacity onPress={cancelRed}>
                {friendRed && newFriendDot}
                <ContactsIcon />
              </TouchableOpacity>
            );
          },
        }}
      ></Tabs.Screen>
      <Tabs.Screen
        name="discover"
        options={{
          tabBarLabel: ({ color }) => {
            return <TabText color={color}>{t("Discover")}</TabText>;
          },

          headerTitle: "Discover",
          tabBarIcon: ({ size, color, focused }) => {
            if (focused) {
              return <DiscoverActiveIcon />;
            }
            return <DiscoverIcon />;
          },
        }}
      ></Tabs.Screen>
      <Tabs.Screen
        name="me"
        options={{
          tabBarLabel: ({ color }) => {
            return <TabText color={color}>{t("Me")}</TabText>;
          },
          headerShown: false,
          headerTitle: () => <Text>ind1ex</Text>,
          tabBarIcon: ({ size, color, focused }) => {
            if (focused) {
              return <MeActiveIcon />;
            }
            return <MeIcon width={28} height={28} />;
          },
        }}
      ></Tabs.Screen>
    </Tabs>
  );
};
export default Layout;
