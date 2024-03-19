import { Tabs, useRouter } from "expo-router";
import {
  Pressable,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ContactsIcon from "@/icons/tabs/contacts.svg";
import ContactsActiveIcon from "@/icons/tabs/contacts-active.svg";
import DiscoverActiveIcon from "@/icons/tabs/discover.svg";
import DiscoverIcon from "@/icons/tabs/discover-active.svg";
import MeActiveIcon from "@/icons/tabs/me-active.svg";
import MeIcon from "@/icons/tabs/me.svg";
import { useTranslation } from "react-i18next";
import ChatIcon from "@/icons/tabs/chats.svg";
import ChatActiveIcon from "@/icons/tabs/chats-active.svg";
// import Slot from "expo-router/Slot";

// Import your global CSS file
import "../../global.css";
import { useUser } from "app/store/user";
import { useContext, useEffect, useState } from "react";
import SimpleLogin from "@/pages/me/components/SimpleLogin";
import { useTheme } from "@/theme/useTheme";
import { PusherContext } from "@/hooks/usePusherProvider";
import DeviceInfo from "react-native-device-info";

// export default Slot

const Layout = () => {
  console.log("tabs");
  const [friendRed, setFriendRed] = useState(false);
  const [msgRed, setMsgRed] = useState(false);
  const { t } = useTranslation();
  const { userStore } = useUser();
  const { themeColor } = useTheme();
  const deviceModel = DeviceInfo.getModel();
  const router = useRouter();
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
  const newFriendDot = (
    <View
      style={{
        borderRadius: 10,
        position: "absolute",
        top: -8,
        right: -8,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: themeColor.danger5,
        width: 15,
        height: 15,
      }}
    >
      <Text
        style={{ textAlign: "center", color: themeColor.white, fontSize: 12 }}
      >
        1
      </Text>
    </View>
  );
  useEffect(() => {
    if (!pusherContext.socket) return;
    // 有新消息就更新会话列表
    pusherContext.socket?.on("friend:new", (data) => {
      console.log("friend:new-layout");
      setFriendRed(true);
    });
    pusherContext.socket?.on("messages:new", (messagesData) => {
      const data = messagesData.newMsgData;
      const type = messagesData.type;
      // only the mes userid not equel current user
      console.log(
        deviceModel,
        userStore.userInfo?._id,
        "messages:new-layout",
        data?.user?._id,
        userStore.userInfo?._id === data?.user?._id
      );
      if (userStore.userInfo?._id === data?.user?._id) {
        return;
      }

      setMsgRed(true);
    });
  }, [pusherContext.socket, userStore]);
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
          tabBarLabel: ({ color }) => {
            return <TabText color={color}>{t("Chats")}</TabText>;
          },

          // headerShown: false,
          tabBarIcon: ({ size, color, focused }) => {
            if (focused) {
              return (
                <Pressable
                  onPress={() => {
                    setMsgRed(false);
                    router.push("/(tabs)/");
                  }}
                >
                  {msgRed && newFriendDot}
                  <ChatActiveIcon />
                </Pressable>
              );
            }
            return (
              <Pressable
                onPress={() => {
                  router.push("/(tabs)/");

                  setMsgRed(false);
                }}
              >
                {msgRed && newFriendDot}
                <ChatIcon />
              </Pressable>
            );
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

            if (focused) {
              return (
                <TouchableOpacity
                  onPress={() => {
                    setFriendRed(false);
                    router.push("/(tabs)/contacts");
                  }}
                >
                  {friendRed && newFriendDot}
                  <ContactsActiveIcon />
                </TouchableOpacity>
              );
            }
            return (
              <TouchableOpacity
                onPress={() => {
                  setFriendRed(false);
                  router.push("/(tabs)/contacts");
                }}
              >
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
