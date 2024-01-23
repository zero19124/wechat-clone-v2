// import { useEffect, useState } from "react";
// import { View, Text, TextInput, Button } from "react-native";
// import TcpSocket from "react-native-tcp-socket";

// const App = () => {
//   const [message, setMessage] = useState("");
//   const [receivedMessage, setReceivedMessage] = useState("");
//   const [client, setClient] = useState<TcpSocket.Socket>(null);
//   useEffect(() => {
//     const cli = TcpSocket.createConnection(
//       { port: 3000, host: "127.0.0.1" },
//       () => {
//         console.log("已连接到服务器");
//       }
//     );
//     setClient(cli);
//     cli.on("data", (data) => {
//       console.log("收到消息：", data);
//       setReceivedMessage(data.toString());
//     });

//     cli.on("error", (error) => {
//       console.log("发生错误：", error);
//     });

//     cli.on("close", () => {
//       console.log("连接已关闭");
//     });

//     return () => {
//       cli.destroy();
//     };
//   }, []);

//   const sendMessage = () => {
//     client.write(message);
//     setMessage("");
//   };

//   return (
//     <View>
//       <Text>Socket 聊天应用</Text>
//       <TextInput value={message} onChangeText={(text) => setMessage(text)} />
//       <Button title="发送" onPress={sendMessage} />
//       <Text>收到的消息：{receivedMessage}</Text>
//     </View>
//   );
// };

// export default App;
