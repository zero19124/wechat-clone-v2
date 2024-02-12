import { themeColor } from "@/theme/light";
import MsgReceiver from "app/component/business/MsgReceiver";
import UserAvatar from "app/component/complex/UserAvatar";
import { FlatList, View } from "react-native";
import data from "@/mocks/msgList.json";
import DeviceInfo from "react-native-device-info";

const PrivateChatList = (props: { dataOut: any[] }) => {
  const { dataOut } = props;
  console.log(dataOut, "dataOut");
  const renderItem = ({ item }: { item: (typeof data)[0] }) => {
    const deviceModel = DeviceInfo.getModel();
    const isMe = item.userId === deviceModel;
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
    return <ItemWrapper key={item.latestMessage} />;
  };
  return (
    <FlatList
      contentContainerStyle={{
        backgroundColor: themeColor.fillColor,
        padding: 12,
        flex: 1,
      }}
      data={dataOut || data}
      keyExtractor={(item) => item.latestMessage + ""}
      renderItem={renderItem}
    ></FlatList>
  );
};
export default PrivateChatList;
