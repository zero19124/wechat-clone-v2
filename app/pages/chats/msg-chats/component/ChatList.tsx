import { themeColor } from "@/theme/light";
import MsgReceiver from "app/component/business/MsgReceiver";
import UserAvatar from "app/component/complex/UserAvatar";
import { FlatList, View } from "react-native";
import data from "@/mocks/msgList.json";
import { useUser } from "app/store/user";
import { useEffect, useRef } from "react";

const PrivateChatList = (props: { dataOut: any[] }) => {
  const { dataOut } = props;
  const { userInfo } = useUser().userStore;
  // console.log(dataOut, "dataOut-userInfo");
  const renderItem = ({ item }: { item: (typeof data)[0] }) => {
    const isMe = item.userId === userInfo?._id;
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
                source={{ uri: userInfo?.image }}
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
              <UserAvatar
                source={{ uri: item.image }}
                style={{ marginRight: 8 }}
              />
              <MsgReceiver text={item.latestMessage}></MsgReceiver>
            </View>
          )}
        </View>
      );
    };
    return <ItemWrapper />;
  };
  const flatListRef = useRef<FlatList>();

  useEffect(() => {
    // console.log(flatListRef.current?.scrollToEnd, "flatListRef.current");
    // flatListRef.current?.scrollToEnd({ animated: true });
  }, [dataOut]);
  return (
    <FlatList
      // style={{ paddingBottom: 58 }}
      // ref={flatListRef}
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
    ></FlatList>
  );
};
export default PrivateChatList;
