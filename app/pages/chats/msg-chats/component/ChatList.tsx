import { themeColor } from "@/theme/light";
import MsgReceiver from "app/component/business/MsgReceiver";
import UserAvatar from "app/component/complex/UserAvatar";
import { FlatList, View } from "react-native";
import data from "@/mocks/msgList.json";
import { useUser } from "app/store/user";
import { getSize } from "utils";

const PrivateChatList = (props: {
  dataOut: any[];
  flatListRef: React.MutableRefObject<FlatList<any> | undefined>;
}) => {
  const { dataOut, flatListRef } = props;
  const { userInfo } = useUser().userStore;
  // console.log(dataOut, "dataOut-userInfo");
  const renderItem = ({ item }: { item: (typeof data)[0] }) => {
    const isMe = item.userId === userInfo?._id;
    console.log(item, "item");
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
              <MsgReceiver
                msgId={item._id}
                msgType={item.type}
                msgSenderId={item.userId}
                type="right"
                text={item.latestMessage}
              />
              <UserAvatar
                source={{ uri: userInfo?.image }}
                style={{
                  marginLeft: 8,
                  width: getSize(45),
                  height: getSize(45),
                }}
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
              <UserAvatar
                source={{ uri: item.image }}
                style={{
                  marginRight: 8,
                  width: getSize(45),
                  height: getSize(45),
                }}
              />
              <MsgReceiver
                msgId={item.msgId}
                msgSenderId={item.userId}
                msgType={item.type}
                text={item.latestMessage}
              ></MsgReceiver>
            </View>
          )}
        </View>
      );
    };
    return <ItemWrapper />;
  };
  return (
    <FlatList
      // style={{ paddingBottom: 58 }}
      ref={flatListRef}
      inverted
      contentContainerStyle={{
        backgroundColor: themeColor.fillColor,
        padding: 12,
        // dont give flex:1  it will strict the list on the sreen and cant scroll up everytime u scroll up it will automaticly bounce back
        // flex: 1,
      }}
      data={dataOut || data}
      keyExtractor={(item) => item.msgId}
      renderItem={renderItem}
    />
  );
};
export default PrivateChatList;
