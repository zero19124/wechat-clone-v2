import { useTheme } from "@/theme/useTheme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View } from "react-native";
const sizeMap: Record<string, any> = {
  big: { size: 28, fontSize: 56 },
  normal: { size: 24, fontSize: 48 },
};
const HangUpBtn = ({ type = "normal" }: { type: string }) => {
  const { themeColor } = useTheme();
  return (
    <View
      style={{
        backgroundColor: themeColor.danger5,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <MaterialCommunityIcons
        size={sizeMap[type].size}
        color={themeColor.bg5}
      />
    </View>
  );
};
export default HangUpBtn;
