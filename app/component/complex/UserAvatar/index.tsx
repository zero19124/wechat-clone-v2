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
}: {
  source?: ImageSourcePropType;
  style?: StyleProp<ImageStyle>;
}) => {
  const finalSource = useMemo(() => {
    if (typeof source === "object") {
      if (!source?.uri) {
        return require("@/assets/avatar-default.png");
      }
      return source;
    }
    return source;
  }, [source]);
  return (
    <Image
      source={finalSource}
      style={[avatarStyle.itemContainerAvatar, style]}
    />
  );
};
const avatarStyle = StyleSheet.create({
  itemContainerAvatar: {
    borderRadius: 4,
    borderColor: themeColor.fillColor,
    borderWidth: 1,
    width: getSize(50),
    height: getSize(50),
  },
});
export default UserAvatar;
