import { Pressable, SafeAreaView, Text, View } from "react-native";
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

const Wallet = () => {
  const navigate = useNavigation();
  const { userStore } = useUser();
  const [wallet, setWallet] = useState({ balance: 0, miniFund: 0 });
  useLayoutEffect(() => {
    const navigatorProps = useCommonNavigateProps({
      title: "",
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
    navigate.setOptions(navigatorProps as TNavigationOptions);
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
  }, []);
  return (
    <SafeAreaView style={{ flex: 1, alignItems: "center" }}>
      <Text>Wallet</Text>
      <Text>Balance:{wallet.balance}</Text>
      <Text>MiniFund:{wallet.miniFund}</Text>
    </SafeAreaView>
  );
};
export default Wallet;
