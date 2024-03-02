import { Text, TouchableOpacity, View } from "react-native";
import MyQrcode from "@/component/complex/MyQrcode";
import { useLayoutEffect, useRef, useState } from "react";
import { useNavigation } from "expo-router";
import { Fontisto } from "@expo/vector-icons";
import * as MediaLibrary from "expo-media-library";

import {
  TNavigationOptions,
  useCommonNavigateProps,
} from "@/component/complex/CommonNavigateTitle";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/theme/useTheme";
import { getSize } from "utils";
import { useUser } from "app/store/user";
import UserAvatar from "@/component/complex/UserAvatar";
import { captureScreenAndSaveToAlbum } from "@/utils/saveToImg";
const MoneyQrcode = () => {
  const viewRef = useRef();
  const captureScreen = async () => {
    await captureScreenAndSaveToAlbum(viewRef);
  };
  const { themeColor } = useTheme();
  const navigation = useNavigation();
  const { userInfo } = useUser().userStore;
  const { t } = useTranslation();
  useLayoutEffect(() => {
    const navigatorProps = useCommonNavigateProps({
      rightComp: () => <></>,
      title: t("My Qrcode") as string,
    });
    navigation.setOptions({
      ...navigatorProps,
      headerStyle: { backgroundColor: themeColor.white },
      headerShadowVisible: false,
    } as TNavigationOptions);
  }, []);

  return (
    <View
      style={{
        backgroundColor: themeColor.white,
        flex: 1,
      }}
    >
      <View
        ref={viewRef}
        style={{
          backgroundColor: themeColor.white,
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: 48,
          margin: getSize(12),
          borderRadius: 8,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            marginBottom: 24,
          }}
        >
          <UserAvatar
            source={{ uri: userInfo?.image }}
            style={{ marginRight: 24, borderColor: "transparent" }}
          />
          <View>
            <View
              style={{
                flexDirection: "row",
                gap: 16,
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 20 }}>{userInfo?.act}</Text>
              <Fontisto name="female" color={themeColor.danger5} />
            </View>
            <Text style={{ color: themeColor.text1, marginTop: 4 }}>
              {t("Region: ")}
              {userInfo?.region || "Shenzhen China"}
            </Text>
          </View>
        </View>
        <MyQrcode type="me-page" />
        {}
      </View>
      <View
        style={{
          marginTop: -32,
          padding: 32,
          width: "100%",
          flexDirection: "row",
          backgroundColor: themeColor.white,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ color: themeColor.textBlue, fontSize: 16 }}>
          {t("Scan")}
        </Text>
        <TouchableOpacity onPress={captureScreen}>
          <Text style={{ color: themeColor.textBlue, fontSize: 16 }}>
            {t("Save Image")}
          </Text>
        </TouchableOpacity>

        <Text
          style={{
            textAlign: "center",
            color: themeColor.textBlue,
            fontSize: 16,
          }}
        >
          {t("Change Style")}
        </Text>
      </View>
    </View>
  );
};
export default MoneyQrcode;
