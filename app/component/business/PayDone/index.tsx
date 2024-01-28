import { themeColor } from "@/theme/light";
import PaySuccess from "@/icons/pay-success.svg";
import { SafeAreaView, View, Text, TouchableOpacity } from "react-native";
import { useNavigation, useLocalSearchParams } from "expo-router";
import AmountText from "app/component/complex/AmountText";
const PayDone = () => {
  const navigator = useNavigation();
  const { amount } = useLocalSearchParams();
  return (
    <SafeAreaView style={{ alignItems: "center" }}>
      <View
        style={{
          marginTop: 12,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "20%",
        }}
      >
        <PaySuccess width={28} height={28} fill={themeColor.primary} />
        <Text
          style={{
            marginLeft: 8,
            color: themeColor.primary,
            fontSize: 18,
          }}
        >
          Payment Successful
        </Text>
      </View>
      <View
        style={{
          marginTop: 24,
          // flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "90%",
        }}
      >
        <Text
          style={{
            fontSize: 16,
            marginBottom: 24,
          }}
        >
          Awaiting receipt by the recipient
        </Text>
        {/* amount  */}
        <AmountText amount={amount} type={"big"} />
      </View>
      {/* button  */}
      <TouchableOpacity
        onPress={() => {
          navigator.navigate("pages/chats/msg-chats/index");
        }}
        style={{
          width: 180,
          height: 50,
          borderRadius: 8,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: themeColor.bg3,
        }}
      >
        <Text
          style={{
            marginLeft: 8,
            fontSize: 18,
          }}
        >
          Done
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
export default PayDone;
