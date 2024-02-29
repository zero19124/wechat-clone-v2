import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "@/theme/useTheme";

import TransferOutlineIcon from "@/icons/chats/transfer-outline.svg";
import { getSize } from "utils";
import Divider from "@/component/complex/BottomWidthDivider";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { getMsgTypeMap } from "..";
import { useTranslation } from "react-i18next";
import { useUser } from "app/store/user";
import { useMemo } from "react";
const TransferCard = ({
  transId,
  accepted,
  msgSenderId,
  amount,
  type,
  originMsgId,
}) => {
  const { themeColor } = useTheme();
  const navigator = useNavigation();
  const msgTypeMap = getMsgTypeMap(themeColor);
  const { t } = useTranslation();
  const userInfo = useUser().userStore.userInfo;

  const getResultText = () => {
    if (accepted) {
      return t("Accepted");
    }
    const resultText =
      userInfo?._id === msgSenderId
        ? t("you've made a transfer")
        : t("Accept transfer");
    return resultText;
  };
  const backgroundColor = useMemo(
    () => (accepted ? themeColor.warning2 : themeColor.warning4),
    [accepted]
  );
  return (
    <TouchableOpacity
      style={{
        borderRadius: 4,
        backgroundColor,
        paddingHorizontal: 8,
        paddingVertical: 8,
        paddingBottom: 4,
        width: getSize(235),
      }}
      onPress={() => {
        if (accepted) {
          return;
        }
        navigator.navigate("pages/chats/screens/transfer-receive/index", {
          transId,
          msgSenderId: msgSenderId,
          originMsgId,
          amount,
        });
      }}
    >
      <View
        style={[
          msgTypeMap[type === "left" ? "itemLeft" : "itemRight"],
          { backgroundColor },
        ]}
      ></View>
      <View style={{ flexDirection: "row" }}>
        <View style={{ marginBottom: 8 }}>
          <TransferOutlineIcon
            width={getSize(48)}
            height={getSize(48)}
            fill={themeColor.white}
          />
        </View>
        <View style={{ marginLeft: 8 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <FontAwesome
              name="rmb"
              size={getSize(16)}
              color={themeColor.white}
            />
            <Text
              style={{
                marginLeft: 4,
                color: themeColor.white,
                fontSize: getSize(16),
                fontWeight: "500",
                paddingBottom: 2,
              }}
            >
              {Number(amount).toFixed(2)}
            </Text>
          </View>
          <Text
            style={{
              color: themeColor.white,
              opacity: 0.95,
            }}
          >
            {getResultText()}
          </Text>
        </View>
      </View>
      <Divider thickness={StyleSheet.hairlineWidth} />
      <Text
        style={{
          marginTop: 2,
          color: themeColor.white,
          opacity: 0.8,
        }}
      >
        {t("Weixin Transfer")}
      </Text>
    </TouchableOpacity>
  );
};
export default TransferCard;
