import { Button, Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import { useLayoutEffect } from "react";
import { useNavigation } from "expo-router";

const Setting = () => {
  const navigator = useNavigation();
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const handleChangeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  useLayoutEffect(() => {
    navigator.setOptions({
      title: t("setting"),
    });
  });
  return (
    <View>
      <Button
        onPress={() => {
          handleChangeLanguage(i18n.language === "cn" ? "en" : "cn");
        }}
        title={t("change language to chinese")}
      />
    </View>
  );
};
export default Setting;
