import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  StyleSheet,
} from "react-native";
import { getSize } from "utils";
import { themeColor } from "@/theme/light";
import { useMemo } from "react";
const UserAvatar = ({
  source,
  style,
  rounded = false,
}: {
  source?: ImageSourcePropType;
  rounded?: boolean;
  style?: StyleProp<ImageStyle>;
}) => {
  const finalSource = useMemo(() => {
    if (typeof source === "object") {
      if (!source?.uri) {
        return require("@/assets/avatar-default.jpeg");
      }
      return source;
    }
    return source;
  }, [source]);
  return (
    <Image
      source={finalSource}
      style={[
        avatarStyle.itemContainerAvatar,
        style,
        { borderRadius: rounded ? getSize(50) : 4 },
      ]}
    />
  );
};
const avatarStyle = StyleSheet.create({
  itemContainerAvatar: {
    borderColor: themeColor.fillColor,
    borderWidth: 1,
    width: getSize(50),
    height: getSize(50),
  },
});
export default UserAvatar;
