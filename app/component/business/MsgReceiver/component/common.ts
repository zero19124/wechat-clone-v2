import { useTheme } from "@/theme/useTheme";
import { StyleProp, ViewStyle } from "react-native";
import { getSize } from "utils";

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