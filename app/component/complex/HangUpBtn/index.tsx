import { useTheme } from "@/theme/useTheme";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  TouchableOpacity,
  TouchableOpacityProps,
  Text,
  View,
} from "react-native";
import { getSize } from "utils";
const sizeMap: Record<string, any> = {
  big: { size: getSize(58) },
  normal: { size: getSize(42) },
};
const HangUpBtn = ({
  type = "normal",
  text = "",
  ...rest
}: { type?: string; text?: string } & TouchableOpacityProps) => {
  console.log(rest, "rest");
  const { themeColor } = useTheme();
  const size = sizeMap[type].size;
  return (
    <View style={{ alignItems: "center" }}>
      <TouchableOpacity
        {...rest}
        style={{
          backgroundColor: themeColor.magenta6,
          width: getSize(75),
          height: getSize(75),
          alignItems: "center",
          justifyContent: "center",
          borderRadius: getSize(75),
        }}
      >
        <MaterialCommunityIcons
          size={size}
          color={themeColor.white}
          name="phone-hangup"
        />
      </TouchableOpacity>
      <Text style={{ fontSize: 30, color: themeColor.white }}>{text}</Text>
    </View>
  );
};
export default HangUpBtn;
