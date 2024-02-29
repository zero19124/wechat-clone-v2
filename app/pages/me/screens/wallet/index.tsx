import { Pressable, SafeAreaView, Text, View, Image } from "react-native";
import { QRCode, Canvas } from "easyqrcode-react-native/QRCode";
import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import {
  TNavigationOptions,
  useCommonNavigateProps,
} from "@/component/complex/CommonNavigateTitle";
import { useNavigation } from "expo-router";
import ThreeDot from "@/icons/three-dot.svg";
import { useUser } from "app/store/user";
import config from "@/config/index";
import { ScrollView } from "react-native";
import Toast from "@/component/base/Toast";
import i18n from "i18next";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/theme/useTheme";
import MoneyOutline from "@/icons/chats/money-outline.svg";
import WalletOutline from "@/icons/chats/wallet-outline.svg";

const Wallet = () => {
  const navigate = useNavigation();
  const { userStore } = useUser();
  const { t } = useTranslation();
  const { themeColor } = useTheme();
  const [wallet, setWallet] = useState({ balance: 0, miniFund: 0 });
  useLayoutEffect(() => {
    const navigatorProps = useCommonNavigateProps({
      title: t("Service"),
      rightComp: () => (
        <Pressable
          onPress={() => {
            console.log("ThreeDot");
          }}
        >
          <ThreeDot />
        </Pressable>
      ),

      rightHandler: () => {
        console.log(2222);
      },
    });
    navigate.setOptions({
      ...navigatorProps,
      headerShadowVisible: false,
    } as TNavigationOptions);
  });
  useEffect(() => {
    fetch(
      config.apiDomain +
        `/api/wallet/getWalletByUserId?userId=${userStore.userInfo?._id}`
    )
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res, "res");
        setWallet(res.data);
      });
    console.log(i18n.language);
  }, []);
  const getItem = (icon: any, text: string, amount?: number) => {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {icon}
        <Text
          style={{
            color: themeColor.white,
            fontSize: 14,
            fontWeight: "bold",
          }}
        >
          {text}
        </Text>
        {amount && (
          <Text
            style={{
              width: 100,
              textAlign: "center",
              color: themeColor.fill4,
              position: "absolute",
              bottom: -16,
              fontSize: 12,
            }}
          >
            ¥ {amount}
          </Text>
        )}
      </View>
    );
  };
  return (
    // <SafeAreaView>
    <ScrollView>
      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-around",
          backgroundColor: themeColor.primary,
          borderRadius: 4,
          margin: 8,
          padding: 40,
          paddingTop: 24,
        }}
      >
        {getItem(
          <MoneyOutline
            style={{ width: 38, height: 38, marginBottom: 4 }}
            fill={themeColor.white}
          />,
          t("Money")
        )}
        {getItem(
          <WalletOutline
            style={{ width: 38, height: 38, marginBottom: 4 }}
            fill={themeColor.white}
          />,
          t("Wallet"),
          (Number(wallet?.balance).toFixed(2) || 5340300.03) as number
        )}
      </View>
      {i18n.language === "cn" ? (
        <Pressable
          onPress={() => {
            Toast.loading("loading");
          }}
        >
          <Image
            resizeMode="contain"
            style={{
              // backgroundColor: "red",
              width: "auto",
              height: 350,
            }}
            source={require("@/assets/cn-service-up.jpg")}
          />
          <Image
            resizeMode="contain"
            style={{
              // backgroundColor: "red",
              width: "auto",
              height: 710,
            }}
            source={require("@/assets/cn-service-down.jpg")}
          />
        </Pressable>
      ) : (
        <Pressable
          onPress={() => {
            Toast.loading("loading");
          }}
        >
          <Image
            resizeMode="contain"
            style={{
              // backgroundColor: "red",
              width: "auto",
              height: 445,
            }}
            source={require("@/assets/eng-service-up.jpg")}
          />
          <Image
            resizeMode="contain"
            style={{
              // backgroundColor: "red",
              width: "auto",
              height: 630,
            }}
            source={require("@/assets/eng-service-down.jpg")}
          />
        </Pressable>
      )}
    </ScrollView>
    // </SafeAreaView>
  );
};
export default Wallet;
