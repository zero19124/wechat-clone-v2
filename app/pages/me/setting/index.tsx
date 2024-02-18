import { Button, Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import { useEffect, useLayoutEffect } from "react";
import { useNavigation } from "expo-router";
import { useTheme } from "@/theme/useTheme";
import { TNavigationOptions } from "@/component/complex/CommonNavigateTitle";

const Setting = () => {
  const navigator = useNavigation();
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const { toggleTheme, themeName, themeColor } = useTheme();

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
        color={themeColor.text5}
        onPress={() => {
          handleChangeLanguage(i18n.language === "cn" ? "en" : "cn");
        }}
        title={t("change language to chinese")}
      />
      <Button
        color={themeColor.text5}
        onPress={() => toggleTheme(themeName === "light" ? "dark" : "light")}
        title={t("change the theme")}
      />
    </View>
  );
};
export default Setting;
