import { useUser } from "app/store/user";
import { useState } from "react";
import { Button, StyleSheet, TextInput, View, Text } from "react-native";
const style = StyleSheet.create({
  inputStyle: {
    height: 30,
    backgroundColor: "grey",
    marginBottom: 20,
  },
});
export default () => {
  const { setUserStore, userStore } = useUser();
  const [data, setData] = useState({ act: "", psw: "" });
  return (
    <View>
      {userStore?.userInfo?.act ? (
        <View>
          <Text>{userStore?.userInfo?.act}</Text>
          <Button
            title="log out"
            onPress={() => {
              console.log(data, "data");
              setUserStore((prev) => ({ ...prev, userInfo: {} }));
            }}
          />
        </View>
      ) : (
        <>
          <TextInput
            style={style.inputStyle}
            onChangeText={(val) => {
              setData({ ...data, act: val });
            }}
          />
          <TextInput
            style={style.inputStyle}
            onChangeText={(val) => {
              setData({ ...data, psw: val });
            }}
          />
          <Button
            title="login"
            onPress={() => {
              console.log(data, "data");
              setUserStore((prev) => ({ ...prev, userInfo: data }));
            }}
          />
        </>
      )}
    </View>
  );
};
