import { themeColor } from "@/theme/light";
import MsgReceiver from "app/component/business/MsgReceiver";
import UserAvatar from "app/component/complex/UserAvatar";
import { FlatList, View } from "react-native";
import data from "@/mocks/msgList.json";

const PrivateChatList = () => {
  const renderItem = ({ item }: { item: (typeof data)[0] }) => {
    const isMe = item.id % 2;
    const ItemWrapper = () => {
      return (
        <View
          style={{
            marginBottom: 16,
            flexDirection: "row",
          }}
        >
          {isMe ? (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                flex: 1,
              }}
            >
              <MsgReceiver type="right" text={item.latestMessage} />
              <UserAvatar
                source={require("@/assets/me.png")}
                style={{ marginLeft: 8 }}
              />
            </View>
          ) : (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                flex: 1,
              }}
            >
              <UserAvatar style={{ marginRight: 8 }} />
              <MsgReceiver text={item.latestMessage}></MsgReceiver>
            </View>
          )}
        </View>
      );
    };
    return <ItemWrapper />;
  };
  return (
    <FlatList
      contentContainerStyle={{
        backgroundColor: themeColor.fillColor,
        padding: 12,
        flex: 1,
      }}
      data={data}
      keyExtractor={(item) => item.id + ""}
      renderItem={renderItem}
    ></FlatList>
  );
};
export default PrivateChatList;
