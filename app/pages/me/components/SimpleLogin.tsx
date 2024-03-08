import { useUser } from "app/store/user";
import { useEffect, useState } from "react";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import {
  Button,
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import config from "@/config/index";
import DeviceInfo from "react-native-device-info";
import Toast from "@/component/base/Toast";
import * as Clipboard from "expo-clipboard";
import axios from "axios";

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
  const [googleUser, setGoogleUser] = useState();
  const [isInProgress, setIsInProgress] = useState(false);
  const [data, setData] = useState({ psw: "1", act: "1" });
  // deviceModel === "iPhone 15"
  //   ? { act: "12", psw: "12" }
  //   : { psw: "1", act: "1" }
  // Somewhere in your code

  const signIn = async () => {
    // if hanvet register and create one
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      const hasUser = await axios.get(config.apiDomain + "/api/user/register");
      console.log(hasUser, "hasUser");

      if (hasUser) {
      }
      await axios.post(config.apiDomain + "/api/user/register", {
        type: "google",
        ...userInfo,
      });
      setGoogleUser({ userInfo });
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };
  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      setGoogleUser({ user: null }); // Remember to remove the user from your app's state as well
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    GoogleSignin.configure();
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
  // Network Images

  return (
    <View>
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={() => {
          // initiate sign in
        }}
        disabled={isInProgress}
      />
      <Text>{config.apiDomain}</Text>
      {userStore?.userInfo?.act ? (
        <View>
          <Text>userID ===={userStore.userInfo._id}</Text>
          <TouchableOpacity
            onPress={async () => {
              await Clipboard.setStringAsync(userStore?.userInfo?._id || "");
              Toast.success("copied");
            }}
          >
            <Text>copy userId</Text>
          </TouchableOpacity>
          {/* <Text>{userStore?.userInfo?.act}</Text> */}
          <Button
            title="log out"
            onPress={() => {
              console.log(data, "data");
              Toast.fail("log out");
              signOut();
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
