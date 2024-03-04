import useSendMsg from "@/hooks/useSendMsg";
import NearByView from "@/pages/discover/screens/nearBy";
import { useChatList } from "app/store/chatList";
import { useUser } from "app/store/user";
import { useNavigation } from "expo-router";
import { Text, View } from "react-native";
const Location = () => {
  const navigator = useNavigation();
  const { userInfo } = useUser().userStore;
  const { chatListStore } = useChatList();
  const { sendMsgHandler } = useSendMsg();

  return (
    <View style={{ flex: 1 }}>
      <NearByView
        type="chat-location"
        setHandler={(coordinates) => {
          console.log(coordinates, "coordinates");
          sendMsgHandler({
            val: `location+${JSON.stringify(coordinates)}+${userInfo?._id}`,
            userId: userInfo?._id + "",
            type: "location",
            convoId: chatListStore?.curConvo?.convoId + "",
            doneHandler: () => {
              navigator.goBack();
            },
          });
        }}
      />
    </View>
  );
};
export default Location;
