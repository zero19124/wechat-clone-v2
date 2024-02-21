import { View } from "react-native";
import MyQrcode from "@/component/complex/MyQrcode";

const MoneyQrcode = () => {
  return (
    <View>
      <MyQrcode type="transfer" />
    </View>
  );
};
export default MoneyQrcode;
