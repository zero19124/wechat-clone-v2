import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  StyleSheet,
} from "react-native";
import { getSize } from "utils";
import { themeColor } from "@/theme/light";
const ItemCard = ({
  source,
  style,
}: {
  source?: ImageSourcePropType;
  style?: StyleProp<ImageStyle>;
}) => {
  return (
   <View>
     
   </View>
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
export default ItemCard;
