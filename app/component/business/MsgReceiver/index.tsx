import {
  StyleProp,
  Text,
  View,
  ViewStyle,
  Image,
  Button,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import TransferOutlineIcon from "@/icons/chats/transfer-outline.svg";
import { getSize } from "utils";
import { useNavigation } from "expo-router";
import { useTranslation } from "react-i18next";
import Divider from "@/component/complex/BottomWidthDivider";
import { useTheme } from "@/theme/useTheme";
import { FontAwesome } from "@expo/vector-icons";
import { useUser } from "app/store/user";
import TransferCard from "./component/TransferCard";
export const getMsgTypeMap = (
  themeColor: ReturnType<typeof useTheme>["themeColor"]
) => {
  const msgTypeMap: Record<string, StyleProp<ViewStyle>> = {
    itemRightWrapper: {
      backgroundColor: themeColor.brand2,
      marginRight: 4,
    },
    itemRight: {
      position: "absolute",
      right: 0,
      // top: "50%",
      top: getSize(16),
      // backgroundColor: "red",
      // borderTopStartRadius: 4,
      // borderTopRightRadius: 4,
      backgroundColor: themeColor.brand2,
      width: 10,
      height: 10,
      transform: [
        { translateX: 5 },
        {
          translateY: -5,
        },
        { rotate: "45deg" },
      ],
    },
    itemLeftWrapper: {
      marginLeft: 4,
      backgroundColor: themeColor.white,
    },
    itemLeft: {
      position: "absolute",
      left: 0,
      top: getSize(16),
      backgroundColor: themeColor.white,
      zIndex: 1,
      width: 10,
      height: 10,
      transform: [
        { translateX: -5 },
        {
          translateY: -5,
        },
        { rotate: "45deg" },
      ],
    },
  };
  return msgTypeMap;
};

const MsgWrapper = ({
  msgType = "text",
  type = "left",
  text,
  msgId,
  msgSenderId,
}: {
  type?: "left" | "right";
  text: string;
  msgId: string;
  msgSenderId: string;
  msgType: string;
}) => {
  const { themeColor } = useTheme();
  const userInfo = useUser().userStore.userInfo;
  const msgTypeMap = getMsgTypeMap(themeColor);
  const navigator = useNavigation();
  const { t } = useTranslation();
  const TextWrapper = ({ children }) => {
    return (
      <View
        style={[
          msgTypeMap[type === "left" ? "itemLeftWrapper" : "itemRightWrapper"],
          {
            alignSelf: "flex-start",
            maxWidth: getSize(250),
            // padding算距离
            borderRadius: 4,
            position: "relative",
          },
        ]}
      >
        {children}
      </View>
    );
  };
  // transId+amount+userid
  const getContent = () => {
    if (msgType === "transfer") {
      let accepted = false;
      if (
        // receiver accepted the transfer
        text.includes("[accepted]") ||
        // the originMsg need Update to accepted
        text.includes("isTransferAccepted")
      ) {
        accepted = true;
      }

      const transId = text.split("+")[0];
      const amount = text.split("+")[1];
      console.log(text, "texttexttexttext", amount);

      return (
        <TransferCard
          originMsgId={msgId}
          accepted={accepted}
          amount={amount}
          transId={transId}
          msgSenderId={msgSenderId}
          type={type}
        />
      );
    }
    if (msgType === "img") {
      return (
        <Image source={{ uri: text }} style={{ width: 180, height: 100 }} />
      );
    }
    return (
      <>
        <View
          style={msgTypeMap[type === "left" ? "itemLeft" : "itemRight"]}
        ></View>
        <Text
          style={{
            alignSelf: "flex-start",
            marginVertical: 8,
            marginHorizontal: 12,
          }}
        >
          {text}
        </Text>
      </>
    );
  };
  return <TextWrapper>{getContent()}</TextWrapper>;
};
export default MsgWrapper;
