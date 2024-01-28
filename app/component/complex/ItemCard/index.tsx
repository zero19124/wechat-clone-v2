import {
  Text,
  Image,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  StyleSheet,
  View,
  Pressable,
} from "react-native";
import { getSize } from "utils";
import { themeColor } from "@/theme/light";
const ItemCard = (props: any) => {
  const {
    borderVisible = true,
    leftComp = null,
    textComp = null,
    rightComp = null,
    text = "",
  } = props;
  const renderLeft = () => {
    return (
      <View className="justify-center  items-center">
        <Text>left</Text>
      </View>
    );
  };
  const renderRight = () => {
    return (
      <View
        style={[
          {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginLeft: 8,
            flex: 1,
            paddingVertical: 16,
            borderBottomColor: themeColor.fillColor,
            borderBottomWidth: borderVisible ? StyleSheet.hairlineWidth : 0,
          },
        ]}
      >
        {textComp?.() || <Text style={{ fontSize: 16 }}>{text}</Text>}
        {rightComp?.()}
      </View>
    );
  };

  return (
    <Pressable
      onPress={() => {
        console.log("press");
      }}
    >
      <View
        className={"flex-row justify-center items-center"}
        style={[
          {
            // paddingVertical: 8,
            paddingRight: 0,
            backgroundColor: themeColor.white,
          },
        ]}
      >
        {leftComp?.() || renderLeft()}
        {renderRight()}
      </View>
    </Pressable>
  );
};

export default ItemCard;
