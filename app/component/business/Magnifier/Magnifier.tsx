import { themeColor } from "@/theme/light";
import { View, Text } from "react-native";

const Magnifier = ({ children }: { children: any }) => {
  return (
    <View
      style={{
        width: 50,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          width: 50,
          height: 50,
          backgroundColor: themeColor.bg3,
          borderTopRightRadius: 50,
          borderBottomRightRadius: 50,
          // some phone doesnt suppot % also '50', number only
          borderBottomLeftRadius: 50,
          transform: [{ rotate: "135deg" }],
        }}
      />
      <Text
        style={[
          {
            color: themeColor.white,
            fontSize: 30,
            fontWeight: "bold",
            position: "absolute",
          },
        ]}
      >
        {children || "G"}
      </Text>
    </View>
  );
};
export default Magnifier;
