import { themeColor } from "@/theme/light";
import { StyleSheet, View, ViewStyle } from "react-native";

const Divider = (props: { style?: ViewStyle; thickness?: number }) => {
  const { style, thickness = 2 } = props;
  return (
    <View
      style={[
        {
          backgroundColor: themeColor.fillColor,
          height: thickness,
          ...style,
        },
      ]}
      {...props}
    ></View>
  );
};

export default Divider;
