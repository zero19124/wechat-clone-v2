import { useUser } from "app/store/user";
import { useEffect, useState } from "react";
import { Button, StyleSheet, TextInput, View, Text } from "react-native";
import config from "@/config/index";
import DeviceInfo from "react-native-device-info";
import Toast from "@/component/base/Toast";

const style = StyleSheet.create({
  inputStyle: {
    height: 30,
    backgroundColor: "grey",
    marginBottom: 20,
  },
});
export default () => {
  const { setUserStore, userStore } = useUser();
  const deviceModel = DeviceInfo.getModel();

  const [data, setData] = useState(
    // deviceModel === "iPhone 15"
    //   ? { act: "12", psw: "12" }
    //   : { psw: "1", act: "1" }
  );
  useEffect(() => {
    // loginHandler();
    // Toast.fail("2222");
  }, []);
  const loginHandler = () => {
    // if (deviceModel === "iPhone 15") {
    //   setData({ psw: "1", act: "1" });
    // } else {
    //   setData({ psw: "12", act: "12" });
    // }
    console.log(data, "data");
    fetch(config.apiDomain + "/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res, "res");

        if (res?.code === 200) {
          const newInfo = { ...userStore, userInfo: res?.data };
          setUserStore(newInfo);
          console.log(newInfo, "userStore login");
        } else {
          Toast.fail(res.msg);
          console.log(res?.msg);
        }
      })
      .catch((e) => {
        console.log(e, "eeee");
      });
  };
  return (
    <View>
      {userStore?.userInfo?.act ? (
        <View>
          <Text>userID ===={userStore.userInfo._id}</Text>
          {/* <Text>{userStore?.userInfo?.act}</Text> */}
          <Button
            title="log out"
            onPress={() => {
              console.log(data, "data");
              Toast.fail("log out");

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
              loginHandler();
              console.log(data, "data", config.apiDomain);
            }}
          />
        </>
      )}
    </View>
  );
};
