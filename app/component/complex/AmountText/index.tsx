import { FontAwesome } from "@expo/vector-icons";
import { View, Text } from "react-native";
const sizeMap: Record<string, any> = {
  big: { size: 28, fontSize: 56 },
  normal: { size: 24, fontSize: 48 },
};
const AmountText = ({ amount, type = "normal" }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <FontAwesome name="rmb" size={sizeMap[type].size} color="black" />
      {/* Amount  */}
      <Text
        style={{
          fontSize: sizeMap[type].fontSize,
          textAlign: "center",
        }}
      >
        {Number(amount).toFixed(2) || "1000.00"}{" "}
      </Text>
    </View>
  );
};
export default AmountText;
