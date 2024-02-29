import Button from "@/component/base/Button/Button";
import Toast from "@/component/base/Toast";
import AmountText from "@/component/complex/AmountText";
import Divider from "@/component/complex/BottomWidthDivider";
import {
  TNavigationOptions,
  useCommonNavigateProps,
} from "@/component/complex/CommonNavigateTitle";
import config from "@/config/index";
import useSendMsg from "@/hooks/useSendMsg";
import { useTheme } from "@/theme/useTheme";
import { useChatList } from "app/store/chatList";
import { useUser } from "app/store/user";
import ClockOutlineIcon from "@/icons/chats/clock-outline.svg";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useLayoutEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { getSize } from "utils";
const TransferReceive = () => {
  const { userStore } = useUser();
  const { themeColor } = useTheme();
  const { t } = useTranslation();
  const navigator = useNavigation();
  const params = useLocalSearchParams<{
    msgSenderId: string;
    transId: string;
    amount: string;
    originMsgId: string;
  }>();
  const { chatListStore } = useChatList();
  const { sendMsgHandler } = useSendMsg();
  const navigate = useNavigation();
  const navigatorProps = useCommonNavigateProps({
    title: "",

    rightComp: () => null,
  });
  useLayoutEffect(() => {
    navigate.setOptions({
      ...navigatorProps,
      headerStyle: { backgroundColor: themeColor.white },
      headerShadowVisible: false,
    } as TNavigationOptions);
  });
  const transferHandler = () => {
    const data = {
      transId: params.transId + "",
      receiverId: userStore.userInfo?._id + "",
      status: "received",
    };
    console.log(data, "data");
    fetch(config.apiDomain + "/api/transaction/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then(async (res) => {
        if (res.code === 200) {
          console.log("add-suc-transaction");
          sendMsgHandler({
            val: `[accepted]${params.transId}+${params.amount}+${userStore.userInfo?._id}+${params.originMsgId}`,
            userId: userStore.userInfo?._id + "",
            type: "transfer",
            convoId: chatListStore?.curConvo?.convoId + "",
            doneHandler: () => {
              console.log("msg-sent-transaction");
            },
          });
          navigator.goBack();
        } else {
          Toast.fail("sendMsg failed");
        }
      });
  };

  useEffect(() => {
    fetch(
      config.apiDomain +
        `/api/transaction/getTransById?transId=${params.transId}`
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res, "red");
      });
  });

  const BottomSection = () => {
    return (
      <View
        style={{
          position: "absolute",
          right: 0,
          left: 0,
          bottom: getSize(100),
        }}
      >
        <Button
          size="large"
          style={{ marginHorizontal: "25%" }}
          type="primary"
          onPress={transferHandler}
        >
          {t("Accept Transfer")}
        </Button>
        {/* <Button
        title="goback"
        onPress={() => {
          navigator.goBack();
        }}
      /> */}
        <View
          style={{
            marginTop: 32,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: themeColor.text4,
              width: "75%",
            }}
          >
            {t(
              "Money will be refunded to other user if not received within 24 hours."
            )}
            <TouchableOpacity
              style={{ marginTop: -4 }}
              onPress={() => {
                // Toast.loading(t("Loading"));
              }}
            >
              <Text style={{ marginTop: 4, color: themeColor.textBlue }}>
                {t(" Refund now")}
              </Text>
            </TouchableOpacity>
          </Text>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={{ backgroundColor: themeColor.white, flex: 1 }}>
      {params.msgSenderId === userStore.userInfo?._id && (
        <Text>msgSenderId</Text>
      )}

      <View
        style={{
          alignItems: "center",
          paddingBottom: "8%",
          paddingTop: "15%",
        }}
      >
        <ClockOutlineIcon
          width={getSize(68)}
          height={getSize(68)}
          fill={themeColor.blue3}
        />
      </View>
      <Text style={{ textAlign: "center", fontSize: 16 }}>
        {t("Await Receipt")}
      </Text>
      <View style={{ marginBottom: "12%", marginTop: 8, alignItems: "center" }}>
        <AmountText amount={params.amount} />
      </View>
      <View style={{ marginHorizontal: 32 }}>
        <Divider thickness={StyleSheet.hairlineWidth} />
        <View
          style={{
            flexDirection: "row",
            paddingTop: 12,
            justifyContent: "space-between",
          }}
        >
          <Text>{t("Transfer Time")}</Text>
          <Text>{"2022-03-02"}</Text>
        </View>
      </View>
      <BottomSection />
    </SafeAreaView>
  );
};
export default TransferReceive;
