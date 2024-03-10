import { themeColor } from "@/theme/light";
import MsgReceiver from "app/component/business/MsgReceiver";
import UserAvatar from "app/component/complex/UserAvatar";
import { FlatList, View } from "react-native";
import data from "@/mocks/msgList.json";
import { useUser } from "app/store/user";
import { getSize } from "utils";
import { Text } from "react-native";
import { useTransition } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/theme/useTheme";
const PrivateChatList = (props: {
  dataOut: any[];
  flatListRef: React.MutableRefObject<FlatList<any> | undefined>;
}) => {
  const { t } = useTranslation();
  const { dataOut, flatListRef } = props;
  const { userInfo } = useUser().userStore;
  const { themeColor } = useTheme();
  // console.log(dataOut, "dataOut-userInfo");
  const renderItem = ({ item }: { item: (typeof data)[0] }) => {
    // only me hava
  // console.log(item.image, "item.image----");

    if (item.type === "recalledMsg") {
      return <></>;
    }
    if (item.type === "recallMsg") {
      return (
        <View
          style={{
            marginVertical: 24,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: themeColor.overlay1,
              padding: 12,
              borderRadius: 2,
              paddingVertical: 4,
              margin: "auto",
            }}
          >
            <Text
              style={{
                textAlign: "center",
              }}
            >
              {t("you recalled a message")}
            </Text>
          </View>
        </View>
      );
    }
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
              <MsgReceiver
                msgId={item.msgId}
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
    />
  );
};
export default PrivateChatList;
