import { Tabs } from "expo-router";
import { useState } from "react";
import { Text } from "react-native";
import * as light from "../../theme/light";
import ChatIcon from "../../assets/icon/chats.svg";
import ChatActiveIcon from "../../assets/icon/chats-active.svg";
import ContactsIcon from "../../assets/icon/contacts.svg";
import ContactsActiveIcon from "../../assets/icon/contacts-active.svg";
import DiscoverActiveIcon from "../../assets/icon/discover.svg";
import DiscoverIcon from "../../assets/icon/discover-active.svg";
import MeActiveIcon from "../../assets/icon/me-active.svg";
import MeIcon from "../../assets/icon/me.svg";
import ThreeDot from "../../assets/icon/three-dot.svg";
import CirclePlus from "../../assets/icon/circle-plus.svg";

const Layout = () => {
  console.log("layoout2");
  return (
    <Tabs
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
          tabBarLabel: "Chats",
          headerLeft: () => <ThreeDot />,
          headerLeftContainerStyle: { paddingLeft: 12 },
          headerTitle: "Weixin(3)",
          headerRight: () => <CirclePlus />,
          headerRightContainerStyle: { paddingRight: 12 },
          tabBarIcon: ({ size, color, focused }) => {
            if (focused) {
              return <ChatActiveIcon />;
            }
            return <ChatIcon />;
          },
        }}
      ></Tabs.Screen>
      <Tabs.Screen
        name="contacts"
        options={{
          tabBarLabel: "Contacts",
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
          tabBarLabel: "Discover",
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
          headerShown: false,
          headerTitle: () => <Text>ind1ex</Text>,
          tabBarLabel: "Me",
          tabBarIcon: ({ size, color, focused }) => {
            if (focused) {
              return <MeActiveIcon />;
            }
            return <MeIcon />;
          },
        }}
      ></Tabs.Screen>
    </Tabs>
  );
};
export default Layout;
