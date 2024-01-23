import { StyleProp, Text, View, ViewStyle } from "react-native";
import * as light from "@/theme/light";
import { getSize } from "utils";
const msgTypeMap: Record<string, StyleProp<ViewStyle>> = {
  itemRightWrapper: {
    backgroundColor: light.themeColor.brand2,
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
  type = "left",
  text,
}: {
  type?: "left" | "right";
  text: string;
}) => {
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
    </View>
  );
};
export default MsgWrapper;
