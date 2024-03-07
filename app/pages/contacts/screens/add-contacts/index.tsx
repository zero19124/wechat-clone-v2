import {
  TNavigationOptions,
  useCommonNavigateProps,
} from "@/component/complex/CommonNavigateTitle";
import SearchBar from "@/component/complex/SearchBar";
import { useNavigation } from "expo-router";
import { useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import QrcodeIcon from "@/icons/discover/qrcode.svg";
import { useTheme } from "@/theme/useTheme";
import { useUser } from "app/store/user";
import Toast from "@/component/base/Toast";
import Overlay from "@/component/base/Overlay";
import MyQrcode from "@/component/complex/MyQrcode";
import { getSize } from "utils";

const AddContacts = () => {
  const navigate = useNavigation();
  const { userStore } = useUser();
  const { t } = useTranslation();
  const { themeColor } = useTheme();
  const [showQrcode, setShowQrcode] = useState(false);
  useLayoutEffect(() => {
    const navigatorProps = useCommonNavigateProps({
      title: t("Add Contacts"),
      headerTitleAlign: "center",

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
        <Text style={{ marginRight: 8 }}>
          {t("My Weixin ID:")}
          {`${userStore.userInfo?._id}`}
        </Text>
        <Pressable
          onPress={() => {
            setShowQrcode(true);
          }}
        >
          <QrcodeIcon fill={themeColor.primary} width={20} height={20} />
        </Pressable>
      </View>
      <Pressable
        onPress={() => {
          Toast.loading(t("loading"));
        }}
      >
        <Overlay
          visible={showQrcode}
          onBackdropPress={() => setShowQrcode(false)}
        >
          <View
            style={{
              width: getSize(320),
              height: "50%",
              backgroundColor: "#fff",
              borderRadius: 8,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <MyQrcode type="friend" />
          </View>
        </Overlay>
        <Image
          style={{ width: "100%", height: 300, marginTop: 24 }}
          source={require("@/assets/add-contacts-bg.jpeg")}
        />
      </Pressable>
    </View>
  );
};
export default AddContacts;
