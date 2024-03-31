import { Text, TouchableOpacity, View } from "react-native";
import { useTranslation } from "react-i18next";
import { useEffect, useLayoutEffect } from "react";
import { useNavigation, useRouter } from "expo-router";
import { useTheme } from "@/theme/useTheme";
import { TNavigationOptions } from "@/component/complex/CommonNavigateTitle";
import * as Clipboard from "expo-clipboard";

import Toast from "@/component/base/Toast";
import { useUser } from "app/store/user";
import Button from "@/component/base/Button/Button";
import eventBus from "@/utils/eventBus";
import { useConfigState } from "app/store/globalConfig";

const Setting = () => {
  const { config, setConfig } = useConfigState();
  const navigator = useNavigation();
  const { t } = useTranslation();
  const { toggleTheme, themeName, themeColor } = useTheme();
  const { setUserStore, userStore } = useUser();
  const router = useRouter();

  const { i18n } = useTranslation();
  const handleChangeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  useLayoutEffect(() => {
    navigator.setOptions({
      headerTitle: () => (
        <Text style={{ color: themeColor.text5, fontSize: 20 }}>
          {t("setting")}
        </Text>
      ),
      headerTintColor: themeColor.text5,
      headerShadowVisible: false,
      headerStyle: { backgroundColor: themeColor.white },
    } as TNavigationOptions);
  });

  return (
    <View
      style={{
        backgroundColor: themeColor.white,
        flex: 1,
        gap: 8,
        padding: 12,
      }}
    >
      <Button
        type="default"
        onPress={() => {
          handleChangeLanguage(i18n.language === "cn" ? "en" : "cn");
        }}
      >
        {t("change language")}
      </Button>
      <Button
        type="default"
        onPress={() => toggleTheme(themeName === "light" ? "dark" : "light")}
      >
        {t("change the theme")}
      </Button>
      <Button
        type="default"
        onPress={() => {
          navigator.navigate("pages/map/src/App");
        }}
      >
        {t("to map")}
      </Button>

      <View>
        <Text>apiDomain: {config.apiDomain}</Text>
        <View className="flex-row">
          <Button
            type="default"
            onPress={() => {
              setConfig({ apiDomain: "http://172.20.10.3:4000" });
            }}
          >
            {t("home 172")}
          </Button>
          <Button
            type="default"
            onPress={() => {
              setConfig({ apiDomain: "http://192.168.3.10:4000" });
            }}
          >
            {t("bella 192")}
          </Button>
          <Button
            type="default"
            onPress={() => {
              setConfig({
                apiDomain: "https://wechat-server-jhc0.onrender.com",
              });
            }}
          >
            {t("prod url")}
          </Button>
        </View>
      </View>

      <View>
        {
          <>
            <TouchableOpacity
              onPress={async () => {
                await Clipboard.setStringAsync(userStore?.userInfo?._id || "");
                Toast.success("copied");
              }}
            >
              <Text>userID ===={userStore.userInfo?._id} copy userId </Text>
            </TouchableOpacity>
          </>
        }
        <Button
          onPress={() => {
            Toast.info(t("Log out"));
            setTimeout(() => {
              eventBus.emit("log-out");
            }, 10);
          }}
        >
          {t("Log out")}
        </Button>
      </View>
    </View>
  );
};
export default Setting;
