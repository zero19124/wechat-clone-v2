import { useTheme } from "@/theme/useTheme";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  TouchableOpacity,
  TouchableOpacityProps,
  Text,
  View,
} from "react-native";
import { getSize } from "utils";

type TIconType = typeof MaterialCommunityIcons;
export const VideoCallBtnSize = 65;
export const VideoCallBtnIconSize = 38;
const sizeMap: Record<string, { size: number }> = {
  big: { size: getSize(58) },
  normal: { size: getSize(VideoCallBtnIconSize) },
};
const VideoCallBtn = ({
  type = "normal",
  active = false,
  IconFn,
  text = "",
  ...rest
}: {
  type?: string;
  text?: string;
  IconFn?: (size: number) => TIconType;
  active?: boolean;
} & TouchableOpacityProps) => {
  console.log(rest, "rest");
  const { themeColor } = useTheme();
  const size = sizeMap[type].size;
  return (
    <View style={{ alignItems: "center" }}>
      <TouchableOpacity
        {...rest}
        style={{
          backgroundColor: active ? themeColor.white : themeColor.overlay2,
          width: getSize(VideoCallBtnSize),
          height: getSize(VideoCallBtnSize),
          alignItems: "center",
          justifyContent: "center",
          borderRadius: getSize(VideoCallBtnSize),
        }}
      >
        {IconFn ? (
          <IconFn size={size} />
        ) : (
          <MaterialCommunityIcons
            size={size}
            color={themeColor.white}
            name="phone-hangup"
          />
        )}
      </TouchableOpacity>
      <Text
        style={{ marginTop: 4, fontSize: getSize(16), color: themeColor.white }}
      >
        {text}
      </Text>
    </View>
  );
};
export default VideoCallBtn;
