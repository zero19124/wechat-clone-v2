import {
  Text,
  StyleSheet,
  View,
  Pressable,
  TouchableOpacityBase,
  TouchableOpacity,
} from "react-native";
import ArrowRightIcon from "@/icons/common/arrow-right.svg";

import { themeColor } from "@/theme/light";
const ItemCard = (props: any) => {
  const {
    uniqueKey,
    style,
    onPress = null,
    borderVisible = true,
    showRightComp = true,
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
        key={uniqueKey}
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
        {showRightComp &&
          (rightComp?.() || (
            <ArrowRightIcon fill={themeColor.bg4} style={{ marginRight: 24 }} />
          ))}
      </View>
    );
  };

  return (
    <TouchableOpacity
      onPress={() => {
        onPress?.();
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
          style,
        ]}
      >
        {leftComp?.() || renderLeft()}
        {renderRight()}
      </View>
    </TouchableOpacity>
  );
};

export default ItemCard;
