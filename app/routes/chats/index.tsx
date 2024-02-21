import { Stack } from "expo-router";

export  const getChatsRoutes = () => {
  return (
    <>
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
        name="pages/chats/screens/code-scanner/index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="pages/chats/screens/transfer-receive/index"
        options={{
          presentation: "fullScreenModal",
          headerShown: false,
        }}
      />
    </>
  );
};
