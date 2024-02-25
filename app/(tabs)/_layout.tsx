import { Tabs } from "expo-router";
import { SafeAreaView, Text, View } from "react-native";
import * as light from "@/theme/light";

import ContactsIcon from "@/icons/tabs/contacts.svg";
import ContactsActiveIcon from "@/icons/tabs/contacts-active.svg";
import DiscoverActiveIcon from "@/icons/tabs/discover.svg";
import DiscoverIcon from "@/icons/tabs/discover-active.svg";
import MeActiveIcon from "@/icons/tabs/me-active.svg";
import MeIcon from "@/icons/tabs/me.svg";

import { RootSiblingParent } from "react-native-root-siblings";
import Toast from "react-native-root-toast";
import { useTranslation } from "react-i18next";

// import Slot from "expo-router/Slot";

// Import your global CSS file
import "../../global.css";
import { useUser } from "app/store/user";
import { useEffect } from "react";
import SimpleLogin from "@/pages/me/components/SimpleLogin";

// export default Slot

const Layout = () => {
  console.log("tabs");
  const { t } = useTranslation();
  const { userStore } = useUser();

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
  return (
    <RootSiblingParent>
      <Tabs
        initialRouteName="Contacts"
        screenOptions={{
          headerStyle: {
            backgroundColor: light.themeColor.fillColor,
          },
          tabBarActiveTintColor: light.themeColor.primary,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            // headerShown: false,
            tabBarLabel: ({ color }) => {
              return <TabText color={color}>{t("Chats")}</TabText>;
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
              if (focused) {
                return <ContactsActiveIcon />;
              }
              return <ContactsIcon />;
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
    </RootSiblingParent>
  );
};
export default Layout;
