import { StyleProp, Text, View, ViewStyle, Image, Button } from "react-native";
import * as light from "@/theme/light";
import { getSize } from "utils";
import { useNavigation } from "expo-router";
const msgTypeMap: Record<string, StyleProp<ViewStyle>> = {
  itemRightWrapper: {
    backgroundColor: light.themeColor.brand2,
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
    backgroundColor: light.themeColor.brand2,
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
    backgroundColor: light.themeColor.white,
  },
  itemLeft: {
    position: "absolute",
    left: 0,
    top: getSize(16),
    backgroundColor: light.themeColor.white,
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
const MsgWrapper = ({
  msgType = "text",
  type = "left",
  text,
  msgSenderId,
}: {
  type?: "left" | "right";
  text: string;
  msgSenderId: string;
  msgType: string;
}) => {
  const navigator = useNavigation();
  const getContent = () => {
    if (msgType === "transfer") {
      const transId = text.split("+")[2];
      const amount = text.split("+")[1];
      return (
        <Button
          title="transfer"
          onPress={() => {
            navigator.navigate("pages/chats/screens/transfer-receive/index", {
              transId,
              msgSenderId: msgSenderId,
              amount,
            });
          }}
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
  return (
    <View
      style={[
        msgTypeMap[type === "left" ? "itemLeftWrapper" : "itemRightWrapper"],
        {
          // backgroundColor: "red",
          alignSelf: "flex-start",
          maxWidth: getSize(250),
          // padding算距离
          // paddingHorizontal: 12,
          // paddingVertical: 8,
          borderRadius: 4,
          position: "relative",
        },
      ]}
    >
      {getContent()}
    </View>
  );
};
export default MsgWrapper;
