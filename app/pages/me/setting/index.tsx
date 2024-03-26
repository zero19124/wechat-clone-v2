import { Text, TouchableOpacity, View } from "react-native";
import { useTranslation } from "react-i18next";
import { useEffect, useLayoutEffect } from "react";
import { useNavigation, useRouter } from "expo-router";
import { useTheme } from "@/theme/useTheme";
import { TNavigationOptions } from "@/component/complex/CommonNavigateTitle";
import * as Clipboard from "expo-clipboard";
import config from "@/config/index";
import Toast from "@/component/base/Toast";
import { useUser } from "app/store/user";
import Button from "@/component/base/Button/Button";
import eventBus from "@/utils/eventBus";

const Setting = () => {
  const navigator = useNavigation();
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const { toggleTheme, themeName, themeColor } = useTheme();
  const { setUserStore, userStore } = useUser();
  const router = useRouter();
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
  useEffect(() => {
    console.log(222, themeColor.white);
  });
  return (
    <View style={{ backgroundColor: themeColor.white, flex: 1 }}>
      <Button
        type="default"
        onPress={() => {
          handleChangeLanguage(i18n.language === "cn" ? "en" : "cn");
        }}
      >
        {t("change language to chinese")}
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
            <Text>{config.apiDomain}</Text>
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
