import { useUser } from "app/store/user";
import { useEffect, useState } from "react";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Platform,
} from "react-native";
import config from "@/config/index";
import DeviceInfo from "react-native-device-info";
import Toast from "@/component/base/Toast";
import * as Clipboard from "expo-clipboard";
import axios from "axios";
import { useNavigation, useRouter } from "expo-router";
import Button from "@/component/base/Button/Button";
import { useTranslation } from "react-i18next";
import { useChatList } from "app/store/chatList";
import { useLoadingStore } from "app/store/globalLoading";

const style = StyleSheet.create({
  inputStyle: {
    width: "70%",
    margin: "auto",
    marginRight: 12,
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
  },
});
export default () => {
  const { setUserStore, userStore } = useUser();
  const deviceModel = DeviceInfo.getModel();
  const { t } = useTranslation();
  const router = useRouter();
  const { setLoadingStore } = useLoadingStore();

  const [googleUser, setGoogleUser] = useState();
  const [isInProgress, setIsInProgress] = useState(false);
  const [data, setData] = useState({ psw: "1", act: "1" });
  const { chatListStore, getChatList, setChatListStoreV2 } = useChatList();
  const resetAfterOffline = () => {
    setChatListStoreV2({
      chatListStore: [],
      curConvo: {},
      type: "resetAfterOffline",
    });
  };
  // deviceModel === "iPhone 15"
  //   ? { act: "12", psw: "12" }
  //   : { psw: "1", act: "1" }
  // Somewhere in your code

  const signIn = async () => {
    // if hanvet register and create one
    try {
      console.log(11111);

      await GoogleSignin.hasPlayServices();
      console.log(22222, GoogleSignin);
      const userInfo = await GoogleSignin.signIn();
      console.log(33333, userInfo);

      const hasUser = await axios
        .post(config.apiDomain + "/api/user/register", {
          ...userInfo.user,
          act: userInfo.user.name,
          email: userInfo.user.email,
          type: "google",
          psw: 123,
        })
        .then((res) => res.data.data);
      console.log(hasUser, "hasUser");

      if (hasUser) {
        setUserStore({ userInfo: hasUser });
        console.log("setUserStore");
        return;
      }
      const user = await axios.post(config.apiDomain + "/api/user/register", {
        type: "google",
        ...userInfo.user,
      });
      console.log(user, "user");
      setGoogleUser({ userInfo });
      setUserStore(user);
    } catch (error: any) {
      console.log(error, "error");

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
    GoogleSignin.configure({
      iosClientId:
        "475065706028-11egj47k01ej9juk2o892q5os4gehkbp.apps.googleusercontent.com", // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
      googleServicePlistPath: "", // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
    });
  }, []);
  const loginHandler = () => {
    if (!data.act || !data.psw) {
      Toast.fail("act or psw is required");
      return;
    }
    // if (deviceModel === "iPhone 15") {
    //   setData({ psw: "1", act: "1" });
    // } else {
    //   setData({ psw: "12", act: "12" });
    // }
    console.log(data, "data-login");
    setLoadingStore({ loading: true, text: "Login..." });
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
        console.log(res, "res-SimpleLogin");

        if (res?.code === 200) {
          const newInfo = { ...userStore, userInfo: res?.data };
          // setUserStore(newInfo);
          setUserStore({ ...newInfo });

          console.log(newInfo, "userStore login");
        } else {
          Toast.fail(res.msg);
          console.log(res?.msg);
        }
      })
      .catch((e) => {
        console.log(e, "register-error");
      })
      .finally(() => {
        setLoadingStore({ loading: false, text: "" });
      });
  };
  // Network Images

  return (
    <View>
      {/* <Text>{config.apiDomain}</Text> */}
      {userStore?.userInfo?.act ? (
        <View>
          <TouchableOpacity
            onPress={async () => {
              await Clipboard.setStringAsync(userStore?.userInfo?._id || "");
              Toast.success("copied");
            }}
          >
            <Text>userID ===={userStore.userInfo._id} copy userId </Text>
          </TouchableOpacity>
          {/* <Text>{userStore?.userInfo?.act}</Text> */}
          <Button
            onPress={() => {
              console.log(data, "data");
              Toast.fail(t("Log out"));
              signOut();
              data.act = "";
              data.psw = "";
              setData(data);
              setUserStore((prev) => ({ ...prev, userInfo: {} }));
              resetAfterOffline();
            }}
          >
            {t("Log out")}
          </Button>
        </View>
      ) : (
        <View className="flex items-center">
          <View className="flex-row justify-between  w-full px-2">
            <TextInput
              clearButtonMode="always"
              className="w-full"
              style={style.inputStyle}
              onChangeText={(val) => {
                data.act = val;
                setData(data);
              }}
            />
            <Button
              size="small"
              type="primary"
              onPress={() => {
                loginHandler();
                console.log(data, "data", config.apiDomain);
              }}
            >
              {t("Login")}
            </Button>
          </View>
          <View className="flex-row  justify-between w-full px-2">
            <TextInput
              clearButtonMode="always"
              secureTextEntry={true}
              style={style.inputStyle}
              onChangeText={(val) => {
                data.psw = val;
                setData(data);
              }}
            />

            <Button
              size="small"
              onPress={() => {
                // router.push("/pages/me/components/PushTest");
                // return;
                router.push("/pages/me/screens/register/");
              }}
            >
              {t("Register")}
            </Button>
          </View>

          <View className=" justify-center items-center">
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                width: "100%",
              }}
            ></View>
            {Platform.OS === "ios" && (
              <GoogleSigninButton
                className="flex-1"
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={() => {
                  signIn();
                  // initiate sign in
                }}
                disabled={isInProgress}
              />
            )}
          </View>
        </View>
      )}
    </View>
  );
};
