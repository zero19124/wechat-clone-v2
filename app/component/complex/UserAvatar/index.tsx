import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  StyleSheet,
} from "react-native";
import { getSize } from "utils";
import { themeColor } from "@/theme/light";
const UserAvatar = ({
  source,
  style,
}: {
  source?: ImageSourcePropType;
  style?: StyleProp<ImageStyle>;
}) => {
  return (
    <Image
      source={source || require("@/assets/bella.png")}
      style={[style, avatarStyle.itemContainerAvatar]}
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
