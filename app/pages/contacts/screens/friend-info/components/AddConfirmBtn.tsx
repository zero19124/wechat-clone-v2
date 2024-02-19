import BottomWidthDivider from "@/component/complex/BottomWidthDivider";
import { useTheme } from "@/theme/useTheme";
import { useNavigation } from "expo-router";
import { useTranslation } from "react-i18next";
import VideoCallIcon from "@/icons/discover/video-call-outline.svg";
import MessageIcon from "@/icons/discover/message-outline.svg";

import { Text, TouchableOpacity, View } from "react-native";
type TAddConfirmBtnProps = {
  status?: string;
  confirm?: boolean;
  friendId?: string;
};

const RequestFriendBtn = ({
  iconComp = () => <View></View>,
  text = "Add",
  onPress = () => {},
}) => {
  const { t } = useTranslation();
  const { themeColor } = useTheme();
  return (
    <TouchableOpacity
      style={{ backgroundColor: themeColor.white, paddingVertical: 14 }}
      onPress={onPress}
    >
      <View className="justify-center flex-row items-center ">
        {iconComp()}
        <Text
          style={{
            marginLeft: 4,
            color: themeColor.textBlue,
            fontSize: 16,
          }}
        >
          {t(text)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
const AddConfirmBtn = ({ status, friendId, confirm }: TAddConfirmBtnProps) => {
  const navigate = useNavigation();
  const { t } = useTranslation();
  const { themeColor } = useTheme();
  if (status === "done") {
    return (
      <View>
        <RequestFriendBtn
          text="Messages"
          iconComp={() => {
            return (
              <MessageIcon width="18" height="18" fill={themeColor.textBlue} />
            );
          }}
          onPress={() => {
            navigate.navigate(
              "pages/contacts/screens/send-friend-request/index",
              {
                friendId,
                sendFriendRequestTitle: "Confirm Friend Request",
              }
            );
          }}
        />
        <BottomWidthDivider />
        <RequestFriendBtn
          text="Voice or Video Call"
          iconComp={() => {
            return <VideoCallIcon width="18" height="18" fill={themeColor.textBlue} />;
          }}
          onPress={() => {
            navigate.navigate(
              "pages/contacts/screens/send-friend-request/index",
              {
                friendId,
                sendFriendRequestTitle: "Confirm Friend Request",
              }
            );
          }}
        />
      </View>
    );
  }
  if (confirm) {
    return (
      <RequestFriendBtn
        text="Go Confirm"
        onPress={() => {
          navigate.navigate(
            "pages/contacts/screens/send-friend-request/index",
            {
              friendId,
              sendFriendRequestTitle: "Confirm Friend Request",
            }
          );
        }}
      />
    );
  }
  return (
    <View>
      {status === "requesting" ? (
        <View
          style={{
            backgroundColor: themeColor.white,
            alignItems: "center",
            paddingVertical: 12,
          }}
        >
          <Text style={{ color: themeColor.text2, fontSize: 16 }}>
            {t("Confirmation pending")}
          </Text>
        </View>
      ) : (
        <RequestFriendBtn
          onPress={() => {
            navigate.navigate(
              "pages/contacts/screens/send-friend-request/index",
              {
                friendId,
              }
            );
          }}
        />
      )}
    </View>
  );
};
export default AddConfirmBtn;
