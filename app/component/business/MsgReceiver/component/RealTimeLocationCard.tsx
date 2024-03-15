import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity } from "react-native";

const RealTimeLocationCard = ({ msgId }) => {
  const navigator = useNavigation();
  const { t } = useTranslation();
  return (
    <TouchableOpacity
      style={{ flexDirection: "row", alignItems: "center", paddingLeft: 8 }}
      onPress={() => {
        navigator.navigate(
          "pages/chats/msg-chats/screens/real-time-location/index",
          { messageIdForRoom: msgId }
        );
      }}
    >
      <FontAwesome5 name="location-arrow" size={14} color="black" />
      <Text style={{ padding: 12, justifyContent: "center" }}>
        {t("real time location sharing ...")}
      </Text>
    </TouchableOpacity>
  );
};
export default RealTimeLocationCard;
