const net = require("net");

const sockets = [];

const server = net.createServer((socket) => {
  console.log("客户端已连接");
  sockets.push(socket);

  socket.on("data", (data) => {
    console.log("来自客户端的消息1：" + data);
    broadcast(data, socket);
  });

  socket.on("end", () => {
    console.log("客户端已断开连接");
    const index = sockets.indexOf(socket);
    if (index !== -1) {
      sockets.splice(index, 1);
    }
  });
});

function broadcast(message, sender) {
  console.log(message, "message, sender");
  sockets.forEach((socket) => {
    // if (socket !== sender) {
    socket.write(message);
    // }
  });
}

const PORT = 3000;
const ADDRESS = "127.0.0.1";

server.listen(PORT, ADDRESS, () => {
  console.log("服务器已启动，正在监听端口 " + PORT);
});
