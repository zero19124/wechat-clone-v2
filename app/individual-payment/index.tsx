import {
  Animated,
  AppState,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from "expo-image-picker";
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";
import { useEffect, useLayoutEffect, useState } from "react";
import * as light from "../../theme/light";
import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import InputKeyboard from "./InputKeyboard";
import { useNavigation } from "expo-router";
const Page = () => {
  const [amountValue, setAmountValue] = useState("3");
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({ headerShadowVisible: false, title: "Payment" });
  });
  useEffect(() => {
    const handleAppStateChange = (nextAppState) => {
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
      handleAppStateChange
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

  // 读取最新的照片
  const getLatestPhoto = async () => {
    console.log(MediaLibrary, "MediaLibrary");
    // await getPermissionAsync(); // 获取相册访问权限
    const albums = (
      await MediaLibrary.getAlbumsAsync({
        includeSmartAlbums: true,
      })
    ).find((item) => item.title === "Recents");

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

  useEffect(() => {
    console.log(amountValue, "amountValue");
  }, [amountValue]);
  return (
    <View style={{ backgroundColor: "#FFF", flex: 1 }}>
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
      <View style={{ backgroundColor: light.themeColor.fillColor, flex: 1 }}>
        <View
          style={{
            backgroundColor: "#fff",
            marginTop: 8,
            flex: 1,
            borderRadius: 24,
          }}
        >
          {/* 输入框 */}
          <View style={{ padding: 24 }}>
            <Text style={{ fontWeight: "bold", paddingBottom: 16 }}>
              Amount
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                borderBottomColor: light.themeColor.fillColor,
                borderBottomWidth: StyleSheet.hairlineWidth,
                paddingBottom: 4,
              }}
            >
              <FontAwesome name="rmb" size={32} color="black" />

              <TextInput
                showSoftInputOnFocus={false}
                autoFocus={true}
                value={amountValue}
                selectionColor={light.themeColor.primary}
                placeholderTextColor="red"
                style={{
                  marginLeft: 16,
                  flex: 1,
                  height: 60,
                  fontSize: 52,
                }}
              />
            </View>
            <Text
              style={{
                marginTop: 18,
                color: "rgb(94,107,148)",
                fontWeight: "bold",
              }}
            >
              Add Note
            </Text>
          </View>
          {/* 九宫格 */}
          <View style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
            <InputKeyboard
              onDelete={() => {
                setAmountValue((preV) => preV.slice(0, -1));
              }}
              onChange={(val: number) => {
                setAmountValue((preV) => preV + val);
                console.log(val, "val");
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
};
export default Page;
