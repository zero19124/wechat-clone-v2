import {
  TNavigationOptions,
  useCommonNavigateProps,
} from "@/component/complex/CommonNavigateTitle";
import SearchBar from "@/component/complex/SearchBar";
import { useNavigation } from "expo-router";
import { useLayoutEffect } from "react";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";
import QrcodeIcon from "@/icons/discover/qrcode.svg";
import { useTheme } from "@/theme/useTheme";

const AddContacts = () => {
  const navigate = useNavigation();
  const { t } = useTranslation();
  const { themeColor } = useTheme();
  useLayoutEffect(() => {
    const navigatorProps = useCommonNavigateProps({
      title: t("Add Contacts"),
      rightComp: () => <Text></Text>,
    });
    navigate.setOptions(navigatorProps as TNavigationOptions);
  });
  return (
    <View>
      <SearchBar
        placeholder={t("Account/Mobile Number")}
        onPress={() => {
          navigate.navigate("pages/contacts/screens/add-contacts-search/index");
        }}
      />
      <View className="flex-row  justify-center items-center">
        <Text style={{ marginRight: 8 }}>{t("My Weixin ID: evan123")}</Text>
        <QrcodeIcon fill={themeColor.primary} width={20} height={20} />
      </View>
    </View>
  );
};
export default AddContacts;
