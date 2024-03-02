import { Text, View } from "react-native";
import MyQrcode from "@/component/complex/MyQrcode";
import { useLayoutEffect } from "react";
import { useNavigation } from "expo-router";
import {
  TNavigationOptions,
  useCommonNavigateProps,
} from "@/component/complex/CommonNavigateTitle";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/theme/useTheme";
import { getSize } from "utils";
import { useUser } from "app/store/user";
const MoneyQrcode = () => {
  const { themeColor } = useTheme();
  const navigation = useNavigation();
  const { userInfo } = useUser().userStore;
  const { t } = useTranslation();
  useLayoutEffect(() => {
    const navigatorProps = useCommonNavigateProps({
      rightComp: () => <></>,
      goBackColor:themeColor.white,
      title: t("Receive Money") as string,
    });
    navigation.setOptions({
      ...navigatorProps,
      headerStyle: { backgroundColor: themeColor.gold6 },
      headerTintColor: themeColor.white,
      headerShadowVisible: false,
    } as TNavigationOptions);
  }, []);

  return (
    <View style={{ backgroundColor: themeColor.gold6, flex: 1 }}>
      <View
        style={{
          backgroundColor: themeColor.white,
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: 48,
          margin: getSize(12),
          borderRadius: 8,
        }}
      >
        <Text style={{ fontSize: 18, textAlign: "center", marginBottom: 32 }}>
          {userInfo?.act} (***)
        </Text>
        <MyQrcode
          type="transfer"
          // style={{ width: getSize(190) }}
        />
        <View
          style={{
            marginTop: 32,
            padding: 32,
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ color: themeColor.textBlue, fontSize: 16 }}>
            {t("Set Amount")}
          </Text>
          <Text style={{ color: themeColor.textBlue, fontSize: 16 }}>
            {t("Same Image")}
          </Text>
          <Text
            style={{
              textAlign: "center",
              width: "20%",
              color: themeColor.textBlue,
              fontSize: 16,
            }}
          >
            {t("More Setting")}
          </Text>
        </View>
      </View>
    </View>
  );
};
export default MoneyQrcode;
