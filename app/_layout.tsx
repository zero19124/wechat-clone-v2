import { Stack, useRouter } from "expo-router";
import { Text } from "react-native";
import ThreeDot from "@/icons/three-dot.svg";
import CirclePlus from "@/icons/circle-plus.svg";
import * as light from "@/theme/light";

import { RootSiblingParent } from "react-native-root-siblings";
import Toast from "react-native-root-toast";
const Layout = () => {
  console.log("layoout1");
  return (
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
        <Stack.Screen
          name="contacts/index"
          options={{
            headerLeft: () => <ThreeDot />,
            headerTitle: () => <Text>Wei3xin(3)</Text>,
            headerRight: () => <CirclePlus />,
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
        {/* <Stack.Screen
          name="pages/socket-test"
          options={{
            title: "socket-test",
          }}
        /> */}
        {/* <Stack.Screen
        name="contacts"
        options={{
          headerLeft: () => <ThreeDot />,
          headerTitle: () => <Text>Weixin(3)</Text>,
          headerRight: () => <CirclePlus />,
        }}
      />
      <Stack.Screen
        name="discover"
        options={{
          headerLeft: () => <ThreeDot />,
          headerTitle: () => <Text>Weixin(3)</Text>,
          headerRight: () => <CirclePlus />,
        }}
      />
      <Stack.Screen
        name="me"
        options={{
          headerLeft: () => <ThreeDot />,
          headerTitle: () => <Text>Weixin(3)</Text>,
          headerRight: () => <CirclePlus />,
        }}
      /> */}
        {/* <Stack.Screen name="test" options={{ title: "Tooo" }}></Stack.Screen> */}
        {/* <Stack.Screen
          name="about/test"
          options={{
            headerLeft: () => {
              return <Text>about/test</Text>;
            },
            title: "333",
            headerTitle: "formSheet",
            presentation: "modal",
          }}
        /> */}
      </Stack>
      <Toast />
    </RootSiblingParent>
  );
};
export default Layout;
