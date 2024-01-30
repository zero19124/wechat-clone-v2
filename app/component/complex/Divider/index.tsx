import { themeColor } from "@/theme/light";
import { View } from "react-native";

const Divider = (props) => {
  return (
    <View
      style={{
        backgroundColor: themeColor.fillColor,
        height: 8,
      }}
      {...props}
    ></View>
  );
};

export default Divider;
