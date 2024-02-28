import { themeColor } from "@/theme/light";
import { View } from "react-native";

const RedDot = (props) => {
  return (
    <View
      style={{
        width: 8,
        height: 8,
        borderRadius: 50,
        backgroundColor: themeColor.danger6,
      }}
      {...props}
    ></View>
  );
};
export default RedDot;
