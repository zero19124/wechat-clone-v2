import { themeColor } from "@/theme/light";
import { View, ViewStyle } from "react-native";

const Divider = (props: { style?: ViewStyle }) => {
  const { style } = props;
  return (
    <View
      style={[
        {
          backgroundColor: themeColor.fillColor,
          height: 2,
          ...style,
        },
      ]}
      {...props}
    ></View>
  );
};

export default Divider;
