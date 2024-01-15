import { Stack, useRouter } from "expo-router";
import { Text } from "react-native";
import ThreeDot from "../assets/icon/three-dot.svg";
import CirclePlus from "../assets/icon/circle-plus.svg";
import * as light from "../theme/light";

import Test from "../view/about/test";
import { RootSiblingParent } from "react-native-root-siblings";
import Toast from "react-native-root-toast";
const Layout = () => {
  const router = useRouter();
  // router.push('/(tabs)')
  console.log("layoout1");
  return (
    <>
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
          name="contacts"
          options={{
            headerLeft: () => <ThreeDot />,
            headerTitle: () => <Text>Wei3xin(3)</Text>,
            headerRight: () => <CirclePlus />,
          }}
        />
        <Stack.Screen
          name="individual-payment"
          options={{
            headerShadowVisible: false,
            title: "Payment",
          }}
        />
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
        <Stack.Screen
          name="about/test"
          options={{
            headerLeft: () => {
              return <Text>about/test</Text>;
            },
            title: "333",
            headerTitle: "formSheet",
            presentation: "modal",
          }}
        />
      </Stack>
      <Toast />
    </>
  );
};
export default Layout;
