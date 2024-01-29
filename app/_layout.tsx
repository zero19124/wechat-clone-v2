import { Stack, useRouter } from "expo-router";
import { Text } from "react-native";
import ThreeDot from "@/icons/three-dot.svg";
import CirclePlus from "@/icons/circle-plus.svg";
import * as light from "@/theme/light";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { RootSiblingParent } from "react-native-root-siblings";
import Toast from "react-native-root-toast";
import "react-native-gesture-handler";
import { ToastProvider } from "react-native-toast-notifications";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
const Layout = () => {
  console.log(" top-level component");
  return (
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
                name="component/business/PayDone/index"
                options={{
                  headerShown: false,
                }}
              />
            </Stack>
            <Toast />
          </RootSiblingParent>
        </ActionSheetProvider>
      </BottomSheetModalProvider>
    </ToastProvider>
  );
};
export default Layout;
