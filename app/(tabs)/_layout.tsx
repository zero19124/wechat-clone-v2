import { Tabs } from "expo-router";
import { Text } from "react-native";
import * as light from "@/theme/light";

import ContactsIcon from "@/icons/tabs/contacts.svg";
import ContactsActiveIcon from "@/icons/tabs/contacts-active.svg";
import DiscoverActiveIcon from "@/icons/tabs/discover.svg";
import DiscoverIcon from "@/icons/tabs/discover-active.svg";
import MeActiveIcon from "@/icons/tabs/me-active.svg";
import MeIcon from "@/icons/tabs/me.svg";

import { RootSiblingParent } from "react-native-root-siblings";
import Toast from "react-native-root-toast";
const Layout = () => {
  return (
    <RootSiblingParent>
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
      <Toast />
    </RootSiblingParent>
  );
};
export default Layout;
