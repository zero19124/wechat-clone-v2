import { Text, View } from "react-native";
import { Stack } from "expo-router";

const Login = () => {
  return (
    <View>
      <Stack.Screen
        options={{
          headerShown:true,
          headerLeft: () => {
            return <Text>r3</Text>;
          },
          // title: "333",
          headerTitle: "To31oo",
          presentation: 'fullScreenModal',
        }}
      />
      <Text>test about _layou3t1</Text>
    </View>
  );
};
export default Login;
