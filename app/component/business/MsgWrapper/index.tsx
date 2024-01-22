import { Text, View } from "react-native";
import * as light from "@/theme/light";
const MsgWrapper = () => {
  return (
    <View
      style={{
        backgroundColor: light.themeColor.brand2,
        alignSelf: "flex-start",
        // padding算距离
        // paddingHorizontal: 12,
        // paddingVertical: 8,
        borderRadius: 4,
        position: "relative",
      }}
    >
      <View
        style={{
          position: "absolute",
          right: 0,
          top: "50%",
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
        }}
      ></View>
      <Text
        style={{
          alignSelf: "flex-start",
          marginVertical: 8,
          marginHorizontal: 12,
        }}
      >
        很多事43
      </Text>
    </View>
  );
};
export default MsgWrapper;
