import {
  Animated,
  AppState,
  Button,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from "expo-image-picker";
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import * as light from "../../../../theme/light";
import { FontAwesome } from "@expo/vector-icons";
import InputKeyboard from "./InputKeyboard";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import GoBack from "@/component/complex/GoBack";
import ItemCard from "@/component/complex/ItemCard";
import UserAvatar from "@/component/complex/UserAvatar";
import { useTheme } from "@/theme/useTheme";
import { useTranslation } from "react-i18next";
import { useConfigState } from "app/store/globalConfig";


const Page = () => {
  const { config } = useConfigState();

  const [amountValue, setAmountValue] = useState("");
  const navigation = useNavigation();
  const { themeColor } = useTheme();
  const [showImg, setShowImg] = useState(false);
  const [receiver, setReceiver] = useState();
  const { t } = useTranslation();
  const params = useLocalSearchParams<{
    recipientId: string;
    type: "direct";
  }>();
  console.log(params, "params-component/business/individual-payment/index");
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleAlign: "center",
      headerShadowVisible: false,
      title: t("Payment"),
      headerLeft: () => <GoBack />,
    });
  });
  useEffect(() => {
    if (true) {
      // if (params.userId) {
      fetch(
        config.apiDomain +
          `/api/user/getUserById?userId=${
            params.recipientId || "65ca596cd90c67e46d6b01a7"
          }`
      )
        .then((res) => res.json())
        .then((res) => {
          console.log(res, "useruseruser");

          if (res.code === 200) {
            setReceiver(res.data);
          }
        });
    }

    const handleAppStateChange = (nextAppState) => {
      // 安卓会一直触发？ todo
      return;
      console.log(nextAppState, "nextAppState");
      if (nextAppState === "active") {
        getLatestPhoto();
        // 用户从其他应用切换回来时执行的操作
        console.log("User switched back to the app");
        // 在这里执行您想要的操作
      }
    };

    // 订阅 AppState 的改变事件
    const appStateSubscription = AppState.addEventListener(
      "change",
      (state) => {
        handleAppStateChange(state);
      }
    );
    getLatestPhoto();

    // 在组件卸载时取消订阅
    return () => {
      appStateSubscription.remove();
    };
  }, []);
  const [imageSource, setImageSource] = useState(null);
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      // allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      console.log(result);
      const manipResult = await multiPickImage(imageUri);
      setImageSource(manipResult);
    }
  };
  // 剪切图片
  const multiPickImage = async (imageUri: string) => {
    return manipulateAsync(
      imageUri,
      [
        {
          crop: {
            originX: 0,
            originY: 316,
            width: 1170,
            height: 200,
          },
        },
      ],
      { compress: 1, format: SaveFormat.PNG }
    );
  };
  const parseImg = async (imageUri: string) => {
    const manipResult = await multiPickImage(imageUri);
    setImageSource(manipResult);
  };
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();

  // 读取最新的照片
  const getLatestPhoto = async () => {
    requestPermission();
    console.log(MediaLibrary, "MediaLibrary");
    // await getPermissionAsync(); // 获取相册访问权限
    const albums = (
      await MediaLibrary.getAlbumsAsync({
        includeSmartAlbums: true,
      })
    ).find((item) => item.title === "Screenshots");
    console.log(albums, "albums");
    if (albums) {
      const photos = await MediaLibrary.getAssetsAsync({
        album: albums,
        sortBy: ["creationTime"],
        first: 1,
      });
      if (photos.assets.length > 0) {
        const latestPhoto = photos.assets[0];
        // latestPhoto 包含最新的照片信息
        parseImg(latestPhoto.uri);
        console.log(latestPhoto, "latestPhoto");
      }
    }
  };
  const onAmountDelete = useCallback(() => {
    setAmountValue((preV) => preV.slice(0, -1));
  }, []);
  const onAmountChange = useCallback((val: number) => {
    setAmountValue((preV) => preV + val);
    console.log(val, "val");
  }, []);
  useEffect(() => {
    // getLatestPhoto();
  }, []);
  console.log("component/business/individual-payment/index", new Date().getTime());

  return (
    <>
      <View style={{ flex: 1 }}>
        {!showImg && (
          <ItemCard
            style={{
              paddingHorizontal: 24,
              backgroundColor: themeColor.fillColor,
            }}
            showRightComp={true}
            textComp={() => {
              return (
                <View style={{}}>
                  <Text
                    style={{
                      fontSize: 18,
                    }}
                  >
                    {t("Transfer to: ")}
                    {receiver?.act}
                  </Text>
                  <Text
                    style={{
                      marginTop: 2,
                      color: themeColor.text3,
                    }}
                  >
                    {t("WechatId: ")}
                    {receiver?._id}
                  </Text>
                </View>
              );
            }}
            leftComp={() => {
              return <></>;
            }}
            rightComp={() => {
              return (
                <UserAvatar
                  style={{ marginRight: 24 }}
                  source={{ uri: receiver?.image }}
                />
              );
            }}
          />
        )}
        {showImg && (
          <TouchableWithoutFeedback
            onPress={() => {
              pickImageAsync();
            }}
          >
            <Animated.Image
              sharedTransitionTag="poster"
              resizeMode="stretch"
              style={{
                // backgroundColor: "red",
                width: "100%",
                height: 70,
              }}
              source={imageSource}
            ></Animated.Image>
          </TouchableWithoutFeedback>
        )}

        <View style={{ backgroundColor: themeColor.fillColor, flex: 1 }}>
          <View
            style={{
              backgroundColor: themeColor.white,
              marginTop: 8,
              flex: 1,
              borderRadius: 24,
            }}
          >
            {/* 输入框 */}
            <View style={{ padding: 24 }}>
              <Text style={{ fontWeight: "bold", paddingBottom: 16 }}>
                {t("Amount")}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  borderBottomColor: themeColor.fillColor,
                  borderBottomWidth: StyleSheet.hairlineWidth,
                  paddingBottom: 4,
                }}
              >
                <FontAwesome name="rmb" size={32} color="black" />

                <TextInput
                  showSoftInputOnFocus={false}
                  autoFocus={true}
                  value={amountValue}
                  selectionColor={themeColor.primary}
                  placeholderTextColor="red"
                  style={{
                    marginLeft: 16,
                    flex: 1,
                    height: 60,
                    fontSize: 52,
                  }}
                />
              </View>
              <TouchableOpacity
                onPress={() => {
                  setShowImg(!showImg);
                }}
              >
                <Text
                  style={{
                    marginTop: 18,
                    color: themeColor.textBlue,
                    fontWeight: "bold",
                  }}
                >
                  {t("Add Note")}
                </Text>
              </TouchableOpacity>
            </View>
            {/* 九宫格 */}
            <View
              style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}
            >
              <InputKeyboard
                type={params?.type || ""}
                recipientId={params?.recipientId || ""}
                amount={amountValue}
                onDelete={onAmountDelete}
                onChange={onAmountChange}
              />
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

export default Page;
