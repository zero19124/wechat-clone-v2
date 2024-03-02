import {
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import ImagePreview from "@/component/base/ImagePreview";

import { getSize } from "utils";
import { useNavigation } from "expo-router";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/theme/useTheme";
import { useUser } from "app/store/user";
import TransferCard from "./component/TransferCard";
import { getMsgTypeMap } from "./component/common";


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
      console.log(text, "text-img");

      const openPreview = () => {
        console.log(text, "text-im1g");

        ImagePreview.open({
          showIndex: false,
          showIndicators: false,
          images: [text],
          onChange: (index) => console.log(`当前展示第${index + 1}张`),
        });
      };
      return (
        <TouchableOpacity onPress={openPreview}>
          <Image
            source={{
              uri:
                // "https://placekitten.com/302/302"
                // ||
                text,
            }}
            style={{ width: 180, height: 100 }}
          />
        </TouchableOpacity>
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
