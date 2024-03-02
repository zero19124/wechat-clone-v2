import { themeColor } from "@/theme/light";
import { FontAwesome5 } from "@expo/vector-icons";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { getSize } from "utils";

const PaymentKeyBoard = ({
  onChange,

  onDelete,
}: {
  onChange: (num: number) => void;
  onDelete: () => void;
}) => {
  const keyNumbers = Array.from({ length: 12 }).map((_, i) => i + 1);
  console.log(keyNumbers, "keyNumbers");
  const getContent = (num: number) => {
    if (num === 10) {
      return <Text></Text>;
    }

    if (num === 12) {
      return <FontAwesome5 name="backspace" size={24} color="black" />;
    }
    return <Text style={{ fontSize: 24 }}>{num === 11 ? 0 : num}</Text>;
  };
  const getBackgroundColor = (num: number) => {
    if (num === 10) {
      return "transparent";
    }
    if (num === 12) {
      return "transparent";
    }
    return themeColor.white;
  };
  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        backgroundColor: themeColor.fillColor,
        flex: 1,
      }}
    >
      {keyNumbers.map((num) => {
        return (
          <TouchableOpacity
            key={num}
            onPress={() => {
              if (num === 12) {
                onDelete();
                return;
              }
              onChange(num);
            }}
            style={{
              // backgroundColor: "red",
              backgroundColor: getBackgroundColor(num),
              width: getSize(124),
              height: 52,
              // aspectRatio: 1, // 使每个元素的宽度与高度相等
              justifyContent: "center",
              margin: StyleSheet.hairlineWidth,
              alignItems: "center",
            }}
          >
            {getContent(num)}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
export default PaymentKeyBoard;
