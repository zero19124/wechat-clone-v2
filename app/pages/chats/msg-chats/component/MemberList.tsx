import Popup from "@/component/base/Popup";
import UserAvatar from "@/component/complex/UserAvatar";
import { useChatList } from "app/store/chatList";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import { getSize } from "utils";
const MemberLIst = ({ memberListVisible, onClose }) => {
  const { chatListStore } = useChatList();
  const { t } = useTranslation();
  return (
    <Popup
      visible={memberListVisible}
      position="top"
      closeable
      onClose={onClose}
    >
      <View
        style={{
          width: getSize(375),
          padding: 24,
          paddingTop: 80,
          backgroundColor: "white",
        }}
      >
        {chatListStore.curConvo?.convoMember?.map?.((user) => {
          return (
            <View className="items-center flex-row my-1" key={user._id}>
              <UserAvatar source={{ uri: user.image }} />
              <Text style={{ marginLeft: 12 }}>{user.act}</Text>
            </View>
          );
        })}
        <Text style={{ textAlign: "center" }}>
          {t("total member:")}
          {chatListStore.curConvo?.convoMember.length}
        </Text>
      </View>
    </Popup>
  );
};
export default MemberLIst;
