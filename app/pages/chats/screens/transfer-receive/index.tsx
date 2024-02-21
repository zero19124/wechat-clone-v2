import Toast from "@/component/base/Toast";
import config from "@/config/index";
import useSendMsg from "@/hooks/useSendMsg";
import { useChatList } from "app/store/chatList";
import { useUser } from "app/store/user";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect } from "react";
import { Button, SafeAreaView, Text, View } from "react-native";
const TransferReceive = () => {
  const { userStore } = useUser();
  const navigator = useNavigation();
  const params = useLocalSearchParams<{
    msgSenderId: string;
    transId: string;
    amount: string;
  }>();
  const { chatListStore } = useChatList();

  const { sendMsgHandler } = useSendMsg();

  const transferHandler = () => {
    const data = {
      transId: params.transId + "",
      receiverId: userStore.userInfo?._id + "",
      status: "received",
    };
    console.log(data, "data");
    fetch(config.apiDomain + "/api/transaction/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then(async (res) => {
        if (res.code === 200) {
          console.log("add-suc-transaction");
          sendMsgHandler({
            val: `[accepted]${params.transId}+${params.amount}+${userStore.userInfo?._id}`,
            userId: userStore.userInfo?._id + "",
            type: "transfer",
            convoId: chatListStore?.curConvo?.convoId + "",
            doneHandler: () => {
              console.log("msg-sent-transaction");
            },
          });
          navigator.goBack();
        } else {
          Toast.fail("sendMsg failed");
        }
      });
  };

  useEffect(() => {
    fetch(
      config.apiDomain +
        `/api/transaction/getTransById?transId=${params.transId}`
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res, "red");
      });
  });
  return (
    <SafeAreaView>
      <Text>TransferReceive</Text>
      <Text>amount:{params.amount}</Text>
      {params.msgSenderId === userStore.userInfo?._id && (
        <Text>msgSenderId</Text>
      )}
      <Button title="accept" onPress={transferHandler} />
      <Button
        title="goback"
        onPress={() => {
          navigator.goBack();
        }}
      />
    </SafeAreaView>
  );
};
export default TransferReceive;
